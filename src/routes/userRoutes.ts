import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

export const userRouter = Router()

userRouter.post('/user', authMiddleware, UserController.create)
userRouter.get('/user/:id', authMiddleware, UserController.findById)
userRouter.get('/users', authMiddleware, UserController.findAll)
userRouter.put('/user/:id', authMiddleware, UserController.update)
userRouter.delete('/user/:id', authMiddleware, UserController.delete)