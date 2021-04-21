const GAME = 'GAME';

export function createGame() {
    const game = {
        misclicks: 0,
        foundObjects: [],
        points: 0,
        difficulty: 'normal',
        time: (5 * 60)
        //add default time/difficulty settings to user if none selected on config page
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