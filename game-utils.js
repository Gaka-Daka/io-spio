const GAME = 'GAME';

export function createGame() {
    const game = {
        misclicks: 0,
        foundObjects: [],
        points: 0
    };

    return game;
}

export function updateGame(game) {
    const stringyGame = JSON.stringify(game);

    localStorage.setItem(GAME, stringyGame);
}

export function getGame() {
    const stringyGame = localStorage.getItem(GAME);
    const parsedGame = JSON.parse(stringyGame);

    return parsedGame;
}