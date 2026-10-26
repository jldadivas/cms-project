import 'dotenv/config'
import config from '../payload.config'
import { seedGuidePages } from './seed/guide-topics'
import { getPayload } from 'payload'

const seedGuides = async () => {
  const payload = await getPayload({ config })
  try {
    const syncExisting = !process.argv.includes('--no-sync')
    await seedGuidePages(payload, { syncExisting })
    payload.logger.info('Expo Go guide pages are ready.')
  } finally {
    await payload.db.drizzle.$client.close()
  }
}

seedGuides().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
