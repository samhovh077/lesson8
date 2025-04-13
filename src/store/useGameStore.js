import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

import { v4 as uuidv4 } from 'uuid';

const useGameStore = create(persist((set, get) => ({
    player1: { name: '', score: 0, attempts: 0, time: 0 },
    player2: { name: '', score: 0, attempts: 0, time: 0 },
    startTime: Math.floor(Date.now() / 1000),
    currentPlayer: null,
    cards: [],
    flippedCards: [],
    matchedCards: [],
    isDisabled: false,
    level: '8',
    gameStarted: false,
    openModal: false,
    enabled: false,

    setGameStarted: (val) => set({ gameStarted: val }),
    setEnabled: (val) => set({ enabled: val }),
    setLevel: (level) => set({ level }),
    setCards: (cards) => set({ cards }),
    setFlippedCards: (flippedCards) => set({ flippedCards }),
    setMatchedCards: (matchedCards) => set({ matchedCards }),
    setIsDisabled: (val) => set({ isDisabled: val }),
    setOpenModal: (val) => set({ openModal: val }),
    setStartTime: () => set({ startTime: Math.floor(Date.now() / 1000) }),

    setCurrentPlayer: (playerKey) =>
        set((state) => ({ currentPlayer: state[playerKey].name })),
    setPlayerName: (playerKey, name) =>
        set((state) => ({ [playerKey]: { ...state[playerKey], name } })),
    setPlayerScore: (playerKey) =>
        set((state) => ({ [playerKey]: { ...state[playerKey], score: state[playerKey].score + 1 } })),
    setPlayerAttempt: (playerKey) =>
        set((state) => ({ [playerKey]: { ...state[playerKey], attempts: state[playerKey].attempts + 1 } })),
    setPlayerTime: (playerKey, time) =>
        set((state) => ({ [playerKey]: { ...state[playerKey], time: state[playerKey].time + time } })),

    handleCardClick: (index) => {

        
        const {
            isDisabled,
            flippedCards,
            matchedCards,
            cards,
            startTime,
            currentPlayer,
            player1,
            setPlayerScore,
            setPlayerAttempt,
            setPlayerTime,
            setCurrentPlayer,
            setStartTime,
        } = get();
        
        if (isDisabled || flippedCards.includes(index) || matchedCards.includes(index)) return;
        
        const clickedCard = { ...cards[index], isFlipped: true };
        const updatedCards = [...cards];
        updatedCards[index] = clickedCard;

        const newFlipped = [...flippedCards, index];

        set({ cards: updatedCards, flippedCards: newFlipped });

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            const isMatch = updatedCards[first].content === updatedCards[second].content;
            const currentKey = player1.name === currentPlayer ? 'player1' : 'player2';
            const nextKey = player1.name === currentPlayer ? 'player2' : 'player1';

            set({ isDisabled: true });

            setTimeout(() => {
                requestAnimationFrame(() => {
                    const now = Math.floor(Date.now() / 1000);
                    const turnDuration = now - startTime;
                    const cardsCopy = [...updatedCards];

                    if (isMatch) {
                        cardsCopy[first] = { ...cardsCopy[first], isMatched: true };
                        cardsCopy[second] = { ...cardsCopy[second], isMatched: true };

                        set({
                            cards: cardsCopy,
                            matchedCards: [...matchedCards, first, second],
                            flippedCards: [],
                            isDisabled: false,
                        });

                        setPlayerScore(currentKey);
                        setPlayerAttempt(currentKey);

                        if (matchedCards.length + 2 === cardsCopy.length) {
                            setPlayerTime(currentKey, turnDuration);
                        }
                    } else {
                        cardsCopy[first] = { ...cardsCopy[first], isFlipped: false };
                        cardsCopy[second] = { ...cardsCopy[second], isFlipped: false };

                        set({
                            cards: cardsCopy,
                            flippedCards: [],
                            isDisabled: false,
                        });

                        setPlayerAttempt(currentKey);
                        setPlayerTime(currentKey, turnDuration);
                        setCurrentPlayer(nextKey);
                        setStartTime();
                    }
                });
            }, 1000);
        }
    },


    resetGame: () => {

        set({
            flippedCards: [],
            matchedCards: [],
            currentPlayer: null,
            cards: [],
            isDisabled: false,
            player1: { name: '', score: 0, attempts: 0, time: 0 },
            player2: { name: '', score: 0, attempts: 0, time: 0 },
            gameStarted: false,
            startTime: Math.floor(Date.now() / 1000),
        });
    },


    createCard: (data) => {
        const { setIsDisabled, setStartTime } = get();

        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 500);

        setStartTime();

        const generatedCards = data
            .flatMap((item) => {
                const content = item;
                return [
                    {
                        id: uuidv4(),
                        content,
                        isFlipped: false,
                        isMatched: false,
                    },
                    {
                        id: uuidv4(),
                        content,
                        isFlipped: false,
                        isMatched: false,
                    },
                ];
            })
            .sort(() => Math.random() - 0.5);

        set({ cards: generatedCards });
    }

}),
    {
        name: 'game-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
            player1: state.player1,
            player2: state.player2,
            startTime: state.startTime,
            currentPlayer: state.currentPlayer,
            cards: state.cards,
            flippedCards: state.flippedCards,
            matchedCards: state.matchedCards,
            isDisabled: state.isDisabled,
            gameStarted: state.gameStarted,
            level: state.level
        }),

    }
));

export default useGameStore;
