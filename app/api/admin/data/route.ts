import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { isAuthenticated } from '@/lib/admin-auth'

export async function GET() {
  const isAuth = await isAuthenticated()
  
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dbPath = path.join(process.cwd(), 'data', 'waitlist.json')
    let waitlist = []

    try {
      const fileContents = await fs.readFile(dbPath, 'utf8')
      waitlist = JSON.parse(fileContents)
    } catch {
      // Return empty if file not found
    }

    // Sort by timestamp (newest first)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    waitlist.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Basic insights
    const totalSignups = waitlist.length
    const today = new Date().toISOString().split('T')[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const signupsToday = waitlist.filter((s: any) => s.timestamp.startsWith(today)).length

    return NextResponse.json({ 
      success: true, 
      data: waitlist,
      insights: {
        totalSignups,
        signupsToday,
      }
    })
  } catch (error) {
    console.error('Admin Data API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
