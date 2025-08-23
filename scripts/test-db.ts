import { db } from '../src/lib/db'

async function testConnection() {
  try {
    console.warn('🔍 Testing database connection...')

    // Test basic connection
    await db.$connect()
    console.warn('✅ Database connected successfully!')

    // Test simple query
    const result = await db.$queryRaw`SELECT version()`

    if (result) {
      console.warn('📊 Database version check passed')
    }

    await db.$disconnect()
    console.warn('✅ Database test completed successfully!')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }
}

testConnection()
