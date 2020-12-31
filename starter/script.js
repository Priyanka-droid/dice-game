'use strict';
//
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  //1.generate a random dice roll
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;
    console.log(diceNum);
    //3.  check for rolled 1,if true switch to next player
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
      //add dice to current score
    } else {
      // if (activePlayer == 0) {
      //   activePlayer = 1;
      //   currentScore = Number(current1El.textContent);
      //   current0El.textContent = 0;
      // } else {
      //   activePlayer = 0;
      //   currentScore = Number(current0El.textContent);
      //   current1El.textContent = 0;
      // }
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

//hold button
btnHold.addEventListener('click', function () {
  //add current score to active players score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //switch to next player
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      console.log(`player ${activePlayer} win`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
});
