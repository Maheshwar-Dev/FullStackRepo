import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  return (
    <>
      <h1>To-Do App</h1>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Enter task" 
      />
      <button 
        onClick={() => {
          if (!text.trim()) return;
          setTasks([...tasks, text]);
          setText("");
        }}
      >
        Add
      </button>

      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task} 
            <button onClick={() => setTasks(tasks.filter((_, idx) => idx !== i))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
