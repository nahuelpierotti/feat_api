import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { User } from "../models/User";
import { UserType } from "../models/UserType";

export const findAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
      const user = await User.findOne(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
};

export const update = (req: Request, res: Response) => {
  res.send("update user");
};

export const deleteUser = (req: Request, res: Response) => {
  res.send("delete user");
};

export const create = async (req: Request, res: Response) => {
  try{
    const user= await
    createQueryBuilder()
    .insert()
    .into(User)
    .values({
        uid: req.body.uid,
        email:  req.body.email,
        userType: 2,
        mobileToken: req.body.mobile_token,
    })
    .execute()
    res.status(200).json("Usuario creado exitosamente!");

  }catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

