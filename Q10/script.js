const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello world, This is my Node.js server");
});

const PORT = 10000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

