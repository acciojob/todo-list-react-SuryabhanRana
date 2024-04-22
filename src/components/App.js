
import React, { useState } from "react";
import './../styles/App.css';


const App = () => {

  const[text,setText] = useState("");
  const[todos,setTodo] = useState([]);

  const handletextchange = (event) => {
    setText(event.target.value);
  };

  const addTo = () =>{
    if(text.trim() !== ""){
      setTodo([...todos,{text ,editing:false}]);
      setText("");
    }
  };

  const editTo = (index) =>{
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], editing: true };
    setText(newTodos[index].text);
    setTodo(newTodos);
  };

  const saveEdit = (index) =>{
    if(text.trim() !== ""){
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], text: text, editing: false };
      setTodo(newTodos);
      setText("");
    }
  }

  const deleteTo = (index) =>{
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  }

  return (
    <div>
        {/* Do not remove the main div */}
        <input type="text" id="enter-text" onChange={handletextchange} value={text}/>
        <button id="Add-btn" onClick={addTo}>Add</button>
        <ul>
          {todos.map((todo, index)=>(
            <li key={index}>
              {todo.editing ? (
                <>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    />
                  <button id="Save-btn" onClick={() => saveEdit(index)}>Save</button>
                </>
              ) : (
                <>
                {todo.text}
                <button id="Edit-btn" onClick={() => editTo(index)}>Edit</button>
                </>
              )}
              {!todo.editing && <button id="Delete-btn" onClick={() => deleteTo(index)}>Delete</button>}
              </li>
              ))}
        </ul>
    </div>
  )
}

export default App
