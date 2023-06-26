import React, { useState} from "react"
import Intro from './Components/Intro'
import Quiz from './Components/Quiz'


function App(props) {
  const [currentPage, setCurrentPage] = useState('intro');

  const handleStartClick = () => {
    setCurrentPage('quiz')
  }

  let currentComponent;

  if (currentPage === 'intro') {
    currentComponent = <Intro handleStartClick={handleStartClick} />;
  } else if (currentPage === 'quiz') {
    currentComponent = <Quiz />;
  } else if (currentPage === 'result') {
    currentComponent = <Result />;
  }

  return (
    <div>{currentComponent}</div>
  )
}

export default App
