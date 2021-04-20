export function pointTotal(game, correctClicks) {
    let score = pointsGained(game, correctClicks) - (game.misclicks * 10);
    return score;
}

export function pointsGained(game, correctClicks) {
    for (let foundObject of game.foundObjects) {
        if (foundObject.hasBeenFound === true) {
            correctClicks++;
        }
    } return (correctClicks * 100);
}

