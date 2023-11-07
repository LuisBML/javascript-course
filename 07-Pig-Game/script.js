'use strict';

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const imgDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer;
let scores;
let currentScore;
let gameFinished;

function setup() {
    imgDice.classList.add('hidden');
    scores = [0, 0];
    currentScore = 0;
    gameFinished = false;
    activePlayer = 0;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0
    current1Element.textContent = 0

    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
}

setup();

function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    // Switch to the next player
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (!gameFinished) {

        const number = Math.trunc(Math.random() * 6) + 1;

        // Display dice image
        imgDice.classList.remove('hidden');
        imgDice.src = `dice-${number}.png`;

        if (number !== 1) {
            // Add dice to the current score\
            currentScore += number;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function () {
    if (!gameFinished) {

        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 10) {
            gameFinished = true;
            imgDice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', setup);