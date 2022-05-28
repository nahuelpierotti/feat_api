use feat;
INSERT INTO user_type (description) VALUES ('admin');
INSERT INTO user_type (description) VALUES ('jugador');
INSERT INTO user_type (description) VALUES ('organizador');
INSERT INTO day VALUES (1,'Domingo'),(2,'Lunes'),(3,'Martes'),(4,'Miercoles'),(5,'Jueves '),(6,'Viernes'),(7,'Sabado');
INSERT INTO periodicity VALUES (1,'Unica vez'),(2,'Semanal'),(3,'Quincenal'),(4,'Mensual');
INSERT INTO sport VALUES (1,'Futbol 5',10,2),(2,'Futbol 6',12,2),(3,'Futbol 7',14,2),(4,'Futbol 9',18,2),(5,'Futbol 11',22,2),(6,'Padel Single',2,1),(7,'Padel Doubles',4,2),(8,'Tenis Single',2,1),(9,'Tenis Doubles',4,2),(10,'Basquet ',10,2),(11,'Evento Recreativo',NULL,NULL);
INSERT INTO level(description,sportId) values('Nivel 1',6);
INSERT INTO level(description,sportId) values('Nivel 1.5',6);
INSERT INTO level(description,sportId) values('Nivel 2',6);
INSERT INTO level(description,sportId) values('Nivel 2.5',6);
INSERT INTO level(description,sportId) values('Nivel 3',6);
INSERT INTO level(description,sportId) values('Nivel 3.5',6);
INSERT INTO level(description,sportId) values('Nivel 4',6);
INSERT INTO level(description,sportId) values('Nivel 4.5',6);
INSERT INTO level(description,sportId) values('Nivel 5',6);
INSERT INTO level(description,sportId) values('Nivel 5.5',6);
INSERT INTO level(description,sportId) values('Nivel 6',6);
INSERT INTO level(description,sportId) values('Nivel 7',6);
INSERT INTO level(description,sportId) values('Nivel 1',7);
INSERT INTO level(description,sportId) values('Nivel 1.5',7);
INSERT INTO level(description,sportId) values('Nivel 2',7);
INSERT INTO level(description,sportId) values('Nivel 2.5',7);
INSERT INTO level(description,sportId) values('Nivel 3',7);
INSERT INTO level(description,sportId) values('Nivel 3.5',7);
INSERT INTO level(description,sportId) values('Nivel 4',7);
INSERT INTO level(description,sportId) values('Nivel 4.5',7);
INSERT INTO level(description,sportId) values('Nivel 5',7);
INSERT INTO level(description,sportId) values('Nivel 5.5',7);
INSERT INTO level(description,sportId) values('Nivel 6',7);
INSERT INTO level(description,sportId) values('Nivel 7',7);
insert into position
(description,sportId)
select 'Arquero' description,id sportId from sport
where description like 'Futbol%'
union
select 'Defensor' description,id sportId from sport
where description like 'Futbol%'
union
select 'Mediocampista' description,id sportId from sport
where description like 'Futbol%'
union
select 'Delantero' description,id sportId from sport
where description like 'Futbol%';
insert into level
(description,sportId)
select 'Principiante' description,id sportId from sport
where description like 'Futbol%'
union
select 'Normal' description,id sportId from sport
where description like 'Futbol%'
union
select 'Bueno' description,id sportId from sport
where description like 'Futbol%'
union
select 'Competitivo' description,id sportId from sport
where description like 'Futbol%';
INSERT INTO valuation (description,`order`) VALUES ('Deporte Favorito',1);

INSERT INTO valuation (description,`order`) VALUES ('Me interesa Mucho',2);
INSERT INTO valuation (description,`order`) VALUES ('Me interesa Bastante',3);
INSERT INTO valuation (description,`order`) VALUES ('Quiero Probar Suerte',4);
INSERT INTO state VALUES(1,'Evento Creado'),(2,'Evento Completo'),(3,'Evento Confirmado'),(4,'Evento Cancelado'),(5,'Evento Terminado'),(6,'Solicitud Enviada'),(7,'Solicitud Confirmada'),(8,'Solicitud Rechazada');


INSERT INTO person (id,lastname,names,birth_date,sex,min_age,max_age,nickname,userUid) VALUES (1,'Pierotti','Nahuel','1985-10-26 00:00:00','M',20,45,'npie',1);

INSERT INTO player (id,abilities,notifications,personId,sportId,positionId,levelId,valuationId) VALUES (1,'Rustico',1,1,1,11,30,1);
INSERT INTO player (id,abilities,notifications,personId,sportId,positionId,levelId,valuationId) VALUES (6,'Rustico',1,1,2,11,30,1);

INSERT INTO address (id,alias,street,number,town,zip_code,latitude,logitude,personId) VALUES (1,'Casa','Manuel Artigas','5316','Mataderos','1440','-34.645415224925905','-58.498028272865035',1);
INSERT INTO address (id,alias,street,number,town,zip_code,latitude,logitude,personId) VALUES (2,'Casa Papa','Castro Barros','2155','Aldo Bonzi','1770','-34.710966215923946','-58.510776256974765',1);

INSERT INTO event (id,name,date,start_time,end_time,description,latitude,stateId,sportId,periodicityId,organizerId,longitude) VALUES (1,'Por la Coca','2022-06-22 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.67113370092134',1,1,1,1,'-58.490307171164346');
INSERT INTO event (id,name,date,start_time,end_time,description,latitude,stateId,sportId,periodicityId,organizerId,longitude) VALUES (2,'Por la Coca Revancha','2022-06-29 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.67113370092134',1,1,1,1,'-58.490307171164346');
INSERT INTO event (id,name,date,start_time,end_time,description,latitude,stateId,sportId,periodicityId,organizerId,longitude) VALUES (3,'Por la Coca Mataderos','2022-06-29 00:00:00','19:00:00','21:00:00','Partido para conocer gente','-34.64222113108822',1,1,1,1,'-58.490307171164346');

INSERT INTO event_apply (id,origin,stateId,eventId,playerId) VALUES (1,'S',6,1,1);
INSERT INTO event_apply (id,origin,stateId,eventId,playerId) VALUES (2,'S',6,2,1);