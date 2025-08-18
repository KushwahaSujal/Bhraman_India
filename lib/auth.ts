import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export function getTokenFromAuthHeader(authHeader: string | null): string {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header')
  }
  return authHeader.substring(7)
}
