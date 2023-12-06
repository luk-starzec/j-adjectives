import { DefaultKanaOptions } from "../enums/kanaOptions";
import { DefaultTypeOptions } from "../enums/typeOption";
import { DefaultViewOption } from "../enums/viewOptions";
const DefaultQuizQuestionTime = 3
const DefaultQuizAnswerTime = 3
const DefaultQuizItemsCount = 5

const SETTINGS_STORAGE_KEY = "j-adjectives-settings"

export function saveKanaOptions(context, options) {
    if (!context?.setContext)
        return
    const newContext = { ...context, kanaOptions: options };
    context.setContext(newContext);
}

export function loadKanaOptions(context) {
    return context?.kanaOptions ? context.kanaOptions : DefaultKanaOptions;
}

export function saveViewOption(context, option) {
    if (!context?.setContext)
        return
    const newContext = { ...context, viewOption: option };
    context.setContext(newContext);
}

export function loadViewOption(context) {
    return context?.viewOption ? context.viewOption : DefaultViewOption;
}

export function saveTypeOptions(context, options) {
    if (!context?.setContext)
        return
    const newContext = { ...context, typeOptions: options };
    context.setContext(newContext);
}

export function loadTypeOptions(context) {
    return context?.typeOptions ? context.typeOptions : DefaultTypeOptions;
}

export function saveQuizQuestionTime(context, time) {
    if (!context?.setContext)
        return
    const newContext = { ...context, questionTime: time };
    context.setContext(newContext);
}

export function loadQuizQuestionTime(context) {
    return context?.questionTime ? context.questionTime : DefaultQuizQuestionTime;
}

export function saveQuizAnswerTime(context, time) {
    if (!context?.setContext)
        return
    const newContext = { ...context, answerTime: time };
    context.setContext(newContext);
}

export function loadQuizAnswerTime(context) {
    return context?.answerTime ? context.answerTime : DefaultQuizAnswerTime;
}

export function saveQuizItemsCount(context, count) {
    if (!context?.setContext)
        return
    const newContext = { ...context, quizCount: count };
    context.setContext(newContext);
}

export function loadQuizItemsCount(context) {
    return context?.quizCount ? context.quizCount : DefaultQuizItemsCount;
}

export function getInitContext(updateContext) {
    return {
        setContext: updateContext,
        viewOption: DefaultViewOption,
        typeOptions: DefaultTypeOptions,
        kanaOptions: DefaultKanaOptions,
        quizCount: DefaultQuizItemsCount,
        questionTime: DefaultQuizQuestionTime,
        answerTime: DefaultQuizAnswerTime
    }
}

export function saveSettings(context) {
    const entries = Object.entries(context).filter(r => r[0] !== "setContext");
    const settings = Object.fromEntries(entries);
    const value = JSON.stringify(settings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, value);
}

export function loadSettings() {
    const value = localStorage.getItem(SETTINGS_STORAGE_KEY);
    const settings = JSON.parse(value);
    return settings;
}
