import React from 'react'
import '../styles/ScoreDisplay.css'

export default function ScoreDisplay({ level, failures, gameState, startTime, endTime }) {
    return (
        <div className="score-display">
            <p className="score-item">Level: {level}</p>
            <p className="score-item">Failures: {failures}</p>
            {gameState === 'finished' && (
                <p className="score-item">
                    Time: {((endTime - startTime) / 1000).toFixed(2)} seconds
                </p>
            )}
        </div>
    )
}