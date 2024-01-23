const express = require("express");
const mysql = require("mysql");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// OpenAI 설정
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

// 메모 추가 및 ChatGPT 분석
app.post("/notes", async (req, res) => {
  const userMessage = req.body.content;
  console.log(`입력받은 내용 : ${userMessage}`);
  if (!userMessage) {
    return res.status(400).json({ error: "내용을 입력해주세요" });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Your are expert in AWS, Tell me one AWS service names that I can learn additionally based on the data sent by the user.  in Korean",
        },
        // { role: "system", content: "Your are expert in AWS, Tell me one AWS service names that I can learn additionally based on the data sent by the user. as one sentence in Korean" },
        { role: "user", content: userMessage },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
    });

    const aiNote = completion.choices[0].message.content;
    const note = { user_note: userMessage, ai_note: aiNote };
    const sql = "INSERT INTO notes SET ?";
    db.query(sql, note, (err, result) => {
      if (err) throw err;
      console.log("데이터베이스에 기록 완료");
      res.send("데이터베이스에 기록 완료");
    });
  } catch (error) {
    console.error("Error during OpenAI API call:", error);
    res
      .status(500)
      .json({ error: "ChatGPT API에서 응답을 가져오지 못했습니다" });
  }
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
