import { createServer } from 'vite';

async function startServer() {
  try {
    const server = await createServer({
      configFile: './vite.config.ts',
      root: process.cwd(),
      server: {
        port: 5173,
        strictPort: true,
        host: '0.0.0.0',
      }
    });

    await server.listen();
    console.log('Node.js Localhost Dev Server running at http://localhost:5173');
    server.printUrls();
  } catch (err) {
    console.error('Failed to start Node.js server:', err);
    process.exit(1);
  }
}

startServer();
