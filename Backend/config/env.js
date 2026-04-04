import dotenv from 'dotenv'
import logger from './logger.js'

dotenv.config()

// Log a safe summary of env injection (no secrets)
const keys = {
  PORT: !!process.env.PORT,
  MONGO_URI: !!process.env.MONGO_URI,
  JWT_SECRET: !!process.env.JWT_SECRET,
  ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
}

logger.info('Env injection complete', keys)

