CREATE PROCEDURE `get_players_suggested_for_event`(IN p_eventId INT)
BEGIN
-- variables 
DECLARE done INT DEFAULT 0;
DECLARE v_sportId, v_event_day INT;
DECLARE v_event_date DATE;
DECLARE v_start_time, v_end_time  TIME;
DECLARE v_latitude,v_longitude VARCHAR(255);

SELECT sportId,date,DAYOFWEEK(DATE(date)) event_date,start_time,end_time,latitude,longitude 
INTO v_sportId,v_event_date,v_event_day,v_start_time,v_end_time,v_latitude,v_longitude
FROM event where id=p_eventId;
	
    
    INSERT INTO player_suggestion(stateId,eventId,playerId,date)
    SELECT DISTINCT 12 stateId,p_eventId,pl.id,CURRENT_DATE 
    FROM player pl
	JOIN person p ON pl.personId=p.id
	JOIN availability av ON p.id=av.personId
	JOIN day d ON av.dayId=d.id
    JOIN address a ON p.id=a.personId
	WHERE pl.sportId=v_sportId
	AND av.dayId=v_event_day 
    AND av.start_time <=v_start_time 
    AND v_end_time <= av.end_time 
    AND fn_calcula_distancia_por_direccion(a.id,v_latitude,v_longitude) <=15 -- valida distancia a direcciones no mayor a 15 KM
    AND NOT EXISTS(
		SELECT 1 FROM player_suggestion 
        WHERE eventId=p_eventId 
        AND playerId=pl.id 
	)
    AND NOT EXISTS(
		SELECT 1 FROM player_list  l
        WHERE l.eventId=p_eventId  
	    AND l.playerId=pl.id
        UNION
        SELECT 1 FROM event_apply  ap
        WHERE ap.eventId=p_eventId 
	    AND ap.playerId=pl.id
	)
    ;

SELECT * FROM player_suggestion;
	
END