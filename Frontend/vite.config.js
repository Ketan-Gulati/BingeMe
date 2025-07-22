import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      proxy: {
        '/v1': `${env.VITE_REACT_APP_BACKEND_BASEURL}/api`,
      },
    },
    plugins: [react()],
  }
})
