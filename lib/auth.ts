import jwt from 'jsonwebtoken'

function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'bhraman-open-auth-fallback-secret'
}

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, getJwtSecret()) as JWTPayload
  } catch {
    throw new Error('Invalid token')
  }
}

export function getTokenFromAuthHeader(authHeader: string | null): string {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header')
  }
  return authHeader.substring(7)
}
