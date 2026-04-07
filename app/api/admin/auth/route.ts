import { NextRequest, NextResponse } from 'next/server'
import { login, logout } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    const success = await login(username, password)
    
    if (success) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE() {
  await logout()
  return NextResponse.json({ success: true })
}
