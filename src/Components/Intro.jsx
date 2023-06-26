import React from 'react'

function Intro(props) {
    return (
        <div className = 'wrapper'>
            <h1 className = "title">Quizzical</h1>
            <span> A quizz web app</span>
            <button className='start--btn' onClick={props.handleStartClick}> Start Quiz</button>
        </div>
    )
}


export default Intro