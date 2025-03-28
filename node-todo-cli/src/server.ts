import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import open from "open";

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    // Path to the Vite build directory
    const BUILD_PATH = path.resolve(process.cwd(), 'client', 'dist');
    
    // Handle API routes
    if (req.url.startsWith('/api')) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(notes));
      return;
    }

    // Normalize the URL path (remove query parameters)
    const urlPath = req.url.split('?')[0];
    
    // Default to index.html if root is requested
    let filePath = urlPath === '/' 
      ? path.join(BUILD_PATH, 'index.html')
      : path.join(BUILD_PATH, urlPath);

    try {
      // Check if file exists
      await fs.access(filePath);

      // Read the file
      const content = await fs.readFile(filePath);
      
      // Determine content type
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.webp': 'image/webp',
        '.ico': 'image/x-icon'
      };

      const contentType = contentTypes[ext] || 'application/octet-stream';
      
      res.writeHead(200, { 
        "Content-Type": contentType,
        "Cache-Control": "no-cache" // Optional: adjust caching as needed
      });
      res.end(content);

    } catch (error) {
      // If file not found, serve index.html for client-side routing
      if (error.code === 'ENOENT') {
        try {
          const indexContent = await fs.readFile(path.join(BUILD_PATH, 'index.html'));
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(indexContent);
        } catch {
          res.writeHead(404);
          res.end('Not Found');
        }
      } else {
        console.error(error);
        res.writeHead(500);
        res.end('Server Error');
      }
    }
  });
};

export const start = (notes, port) => {
  const address = `http://localhost:${port}`;
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Listening on ${address}`);
  });
  open(address);
};