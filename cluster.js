// Production-ready cluster example
const cluster = require('cluster');
const http = require('http');
const os = require('os');
const numCPUs = os.cpus().length;

const PORT = process.env.PORT || 8000;
const WORKER_TIMEOUT = process.env.WORKER_TIMEOUT || 5000;

if (cluster.isMaster) {
  console.log(`[Master] PID: ${process.pid} is running`);

  // Fork workers based on available CPU cores.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Monitor worker exit events and respawn as necessary.
  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `[Master] Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`
    );
    console.log('[Master] Spawning a new worker');
    cluster.fork();
  });

  // Graceful shutdown on master process signals.
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  function shutdown() {
    console.log('[Master] Initiating graceful shutdown...');
    for (const id in cluster.workers) {
      if (cluster.workers.hasOwnProperty(id)) {
        console.log(`[Master] Terminating worker ${cluster.workers[id].process.pid}`);
        cluster.workers[id].process.kill('SIGTERM');
      }
    }
    process.exit(0);
  }
} else {
  // Worker process: Set up an HTTP server with graceful shutdown.
  const server = http.createServer((req, res) => {
    console.log("Request received on process", process.pid)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js Cluster!\n');
  });

  server.listen(PORT, () => {
    console.log(`[Worker] PID: ${process.pid} is listening on port ${PORT}`);
  });

  // Handle graceful shutdown for workers.
  process.on('SIGTERM', () => {
    console.log(`[Worker] PID: ${process.pid} is shutting down gracefully...`);
    server.close(() => {
      process.exit(0);
    });
    // Force shutdown if not closed within the timeout period.
    setTimeout(() => {
      console.error(`[Worker] PID: ${process.pid} shutdown timed out, forcing exit`);
      process.exit(1);
    }, WORKER_TIMEOUT);
  });
}
