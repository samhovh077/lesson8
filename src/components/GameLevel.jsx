import useGameStore from "../store/useGameStore"

export default function GameLevel() {
    const { setLevel, level, resetGame } = useGameStore()

    const handleLevelChange = (newLevel) => {
        if (level !== newLevel) {
            const confirmChange = window.confirm("When changing the game mode, please be aware that this action will reset your progress. Are you sure you want to proceed?");
            if (confirmChange) {
                setLevel(newLevel);
                resetGame();
            }
        }
    }

    return (
        <div className="game-level-container">
            <button onClick={() => handleLevelChange('8')}>Easy</button>
            <button onClick={() => handleLevelChange('18')}>Medium</button>
            <button onClick={() => handleLevelChange('32')}>Hard</button>
        </div>
    )
}
