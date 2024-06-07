import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Todo from './todo/Todo';
import Note from './note/Note';
import NoteAdd from './note/NoteAdd';
import NoteUpdate from './note/NoteUpdate';
import Expense from './expense/Expense';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Todo' element={<Todo />} />
          <Route path='/Note' element={<Note />} />
          <Route path='/Note/Add' element={<NoteAdd />} />
          <Route path='/Note/:id' element={<NoteUpdate />} />
          <Route path='/Expense' element={<Expense />} />
        </Routes>
      </BrowserRouter>
      <div className="fixed-bottom bg-dark text-light">Deep Govindvira © 2024</div>
    </div>
  );
}

export default App;
