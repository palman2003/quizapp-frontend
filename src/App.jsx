import {Quiz} from './Quiz'
import './App.css'
import "./index.scss"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './components/user';
import QuizDoneMessage from './components/message';
function App() {
 
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/user" element={<User />} />
        <Route path="/quiz-done" element={<QuizDoneMessage />} />
      </Routes>
    </Router>
   
  )
}

export default App
