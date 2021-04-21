import { getUser, logout } from './local-storage-utils.js';


export function findById(array, id) {
    return array.find(item => item.id === id);
}

export function renderProfile() {
    const header = document.querySelector('header');
    const user = getUser();

    const logo = document.createElement('img');
    logo.classList.add('logo');
    logo.src = '../assets/';

    const nav = document.createElement('div');

    const aInstructions = document.createElement('a');
    aInstructions.href = '../game-config/index.html';
    aInstructions.textContent = 'Instructions';

    const aCredits = document.createElement('a');
    aCredits.href = '../credits/index.html';

    const profile = document.createElement('div');
    profile.classList.add('profile');

    const username = document.createElement('div');
    username.textContent = `Username: ${user.username}`;

    const button = document.createElement('button');
    button.textContent = 'Logout';

    button.addEventListener('click', () => {
        logout();
        window.location.href = '../index.html';
    });

    nav.append(aInstructions, aCredits);
    profile.append(username, button);
    header.append(logo, nav, profile);
}