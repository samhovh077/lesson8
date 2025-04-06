import useGameStore from "../store/useGameStore"

export default function GameInfo() {

    const { attempts, resetGame, time, cards } = useGameStore();
    const accuracy = Math.round(cards.length / 2 * 100 / attempts)
    return (
        <div className="game-info">
            <div>attempts: {attempts}</div>
            <div>time: {time}s</div>
            <div>accuracy: {accuracy}%</div>
            <button onClick={resetGame}>Play again</button>
        </div>
    )
}