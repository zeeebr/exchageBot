import { Telegraf } from 'telegraf'
import env from '../config/env'

export async function sendMessage(message: string): Promise<void> {
  try {
    const tg = new Telegraf(env.TELEGRAM_TOKEN)
    await tg.telegram.sendMessage(env.TELEGRAM_CHANNEL, message)
  } catch (err) {
    console.error(err)
    throw err
  }
}