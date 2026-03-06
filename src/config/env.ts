// `env.API_URL` is used by the shared axios client (`api-client.ts`).
// when working locally you can point this to the mock server
// (which starts on port 3001) by setting `VITE_API_URL=http://localhost:3001/api`
// in an .env file or quoting the value when running the dev server.
// Once the real backend is available, just update the environment variable
// without touching the code.
export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
}
