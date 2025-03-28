import { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div className='w-full h-[100vh] bg-neutral-800 p-5 flex flex-col gap-3'>
      <h1 className='text-amber-400 font-bold text-3xl'>My Notes</h1>
      <div className='flex flex-col gap-2'>
      {notes?.map(note => (
        <div key={note?.id} className='flex gap-1 text-amber-200 flex-col border-b border-amber-100'>
          <p>content:{note?.content}</p>
          <div className='flex gap-0.5'>
          <span>
            tags:
            </span>
          <div>
            {note?.tags?.map(tag => (
              <span key={tag}>{tag},</span>
            ))}
          </div>
            </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;