import React, { useEffect, useState } from 'react';

function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  function fetchData() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const parsedQuestions = data.results.map((result) => {
          const answers = [...result.incorrect_answers, result.correct_answer];
          const shuffledAnswers = shuffleArray(answers);
          const correctAnswerIndex = shuffledAnswers.findIndex((answer) => answer === result.correct_answer);
          return {
            question: result.question,
            answers: shuffledAnswers.map((answer, index) => ({
              text: answer,
              clicked: false,
            })),
            correctAnswerIndex: correctAnswerIndex,
          };
        });
        setQuestions(parsedQuestions);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const shuffleArray = (arr) => {
    const shuffledArray = [...arr];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const btnClicked = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.map(
      (answer, index) => ({
        ...answer,
        clicked: index === answerIndex,
      })
    );
    setQuestions(updatedQuestions);
  };

  const checkAnswer = () => {
    setAnswersChecked(true);
    if (questions.every((question) => question.answers.some((answer) => answer.clicked))) {
      setQuizEnded(true);
    }
  };

  const playAgain = () => {
    setAnswersChecked(false);
    setQuizEnded(false);
    fetchData();
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question">
          <h2>{question.question}</h2>
          {question.answers.map((answer, answerIndex) => (
            <button
              onClick={() => btnClicked(questionIndex, answerIndex)}
              key={answerIndex}
              className={`answer ${answer.clicked ? 'clicked' : ''} ${answersChecked && answerIndex === question.correctAnswerIndex ? 'correct' : ''} ${answersChecked && answer.clicked && answerIndex !== question.correctAnswerIndex ? 'incorrect' : ''}`}
            >
              {answer.text}
            </button>
          ))}
        </div>
      ))}
      {quizEnded ? (
        <div>
          <p>Score: {questions.filter((question) => question.answers[question.correctAnswerIndex].clicked).length}/{questions.length}</p>
          <button onClick={playAgain} className="playAgain--btn">
            Play Again
          </button>
        </div>
      ) : (
        <button onClick={checkAnswer} className="checkAnswer--btn">
          Check Answer
        </button>
      )}
    </div>
  );
}

export default Quiz;
