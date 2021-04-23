import { puzzles } from '../data.js';
import { getGame } from '../game-utils.js';
import { checkIfAUserIsLoggedIn, getUser, updateUser } from '../local-storage-utils.js';
import { findById } from '../utils.js';
import { addTableRow, addResultTableRow } from './results-utils.js';

checkIfAUserIsLoggedIn();

//pushing the previous game to the user object. will render results based on this
const user = getUser();
const game = getGame();
user.games.push(game);


const button = document.querySelector('#play-again');
const foundTable = document.querySelector('#found-table');
const scoreBoard = document.querySelector('#scoreboard');
const currentPuzzle = findById(puzzles, game.puzzle);
const hiddenObjects = currentPuzzle.hiddenObjects;

for (let gameItem of game.foundObjects) {
    const matchingItem = findById(hiddenObjects, gameItem.id);

    if (gameItem.hasBeenFound === true) {

        const tr = addTableRow(matchingItem);
        foundTable.append(tr);
    }
}

for (let game of user.games) {
    const score = addResultTableRow(user, game);
    scoreBoard.append(score);
}

updateUser(user);


const allScores = document.querySelectorAll('.scores');
const mostRecentScore = allScores[allScores.length - 1];
mostRecentScore.classList.add('last-score');

button.addEventListener('click', () => {
    localStorage.removeItem('GAME');
    window.location = '../game-config/index.html';
});