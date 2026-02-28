// Simple open-auth token (no JWT dependency needed)

export interface TokenPayload {
  userId: string
  email: string
}

export function signToken(payload: TokenPayload): string {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })
  // Simple base64 encoding - safe for open auth mode
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(data).toString('base64')
  }
  return btoa(data)
}

export function verifyToken(token: string): TokenPayload {
  try {
    let decoded: string
    if (typeof Buffer !== 'undefined') {
      decoded = Buffer.from(token, 'base64').toString('utf-8')
    } else {
      decoded = atob(token)
    }
    const payload = JSON.parse(decoded)
    if (payload.exp && payload.exp < Date.now()) {
      throw new Error('Token expired')
    }
    return { userId: payload.userId, email: payload.email }
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
