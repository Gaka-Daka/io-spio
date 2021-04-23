import { findById, displayTime } from '../utils.js';
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
game.completeTime = 0;
//initialize game objects complete time property so we can reference it when rendering results results. It will track every second elapsed after starting the timer.
let duration = game.time;


   
//start an interval that will display the seconds passed into it as minutes and seconds.
let myInterval = setInterval(function() {  

    const timeDisplay = displayTime(duration);
    //turn the duration into a string of minutes and seconds
    --duration;
    //decrement the duration every second
    game.completeTime++;
    //increment the game objects completed time property every second
    display.textContent = timeDisplay;
    //update the display to reflect the current time as minutes and seconds   
    if (duration < 0) {
        doneFunction(game, score);
        clearInterval(myInterval);
    }
          
}, 1000);

//inpired by https://jsfiddle.net/wr1ua0db/17/


//for each hidden object, create foundobjects array - to push into localStorage later
puzzle.hiddenObjects.forEach(object => {
    game.foundObjects.push({
        id: object.id,
        hasBeenFound: false
    });

    //render clues into item list below puzzle image
    const clickyClue = document.createElement('span');
    clickyClue.innerHTML = '\u00A0';
    clickyClue.textContent = object.clue;
    clues.append(clickyClue);

    //create clickies div
    const clickyDiv = document.createElement('div');
    clickyDiv.style.top = object.map.top;
    clickyDiv.style.left = object.map.left;

    //create clickies image
    const clickyImg = document.createElement('img');
    clickyImg.classList.add('clicky-image');
    clickyImg.src = object.image;

    //put img into clickies div
    clickyDiv.append(clickyImg);
    clickyDiv.classList.add('clicky');

    //default is normal, BUT if baby difficulty is selected, add baby properties
    if (game.difficulty === 'baby') {
        clickyDiv.classList.add('baby');
    }

    //clicky game logic
    clickyDiv.addEventListener('click', () => {

        //matching 'localStorage' data to whatever clicky is selected (current object from data - on line 55)
        const matchingIds = findById(game.foundObjects, object.id);

        //change hasBeenFound in 'localStorage' property to true
        matchingIds.hasBeenFound = true;

        //when clicky is selected, CSS cross out in item list, outline and disable clicky
        clickyClue.style.textDecoration = 'line-through';
        clickyDiv.classList.add('disabled');
        clickyImg.classList.add('drop-shadow');

        //increment correctClicks state
        correctClicks++;

        //calculate pointTotal and display on page
        score = pointTotal(game, correctClicks);
        currentScore.textContent = score;

        //end game logic
        //disabling clickies and image, add results button to redirect to results page, stop timer, and span appears...somewhere(hidden dani?) hi Dani :)
        //update game state with score --> push to localStorage
        if (allClickiesFound(game)) {
            doneFunction(game, score);
            clearInterval(myInterval);
        }
    });

    elPuzzle.append(clickyDiv);
    scoreBox.append(currentScore);
});

//game logic, part 2
//update score with misclicks
elPuzzle.addEventListener('click', () => {
    game.misclicks++;
    score = pointTotal(game, correctClicks);
    currentScore.textContent = score;
});


