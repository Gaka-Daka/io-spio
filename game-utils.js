const GAME = 'GAME';
const ONE_MINUTE = 60;

export function createGame() {
    const game = {
        misclicks: 0,
        foundObjects: [],
        points: 0,
        // seems like this should be a const
        difficulty: 'normal',
        // nice work using this syntax to communicate "five minutes" to other programmers. Maybe a const would be even better?
        time: (5 * ONE_MINUTE)
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