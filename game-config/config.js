import { puzzles } from '../data.js';
import { renderProfile } from '../utils.js';

renderProfile();
const contentsList = document.querySelector('ul');

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