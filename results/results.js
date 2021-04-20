export function pointTotal(game, correctClicks) {
    let score = (correctClicks * 100) - (game.misclicks * 10);
    return score;
}