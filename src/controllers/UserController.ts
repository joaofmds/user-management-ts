import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.create(req.body)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.findById(Number(req.params.id))
      res.status(200).json(user)
    } catch(error) {
      next(error)
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.findAll()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.update(Number(req.params.id), req.body)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.delete(Number(req.params.id))
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}