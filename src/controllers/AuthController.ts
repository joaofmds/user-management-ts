import { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/AuthService"

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email,password } = req.body
      const token = await AuthService.login(email, password)
      res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }
}