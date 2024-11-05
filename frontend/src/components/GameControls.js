import React from 'react'
import '../styles/GameControls.css'

export default function GameControls({ gameState, onStartGame, onNextLevel }) {
    return (
        <div className="game-controls">
            {gameState === 'finished' && (
                <button
                    onClick={onNextLevel}
                    className="control-button next"
                >
                    Next Level
                </button>
            )}
            {gameState === 'idle' && (
                <button
                    onClick={onStartGame}
                    className="control-button start"
                >
                    Start Game
                </button>
            )}
        </div>
    )
}