'use strict';

const players0 = document.querySelector('.player--0');
const players1 = document.querySelector('.player--1');

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

const scores = [0, 0];
let currentScore = 0;
let activePlayers = 0;
let playing = true;

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceEl = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceEl}.png`;

    if (diceEl !== 1) {
      currentScore += diceEl;
      document.getElementById(`current--${activePlayers}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

function switchPlayer() {
  document.getElementById(`current--${activePlayers}`).textContent = 0;
  activePlayers = activePlayers === 0 ? 1 : 0;
  currentScore = 0;
  players0.classList.toggle('player--active');
  players1.classList.toggle('player--active');
}

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add Current score o active players score
    scores[activePlayers] += currentScore;
    document.getElementById(`score--${activePlayers}`).textContent =
      scores[activePlayers];

    //2. Check if there's a winner

    if (scores[activePlayers] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayers}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayers}`)
        .classList.remove('player--active');

      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  location.reload();
});
