const http = require("http");

// 환경 변수에서 username과 port 설정
const username = "User";
const port = 80;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`${username}의 서버 ${port} 포트에서 실행중 !!`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행중입니다.`);
});
