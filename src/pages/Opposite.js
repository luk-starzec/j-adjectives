import { useLoaderData } from "react-router-dom"
import { useContext, useState } from "react";
import { fetchOpposite } from "../helpers/dataHelper";
import { loadKanaOptions, saveKanaOptions } from "../helpers/contextHelper";
import { AppContext } from "../AppContext";
import OppositeView from "../components/opposite/OppositeView";
import OppositeMenu from "../components/opposite/OppositeMenu";

export default function Opposite() {
    const pairs = useLoaderData()
    const context = useContext(AppContext);
    const [kanaOptions, setKanaOptions] = useState(loadKanaOptions(context))

    const handleKanaChanged = (option) => {
        const newOptions = kanaOptions.includes(option) ? kanaOptions.filter(o => o !== option) : [...kanaOptions, option];
        setKanaOptions(newOptions);
        saveKanaOptions(context, newOptions)
    }

    return (
        <div className='opposite-page'>
            <OppositeMenu kanaOptions={kanaOptions} kanaOptionsChanged={handleKanaChanged} />
            <OppositeView pairs={pairs} options={kanaOptions} />
        </div>
    )
}

export const oppositeLoader = async () => {
    const res = fetchOpposite();
    return res
}