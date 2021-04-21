import { findById, renderProfile } from '../utils.js';
import { puzzles } from '../data.js';
import { updateGame, createGame, getGame } from '../game-utils.js';

renderProfile();


function pointTotal(game, correctClicks) {
    let score = (correctClicks * 100) - (game.misclicks * 10);
    return score;
}
//change game to get game because we created it in the config page
let game = getGame();
if (!game) {
    game = createGame();

    // if no game exists because the user did not select settings and create a game, create a game. Will have default settings.
}



let duration = game.time;
//change duration to be equal to the games time property. 5 minutes by default
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
//sourced from: https://jsfiddle.net/wr1ua0db/17/

function doneFunction() {
    const endGameSpan = document.createElement('span');
    const moveOn = document.createElement('button');
    moveOn.textContent = 'Go to Results';

    const clickies = document.querySelectorAll('.clicky');
    for (let clicky of clickies) {
        clicky.classList.add('disabled');
    }
    // image.classList.add('disabled');

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

game.puzzle = puzzle.id;
//add puzzle id to game object so it can be referenced on results page 



const elTitle = document.querySelector('#puzzle-title');
const elPuzzle = document.querySelector('#puzzle');
const scoreBox = document.querySelector('#timer');
const currentScore = document.getElementById('score');
const mistakes = document.getElementById('WRONG');

let correctClicks = 0;
let score = pointTotal(game, correctClicks);

elTitle.textContent = puzzle.title;

// const image = document.createElement('img');
// image.classList.add('puzzle-map');
// image.src = puzzle.image;

//adding background image to section
elPuzzle.style.backgroundImage = `url(${puzzle.image}`;

// image.style.width = '1000px';

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
    clickyImg.classList.add("clicky-image")

    clickyImg.src = object.image
    // clicky.img = object.img;
    clicky.style.top = object.map.top;
    clicky.style.left = object.map.left;

    clicky.append(clickyImg)
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
        if (allClickiesFound()) doneFunction();

    });

    elPuzzle.append(clicky);
    // elPuzzle.append(clicky, clickyImg);
    scoreBox.append(currentScore, mistakes);

});

//changed image to elPuzzle
elPuzzle.addEventListener('click', () => {
    game.misclicks++;
    score = pointTotal(game, correctClicks);
    currentScore.textContent = score;
});

// elPuzzle.append(image);

//function to cause push of misclicks after timer runs out or all items found
function allClickiesFound() {

    for (let foundObject of game.foundObjects) {
        if (foundObject.hasBeenFound !== true) {
            return false;
        }
    }
    return true;
}

