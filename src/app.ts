import express, { Response, Request, NextFunction } from 'express'
import { userRouter } from './routes/userRoutes'
import { authRouter } from './routes/authRoutes'
import { HttpException } from './exceptions/HttpExcelption'
const app = express()
const port = 3000

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', authRouter)

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})