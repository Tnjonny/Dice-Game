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

let scores, currentScore, activePlayers, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayers = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentPlayer0.textContent = 0;
  currentPlayer1.textContent = 0;

  dice.classList.add('hidden');
  players0.classList.remove('player--winner');
  players1.classList.remove('player--winner');
  players0.classList.add('player--active');
  players1.classList.remove('player--active');

  document.querySelector(`.player--0`).classList.remove('player--loser');
  document.querySelector(`.player--1`).classList.remove('player--loser');

  document.getElementById(`name--0`).textContent = 'Player 1';
  document.getElementById(`name--1`).textContent = 'Player 2';
}
init();

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

    if (scores[activePlayers] >= 10) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayers}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayers}`)
        .classList.remove('player--active');

      document.getElementById(`name--${activePlayers}`).textContent =
        'You Won 🏆';

      // 3. Check if lost
      if (!scores[activePlayers]) {
        document.getElementById(`name--1`).textContent = 'Loser 💀';
        document.querySelector(`.player--1`).classList.add('player--loser');
      }

      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
