import { useLoaderData } from "react-router-dom"
import { useState } from "react";
import { fetchOpposite } from "../helpers/dataHelper";
import OppositeView from "../components/opposite/OppositeView";
import OppositeMenu from "../components/opposite/OppositeMenu";
import { DefaultKanaOptions } from "../enums/kanaOptions";

export default function Opposite() {
    const pairs = useLoaderData()
    const [kanaOptions, setKanaOptions] = useState(DefaultKanaOptions)

    const handleKanaChanged = (option) => {
        //console.log('handleKanaChanged', option)
        const newOptions = kanaOptions.includes(option) ? kanaOptions.filter(o => o !== option) : [...kanaOptions, option];
        setKanaOptions(newOptions);
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