import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Address } from "../models/Address";


export const findAllByUser=async (req: Request,res:Response)=>{
    try{  
        const result = await Address.query(
          'call sp_address_by_user(?)',[req.params.id]);
        
          console.log(result) 
          
        res.status(200).json(result);    
    }catch(error){
      res.status(400).json(error);
    }
}

export const create = async (req: Request, res: Response) => {
  try{
    const address= await
    createQueryBuilder()
    .insert()
    .into(Address)
    .values({
        alias: req.body.alias,
        street: req.body.street,
        number: req.body.number,
        town: req.body.town,
        zip_code: req.body.zip_code,
        latitude: req.body.latitude,
        logitude: req.body.logitude,
        person: req.body.person,
    })
    .execute()

    console.log(address)
    res.status(200).json("Direccion creada exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

