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


function minutesSecond(time) {
    let minutes = Math.floor(time / 60);


    let seconds = Math.floor(time % 60);

    
    
    if (minutes < 10){
        minutes = '0' + minutes;
    } 
    if (seconds < 10){
        seconds = '0' + seconds;
    }
    const display = minutes + ':' + seconds; 
    return display;
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

    const completeTime = minutesSecond(game.completeTime);
    // const minutesToComplete = Math.floor(game.completeTime / 60);
    // const secondsToComplete = Math.floor((game.completeTime % 60) - 1);
    
    const tdCompleteTime = document.createElement('td');
    if (game.completeTime >= game.time) {
        
        tdCompleteTime.textContent = 'Incomplete';
    } else {
        tdCompleteTime.textContent = completeTime;
    }
    

   
    tr.append(tdUser, tdPuzzle, tdDifficulty, tdCompleteTime, tdScore);

    return tr;
}