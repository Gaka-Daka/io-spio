import { getUser, logout } from './local-storage-utils.js';


export function findById(array, id) {
    return array.find(item => item.id === id);
}

export function renderProfile() {
    const header = document.querySelector('header');
    const user = getUser();

    const divHeader = document.createElement('div');
    divHeader.classList.add('header-container');

    const logo = document.createElement('img');
    logo.classList.add('logo');
    logo.src = '../assets/logo.png';

    const nav = document.createElement('div');
    nav.classList.add('header-nav');

    const aInstructions = document.createElement('a');
    aInstructions.classList.add('nav-links');
    aInstructions.href = '../game-config/index.html';
    aInstructions.textContent = 'Instructions';

    const aCredits = document.createElement('a');
    aCredits.classList.add('nav-links');
    aCredits.href = '../credits/index.html';
    aCredits.textContent = 'Credits';

    const profile = document.createElement('div');
    profile.classList.add('profile');

    const username = document.createElement('div');
    username.classList.add('username');
    username.textContent = 'Hello,';

    const spanUsername = document.createElement('span');
    spanUsername.classList.add('insert-username');
    spanUsername.textContent = user.username;

    const button = document.createElement('button');
    button.classList.add('logout-button');
    button.textContent = 'Logout';

    button.addEventListener('click', () => {
        logout();
        window.location.href = '../index.html';
    });

    username.append(spanUsername);
    nav.append(aInstructions, aCredits);
    profile.append(username, button);
    divHeader.append(logo, nav, profile);
    header.append(divHeader);
}

export function renderGuest() {
    const header = document.querySelector('header');

    const divHeader = document.createElement('div');
    divHeader.classList.add('header-container');

    const logo = document.createElement('img');
    logo.classList.add('logo');
    logo.src = '../assets/logo.png';


    const nav = document.createElement('div');
    nav.classList.add('header-nav');

    const aInstructions = document.createElement('a');
    aInstructions.classList.add('nav-links');
    aInstructions.href = '../game-config/index.html';
    aInstructions.textContent = 'Instructions';

    const aCredits = document.createElement('a');
    aCredits.classList.add('nav-links');
    aCredits.href = '../credits/index.html';
    aCredits.textContent = 'Credits';

    const profile = document.createElement('div');
    profile.classList.add('profile');

    const username = document.createElement('div');
    username.classList.add('username');
    username.textContent = 'Hello, Guest';

    const button = document.createElement('button');
    button.classList.add('logout-button');
    button.textContent = 'Logout';

    button.addEventListener('click', () => {
        logout();
        window.location.href = '../index.html';
    });

    nav.append(aInstructions, aCredits);
    profile.append(username, button);
    divHeader.append(logo, nav, profile);
    header.append(divHeader);
}

export function displayTime(timeAsSec) {
    let minutes = Math.floor(timeAsSec / 60);
    let seconds = Math.floor(timeAsSec % 60);

    if (minutes < 10){
        minutes = '0' + minutes;
    } 
    if (seconds < 10){
        seconds = '0' + seconds;
    }
    const timeDisplay = minutes + ':' + seconds; 
    return timeDisplay;
}