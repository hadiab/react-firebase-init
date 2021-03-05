import { useEffect, useState } from 'react';
import './App.css';
import { firebaseDB, timestamp, firebaseStorage } from "./firebase"

function App() {

  const [text, setText] = useState("")
  const [file, setFile] = useState()
  const [todos, setTodos] = useState([])

  useEffect(() => {

    const unsub = firebaseDB.collection("todos").onSnapshot((snap) => {
      const data = snap.docs.map(item => ({ id: item.id, ...item.data() }))
      setTodos(data)
    }, 
      (error) => console.log(error),
      () => console.log("complete")
    )

    return () => unsub()
  }, [])

  const addTodo = () => {
    if(!text) {
      return
    }

    let url = ""

    if(file) {
      const uploadTask = firebaseStorage.child(file.name).put(file)
      uploadTask.on("state_changed", (snap) => {
        console.log(snap)
      }, (error) => console.log(error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);

            firebaseDB.collection("todos").add({
              text,
              createdAt: timestamp(),
              completed: false,
              url: downloadURL
            })
          })
        }
      )
    }
  }

  const onToggle = (todo) => {
    firebaseDB.collection("todos").doc(todo.id).update({
      completed: !todo.completed
    })
  }

  const onFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  return (
    <div className="App">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="file" onChange={onFileChange} />
      <button onClick={addTodo}>Add</button>

      <div>
        {todos.map(todo =>
          <div key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} />
            <div>{todo.text}</div>
            {todo.url && <img src={todo.url} />}
          </div>
        )}  
      </div> 
    </div>
  );
}

export default App;
