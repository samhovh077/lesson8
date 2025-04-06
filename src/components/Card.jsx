import useGameStore from "../store/useGameStore"

export default function Card({ index, card }) {

    const { handleCardClick } = useGameStore()

    return (
        <div className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`} onClick={() => handleCardClick(index)}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={card.content} alt="Dog image" width={100} height={100}/>
                </div>
                <div className="card-back"></div>
            </div>
        </div>
    )
}