import useGameStore from "../store/useGameStore"
import Card from "./Card"

export default function Board() {
    const { cards, level } = useGameStore()

    const gridStyle =
        level === '8'
            ? 'repeat(4, 1fr)'
            : level === '18'
                ? 'repeat(6, 1fr)'
                : 'repeat(8, 1fr)'

    return (
        <div style={{ gridTemplateColumns: gridStyle }} className="board">
            {cards.map((card, index) => {
                return <Card key={card.id} index={index} card={card}/>
            })}
        </div>
    )
}