import adjectivesJson from '../data/adjectives.json'
import oppositeJson from '../data/opposite.json'
import { prepareTypeForDataFiltering } from '../enums/typeOption';

export const fetchAdjectives = () => adjectivesJson;

export const fetchOpposite = () => {
    const pairs = oppositeJson
    const adjectives = adjectivesJson

    return pairs.map(p => (
        {
            item1: adjectives.find(a => a.id === p.id1),
            item2: adjectives.find(a => a.id === p.id2)
        }))
};

export const filterAdjectives = (adjectives, typeOptions) => {
    const filters = prepareTypeForDataFiltering(typeOptions)
    return adjectives.filter(a => filters.includes(a.type))
}