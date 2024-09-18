import winston from 'winston'

const level = 'info'
export const logger = winston.createLogger({
  level, 
  transports: [
    new winston.transports.Console({
      level
    })
  ],
  format: winston.format.combine(winston.format.json())
})
