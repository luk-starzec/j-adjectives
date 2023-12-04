import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { AllKanaOptions } from "../../enums/kanaOptions";
import useKeyPress from "../../helpers/useKeyPress";
import Card from "../Card";

const Statuses = {
    INIT: 'init',
    QUESTION: 'question',
    ANSWER: 'answer',
    PAUSED: 'paused',
    ENDED: 'ended'
}

const Actions = {
    QUIZ_INIT: 'quiz_init',
    QUIZ_START: 'quiz_start',
    QUIZ_PAUSE: 'quiz_pause',
    QUIZ_RESTART: 'quiz_restart',

    TIMER_START: 'timer_start',
    TIMER_TICK: 'timer_tick',
    TIMER_STOP: 'timer_stop',

    CARD_SHOW_ANSWER: 'card_show_answer',
    CARD_NEXT: 'card_next',
    CARD_PREV: 'card_prev',

    SETTINGS_CHANGED: 'settings_chnged'
}

const ControlActions = {
    PAUSE: 'pause',
    PLAY: 'play',
    START: 'start',
    RESTART: 'restart'
}

function reducer(state, action) {
    switch (action.type) {

        case Actions.QUIZ_INIT:
            return {
                ...state,
                status: Statuses.INIT,
                index: 0,
                isQuestion: true,
                time: state.questionTime,
                controlAction: ControlActions.START
            }
        case Actions.QUIZ_START:
            return {
                ...state,
                nextAction: Actions.TIMER_START,
                controlAction: ControlActions.PAUSE
            }
        case Actions.QUIZ_PAUSE:
            return {
                ...state,
                status: Statuses.PAUSED,
                nextAction: Actions.TIMER_STOP,
                controlAction: ControlActions.PLAY
            }
        case Actions.QUIZ_RESTART:
            return {
                ...state,
                nextAction: Actions.QUIZ_RESTART
            }
        case Actions.CARD_SHOW_ANSWER: {
            const isEnd = state.index > state.itemsCount - 2
            return {
                ...state,
                status: isEnd ? Statuses.ENDED : Statuses.ANSWER,
                isQuestion: false,
                time: state.answerTime,
                nextAction: isEnd ? Actions.TIMER_STOP : null,
                controlAction: isEnd ? ControlActions.RESTART : state.controlAction
            }
        }
        case Actions.CARD_NEXT: {
            const isRunning = state.intervalId
            return {
                ...state,
                index: state.index < state.itemsCount - 1 ? state.index + 1 : state.index,
                isQuestion: true,
                time: state.questionTime,
                status: isRunning ? Statuses.QUESTION : Statuses.PAUSED,
                controlAction: isRunning ? ControlActions.PAUSE : ControlActions.PLAY
            }
        }
        case Actions.CARD_PREV: {
            const isRunning = state.intervalId
            return {
                ...state,
                index: state.index > 0 ? state.index - 1 : state.index,
                isQuestion: false,
                time: state.answerTime,
                status: isRunning ? Statuses.ANSWER : Statuses.PAUSED,
                controlAction: isRunning ? ControlActions.PAUSE : ControlActions.PLAY
            }
        }
        case Actions.TIMER_START:
            return {
                ...state,
                intervalId: action.intervalId,
                status: state.isQuestion ? Statuses.QUESTION : Statuses.ANSWER
            }
        case Actions.TIMER_STOP:
            clearInterval(state.intervalId)
            return {
                ...state,
                intervalId: 0
            }
        case Actions.TIMER_TICK:
            {
                let nextAction
                if (state.time < 1) {
                    if (state.status === Statuses.QUESTION)
                        nextAction = Actions.CARD_SHOW_ANSWER
                    else if (state.status === Statuses.ANSWER)
                        nextAction = Actions.CARD_NEXT
                }
                return {
                    ...state,
                    time: state.time > 1 ? state.time - 1 : 0,
                    nextAction: nextAction
                }
            }
        case Actions.SETTINGS_CHANGED:
            return {
                ...state,
                ...action.payload,
                time: state.status === Statuses.INIT ? action.payload.questionTime : state.time
            }
        default:
            break;
    }
}

function controlActionToReducerAction(controlAction) {
    switch (controlAction) {
        case ControlActions.START:
        case ControlActions.PLAY:
            return Actions.QUIZ_START
        case ControlActions.PAUSE:
            return Actions.QUIZ_PAUSE
        case ControlActions.RESTART:
            return Actions.QUIZ_RESTART
        default:
            break;
    }
}

