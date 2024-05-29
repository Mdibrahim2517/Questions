
import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [quizQuestions, setQues] = useState([]);
  useEffect(() => {
    fetch("https://e991b25a-2713-4b08-b14c-71dea90be423.mock.pstmn.io")
      .then((response) => response.json())
      .then((json) => setQues(json));
  }, []);
  const [currentQuestion, setQuestions] = useState(0);
  const [timer, setTimer] = useState(20);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const handleAnswer = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setQuestions((prevQuations) => prevQuations + 1);
      setTimer(10);
    }
    else {
      setShowScore(true);
    }
  }
  const handRestartQuiz = () => {
    setQuestions(0);
    setScore(0);
    setShowScore(false);
    setTimer(20);
  }
  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 10000);
    }
    else {
      clearInterval(interval);
      setShowScore(true);
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);

  console.log('quizQuestions', quizQuestions);
  return (
    <>
      <div className="quiz-app">
        {showScore ? (<div className="score-section">
          <h2 style={{ display: "none" }}>Your Score:{score}/{quizQuestions.length}</h2>
          <button onClick={handRestartQuiz} style={{ color: "white", background: "rgb(1,182,184)", borderRadius: "10px", textAlign: "center" }}> See Career Guidance 🔄</button>
        </div>) : (<div className="question-section">
          <h2>Guidance {currentQuestion + 1}</h2>
          <p>{quizQuestions[currentQuestion]?.question}</p>
          <ul className="options">
            {quizQuestions[currentQuestion]?.options?.map((option, index) => (<li key={index}
              onClick={() => handleAnswer(option.text)}><button>{option?.text}</button></li>))}
          </ul>
          <div className="timer">Time Left :<span>{timer}s</span></div>
        </div>)}
      </div>
    </>
  );
}

export default App;
