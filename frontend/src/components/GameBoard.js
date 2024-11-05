import React from 'react'
import '../styles/GameBoard.css'

export default function GameBoard({ level, litCells, userClicks, gameState, onCellClick }) {
    const renderGrid = () => {
        const grid = []
        for (let i = 0; i < level * level; i++) {
            const isLit = litCells.includes(i) && gameState === 'showing'
            const isClicked = userClicks.includes(i)
            const isCorrect = litCells.includes(i) && isClicked
            const isIncorrect = !litCells.includes(i) && isClicked

            grid.push(
                <button
                    key={i}
                    onClick={() => onCellClick(i)}
                    className={`
                        grid-cell
                        ${isLit ? 'lit' : ''}
                        ${isCorrect ? 'correct' : ''}
                        ${isIncorrect ? 'incorrect' : ''}
                    `}
                    aria-label={`Grid cell ${i + 1}`}
                />
            )
        }
        return grid
    }

    return (
        <div className="game-board">
            <div
                className="grid-container"
                style={{
                    gridTemplateColumns: `repeat(${level}, minmax(0, 1fr))`,
                    width: `${Math.min(400, level * 60)}px`
                }}
            >
                {renderGrid()}
            </div>
        </div>
    )
}