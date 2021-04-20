import { findById } from '../utils.js';
import { puzzles } from '../data.js';
import { getUser, updateUser } from '../local-storage-utils.js';
import { getGame, updateGame, createGame } from '../game-utils.js';

const params = new URLSearchParams(window.location.search);

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

    const clicky = document.createElement('div');
    //change textContent to image
    clicky.textContent = object.id;
    clicky.style.top = object.map.top;
    clicky.style.left = object.map.left;

    clicky.addEventListener('click', () => {
        const matchingIds = findById(game.foundObjects, object.id);
        matchingIds.hasBeenFound = true;
    });

    elPuzzle.append(clicky);
});

image.addEventListener('click', () => {
});







elPuzzle.append(image);







