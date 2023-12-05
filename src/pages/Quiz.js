import { useContext, useEffect, useState } from "react";
import { fetchQuiz } from "../helpers/dataHelper";
import { loadKanaOptions, saveKanaOptions } from "../helpers/contextHelper";
import { AppContext } from "../AppContext";
import QuizView from "../components/quiz/QuizView";
import QuizMenu from "../components/quiz/QuizMenu";

export default function Quiz() {
    const context = useContext(AppContext);
    const [items, setItems] = useState([])
    const [itemsCount, setitemsCount] = useState(5);
    const [questionTime, setQuestionTime] = useState(5);
    const [answerTime, setAnswerTime] = useState(3);
    const [kanaOptions, setKanaOptions] = useState(loadKanaOptions(context))

    useEffect(() => {
        loadQuizItems(itemsCount);
    }, [])

    const loadQuizItems = (count) => {
        const data = fetchQuiz(count);
        setItems(data);
    }
    const handleItemsCountChanged = (newCount) => {
        setitemsCount(newCount);
        loadQuizItems(newCount);
    }
    const handleQuestionTimeChanged = (newTime) => {
        setQuestionTime(newTime);
    }
    const handleAnswerTimeChanged = (newTime) => {
        setAnswerTime(newTime);
    }
    const handleKanaChanged = (option) => {
        const newOptions = kanaOptions.includes(option) ? kanaOptions.filter(o => o !== option) : [...kanaOptions, option];
        setKanaOptions(newOptions);
        saveKanaOptions(context, newOptions)
    }

    return (
        <div className='quiz-page'>
            <QuizMenu
                itemsCount={itemsCount}
                itemsCountChanged={handleItemsCountChanged}
                questionTime={questionTime}
                questionTimeChanged={handleQuestionTimeChanged}
                answerTime={answerTime}
                answerTimeChanged={handleAnswerTimeChanged}
                kanaOptions={kanaOptions}
                kanaOptionsChanged={handleKanaChanged} />
            <QuizView
                items={items}
                questionTime={questionTime}
                answerTime={answerTime}
                kanaOptions={kanaOptions}
                onRestart={() => loadQuizItems()} />
        </div >
    )
}
