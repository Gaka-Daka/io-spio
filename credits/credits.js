import { renderProfile } from '../utils.js';

renderProfile();

const kat = document.querySelector('.kat-photo');
const daniella = document.querySelector('.d-photo');
const kalan = document.querySelector('.kalan-photo');
const gabriel = document.querySelector('.gabriel-photo');

const katDescript = document.getElementById('kat-description');
const kalanDescript = document.getElementById('kalan-description');
const danDescript = document.getElementById('daniella-description');
const gabDescript = document.getElementById('gabriel-description');

const kalClue = document.getElementById('kal-clue')
const katClue = document.getElementById('kat-clue')
const danClue = document.getElementById('dan-clue')
const gabClue = document.getElementById('gab-clue')

kat.addEventListener('click', () => {
    kat.classList.add('drop-shadow');
    katDescript.classList.remove('hidden');
    katClue.classList.add('line-through');
});

daniella.addEventListener('click', () => {
    daniella.classList.add('drop-shadow');
    danDescript.classList.remove('hidden');
    danClue.classList.add('line-through');

});

kalan.addEventListener('click', () => {
    kalan.classList.add('drop-shadow');
    kalanDescript.classList.remove('hidden');
    kalClue.classList.add('line-through');

});

gabriel.addEventListener('click', () => {
    gabriel.classList.add('drop-shadow');
    gabDescript.classList.remove('hidden');
    gabClue.classList.add('line-through');

});
