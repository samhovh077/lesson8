import {useEffect, useState}  from 'react';
import useGameStore from '../../store/useGameStore';
import styles from './CoinFlipModal.module.css';

const CoinFlipModal = () => {
    const [winner, setWinner] = useState(null);
    const [flipping, setFlipping] = useState(false);

    const { openModal, setOpenModal, setGameStarted, player1, player2, setCurrentPlayer } = useGameStore();

    useEffect(() => {
        if (openModal) {

            setTimeout(() => {
                setFlipping(true);
            }, 50);

            const timeout = setTimeout(() => {
                const randomWinner = Math.random() < 0.5 ? player1.name : player2.name;
                const player = player1.name === randomWinner ? 'player1' : 'player2';
                setWinner(randomWinner);
                setCurrentPlayer(player);
            }, 800);

            return () => clearTimeout(timeout);
        }
    }, [openModal, player1.name, player2.name, setCurrentPlayer]);

    const onClose = () => {
        setGameStarted(true);
        setOpenModal(false);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Coin Flip</h2>
                <div className={`${styles.coin} ${flipping ? styles.flipping : ''}`}>
                    <div className={`${styles.side} ${styles.front}`}>{winner || player2.name}</div>
                    <div className={`${styles.side} ${styles.back}`}>{winner === player1.name ? player2.name : player1.name}</div>
                </div>
            <p className={styles.resultText} style={{opacity: winner ? 1 : 0}}>{`${winner} will start the game!`}</p>
                <button  style={{opacity: winner ? 1 : 0}} onClick={onClose}>Play</button>
            </div>
        </div>
    );
};

export default CoinFlipModal;