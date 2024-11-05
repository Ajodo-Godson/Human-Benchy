from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import StreamingResponse
import matplotlib.pyplot as plt
import numpy as np
import io

app = FastAPI()

# Data storage for the current player
current_player = {"levels": [], "total_time": [], "num_correct": []}


@app.get("/")
async def home():
    return {"message": "Welcome to the FastAPI app!"}


@app.get("/plot")
async def plot(
    level: int = Query(..., description="Current level"),
    total_time: float = Query(..., description="Total time taken in seconds"),
    num_correct: int = Query(..., description="Number of correct attempts"),
):
    # Append the new data to the current player data
    current_player["levels"].append(level)
    current_player["total_time"].append(total_time)
    current_player["num_correct"].append(num_correct)

    # Create a plot based on the accumulated data
    plt.figure(figsize=(10, 6))

    # Plot total time vs. levels
    plt.subplot(2, 1, 1)
    plt.plot(
        current_player["levels"],
        current_player["total_time"],
        label="Total Time",
        marker="o",
        color="b",
    )
    plt.xlabel("Levels")
    plt.ylabel("Total Time (s)")
    plt.title("Total Time per Level")
    plt.legend()

    # Plot percentage correct vs. levels
    plt.subplot(2, 1, 2)
    percentage_correct = [
        (nc / max(1, lv)) * 100
        for nc, lv in zip(current_player["num_correct"], current_player["levels"])
    ]
    plt.plot(
        current_player["levels"],
        percentage_correct,
        label="Percentage Correct",
        marker="o",
        color="g",
    )
    plt.xlabel("Levels")
    plt.ylabel("Percentage Correct (%)")
    plt.title("Performance per Level")
    plt.legend()

    # Save the plot to an in-memory file
    img = io.BytesIO()
    plt.tight_layout()
    plt.savefig(img, format="png")
    img.seek(0)
    plt.close()

    return StreamingResponse(img, media_type="image/png")
