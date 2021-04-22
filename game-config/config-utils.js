import { puzzles } from '../data.js';

const contentsList = document.querySelector('ul');

export function generateTableOfContents() {
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
