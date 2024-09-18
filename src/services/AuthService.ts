import { PrismaClient } from "@prisma/client"
import { BadRequestException } from "../exceptions/BadRequestException"
import { validatePassword } from "../utils/password"
import { sign } from "jsonwebtoken"
import { ExternalServerErrorException } from "../exceptions/ExternalServerErrorException"
import { logger } from "../logger"

const prisma = new PrismaClient()

export class AuthService {
  static async login(email: string, password: string): Promise<string> {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      
      if (!user) {
        throw new BadRequestException('Invalid email or password')
      }
  
      const isPasswordValid = await validatePassword(password, user.password)
  
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid email or password')
      }
  
      const token = sign({ id: user.id }, 'my_secret_key', { expiresIn: '1h' })
      return token
    } catch (error) {
      if (error instanceof BadRequestException) {
        logger.error('Validation Error:', error)
        throw error
      } else {
        logger.error('Unexpected Error:', error)
        throw new ExternalServerErrorException('Unable to login')
      }
    }
  }
}