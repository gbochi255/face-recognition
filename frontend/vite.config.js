import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  //root: './frontend',
  plugins: [react()],
  define: {
    'process.env': {}
  }, 
  server: {
    proxy: {
      '/signin': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
      '/image': 'http://localhost:3000',
      '/profile': 'http://localhost:3000',
      '/imageUrl': 'http://localhost:3000'
    }
  }
  });

  


  
