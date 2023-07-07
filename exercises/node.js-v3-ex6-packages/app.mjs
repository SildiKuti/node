import { createServer } from "node:http";

const server = createServer((req, res) => {
  console.log("request received");

  res.statusCode = 200;

  res.setHeader("Content-Type", "application/json");

  const jsonResponse = JSON.stringify({ location: "Mars" });

  res.end(jsonResponse);
});

server.listen(3000, () => {
  console.log("Server running on Port 3000.");
});
