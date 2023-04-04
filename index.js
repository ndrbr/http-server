import * as http from "http";

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: "Sir Isaac Newton",
  },
  {
    id: 1,
    name: "Albert Einstein",
  },
];

const server = http.createServer((req, res) => {
  const parts = req.url.split("/");
  if (parts.length > 0 && parts[1] === "friends") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    if (req.method === "GET") {
      if (parts.length === 2) res.end(JSON.stringify(friends));
      else {
        const friendIndex = parts[2];
        res.end(JSON.stringify(friends[friendIndex]));
      }
    } else if (req.method === "POST") {
      req.on("data", (data) => {
        const str = data.toString();
        friends.push(JSON.parse(str));
      });
      req.pipe(res);
    }
  } else if (req.url === "/message") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<p>Hello page</p>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
