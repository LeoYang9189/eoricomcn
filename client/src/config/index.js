export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-vercel-domain.vercel.app/api'
  : 'http://localhost:3001/api'; 