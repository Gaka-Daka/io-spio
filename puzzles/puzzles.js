import { findById } from '../utils.js';
import { puzzles } from '../data.js';
import { createGame, getGame } from '../game-utils.js';
import { checkIfAUserIsLoggedIn } from '../local-storage-utils.js';
import { doneFunction, pointTotal, allClickiesFound } from './puzzles-utils.js';

checkIfAUserIsLoggedIn();

const params = new URLSearchParams(window.location.search);
const clues = document.querySelector('#item-list');
const puzzleId = params.get('id');
const puzzle = findById(puzzles, puzzleId);
const elPuzzle = document.querySelector('#puzzle');
const scoreBox = document.querySelector('#timer');
const currentScore = document.getElementById('score');
const display = document.querySelector('#time');

//change game to get game because we created it in the config page
let game = getGame();
// if no game exists because the user did not select settings and create a game, create a game. Will have default settings.
if (!game) {
    game = createGame();
}

//add puzzle id to game object so it can be referenced on results page 
game.puzzle = puzzle.id;
elPuzzle.style.backgroundImage = `url(${puzzle.image}`;

//intialize score/click state
let correctClicks = 0;
let score = pointTotal(game, correctClicks);


//Timer Config
//sourced from: https://jsfiddle.net/wr1ua0db/17/
//change duration to be equal to the games time property. 5 minutes by default
let duration = game.time;
let timer = duration, minutes, seconds;
let myInterval = setInterval(function () { //eslint-disable-line
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.textContent = minutes + ':' + seconds;

    //when timer is finished, clears interval and ends game
    if (--timer < 0) {
        doneFunction(game, score);
        clearInterval(myInterval);
    }
}, 1000);


puzzle.hiddenObjects.forEach(object => {
    game.foundObjects.push({
        id: object.id,
        hasBeenFound: false
    });

    const clickyClue = document.createElement('span');
    clickyClue.textContent = object.clue;

    clues.append(clickyClue);

    const clicky = document.createElement('div');
    const clickyImg = document.createElement('img');
    clickyImg.classList.add('clicky-image');

    clickyImg.src = object.image;
    clicky.style.top = object.map.top;
    clicky.style.left = object.map.left;

    clicky.append(clickyImg);
    clicky.classList.add('clicky');


    if (game.difficulty === 'baby') {
        clicky.classList.add('baby');
    }


    clicky.addEventListener('click', () => {
        
        const matchingIds = findById(game.foundObjects, object.id);
        matchingIds.hasBeenFound = true;
        clickyClue.style.textDecoration = 'line-through';
        correctClicks++;
        score = pointTotal(game, correctClicks);
        currentScore.textContent = score;
        clicky.classList.add('disabled');
        clickyImg.classList.add('drop-shadow');
        
        if (allClickiesFound()) {
            doneFunction(game, score); 
            clearInterval(myInterval);
        }

    });

    elPuzzle.append(clicky);
    scoreBox.append(currentScore);

});

//changed image to elPuzzle
elPuzzle.addEventListener('click', () => {
    game.misclicks++;
    score = pointTotal(game, correctClicks);
    currentScore.textContent = score;
});


