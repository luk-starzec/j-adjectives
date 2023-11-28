import { useLoaderData } from "react-router-dom";
import { fetchAdjectives, filterAdjectives } from "../helpers/dataHelper"
import TableView from "../components/home/TableView";
import CardsView from "../components/home/CardsView";
import Menu from "../components/home/menu/Menu";
import { useState } from "react";
import { CARDS_VIEW, DefaultViewOption, TABLE_VIEW, } from "../enums/viewOptions";
import { DefaultTypeOptions } from "../enums/typeOption";
import { DefaultKanaOptions } from "../enums/kanaOptions";

export default function Home() {
    const adjectives = useLoaderData()
    const [viewOption, setViewOption] = useState(DefaultViewOption)
    const [typeOptions, setTypeOptions] = useState(DefaultTypeOptions)
    const [kanaOptions, setKanaOptions] = useState(DefaultKanaOptions)

    const handleViewChanged = (option) => {
        //console.log('handleViewChanged', option)
        setViewOption(option);
    }

    const handleTypeChanged = (option) => {
        //console.log('handleTypeChanged', option)
        const newOptions = typeOptions.includes(option) ? typeOptions.filter(o => o !== option) : [...typeOptions, option];
        setTypeOptions(newOptions);
    }

    const handleKanaChanged = (option) => {
        //console.log('handleKanaChanged', option)
        const newOptions = kanaOptions.includes(option) ? kanaOptions.filter(o => o !== option) : [...kanaOptions, option];
        setKanaOptions(newOptions);
    }

    const items = filterAdjectives(adjectives, typeOptions)

    return (
        <div className="home-page">
            <Menu viewOption={viewOption}
                viewOptionChanged={handleViewChanged}
                typeOptions={typeOptions}
                typeOptionsChanged={handleTypeChanged}
                kanaOptions={kanaOptions}
                kanaOptionsChanged={handleKanaChanged}
            />
            {viewOption === TABLE_VIEW &&
                <TableView items={items} options={kanaOptions} />
            }
            {viewOption === CARDS_VIEW &&
                <CardsView items={items} options={kanaOptions} />
            }
        </div>
    )
}

export const adjectivesLoader = async () => {
    const res = fetchAdjectives();
    return res
}