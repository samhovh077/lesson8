import useGameStore from "../../store/useGameStore";
import styles from './resetgame.module.css'

export default function ResetGame() {
    const { resetGame } = useGameStore()

    const handleResetGame = () => {
        const confirmChange = window.confirm("Please be aware that this action will reset your progress. Are you sure you want to proceed?");
        if (confirmChange) {
            resetGame();
        }
    }

    return (
        <div className={styles.gameLevelContainer}>
            <button onClick={() => handleResetGame()}>Reset Game</button>
        </div>
    )
}
