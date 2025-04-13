import { useEffect } from 'react'
import Board from './components/Board/Board.jsx'
import GameInfo from './components/GameInfo/GameInfo.jsx'
import ResetGame from './components/ResetGame/ResetGame.jsx.jsx'
import useGameStore from './store/useGameStore'
import { useDogImages } from './api/useDogImages'
import LoadingPage from './components/LoadingPage/LoadingPage.jsx'
import StartingPage from './components/StartingPage/StartingPage.jsx'

function App() {
  const {
    level,
    matchedCards,
    cards,
    gameStarted,
    createCard,
    setEnabled,
    enabled
  } = useGameStore()

  const { data: dogImages, isLoading } = useDogImages(level)

  useEffect(() => {
    if (dogImages) {
      createCard(dogImages);
      setEnabled(false)
    }
  }, [dogImages, createCard, setEnabled, enabled])


  return (
    <div className="app">
      <h1>Memory Game</h1>
      {!gameStarted ? <StartingPage /> : isLoading ? <LoadingPage /> : (
        <>
          {cards.length === matchedCards.length && cards.length > 0 ? <GameInfo /> :
            <>
              <Board />
              <ResetGame />
            </>}
        </>
      )
      }
    </div>
  )
}

export default App
