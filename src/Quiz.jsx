/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { resultInitialState } from "./constants";
import AnswerTimer from "./components/answerTimer";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Quiz = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(resultInitialState);
  const [questions, setQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer,setshowAnswerTimer]=useState(true);

  useEffect(() => {
    // Fetch questions from your API when the component mounts
    axios.get("https://fodse-backend.onrender.com/api/questions")
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
      });
  }, []); 

  const navtoUser = () =>{
    navigate('/user',{ state: { fscore: result.correctAnswers } });
  }
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === questions[current].correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setshowAnswerTimer(false);
    setAnswerIdx(null);
    setResult(prev => finalAnswer ? {
      ...prev,
      score: prev.score + 1,
      correctAnswers: prev.correctAnswers + 1
    } : {
      ...prev,
      wrongAnswers: prev.wrongAnswers + 1
    });

    if (current !== questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
      setShowResult(true);
    }
    setTimeout(()=>
    {setshowAnswerTimer(true)
    });
  };

  if (questions.length === 0) {
    return <div>
      <br/><br/><br/><br/><br/>Loading questions...</div>;
  }

const handleTimeUp=()=>{
  setAnswer(false);
  onClickNext(false);
}

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
        {showAnswerTimer && (<AnswerTimer duration={10} onTimeUp={handleTimeUp}/>)}

          <span className="active-question-no">
            {current + 1}
          </span>
          <span className="total-question-no">
            /{questions.length}
          </span>
          <h2>{questions[current].question}</h2>
          <ul>
            {questions[current].choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? 'selected-answer' : null}>
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={()=>onClickNext(answer)} disabled={answerIdx === null} >
              {current === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <>
        <div className="result">
          <h3>Result</h3>
          <h3>Total Questions: {questions.length}</h3>
          <h3>Correct Answers: {result.correctAnswers}</h3>
          <button onClick={navtoUser}>Complete</button>
         
        </div>
        
        </>
      )}
      
    </div>
  );
};
