import useGameStore from "../../store/useGameStore"
import Card from "../Card/Card"
import styles from './Board.module.css'

export default function Board() {
    const { cards, level, currentPlayer, player1 } = useGameStore()

    const gridStyle = (() => {
        switch (level) {
          case '8':
            return 'repeat(4, 1fr)';
          case '18':
            return 'repeat(6, 1fr)';
          case '32 ':
            return 'repeat(8, 1fr)';
        }
      })();

    return (
        <div className={styles.boardContainer}>
            <span style={{ fontSize: '20px', color: currentPlayer === player1.name ? "blue" : 'orange' }}>{currentPlayer}</span>
            <div style={{ gridTemplateColumns: gridStyle }} className={styles.board}>
                {cards.map((card, index) => {
                    return <Card key={card.id} index={index} card={card} />
                })}
            </div>
        </div>
    )
}