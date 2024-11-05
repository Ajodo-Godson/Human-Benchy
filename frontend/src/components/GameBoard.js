import React from 'react'

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
            aspect-square border-2 border-gray-300 rounded-md
            transition-colors duration-200
            hover:bg-gray-100
            ${isLit ? 'bg-blue-500 border-blue-600' : ''}
            ${isCorrect ? 'bg-green-500 border-green-600' : ''}
            ${isIncorrect ? 'bg-red-500 border-red-600' : ''}
            ${!isLit && !isClicked ? 'bg-white' : ''}
          `}
                    aria-label={`Grid cell ${i + 1}`}
                />
            )
        }
        return grid
    }

    return (
        <div className="flex justify-center items-center w-full my-8">
            <div
                className="grid gap-2 p-4 bg-gray-50 rounded-xl shadow-inner"
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