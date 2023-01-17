'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0;

btnRoll.addEventListener('click', function () {
  const diceEl = Math.floor(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `dice-${diceEl}.png`;

  if (diceEl !== 1) {
    currentScore += diceEl;
    currentPlayer0.textContent = currentScore;
  } else {
    currentPlayer1.textContent = currentScore;
  }
});
