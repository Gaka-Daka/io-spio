import { findById } from '../utils.js';
import { puzzles } from '../data.js';

import { updateGame, createGame } from '../game-utils.js';
function pointTotal(game, correctClicks) {
    let score = (correctClicks * 100) - (game.misclicks * 10);
    return score;
}

//sourced from: https://jsfiddle.net/wr1ua0db/17/
let duration = 20;
const display = document.querySelector('#time');

let timer = duration, minutes, seconds;

let myInterval = setInterval(function () { //eslint-disable-line
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
        doneFunction();
  
    }
}, 1000);


function doneFunction() {
    const endGameSpan = document.createElement('span');
    const moveOn = document.createElement('button');
    moveOn.textContent = 'Go to Results';

    const clickies = document.querySelectorAll('.clicky')
    for (let clicky of clickies) {
        clicky.classList.add('disabled');
    }
    image.classList.add('disabled');

    moveOn.addEventListener('click', () => {
        window.location = '../results/index.html';
    });

    elPuzzle.append(endGameSpan, moveOn);
    clearInterval(myInterval);
    game.points = score;
    updateGame(game);
}

const params = new URLSearchParams(window.location.search);
const clues = document.querySelector('#item-list');
const puzzleId = params.get('id');
const puzzle = findById(puzzles, puzzleId);

const game = createGame();


const elTitle = document.querySelector('#puzzle-title');
const elPuzzle = document.querySelector('#puzzle');
const scoreBox = document.querySelector('#timer');
const currentScore = document.getElementById('score');
const mistakes = document.getElementById('WRONG');

let correctClicks = 0;
let score = pointTotal(game, correctClicks);

elTitle.textContent = puzzle.title;

const image = document.createElement('img');
image.src = puzzle.image;
image.style.width = '1000px';

puzzle.hiddenObjects.forEach(object => {
    game.foundObjects.push({
        id: object.id,
        hasBeenFound: false
    });

    const clickyClue = document.createElement('span');
    clickyClue.textContent = object.clue;

    clues.append(clickyClue);

    const clicky = document.createElement('div');
    //change textContent to image
    clicky.textContent = object.id;
    clicky.style.top = object.map.top;
    clicky.style.left = object.map.left;
    clicky.classList.add("clicky")

    clicky.addEventListener('click', () => {
        const matchingIds = findById(game.foundObjects, object.id);
        matchingIds.hasBeenFound = true;
        clickyClue.style.textDecoration = 'line-through';
        correctClicks++;
        score = pointTotal(game, correctClicks);
        currentScore.textContent = score;
        clicky.classList.add('disabled');
        if (allClickiesFound()) doneFunction();

    });

    elPuzzle.append(clicky);
    scoreBox.append(currentScore, mistakes);

});



image.addEventListener('click', () => {
    game.misclicks++;
    score = pointTotal(game, correctClicks);
    currentScore.textContent = score;
});

elPuzzle.append(image);

//function to cause push of misclicks after timer runs out or all items foun
function allClickiesFound() {

    for (let foundObject of game.foundObjects) {
        if (foundObject.hasBeenFound !== true) {
            return false;
        }
    }
    return true;
}

