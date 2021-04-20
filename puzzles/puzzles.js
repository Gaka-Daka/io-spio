import { findById } from '../utils.js';
import { puzzles } from '../data.js';
import { pointsGained, pointTotal } from '../results/results.js';
import { getGame, updateGame, createGame } from '../game-utils.js';


//sourced from: https://jsfiddle.net/wr1ua0db/17/
let duration = 20;
const display = document.querySelector('#time');

let timer = duration, minutes, seconds;
  
let myInterval = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
        doneFunction();
    }
}, 1000);


function doneFunction(){
    console.log('done !');

    const endGameSpan = document.createElement('span');
    const moveOn = document.createElement('button');
    moveOn.textContent = 'Go to Results';
    elPuzzle.append(endGameSpan, moveOn);
    clearInterval(myInterval);
    updateGame(game);  
}


//let correctClicks = 0;

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

//const score = pointTotal(game, correctClicks); 

elTitle.textContent = puzzle.title;

const image = document.createElement('img');
image.src = puzzle.image;

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

    clicky.addEventListener('click', () => {
        const matchingIds = findById(game.foundObjects, object.id);
        matchingIds.hasBeenFound = true;
        clickyClue.style.textDecoration = 'line-through';
        //correctClicks = pointsGained(game, correctClicks);
        //currentScore.textContent = score;
          
        
        if (allClickiesFound()) doneFunction();

    });

    elPuzzle.append(clicky);
    scoreBox.append(currentScore, mistakes);
    
});

image.addEventListener('click', () => {
    game.misclicks++;
    //currentScore.textContent = score;
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