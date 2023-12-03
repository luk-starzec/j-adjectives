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

export const fetchQuiz = (count) => {
    const adjectives = Array.from(adjectivesJson)

    const result = []
    for (let i = 0; i < count; i++) {
        const index = randomNumber(0, adjectives.length - 1)

        const element = adjectives[index]
        result.push(element)
        adjectives.splice(index, 1)
    }

    return result
}

export const filterAdjectives = (adjectives, typeOptions) => {
    const filters = prepareTypeForDataFiltering(typeOptions)
    return adjectives.filter(a => filters.includes(a.type))
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
