const express = require("express");
const mysql = require("mysql");
const axios = require("axios"); // axios를 사용하여 HTTP 요청을 보냅니다.
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("데이터베이스 연결 완료");
  const createTableQuery = `CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_note TEXT,
        ai_note TEXT
    )`;
  db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Notes 데이터베이스에 Notes 테이블 생성");
  });
});

app.get("/", (req, res) => {
  res.json({ message: "서버 연결 완료" });
});

// AI 조언 추가 버튼 작동
app.post("/ainotes", (req, res) => {
  const userMessage = req.body.content;
  console.log(`입력받은 내용 : ${userMessage}`);
  if (!userMessage) {
    return res.status(400).json({ error: "내용을 입력해주세요" });
  }

  // Lambda 함수 호출 (비동기 처리)
  axios
    .post(process.env.LAMBDA_URL, { content: userMessage })
    .then((response) => {
      console.log("Lambda 응답:", response.data);
    })
    .catch((error) => {});
});

// 메모 추가 요청 처리
app.post("/notes", (req, res) => {
  const userMessage = req.body.content;
  console.log(`입력받은 내용 : ${userMessage}`);
  if (!userMessage) {
    return res.status(400).json({ error: "내용을 입력해주세요" });
  }

  // 데이터베이스에 사용자 메모 저장
  const sql = "INSERT INTO notes (user_note) VALUES (?)";
  const values = [userMessage];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("데이터베이스 저장 오류:", err);
      return res.status(500).json({ error: "데이터베이스 오류" });
    }
    console.log("사용자 메모 데이터베이스에 저장 완료");
    res.json({ message: "메모가 저장되었습니다" });
  });
});

// 전체 메모 불러오기
app.get("/notes", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// 특정 메모 삭제
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM notes WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(`Note with id ${id} deleted`);
  });
});

// 전체 메모 삭제
app.delete("/notes", (req, res) => {
  const sql = "DELETE FROM notes";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("All notes deleted");
  });
});

const port = 80;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
