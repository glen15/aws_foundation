const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 메모 데이터를 저장할 배열
let notes = [];

// 메모 추가 요청 처리
app.post('/notes', (req, res) => {
    const userMessage = req.body.content;
    if (!userMessage) {
        return res.status(400).json({ error: '내용을 입력해주세요' });
    }

    // 새 메모 객체 생성
    const newNote = {
        id: notes.length + 1, // 간단한 ID 생성 방식
        user_note: userMessage
    };

    // 메모 배열에 메모 추가
    notes.push(newNote);
    res.json({ message: '메모가 저장되었습니다', note: newNote });
});

// 전체 메모 불러오기
app.get('/notes', (req, res) => {
    res.json(notes);
});

// 특정 메모 삭제
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.send(`Note with id ${id} deleted`);
});

// 전체 메모 삭제
app.delete('/notes', (req, res) => {
    notes = []; // 메모 배열 초기화
    res.send('All notes deleted');
});

const port = 80;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
