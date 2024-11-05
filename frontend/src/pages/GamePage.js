import React, { useState, useEffect, useCallback } from 'react'
import GameBoard from '../components/GameBoard'
import GameControls from '../components/GameControls'
import ScoreDisplay from '../components/ScoreDisplay'

const INITIAL_LEVEL = 3
const MAX_TRIALS = 5 // Need to think of a logic to set this value
const MIN_TRIALS = 2

export default function GamePage() {
    const [level, setLevel] = useState(INITIAL_LEVEL)
    const [litCells, setLitCells] = useState([])
    const [userClicks, setUserClicks] = useState([])
    const [gameState, setGameState] = useState('idle')
    const [failures, setFailures] = useState(0)
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const [currentTrial, setCurrentTrial] = useState(1)
    const [successCount, setSuccessCount] = useState(0)
    const [trialsForLevel, setTrialsForLevel] = useState(MAX_TRIALS)

    const generateLitCells = useCallback(() => {
        const maxLitCells = Math.floor((1 / 2) * level * level)
        const numLitCells = Math.max(level, Math.floor(Math.random() * (maxLitCells + 1)))
        const cells = []

        while (cells.length < numLitCells) {
            const cell = Math.floor(Math.random() * (level * level))
            if (!cells.includes(cell)) {
                cells.push(cell)
            }
        }

        return cells
    }, [level])

    const calculateTrialsForNextLevel = useCallback(() => {
        const successRate = successCount / trialsForLevel
        let newTrials

        if (successRate > 0.8) {
            newTrials = Math.max(MIN_TRIALS, trialsForLevel - 2)
        } else if (successRate > 0.6) {
            newTrials = Math.max(MIN_TRIALS, trialsForLevel - 1)
        } else if (successRate < 0.4) {
            newTrials = Math.min(MAX_TRIALS, trialsForLevel + 1)
        } else {
            newTrials = trialsForLevel
        }

        return newTrials
    }, [successCount, trialsForLevel])

    const startGame = useCallback(() => {
        const newLitCells = generateLitCells()
        setLitCells(newLitCells)
        setUserClicks([])
        setFailures(0)
        setGameState('showing')
        setStartTime(0)
        setEndTime(0)
    }, [generateLitCells])

    const handleCellClick = (index) => {
        if (gameState === 'showing') {
            setGameState('guessing')
            setStartTime(Date.now())
        }

        if (gameState !== 'guessing') return

        const newUserClicks = [...userClicks, index]
        setUserClicks(newUserClicks)

        if (!litCells.includes(index)) {
            setFailures((prev) => prev + 1)
        }

        if (newUserClicks.length === litCells.length) {
            setEndTime(Date.now())
            setGameState('finished')
            if (failures === 0) {
                setSuccessCount((prev) => prev + 1)
            }
        }
    }

    const handleNextLevel = () => {
        if (currentTrial < trialsForLevel) {
            setCurrentTrial((prev) => prev + 1)
            setGameState('idle')
        } else {
            const newTrials = calculateTrialsForNextLevel()
            setLevel((prev) => prev + 1)
            setCurrentTrial(1)
            setSuccessCount(0)
            setTrialsForLevel(newTrials)
            setGameState('idle')
        }
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
                currentTrial={currentTrial}
                trialsForLevel={trialsForLevel}
            />
            <GameControls
                gameState={gameState}
                onStartGame={startGame}
                onNextLevel={handleNextLevel}
            />
        </div>
    )
}