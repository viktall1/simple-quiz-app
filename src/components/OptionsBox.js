import React, { useState } from 'react'

export default function OptionsBox({ question, chosen, option, correct}) {
    const [answers, setAnswers] = useState(option);
    return (
        <div className="questionBox">
            <div className="question">
                {question}
            </div>
            {answers.map((answer, index) => {
                return (<button onClick={() => { setAnswers([answer]); chosen(answer, correct  )} } key={index} className="answerBtn">
                    {answer}
                </button>)}
            ) }
        </div>
    )
}
