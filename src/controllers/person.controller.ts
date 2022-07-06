import { Request, Response } from "express";
import { createQueryBuilder, getConnection, getRepository } from "typeorm";
import { Address } from "../models/Address";
import { Availability } from "../models/Availability";
import { Person } from "../models/Person";
import { Player } from "../models/Player";



export const findOne = async (req: Request, res: Response) => {
  try {
      
    const person= await getRepository(Person)
    .createQueryBuilder("person")
    .leftJoinAndSelect("person.availability","availability")
    .leftJoinAndSelect("availability.day","day")
    .leftJoin("person.user", "user")
    .where('user.uid = :uid', {uid: req.params.uid })
    .getOne()
    /*
    if(person==undefined){
      const js={
          "id": 0, 
          "lastname": "No",
          "names": "No",
          "birth_date": '0000-00-00T03:00:00.000Z',
          "sex": "M",
          "min_age": 0,
          "max_age": 0,
          "nickname": "no",
          "notifications": false,
          "willing_distance": 0
        }
        res.status(200).json(js);
      }
      
    */
     //console.log(person)
      res.status(200).json(person);
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
};

export const create = async (req: Request, res: Response) => {
  try{
    const person= await
    createQueryBuilder()
    .insert()
    .into(Person)
    .values({
        lastname: req.body.lastname,
        names: req.body.names,
        birth_date: req.body.birth_date,
        sex: req.body.sex,
        nickname: req.body.nickname,
        user: req.body.userUid,
    })
    .execute()

    console.log(person)
    res.status(200).json("Persona creada exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


export const update = async (req: Request, res: Response) => {
  try{
    const personUpd= await
    createQueryBuilder()
    .update(Person)
    .set({
      min_age: + req.body.min_age,
      max_age: + req.body.max_age,
      notifications:  req.body.notifications,
      willing_distance: + req.body.willing_distance

    }).where("id = :id", { id: req.body.id})
    .execute()

    console.log(personUpd)
    res.status(200).json("Actualizado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const updatePersonalInformation = async (req: Request, res: Response) => {
  try{
    const personUpd= await
    createQueryBuilder()
    .update(Person)
    .set({
      names: req.body.names,
      lastname: req.body.lastname,
      nickname:  req.body.nickname,
      birth_date: req.body.birth_date,
      sex: req.body.sex,

    }).where("id = :id", { id: req.body.id})
    .execute()

    console.log(personUpd)
    res.status(200).json("Actualizado Exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const createPerson = async (req: Request, res: Response) => {
  try{
    const person= await
    createQueryBuilder()
    .insert()
    .into(Person)
    .values({
        lastname: req.body.lastName,
        names: req.body.name,
        birth_date: req.body.dateOfBirth,
        sex: req.body.sex,
        nickname: req.body.nickname,
        user: req.body.userUid,
    })
    .execute()

    console.log(person)
    const idPersona=person.raw.insertId

    res.status(200).json(" Persona creada exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const createPersonTransaction = async (req: Request, res: Response)=> {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();

await queryRunner.connect();
await queryRunner.startTransaction();
  try {
    const person= await
    createQueryBuilder()
    .insert()
    .into(Person)
    .values({
        lastname: req.body.lastName,
        names: req.body.name,
        birth_date: req.body.dateOfBirth,
        sex: req.body.sex,
        nickname: req.body.nickname,
        user: req.body.userUid,
        min_age: + req.body.minAge,
        max_age: + req.body.maxAge,
        notifications:  req.body.notifications,
        willing_distance: + req.body.willingDistance

    })
    .execute()

    console.log(person)
    const idPersona=person.raw.insertId

    const address= await
    createQueryBuilder()
    .insert()
    .into(Address)
    .values({
        alias: req.body.addressAlias,
        street: req.body.address,
        number: "1",
        town: "1",
        zip_code: "1",
        latitude: req.body.latitude,
        logitude: req.body.logitude,
        person: +idPersona,
    })
    .execute()

    console.log(address)

    /* AVAILABILITY*/
      const start_time1= req.body.startTimeSunday;
      const end_time1= req.body.endTimeSunday;

      const start_time2= req.body.startTimeMonday;
      const end_time2= req.body.endTimeMonday;

      const start_time3= req.body.startTimeTuesday;
      const end_time3= req.body.endTimeTuesday;

      const start_time4= req.body.startTimeWednesday;
      const end_time4= req.body.endTimeWednesday;

      const start_time5= req.body.startTimeThursday;
      const end_time5= req.body.endTimeThursday;

      const start_time6= req.body.startTimeFriday;
      const end_time6= req.body.endTimeFriday;

      const start_time7= req.body.startTimeSaturday;
      const end_time7= req.body.endTimeSaturday;

      if(start_time1!=null && end_time1!=null){

        const availability= await
        createQueryBuilder()
        .insert()
        .into(Availability)
        .values({
          start_time: start_time1,
          end_time: end_time1,
          person: +idPersona,
          day: 1

        })
        .execute()
        console.log(availability)
    }

    if(start_time2!=null && end_time2!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time2,
        end_time: end_time2,
        person: +idPersona,
        day: 2

      })
      .execute()
      console.log(availability)
  }

  if(start_time3!=null && end_time3!=null){

        const availability= await
        createQueryBuilder()
        .insert()
        .into(Availability)
        .values({
          start_time: start_time3,
          end_time: end_time3,
          person: +idPersona,
          day: 3

        })
        .execute()
        console.log(availability)
    }
    
    if(start_time4!=null && end_time4!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time4,
        end_time: end_time4,
        person: +idPersona,
        day: 4

      })
      .execute()
      console.log(availability)
    }

    if(start_time5!=null && end_time5!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time5,
        end_time: end_time5,
        person: +idPersona,
        day: 5

      })
      .execute()
      console.log(availability)
    }

    if(start_time6!=null && end_time6!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time6,
        end_time: end_time6,
        person: +idPersona,
        day: 6

      })
      .execute()
      console.log(availability)
    }

    if(start_time7!=null && end_time7!=null){

      const availability= await
      createQueryBuilder()
      .insert()
      .into(Availability)
      .values({
        start_time: start_time7,
        end_time: end_time7,
        person: +idPersona,
        day: 7

      })
      .execute()
      console.log(availability)
    }
    /* FIN AVAILABILITY*/

    if(req.body.idSoccer!= null){
      const player= await
      createQueryBuilder()
      .insert()
      .into(Player)
      .values({
          abilities: req.body.abilitiesSoccer,
          person: +idPersona,
          sport: + req.body.idSoccer,
          position: + req.body.positionIdSoccer,
          level: + req.body.levelIdSoccer,
          valuation: + req.body.valuationIdSoccer   
      })
      .execute()
    }

    if(req.body.idBasketball!= null){
      const player= await
      createQueryBuilder()
      .insert()
      .into(Player)
      .values({
          abilities: req.body.abilitiesBasketball,
          person: +idPersona,
          sport: +req.body.idBasketball,
          position: + req.body.positionIdBasketball,
          level: + req.body.levelIdBasketball,
          valuation: + req.body.valuationIdBasketball   
      })
      .execute()
    }

    if(req.body.idPadel!= null){
      const player= await
      createQueryBuilder()
      .insert()
      .into(Player)
      .values({
          abilities: req.body.abilitiesPadel,
          person: +idPersona,
          sport: +req.body.idPadel,
          position: + req.body.positionIdPadel,
          level: + req.body.levelIdPadel,
          valuation: + req.body.valuationIdPadel   
      })
      .execute()
    }

    if(req.body.idTennis!= null){
      const player= await
      createQueryBuilder()
      .insert()
      .into(Player)
      .values({
          abilities: req.body.abilitiesTennis,
          person: +idPersona,
          sport: +req.body.idTennis,
          position: + req.body.positionIdTennis,
          level: + req.body.levelIdTennis,
          valuation: + req.body.valuationIdTennis   
      })
      .execute()
    }

    if(req.body.idRecreationalActivity!= null){
      const player= await
      createQueryBuilder()
      .insert()
      .into(Player)
      .values({
          abilities: req.body.abilitiesRecreationalActivity,
          person: +idPersona,
          sport: +req.body.idRecreationalActivity,
          position: + req.body.positionIdRecreationalActivity,
          level: + req.body.levelIdRecreationalActivity,
          valuation: + req.body.valuationIdRecreationalActivity   
      })
      .execute()
    }

    await queryRunner.commitTransaction();

  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
      await queryRunner.release();
  }
};