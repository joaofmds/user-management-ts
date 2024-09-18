import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class User {
  static async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data })
  }
}