import { displayTime } from '../utils.js';

export function addTableRow(matchingItem) {
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




export function addResultTableRow(user, game) {
    
    
    const tr = document.createElement('tr');
    tr.classList.add('scores');
    const tdUser = document.createElement('td');
    tdUser.textContent = user.username;

    const tdPuzzle = document.createElement('td');
    const puzzleName = game.puzzle[0].toUpperCase() + game.puzzle.slice(1);
    tdPuzzle.textContent = puzzleName;

    const tdScore = document.createElement('td');
    tdScore.textContent = game.points;

    const tdDifficulty = document.createElement('td');
    tdDifficulty.textContent = game.difficulty;
    //save complete time as a string of minutes and seconds by passing it into the display time function
    //the complete time property on the game is always one second ahead of the timer. so subtract one.
    const completeTime = displayTime(game.completeTime - 1);
    
    
    const tdCompleteTime = document.createElement('td');
    //check if the complete time is greater than or equal to total time alloted for a puzzle. If it is return incomplete instead of a time

    tdCompleteTime.textContent = game.completeTime >= game.time 
        ? 'Incomplete' 
        : completeTime;
    

   
    tr.append(tdUser, tdPuzzle, tdDifficulty, tdCompleteTime, tdScore);

    return tr;
}