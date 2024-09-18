import { Request, Response, NextFunction } from "express"
import { verify } from 'jsonwebtoken'
import { HttpException } from "../exceptions/HttpExcelption"

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new HttpException(401, 'No token provided')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, 'my_secret_key')
    res.locals.user = decoded
    next()
  } catch (error) {
    next(new HttpException(401, 'Invalid token'))
  }
}