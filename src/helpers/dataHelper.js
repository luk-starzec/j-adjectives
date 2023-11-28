import adjectivesJson from '../data/adjectives.json'
import oppositeJson from '../data/opposite.json'
import { prepareTypeForDataFiltering } from '../enums/typeOption';

export const fetchAdjectives = () => adjectivesJson;
export const fetchOpposite = () => oppositeJson;

export const filterAdjectives = (adjectives, typeOptions) => {
    const filters = prepareTypeForDataFiltering(typeOptions)
    return adjectives.filter(a => filters.includes(a.type))
}