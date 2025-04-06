import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useGameStore = create((set, get) => ({
    cards: [],
    flippedCards: [],
    matchedCards: [],
    isDisabled: false,
    level: '8',
    attempts: 0,
    time: undefined,

    setTime: (time) => set((state) => ({ time: time ? Math.floor(time / 1000) - state.time : Math.floor(Date.now() / 1000) })),
    setLevel: (level) => set({ level }),
    setCards: (cards) => set({ cards }),
    setFlippedCards: (flippedCards) => set({ flippedCards }),
    setMatchedCards: (matchedCards) => set({ matchedCards }),
    setIsDisabled: (val) => set({ isDisabled: val }),
    setAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),

    handleCardClick: (index) => {
        const { isDisabled, flippedCards, matchedCards, cards, setAttempts, setTime } = get()
        if (isDisabled || flippedCards.includes(index) || matchedCards.includes(index)) return

        const newCards = [...cards]
        newCards[index].isFlipped = true

        const newFlipped = [...flippedCards, index]
        set({ cards: newCards, flippedCards: newFlipped })

        if (newFlipped.length === 2) {

            setAttempts()
            set({ isDisabled: true })
            const [first, second] = newFlipped

            setTimeout(() => {
                const updatedCards = [...newCards]
                if (newCards[first].content === newCards[second].content) {

                    newCards[first].isMatched = true
                    newCards[second].isMatched = true

                    set({
                        matchedCards: [...matchedCards, first, second],
                        flippedCards: [],
                        isDisabled: false,
                    })

                    //  I increment 2 because after function matched cards length will increment 2

                    if (matchedCards.length + 2 === cards.length) {
                        setTime(Date.now())
                    }

                } else {
                    updatedCards[first].isFlipped = false
                    updatedCards[second].isFlipped = false
                    set({
                        cards: updatedCards,
                        flippedCards: [],
                        isDisabled: false,
                    })
                }
            }, 1000)
        }
    },

    resetGame: () => {
        const { cards, createCard } = get()
        set({
            cards: createCard(cards),
            flippedCards: [],
            matchedCards: [],
            isDisabled: false,
            attempts: 0
        })
    },

    createCard: (data) => {
        const { setTime } = get()
        setTime()
        return data
            .sort(() => Math.random() - 0.5)
            .map((item) => ({
                id: uuidv4(),
                content: item.content || item,
                isFlipped: false,
                isMatched: false,
            }))
    },
}))

export default useGameStore
