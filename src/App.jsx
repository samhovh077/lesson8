import { useEffect } from 'react'
import Board from './components/Board'
import GameInfo from './components/GameInfo'
import GameLevel from './components/GameLevel'
import useGameStore from './store/useGameStore'
import { useDogImages } from './api/useDogImages'
import LoadingPage from './components/LoadingPage'

function App() {
  const {
    level,
    setCards,
    createCard,
    matchedCards,
    cards
  } = useGameStore()

  const { data: dogImages, isLoading } = useDogImages(level)

  useEffect(() => {
    if (dogImages) {
      const cardPairs = [...createCard(dogImages), ...createCard(dogImages)]
      setCards(cardPairs)
    }
  }, [dogImages, createCard, setCards])

  if (isLoading) {
    return <LoadingPage/>
  }

  return (
    <div className="app">
      <h1>Memory Game</h1>
      {cards.length  === matchedCards.length ? 
      <>
        <GameInfo />
      </> : 
      <>
        <Board />
        <GameLevel />
      </>}

    </div>
  )
}

export default App
