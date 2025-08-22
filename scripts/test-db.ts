import { db } from '../src/lib/db'

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...')

    // Test basic connection
    await db.$connect()
    console.log('✅ Database connected successfully!')

    // Test simple query
    const result = await db.$queryRaw`SELECT version()`
    console.log('📊 Database version check passed')

    await db.$disconnect()
    console.log('✅ Database test completed successfully!')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }
}

testConnection()
