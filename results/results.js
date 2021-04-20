import { puzzles } from '../data.js';
import { getGame } from '../game-utils.js';
import { findById } from '../utils.js';



const foundTable = document.querySelector('#found-table');
const game = getGame();

const hiddenObjects = puzzles[0].hiddenObjects;


for (let gameItem of game.foundObjects) {
   
    
    const matchingItem = findById(hiddenObjects, gameItem.id);
    
    const tr = addTableRow(matchingItem);
  
    foundTable.append(tr);
}

function addTableRow(matchingItem) {
    const tr = document.createElement('tr');
    const tdFoundObject = document.createElement('td');
    const tdDescription = document.createElement('td');
    const imgFoundObject = document.createElement('img');

    imgFoundObject.src = matchingItem.image;
    tdDescription.textContent = matchingItem.description;

    tdFoundObject.append(imgFoundObject);
    tr.append(tdFoundObject, tdDescription);
    return tr;
}