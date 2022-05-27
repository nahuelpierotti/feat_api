CREATE DEFINER=`root`@`%` PROCEDURE `sp_calcula_distancia_por_direccion`(in p_addressId int ,in p_latitude varchar(255),in p_longitude varchar(255))
begin

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
from address 
where id=p_addressId;

END