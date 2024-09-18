import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "../models/User";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { BadRequestException } from "../exceptions/BadRequestException";
import { logger } from "../logger";
import { ExternalServerErrorException } from "../exceptions/ExternalServerErrorException";
import { TypeErrorException } from "../exceptions/TypeErrorException";
import { createPasswordHashed } from "../utils/password";

const prisma = new PrismaClient()

export class UserService {
  static async create(data: Prisma.UserCreateInput): Promise<User> {
    if (!data) {
      throw new BadRequestException('Data not found')
    }

    try {
      const userEmail = await this.findByEmail(data.email)

      if (userEmail) {
        throw new BadRequestException('Email exist in database')
      }

      const user = {
        ...data,
        password: await createPasswordHashed(data.password)
      }


      if (!user) {
        throw new UserNotFoundException()
      }

      return await prisma.user.create({ data: user })
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UserNotFoundException) {
        logger.error('Validation Error:', error)
        throw error
      } else {
        logger.error('Unexpected Error:', error)
        throw new ExternalServerErrorException('Error to create new user')
      }
    }
  }

  static async findById(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('Id not found')
    }

    if (typeof id !== 'number') {
      throw new TypeErrorException('ID must be a number')
    }

    try {
      const user = await prisma.user.findUnique({ where: { id } })
  
      if (!user) {
        throw new UserNotFoundException()
      }
  
      return user
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UserNotFoundException) {
        logger.error('Validation Error:', error)
        throw error
      } else {
        logger.error('Unexpected Error:', error)
        throw new ExternalServerErrorException('Error to find user')
      }
    }
  }

  static async findAll(): Promise<User> {
    try {
      const users = await prisma.user.findMany()
      
      if (!users) {
        throw new UserNotFoundException()
      }

      return users
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        logger.error('Validation Error:', error)
        throw error
      } else {
        logger.error('Unexpected Error:', error)
        throw new ExternalServerErrorException('Error to find users')
      }
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new BadRequestException('Email not found');
    }

    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new TypeErrorException('Invalid format error');
    }

    const user = await prisma.user.findUnique({ where: { email } });

    return user
  }

  static async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    if (!id || !data) {
      throw new BadRequestException('ID or data must be non-empty')
    }

    if (typeof id !== 'number') {
      throw new TypeErrorException('ID must be a number')
    }

    if (typeof data.name !== 'string') {
      throw new TypeErrorException('Name must be a string')
    }

    if (typeof data.email !== 'string') {
      throw new TypeErrorException('Email must be a string');
    }
  
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      throw new TypeErrorException('Invalid email format');
    }

    if (data.password && typeof data.password !== 'string' && typeof data.password !== 'object') {
      throw new TypeErrorException('Invalid password format');
    }

    if (typeof data.password === 'string' && data.password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }

    try {
      const existingUser = await prisma.user.findUnique({where: { id }})
  
      if (!existingUser) {  
        throw new UserNotFoundException()
      }

      if (data.password && typeof data.password === 'string') {
        data.password = await createPasswordHashed(data.password)
      } else {
        data.password = existingUser.password
      }
  
      const updatedUser = await prisma.user.update({
        where: { id },
        data
      })

      return updatedUser
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof TypeErrorException  ||
        error instanceof UserNotFoundException
      ) {
        logger.error('Validation Error:', error)
        throw error
      } else {
        logger.error('Unexpected Error:', error)
        throw new ExternalServerErrorException('User could not be updated')
      }
    }
  } 

  static async delete(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('ID must be non-empty')
    }

    if (typeof id !== 'number') {
      throw new TypeErrorException('ID must be a number')
    }
    try {
      const deletedUser = await prisma.user.delete({
        where: { id }
      })
  
      if (!deletedUser) {
        throw new UserNotFoundException()
      }

      return deletedUser
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof TypeErrorException  ||
        error instanceof UserNotFoundException
      ) {
        logger.error('Validation Error:', error)
        throw error
      } else {
        logger.error('Unexpected Error:', error)
        throw new ExternalServerErrorException('User could not be updated')
      }
    }
  }
}