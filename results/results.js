import { puzzles } from '../data.js';
import { getGame } from '../game-utils.js';
import { checkIfAUserIsLoggedIn, getUser, updateUser } from '../local-storage-utils.js';
import { findById, renderProfile } from '../utils.js';
checkIfAUserIsLoggedIn();
renderProfile();

//pushing the previous game to the user object. will render results based on this

const user = getUser();

const game = getGame();


user.games.push(game);
console.log(user);

updateUser(user);

//^^
const foundTable = document.querySelector('#found-table');
const scoreBoard = document.querySelector('#scoreboard');
console.log(scoreBoard);
const hiddenObjects = puzzles[0].hiddenObjects;


for (let gameItem of game.foundObjects) {


    const matchingItem = findById(hiddenObjects, gameItem.id);

    if (gameItem.hasBeenFound === true) {

        const tr = addTableRow(matchingItem);
        foundTable.append(tr);
    }

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
function addResultTableRow(user, game) {
    const tr = document.createElement('tr');
    const tdUser = document.createElement('td');
    tdUser.textContent = user.username;

    const tdPuzzle = document.createElement('td');
    tdPuzzle.textContent = game.puzzle;

    const tdScore = document.createElement('td');
    tdScore.textContent = game.points;

    const tdDifficulty = document.createElement('td');
    tdDifficulty.textContent = game.difficulty;
   

    

    tr.append(tdUser, tdPuzzle, tdDifficulty ,tdScore);
    
    return tr;
}
for (let game of user.games){
    const score = addResultTableRow(user, game);
    scoreBoard.append(score);

}


