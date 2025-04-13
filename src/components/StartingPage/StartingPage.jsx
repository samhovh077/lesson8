import { useState } from "react";
import useGameStore from "../../store/useGameStore";
import CoinFlipModal from "../Modal/CoinFlipModal";
import styles from './StartingPage.module.css'; // Import the CSS Module

export default function StartingPage() {
    const [name, setName] = useState('Player 1');
    const [name2, setName2] = useState('Player 2');
    const [selectedLevel, setSelectedLevel] = useState('8');

    const { setPlayerName, setLevel, setOpenModal, openModal, setEnabled } = useGameStore();

    function startGame() {
        setPlayerName('player1', name);
        setPlayerName('player2', name2);
        setLevel(selectedLevel);
        setOpenModal(true);
        setEnabled(true);
    }

    return (
        <div className={styles.startContainer}>
            {openModal && <CoinFlipModal />}
            <input 
                value={name} 
                onChange={(event) => setName(event.target.value)} 
                type="text" 
                placeholder="Player 1" 
            />
            <input 
                value={name2} 
                onChange={(event) => setName2(event.target.value)} 
                type="text" 
                placeholder="Player 2" 
            />
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value="8">Easy (4x4)</option>
                <option value="18">Medium (6x6)</option>
                <option value="32">Hard (8x8)</option>
            </select>
            <button onClick={startGame}>Play</button>
        </div>
    );
}