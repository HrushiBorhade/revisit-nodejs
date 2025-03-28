import { useState, useEffect } from 'react';
function App() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        fetch('/api/notes')
            .then(response => response.json())
            .then(data => setNotes(data));
    }, []);
    return (<div>
      <h1>My Notes</h1>
      {notes === null || notes === void 0 ? void 0 : notes.map(note => {
            var _a;
            return (<div key={note === null || note === void 0 ? void 0 : note.id}>
          <p>{note === null || note === void 0 ? void 0 : note.content}</p>
          <div>
            {(_a = note === null || note === void 0 ? void 0 : note.tags) === null || _a === void 0 ? void 0 : _a.map(tag => (<span key={tag}>{tag}</span>))}
          </div>
        </div>);
        })}
    </div>);
}
export default App;
