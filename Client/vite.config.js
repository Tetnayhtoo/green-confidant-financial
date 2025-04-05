import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import portfinder from 'portfinder'

const availablePort = await portfinder.getPortPromise({ port: 0, stopPort: 65535 })
.then(availablePort => {
  console.log('Available port:', availablePort);
  return availablePort;
})
.catch(err => {
  console.error('Error finding available port:', err);
  process.exit(1);
});

console.log('Available port:', availablePort);

export default defineConfig({
  plugins: [react()],
  server: {
    port: availablePort,
    host: 'localhost'
  }
})
