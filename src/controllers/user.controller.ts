import { Request, Response } from "express";
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

export const create = (req: Request, res: Response) => {
  res.send("create user");
};
