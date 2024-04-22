import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [text, setText] = useState("");
  const [editingText, setEditingText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const addTo = () => {
    if (text.trim() !== "") {
      setTodos([...todos, { text, editing: false }]);
      setText("");
    }
  };

  const editTo = (index) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], editing: true };
    setEditingText(newTodos[index].text);
    setTodos(newTodos);
  };

  const saveEdit = (index) => {
    if (editingText.trim() !== "") {
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], text: editingText, editing: false };
      setTodos(newTodos);
      setEditingText("");
    }
  };

  const deleteTo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="add_tasks_section">
      <h2>To Do List</h2>
      <input type="text" id="enter-text" onChange={handleTextChange} value={text} />
      <button className="add" onClick={addTo}>Add</button>
      <ul className="tasks_section">
        {todos.map((todo, index) => (
          <li key={index} className="task">
            {todo.editing ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button className="save" onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button className="edit" onClick={() => editTo(index)}>Edit</button>
              </>
            )}
            {!todo.editing && <button className="delete" onClick={() => deleteTo(index)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
