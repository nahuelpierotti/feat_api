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
INSERT INTO state VALUES(1,'Evento Creado'),(2,'Evento Completo'),(3,'Evento Confirmado'),(4,'Evento Cancelado'),(5,'Evento Terminado');
insert into event( id, name, date, start_time, end_time, description, latitude, logitude, sportId, periodicityId, stateId)
values(1, 'Por la Coca', '2022-06-22 00:00:00', '19:00:00', '21:00:00', 'Partido para conocer gente', -34.67113370092134, -58.556722546329766, 1, 1, 1);
insert into event( id, name, date, start_time, end_time, description, latitude, logitude, sportId, periodicityId, stateId)
values(2, 'Por la Coca Revancha', '2022-06-29 00:00:00', '19:00:00', '21:00:00', 'Partido para conocer gente', -34.67113370092134, -58.556722546329766, 1, 1, 1);
