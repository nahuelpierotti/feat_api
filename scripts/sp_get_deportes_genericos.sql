CREATE DEFINER=`root`@`%` PROCEDURE `sp_get_deportes_genericos`()
BEGIN
SET @row_number = 0;   

create temporary table deportes as  
select  distinct 
case when id=11 then description else left(description,LOCATE(' ', description)) end sport_descrip
from sport;

select (@row_number:=@row_number + 1) AS id_generic,sport_descrip  from deportes;

drop table deportes; 

END