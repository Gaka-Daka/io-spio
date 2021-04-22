import { puzzles } from '../data.js';

import { renderProfile } from '../utils.js';

import { createGame, updateGame } from '../game-utils.js';
import { checkIfAUserIsLoggedIn } from '../local-storage-utils.js';
checkIfAUserIsLoggedIn();
renderProfile();
const contentsList = document.querySelector('ul');

function generateTableOfContents() {
    puzzles.forEach(puzzle => {
        const puzzleLink = document.createElement('a');
        puzzleLink.classList.add;
        puzzleLink.textContent = puzzle.title;
        puzzleLink.href = `../puzzles/?id=${puzzle.id}`;
        const tableItem = document.createElement('li');
        tableItem.append(puzzleLink);
        contentsList.append(tableItem);
    });
}

generateTableOfContents();

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const time = formData.get('time');
    const difficulty = formData.get('difficulty');

    const game = createGame();
    game.time = Number(time) * 60;
    game.difficulty = difficulty;
    updateGame(game);

});

const audioButton = document.getElementById('audio');

audioButton.addEventListener('click', () => {
    window.open('../music', 'popUpWindow', 'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
});