import React, { useEffect, useState } from 'react'

function Quiz(props) {

const [questions, setQuestions] = useState([]);

  function fetchData() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        const parsedQuestions = data.results.map((result) => ({
          question: result.question,
          answers: [...result.incorrect_answers, result.correct_answer],
          clicked: false
        }));
        console.log(data)
        setQuestions(parsedQuestions);
      })
      .catch((error) => {
        console.error(error);
      });
  }

    const myComponent = () => {
        useEffect(() => {
            fetchData();
        }, []);

    }

    // fix this later
    // const shuffleArray = (arr) => {
    //     const shuffledArray = [...arr];
    //     for (let i = shuffledArray.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffleArray[i]];
    //     }
    //     return shuffledArray;
    // }

    myComponent();

    return (
        <div>
          {questions.map((question, index) => (
            <div key={index} className="question">
              <h2>{question.question}</h2>
              {question.answers.map((answer, answerIndex) => (
                <button key={answerIndex} className="answer">
                  {answer}
                </button>
              ))}
              
            </div>
          ))}
        <button className = 'checkAnswer--btn'>Check Answer</button>
        </div>
      );
}

export default Quiz