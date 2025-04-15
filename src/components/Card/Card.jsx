import useGameStore from "../../store/useGameStore";
import styles from './Card.module.css';

export default function Card({ index, card }) {
    const { handleCardClick } = useGameStore();

    return (
        <div 
            className={`${styles.card} ${card.isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`} 
            onClick={() => handleCardClick(index)}
        >
            <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                    <img src={card.content} alt="Dog image" width={100} height={100} />
                </div>
                <div className={styles.cardBack}></div>
            </div>
        </div>
    );
}