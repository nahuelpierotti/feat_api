CREATE DEFINER=`root`@`%` FUNCTION `fn_calcula_distancia_por_direccion`(p_addressId int ,p_latitude varchar(255),p_longitude varchar(255)) RETURNS float
begin
declare v_distance float;
SELECT 
        (
            (
                (
                    acos(
                        sin(( p_latitude * pi() / 180))
                        *
                        sin(( latitude * pi() / 180)) + cos(( p_latitude * pi() /180 ))
                        *
                        cos(( latitude * pi() / 180)) * cos((( p_longitude - logitude ) * pi()/180)))
                ) * 180/pi()
            ) * 60 * 1.1515 * 1.609344
        )as distance
into v_distance
from address 
where id=p_addressId;

return v_distance;
END