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

    tr.append(tdUser, tdPuzzle, tdDifficulty, tdScore);

    return tr;
}