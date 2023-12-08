import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch(`${process.env.REACT_APP_API_URL}/notes`)
      .then(response => response.json())
      .then(data => setNotes(data));
  };

  const addNote = () => {
    fetch(`${process.env.REACT_APP_API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNote }),
    }).then(() => {
      fetchNotes();
      setNewNote('');
    });
  };

  const deleteNote = id => {
    fetch(`${process.env.REACT_APP_API_URL}/notes/${id}`, { method: 'DELETE' })
      .then(() => fetchNotes());
  };

  const deleteNotes = () => {
    fetch(`${process.env.REACT_APP_API_URL}/notes`, { method: 'DELETE' })
      .then(() => fetchNotes());
  };

  return (
    <div className="App">
      <h1>학습 기록 애플리케이션</h1>
      <h3>오늘 학습한 내용을 기록해보세요.</h3>
      <textarea 
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="무엇을 공부하셨나요?"
      />
      <br />
      <button onClick={addNote}>학습 기록 추가</button>
      <button onClick={deleteNotes}>전체 기록 삭제</button>

      <h2>내 학습 기록</h2>
      <div>
        {notes.map(note => (
          <div key={note.id} className="note">
            <button onClick={() => deleteNote(note.id)}>삭제</button>
            <div><strong>사용자 메모:</strong> {note.user_note}</div>
            <div><strong>AI 추천 학습 내용:</strong> {note.ai_note || 'AI 응답 대기중'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
