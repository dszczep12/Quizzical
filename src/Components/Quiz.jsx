import React, { useEffect, useState } from 'react';

function Quiz(props) {
  const [questions, setQuestions] = useState([]);

  function fetchData() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const parsedQuestions = data.results.map((result) => ({
          question: result.question,
          answers: result.incorrect_answers.map((answer) => ({
            text: answer,
            clicked: false,
          })),
          correctAnswer: {
            text: result.correct_answer,
            clicked: false,
          },
        }));
        console.log(data);
        setQuestions(parsedQuestions);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const btnClicked = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].clicked = true;
    setQuestions(updatedQuestions);
    console.log(questions);
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
              className={`answer ${answer.clicked ? 'clicked' : ''}`}
            >
              {answer.text}
            </button>
          ))}
        </div>
      ))}
      <button className="checkAnswer--btn">Check Answer</button>
    </div>
  );
}

export default Quiz;
