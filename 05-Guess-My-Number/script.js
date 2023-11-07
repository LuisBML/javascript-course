'use strict';

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

function setScore(msg) {
    if (score === 1) {
        setMessage('You lost the game :(');
        document.querySelector('.score').textContent = 0;
        return
    }
    setMessage(msg);
    score--;
    document.querySelector('.score').textContent = score;
}

function checkHighscore() {
    const highscore = document.querySelector('.highscore').textContent;
    if (score > highscore) {
        document.querySelector('.highscore').textContent = score;
    }
}

function setMessage(msg) {
    document.querySelector('.message').textContent = msg;
}

checkBtn.addEventListener('click', function () {
    const guessNum = Number(document.querySelector('.guess').value);

    if (!guessNum) {
        messageParagraph.textContent = 'No Number!';
    } else if (guessNum === secretNum) {
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        setMessage('Correct Number!');
        document.querySelector('.number').textContent = secretNum;
        checkHighscore()
    } else if (guessNum > secretNum) {
        setScore('Too high!');
    } else if (guessNum < secretNum) {
        setScore('Too low!');
    }
});

againBtn.addEventListener('click', function () {
    score = 20;
    secretNum = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('body').style.backgroundColor = '#222';
    setMessage('Start guessing...');
    document.querySelector('.guess').value = ''
});