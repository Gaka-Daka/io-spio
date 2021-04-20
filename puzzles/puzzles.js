import { findById } from '../utils.js';
import { puzzles } from '../data.js';
import { getUser, updateUser } from '../local-storage-utils.js';
import { getGame, updateGame, createGame } from '../game-utils.js';


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
  
    var myInterval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
  
        display.textContent = minutes + ':' + seconds;
  
        if (--timer < 0) {
            clearInterval(myInterval);
            doneFunction();
        }
    }, 1000);
}
  
window.onload = function() {
    //time in seconds
    var time = 300, display = document.querySelector('#time');
    startTimer(time, display);
};
  
function doneFunction(){
    console.log('done !');
}
// setTimeout(function(){ alert("Hello"); }, 3000);
//sourced from: https://jsfiddle.net/wr1ua0db/17/

const params = new URLSearchParams(window.location.search);
const clues = document.querySelector('#item-list');
const puzzleId = params.get('id');
const puzzle = findById(puzzles, puzzleId);

const game = createGame();

const elTitle = document.querySelector('#puzzle-title');
const elPuzzle = document.querySelector('#puzzle');

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
        
        
    });

    elPuzzle.append(clicky);

    
});

image.addEventListener('click', () => {
    game.misclicks++;
    
});







elPuzzle.append(image);







