import { Request, Response, NextFunction } from "express";
import * as userService from "../../services/users/user_service";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.params.email;
    const user = await userService.getUserByEmail(email.toString());
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body;
    const newUser = await userService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id.toString());
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await userService.deleteUser(id.toString());
    res.json(user);
  } catch (error) {
    next(error);
  }

};

export const updateUser = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const user = req.body;
        const updatedUser = await userService.updateUser(id.toString(), user);
        res.json(updatedUser);  
    }catch(error){
        next(error);
    }
}