function controlActionToIcon(controlAction) {
    switch (controlAction) {
        case ControlActions.START:
        case ControlActions.PLAY:
            return <img src="../assets/play_icon.svg" alt="►" />
        case ControlActions.PAUSE:
            return <img src="../assets/pause_icon.svg" alt="⏸︎" />
        case ControlActions.RESTART:
            return <img src="../assets/replay_icon.svg" alt="⟳" />
        default:
            break;
    }
}

function controlActionToLabel(controlAction) {
    switch (controlAction) {
        case ControlActions.START:
            return "start quiz"
        case ControlActions.PLAY:
            return "continue quiz"
        case ControlActions.PAUSE:
            return "pause quiz"
        case ControlActions.RESTART:
            return "restart quiz"
        default:
            return ""
    }
}

export default function QuizView({ items, questionTime, answerTime, kanaOptions, onRestart }) {
    const [state, dispatch] = useReducer(reducer, { index: 0, itemsCount: items.length })
    const { index, time, status, isQuestion, itemsCount, nextAction, controlAction } = state
    const leftArrowPressed = useKeyPress('ArrowLeft');
    const rightArrowPressed = useKeyPress('ArrowRight');
    const downArrowPressed = useKeyPress('ArrowDown');

    useEffect(() => {
        dispatch({ type: Actions.QUIZ_INIT })
        return () => clearInterval(state.intervalId);
    }, []);

    useEffect(() => {
        if (index > 0 && leftArrowPressed)
            dispatch({ type: Actions.CARD_PREV })
    }, [leftArrowPressed])

    useEffect(() => {
        if (index < itemsCount - 1 && rightArrowPressed)
            dispatch({ type: Actions.CARD_NEXT })
    }, [rightArrowPressed])

    useEffect(() => {
        if (isQuestion && downArrowPressed)
            dispatch({ type: Actions.CARD_SHOW_ANSWER })
    }, [downArrowPressed])

    useEffect(() => {
        dispatch({ type: Actions.SETTINGS_CHANGED, payload: { questionTime: questionTime, answerTime: answerTime } })
    }, [questionTime, answerTime])

    useEffect(() => {
        switch (nextAction) {
            case Actions.TIMER_START:
                const newIntervalId = setInterval(() => {
                    dispatch({ type: Actions.TIMER_TICK })
                }, 1000);
                dispatch({ type: Actions.TIMER_START, intervalId: newIntervalId })
                break;
            case Actions.QUIZ_RESTART:
                dispatch({ type: Actions.TIMER_STOP })
                onRestart()
                dispatch({ type: Actions.QUIZ_INIT })
                dispatch({ type: Actions.QUIZ_START })
                break;
            default:
                if (nextAction)
                    dispatch({ type: nextAction })
                break;
        }
    }, [nextAction])

    return (
        <div className='quiz-view'>

            <div className="time-nav">
                {status !== Statuses.ENDED &&
                    <span> {time} s</span>
                }

                <button onClick={() => dispatch({ type: controlActionToReducerAction(controlAction) })} title={controlActionToLabel(controlAction)}>
                    {controlActionToIcon(controlAction)}
                </button>
            </div>

            <div className="visibility-nav">
                {isQuestion &&

                    <button onClick={() => dispatch({ type: Actions.CARD_SHOW_ANSWER })} title="show answer [↓]">
                        <img src="../assets/eye_icon.svg" alt="👁" />
                    </button>
                }
            </div>

            <Card item={items[index]} options={kanaOptions} isQuizMode={isQuestion} />

            <div className="item-nav">

                {index > 0 &&
                    <button onClick={() => dispatch({ type: Actions.CARD_PREV })} title="previous [←]">{'<'}</button>
                }

                <div>{`${index + 1}/${itemsCount}`}</div>

                {index < itemsCount - 1 &&
                    <button onClick={() => dispatch({ type: Actions.CARD_NEXT })} title="next [→]">{'>'}</button>
                }

            </div>

        </div >
    )
}

QuizView.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)),
    questionTime: PropTypes.number.isRequired,
    answerTime: PropTypes.number.isRequired,
    kanaOptions: PropTypes.arrayOf(PropTypes.oneOf(AllKanaOptions)),
    onRestart: PropTypes.func.isRequired
}