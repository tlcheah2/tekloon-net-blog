/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import React, { useState, useEffect } from 'react'
import { Shuffle, Eye } from 'lucide-react'

const SYMBOL_SETS = {
  animals: [
    '🐶',
    '🐱',
    '🐭',
    '🐹',
    '🐰',
    '🦊',
    '🐻',
    '🐼',
    '🐨',
    '🐯',
    '🦁',
    '🐮',
    '🐷',
    '🐸',
    '🐵',
    '🐔',
  ],
  food: [
    '🍎',
    '🍌',
    '🍇',
    '🍊',
    '🍓',
    '🍑',
    '🍍',
    '🥝',
    '🍔',
    '🍕',
    '🌮',
    '🍣',
    '🍜',
    '🍞',
    '🥐',
    '🧀',
  ],
  transportation: [
    '🚗',
    '🚕',
    '🚙',
    '🚌',
    '🚎',
    '🏎️',
    '🚓',
    '🚑',
    '🚒',
    '🚚',
    '✈️',
    '🚀',
    '🚁',
    '🚂',
    '🚢',
    '🏍️',
  ],
}

type SymbolCategory = keyof typeof SYMBOL_SETS

interface Card {
  id: number
  symbol: string
}

interface MemoryCardProps {
  symbol: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
}

const MemoryCard: React.FC<MemoryCardProps> = ({ symbol, isFlipped, isMatched, onClick }) => (
  <div
    className={`m-2 flex h-16 w-16 cursor-pointer items-center justify-center text-2xl transition-all duration-300 
      ${
        isFlipped
          ? 'bg-white text-black dark:bg-gray-700 dark:text-white'
          : 'bg-blue-500 dark:bg-blue-700'
      }
      ${isMatched ? 'pointer-events-none opacity-0' : 'opacity-100'}
      border border-gray-200 dark:border-gray-600`}
    onClick={onClick}
  >
    {isFlipped ? symbol : '?'}
  </div>
)

const gridSizes = [
  { name: '2x2', cols: 2, rows: 2 },
  { name: '3x2', cols: 3, rows: 2 },
  { name: '4x2', cols: 4, rows: 2 },
  { name: '4x3', cols: 4, rows: 3 },
  { name: '4x4', cols: 4, rows: 4 },
]

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [moves, setMoves] = useState<number>(0)
  const [currentCategory, setCurrentCategory] = useState<SymbolCategory>('animals')
  const [isPeeking, setIsPeeking] = useState<boolean>(false)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gridSize, setGridSize] = useState(gridSizes[0])

  const getRandomSymbols = (count: number): string[] => {
    const categorySymbols = SYMBOL_SETS[currentCategory]
    const shuffled = [...categorySymbols].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const initializeGame = (): void => {
    const pairCount = (gridSize.cols * gridSize.rows) / 2
    const gameSymbols = getRandomSymbols(pairCount)
    const shuffledCards: Card[] = [...gameSymbols, ...gameSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }))
    setCards(shuffledCards)
    setFlippedIndices([])
    setMatchedPairs([])
    setMoves(0)
    setGameStarted(false)
  }

  useEffect(() => {
    initializeGame()
  }, [currentCategory, gridSize])

  const handleCardClick = (index: number): void => {
    if (!gameStarted) {
      setGameStarted(true)
    }

    if (
      isPeeking ||
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].symbol)
    ) {
      return
    }

    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)
    setMoves(moves + 1)

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, cards[firstIndex].symbol])
        }, 300)
      }
      setTimeout(() => setFlippedIndices([]), 1000)
    }
  }

  const handlePeek = (): void => {
    setIsPeeking(true)
    setTimeout(() => setIsPeeking(false), 5000)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(event.target.value as SymbolCategory)
  }

  const handleGridSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = gridSizes.find((size) => size.name === event.target.value)
    if (selectedSize) {
      setGridSize(selectedSize)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-black dark:bg-gray-800 dark:text-white">
      <h1 className="mb-4 text-3xl font-bold">Memory Card Game</h1>
      <div className="mb-4 flex space-x-4">
        <select
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={currentCategory}
          onChange={handleCategoryChange}
        >
          {Object.keys(SYMBOL_SETS).map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={gridSize.name}
          onChange={handleGridSizeChange}
        >
          {gridSizes.map((size) => (
            <option key={size.name} value={size.name}>
              {size.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">Matched Pairs: {matchedPairs.length}</p>
      </div>
      <div
        className={`grid gap-2 rounded-lg bg-gray-200 p-4 dark:bg-gray-700`}
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize.rows}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card, index) => (
          <MemoryCard
            key={card.id}
            symbol={card.symbol}
            isFlipped={
              isPeeking || flippedIndices.includes(index) || matchedPairs.includes(card.symbol)
            }
            isMatched={matchedPairs.includes(card.symbol)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={initializeGame}
        >
          <Shuffle className="mr-2" /> New Game
        </button>
        <button
          className="flex items-center rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
          onClick={handlePeek}
          disabled={isPeeking || gameStarted}
        >
          <Eye className="mr-2" /> Peek (5s)
        </button>
      </div>
    </div>
  )
}

export default MemoryGame
