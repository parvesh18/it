const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// ------------------------------

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "parvesh",
});

// --------------------------------------------------

async function checkCredentials(username, password, res) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    const formPage = path.join(__dirname, "public", "welcome.html");

    if (rows.length > 0) {
      fs.readFile(formPage, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Internal Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        }
      });
    } else {
      console.log("Invalid credentials.");
    }

    connection.release();
  } catch (err) {
    console.error("Error checking credentials:", err);
  }
}

function createAccount(email, username, password, res) {
  pool
    .query("INSERT INTO users (email,username, password) VALUES (?, ?,?)", [
      email,
      username,
      password,
    ])
    .then((result) => {
      const formPage = path.join(__dirname, "public", "welcome.html");

      fs.readFile(formPage, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Internal Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        }
      });
    })
    .catch((err) => {
      console.error("Error inserting user:", err);
    })
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/") {
    // Display the form
    const formPage = path.join(__dirname, "public", "index.html");
    fs.readFile(formPage, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content, "utf-8");
      }
    });
  } else if (req.method === "POST" && parsedUrl.pathname === "/welcome") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedData = new URLSearchParams(body);
      const email = parsedData.get("email");
      const username = parsedData.get("username");
      const password = parsedData.get("password");

      if (email !== null) {
        createAccount(email, username, password, res);
      } else {
        checkCredentials(username, password, res);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
