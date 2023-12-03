import { useState } from "react";
import { fetchQuiz } from "../helpers/dataHelper";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { DefaultKanaOptions } from "../enums/kanaOptions";
import QuizView from "../components/quiz/QuizView";


export default function Quiz() {
    const items = useLoaderData()
    const revalidator = useRevalidator();
    const [kanaOptions, setKanaOptions] = useState(DefaultKanaOptions)

    return (
        <div className='quiz-page'>
            <QuizView items={items} kanaOptions={kanaOptions} onRestart={() => revalidator.revalidate()} />
        </div >
    )
}


export const quizLoader = async () => {
    const res = fetchQuiz(5);
    return res
}
