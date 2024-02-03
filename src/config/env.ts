import { cleanEnv, str, bool, port } from 'envalid'
import 'dotenv/config'

const env = cleanEnv(process.env, {
  TELEGRAM_TOKEN: str(),
  TELEGRAM_CHANNEL: str()
})

export default env
