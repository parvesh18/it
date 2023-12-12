const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "./public/index.html";

  if (req.url === "/") {
    filePath = "./public/index.html";
  } else if (req.url === "/about") {
    filePath = "./public/about.html";
  } else if (req.url === "/contact") {
    filePath = "./public/contact.html";
  } else {
    filePath = "./public/error.html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
