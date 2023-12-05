import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { fetchAdjectives, filterAdjectives } from "../helpers/dataHelper"
import { loadKanaOptions, loadTypeOptions, loadViewOption, saveKanaOptions, saveTypeOptions, saveViewOption } from "../helpers/contextHelper";
import { AppContext } from "../AppContext";
import { ViewOptions } from "../enums/viewOptions";
import TableView from "../components/home/TableView";
import CardsView from "../components/home/CardsView";
import HomeMenu from "../components/home/HomeMenu";

export default function Home() {
    const adjectives = useLoaderData()
    const context = useContext(AppContext);
    const [viewOption, setViewOption] = useState(loadViewOption(context))
    const [typeOptions, setTypeOptions] = useState(loadTypeOptions(context))
    const [kanaOptions, setKanaOptions] = useState(loadKanaOptions(context))

    const handleViewChanged = (option) => {
        setViewOption(option);
        saveViewOption(context, option);
    }

    const handleTypeChanged = (option) => {
        const newOptions = typeOptions.includes(option) ? typeOptions.filter(o => o !== option) : [...typeOptions, option];
        setTypeOptions(newOptions);
        saveTypeOptions(context, newOptions)
    }

    const handleKanaChanged = (option) => {
        const newOptions = kanaOptions.includes(option) ? kanaOptions.filter(o => o !== option) : [...kanaOptions, option];
        setKanaOptions(newOptions);
        saveKanaOptions(context, newOptions);
    }

    const items = filterAdjectives(adjectives, typeOptions)

    return (
        <div className="home-page">
            <HomeMenu viewOption={viewOption}
                viewOptionChanged={handleViewChanged}
                typeOptions={typeOptions}
                typeOptionsChanged={handleTypeChanged}
                kanaOptions={kanaOptions}
                kanaOptionsChanged={handleKanaChanged}
            />
            {viewOption === ViewOptions.TABLE_VIEW &&
                <TableView items={items} options={kanaOptions} />
            }
            {viewOption === ViewOptions.CARDS_VIEW &&
                <CardsView items={items} options={kanaOptions} />
            }
        </div>
    )
}

export const adjectivesLoader = async () => {
    const res = fetchAdjectives();
    return res
}