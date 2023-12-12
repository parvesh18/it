const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    // Display the form
    const formPage = path.join(__dirname, 'public', 'form.html');
    fs.readFile(formPage, (err, content) => {

      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }

    });
  } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
    let body = '';

    console.log(body)
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    console.log(body)

    req.on('end', () => {
      const parsedData = new URLSearchParams(body);
      const username = parsedData.get('username');
      const password = parsedData.get('password');
      const dataToSave = `Username: ${username}\nPassword: ${password}\n`;

      const filePath = path.join(__dirname, 'data.txt');
      fs.appendFile(filePath, dataToSave, err => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error saving data');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Data saved successfully');
        }
      });
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
