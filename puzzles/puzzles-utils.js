import { updateGame } from '../game-utils.js';

const elPuzzle = document.querySelector('#puzzle');

export function pointTotal(game, correctClicks) {
    // i'd like to see some consts here to explain what 110 means, for example. that will make it easier for future devs to maintain this code
    let score = (correctClicks * 110) - (game.misclicks * 10);
    return score;
}

// this could use a better name
export function doneFunction(game, score) {
    const endGameSpan = document.createElement('span');
    const resultsButton = document.querySelector('#results-button');
    const moveOn = document.createElement('button');
    moveOn.classList.add('end-game-button');
    moveOn.textContent = 'Go to Results';

    const clickies = document.querySelectorAll('.clicky');
    for (let clicky of clickies) {
        clicky.classList.add('disabled');
    }
    elPuzzle.classList.add('disabled');

    moveOn.addEventListener('click', () => {
        window.location = '../results/index.html';
    });

    elPuzzle.append(endGameSpan);
    resultsButton.append(moveOn);
    game.points = score;
    updateGame(game);
}

//function to cause push of misclicks after timer runs out or all items found
export function allClickiesFound(game) {

    for (let foundObject of game.foundObjects) {
        if (!foundObject.hasBeenFound) {
            return false;
        }
    }
    return true;
}

