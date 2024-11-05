import React from 'react'

export default function ScoreDisplay({ level, failures, gameState, startTime, endTime }) {
    return (
        <div className="space-y-2 text-center mb-6">
            <p className="text-lg font-semibold">Level: {level}</p>
            <p className="text-lg font-semibold">Failures: {failures}</p>
            {gameState === 'finished' && (
                <p className="text-lg font-semibold">
                    Time: {((endTime - startTime) / 1000).toFixed(2)} seconds
                </p>
            )}
        </div>
    )
}