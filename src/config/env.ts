export const env = {
  // Force relative path in production for CloudFront routing.
  // Use VITE_API_URL or localhost only for local development.
  API_URL: import.meta.env.PROD
    ? '/api'
    : import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
}
