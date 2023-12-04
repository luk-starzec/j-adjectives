import { useState } from "react";
import { fetchQuiz } from "../helpers/dataHelper";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { DefaultKanaOptions } from "../enums/kanaOptions";
import QuizView from "../components/quiz/QuizView";
import QuizMenu from "../components/quiz/QuizMenu";


export default function Quiz() {
    const items = useLoaderData()
    const revalidator = useRevalidator();
    const [questionTime, setQuestionTime] = useState(5);
    const [answerTime, setAnswerTime] = useState(3);
    const [kanaOptions, setKanaOptions] = useState(DefaultKanaOptions)

    const handleQuestionTimeChanged = (newTime) => {
        setQuestionTime(newTime);
    }
    const handleAnswerTimeChanged = (newTime) => {
        setAnswerTime(newTime);
    }
    const handleKanaChanged = (option) => {
        const newOptions = kanaOptions.includes(option) ? kanaOptions.filter(o => o !== option) : [...kanaOptions, option];
        setKanaOptions(newOptions);
    }

    return (
        <div className='quiz-page'>
            <QuizMenu 
                questionTime={questionTime}
                questionTimeChanged={handleQuestionTimeChanged}
                answerTime={answerTime}
                answerTimeChanged={handleAnswerTimeChanged}
                kanaOptions={kanaOptions} 
                kanaOptionsChanged={handleKanaChanged} />
            <QuizView items={items}
                questionTime={questionTime}
                answerTime={answerTime}
                kanaOptions={kanaOptions}
                onRestart={() => revalidator.revalidate()} />
        </div >
    )
}


export const quizLoader = async () => {
    const res = fetchQuiz(5);
    return res
}
