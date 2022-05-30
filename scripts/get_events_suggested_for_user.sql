CREATE DEFINER=`root`@`%` PROCEDURE `get_events_suggested_for_user_v2`(IN p_userUid INT)
BEGIN
-- variables 
DECLARE done INT DEFAULT 0;
DECLARE v_dayId, v_addressId, v_personId INT;
DECLARE v_start_time, v_end_time  TIME;

-- meto la disponibilidad del usuario en un cursor
DECLARE get_availabilities CURSOR FOR 
SELECT d.id dayId,av.start_time,av.end_time,p.id personId
FROM user u 
JOIN person p ON u.uid=p.userUid
JOIN availability av ON p.id=av.personId
JOIN day d ON av.dayId=d.id
WHERE u.uid=p_userUid;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;



OPEN get_availabilities;
	
    read_loop: LOOP
		FETCH get_availabilities 
		INTO v_dayId, v_start_time, v_end_time, v_personId;
	
    IF done THEN
	 LEAVE read_loop;
	END IF;
    
    INSERT INTO event_suggestion(stateId,eventId,personId,date)
    SELECT 12 stateId, e.id,v_personId,current_date()
	FROM event e 
	JOIN sport s ON e.sportId=s.id
	LEFT JOIN event_apply ap ON e.id=ap.eventId
	WHERE e.date >= CURRENT_DATE 
    AND (s.capacity-(SELECT count(*) FROM player_list WHERE eventId=e.id AND stateId=9))>0 -- valido que el cupo > 0
	AND e.date <= DATE_ADD(NOW(), INTERVAL 10 DAY) -- filtro de eventos dentro de los 10 dias
	AND EXISTS(
		SELECT 1 FROM user u 
		JOIN person p ON u.uid=p.userUid
		JOIN player pl ON p.id=pl.personId
        JOIN address a ON p.id=a.personId
		WHERE u.uid=p_userUid
		AND pl.sportId=e.sportId
        AND fn_calcula_distancia_por_direccion(a.id,e.latitude,e.longitude) <=15 -- valida distancia a direcciones no mayor a 15 KM
	)
    AND DAYOFWEEK(DATE(e.date))=v_dayId
    AND v_start_time <= e.start_time 
    AND e.end_time <= v_end_time
    AND NOT EXISTS(SELECT 1 FROM event_suggestion WHERE eventId=e.id AND personId=v_personId )
    ;
    
    END LOOP read_loop;   
    
    CLOSE get_availabilities;
    
    SELECT DISTINCT * FROM event_suggestion;
	
END