import { puzzles } from '../data.js';
import { createGame, updateGame } from '../game-utils.js';

const contentsList = document.querySelector ('ul');



function generateTableOfContents() {
    puzzles.forEach(puzzle => {
        const puzzleLink = document.createElement('a');
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
