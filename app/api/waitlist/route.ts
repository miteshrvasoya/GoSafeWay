import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Path to our local JSON "database"
    const dbPath = path.join(process.cwd(), 'data', 'waitlist.json')
    
    // Read existing data
    let waitlist = []
    try {
      const fileContents = await fs.readFile(dbPath, 'utf8')
      waitlist = JSON.parse(fileContents)
    } catch (error) {
      // If file doesn't exist, we start with an empty array
      console.warn('Waitlist file not found or empty, creating new one.')
    }

    // Check if email already exists
    if (waitlist.some((entry: any) => entry.email === email)) {
      return NextResponse.json({ message: 'Email already on the waitlist!' }, { status: 200 })
    }

    // Append new entry
    const newEntry = {
      email,
      timestamp: new Date().toISOString()
    }
    waitlist.push(newEntry)

    // Write back to file
    await fs.writeFile(dbPath, JSON.stringify(waitlist, null, 2))

    return NextResponse.json({ message: 'Successfully joined the waitlist!', data: newEntry }, { status: 201 })
  } catch (error) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
