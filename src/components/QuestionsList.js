import React, { useState, useEffect } from 'react'
import quizService from "../quizService";
import OptionsBox from './OptionsBox'
import '../style.css';


export default function QuestionsList() {
    const [allQuestions, setAllQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [noOfAnsweredQuestions, setNoOfAnsweredQuestions] = useState(0);
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        getQuestions();
    }, []);
    let getQuestions = () => {
        quizService().then(questions => { setAllQuestions(questions) }
        )
    }
    let chosenAnswerHandeler = (chosen, correct) => {

        if (!answers.includes(chosen)) {
            if (chosen === correct) {
                setScore(score + 1);
            }
            answers.push(chosen);
            setNoOfAnsweredQuestions(noOfAnsweredQuestions + 1);
        }
    }
    let replay = () => {
        setNoOfAnsweredQuestions(0);
        setScore(0);
        getQuestions();
        setAnswers([]);
    }
    return (
        <div className="container">
            <div className="title"> Quiz App </div>

            {noOfAnsweredQuestions < 5 ?

                allQuestions.map(question => <div key={question.questionId}>
                    <OptionsBox chosen={chosenAnswerHandeler} question={question.question} option={question.answers} correct={question.correct} />
                </div>) : <div>
                    <div className="score-board">
                        <div className="score">
                            You scored {score} / 5
                        </div>
                        <button className="playBtn" onClick={() => replay()}>PlayAgain </button>
                    </div>
                </div>

            }


        </div>

    )
}
