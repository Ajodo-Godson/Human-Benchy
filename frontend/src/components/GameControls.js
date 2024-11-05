import React from 'react'

export default function GameControls({ gameState, onStartGame, onNextLevel }) {
    return (
        <div className="flex justify-center">
            {gameState === 'finished' && (
                <button
                    onClick={onNextLevel}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold
                   hover:bg-green-600 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Next Level
                </button>
            )}
            {gameState === 'idle' && (
                <button
                    onClick={onStartGame}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold
                   hover:bg-blue-600 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Start Game
                </button>
            )}
        </div>
    )
}