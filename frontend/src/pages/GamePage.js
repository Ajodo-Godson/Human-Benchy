import React, { useState, useEffect, useCallback } from 'react'
import GameBoard from '../components/GameBoard'
import GameControls from '../components/GameControls'
import ScoreDisplay from '../components/ScoreDisplay'

const INITIAL_LEVEL = 3
const SHOW_DURATION = 1000 // milliseconds

export default function GamePage() {
    const [level, setLevel] = useState(INITIAL_LEVEL)
    const [litCells, setLitCells] = useState([])
    const [userClicks, setUserClicks] = useState([])
    const [gameState, setGameState] = useState('idle')
    const [failures, setFailures] = useState(0)
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const generateLitCells = useCallback(() => {
        const cells = []
        while (cells.length < level) {
            const cell = Math.floor(Math.random() * (level * level))
            if (!cells.includes(cell)) {
                cells.push(cell)
            }
        }
        return cells
    }, [level])

    const startGame = useCallback(() => {
        const newLitCells = generateLitCells()
        setLitCells(newLitCells)
        setUserClicks([])
        setFailures(0)
        setGameState('showing')
        setStartTime(Date.now())

        setTimeout(() => {
            setGameState('guessing')
        }, SHOW_DURATION)
    }, [generateLitCells])

    const handleCellClick = (index) => {
        if (gameState !== 'guessing') return

        if (userClicks.length === 0) {
            setStartTime(Date.now())
        }

        const newUserClicks = [...userClicks, index]
        setUserClicks(newUserClicks)

        if (!litCells.includes(index)) {
            setFailures((prev) => prev + 1)
        }

        if (newUserClicks.length === litCells.length) {
            setEndTime(Date.now())
            setGameState('finished')
        }
    }

    const handleNextLevel = () => {
        setLevel((prev) => prev + 1)
        setGameState('idle')
    }

    useEffect(() => {
        if (gameState === 'idle') {
            startGame()
        }
    }, [gameState, startGame])

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Memory Test Game</h1>
            <GameBoard
                level={level}
                litCells={litCells}
                userClicks={userClicks}
                gameState={gameState}
                onCellClick={handleCellClick}
            />
            <ScoreDisplay
                level={level}
                failures={failures}
                gameState={gameState}
                startTime={startTime}
                endTime={endTime}
            />
            <GameControls
                gameState={gameState}
                onStartGame={startGame}
                onNextLevel={handleNextLevel}
            />
        </div>
    )
}