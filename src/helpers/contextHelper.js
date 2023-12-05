import { DefaultKanaOptions } from "../enums/kanaOptions";
import { DefaultTypeOptions } from "../enums/typeOption";
import { DefaultViewOption } from "../enums/viewOptions";

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