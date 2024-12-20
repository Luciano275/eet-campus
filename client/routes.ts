export const PUBLIC_ROUTES: string[] = []

export const AUTH_ROUTES = [
    '/'
]

export const API_AUTH_PREFIX = '/api/auth'
export const API_CLASSROOM_PREFIX = '/api/classroom/presentation'
export const DEFAULT_REDIRECT = '/campus'

export const MAIN_PAGE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4321'