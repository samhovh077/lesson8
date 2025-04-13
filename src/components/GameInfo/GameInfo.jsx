import React from 'react';
import useGameStore from "../../store/useGameStore";
import styles from './GameInfo.module.css';

export default function GameInfo() {
    const { resetGame, player1, player2 } = useGameStore();

    function checkWinner(player1, player2) {
        if (player1.score !== player2.score) {
            return player1.score > player2.score ? player1.name : player2.name;
        }

        if (player1.attempts !== player2.attempts) {
            return player1.attempts < player2.attempts ? player1.name : player2.name;
        }

        if (player1.time !== player2.time) {
            return player1.time < player2.time ? player1.name : player2.name;
        }

        return 'draw';
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        if (hours > 0) {
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    }

    return (
        <div className={styles.gameInfo}>
            <div className={styles.winner}>Winner: {checkWinner(player1, player2)}</div>
            <div className={styles.playerInfo}>{player1.name}: {player1.score}/{player1.attempts}, {formatTime(player1.time)}</div>
            <div className={styles.playerInfo}>{player2.name}: {player2.score}/{player2.attempts}, {formatTime(player2.time)}</div>
            <button className={styles.playAgainButton} onClick={resetGame}>Play again</button>
        </div>
    );
}