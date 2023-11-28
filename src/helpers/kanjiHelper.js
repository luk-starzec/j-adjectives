
export function renderKanjiWithFurigana(kanji, furigana, elementKey) {
    if (kanji == null)
        return null

    const furiganaArray = furigana.split('|')
    return (
        [...kanji].map((symbol, index) =>
        (
            <ruby key={`${elementKey}_${index}`}>
                <span>{symbol}</span>
                <rp>(</rp>
                <rt>{furiganaArray.length > index ? furiganaArray[index] : ''}</rt>
                <rp>)</rp>
            </ruby>
        ))
    )
}