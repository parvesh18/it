const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET') {
    if (parsedUrl.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Hello, this is a GET request!</h1>');
    } else if (parsedUrl.pathname === '/about') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>About Page</h1>');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const postData = querystring.parse(body);
      const username = postData['username'];
      const password = postData['password'];

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Received POST request</h1><p>Username: ${username}</p><p>Password: ${password}</p>`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
