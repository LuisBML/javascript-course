'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-09-30T17:01:17.194Z',
    '2023-10-01T23:36:17.929Z',
    '2023-10-02T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'es-MX', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formateMovementDate = function name(acc_date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), acc_date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(acc_date);
}

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(
    locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movements = account.movements;

  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;

  moves.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.movementsDates[i]);
    const displayDate = formateMovementDate(date, account.locale);

    const formattedMov = formatCurrency(movement, account.locale, account.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);

  });
}


const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((sum, movement) => sum + movement);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(account.balance, account.locale, account.currency);
}


const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((sum, movement) => sum + movement, 0);

  const outcomes = account.movements
    .filter(movement => movement < 0)
    .reduce((sum, movement) => sum + movement, 0);

  const interests = account.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((sum, interest) => sum + interest, 0);

  labelSumIn.textContent = formatCurrency(incomes, account.locale, account.currency);
  labelSumOut.textContent = formatCurrency(Math.abs(outcomes), account.locale, account.currency);
  labelSumInterest.textContent = formatCurrency(interests, account.locale, account.currency);
};

// input: Jessica Davis, output: jd
const createUsernames = function (user_accounts) {
  user_accounts.forEach(function (user_account) {
    user_account.username = user_account.owner
      .toLowerCase()
      .split(' ')
      .map(element => element[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
}

////////////////////////////////////////
// ********* Login ********* //
////////////////////////////////////////
const startLogOutTimer = function () {
  let time = 300;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount;
let bankTimer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault()

  currentAccount = accounts.find(account => account.username === inputLoginUsername.value)


  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = 100;

    // Create current date and time
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    setInterval(function () {
      const now = new Date();
      // const locale = navigator.language;
      labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    }, 1000);

    // Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    // Remove focus
    inputLoginPin.blur()


  }

  if (bankTimer) {
    clearInterval(bankTimer);
  }

  bankTimer = startLogOutTimer();

  updateUI(currentAccount);

});

////////////////////////////////////////
// ********* Transfer money ********* //
////////////////////////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(account => account.username === inputTransferTo.value);

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (amount > 0 && receiverAccount && amount <= currentAccount.balance && receiverAccount.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset timer
    clearInterval(bankTimer);
    bankTimer = startLogOutTimer();
  }


});

////////////////////////////////////////
// ********* Loan money ********* //
////////////////////////////////////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(move => move >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      // Loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 2500);

    // Reset timer
    clearInterval(bankTimer);
    bankTimer = startLogOutTimer();

    inputLoanAmount.value = '';
  }
});

////////////////////////////////////////
// ********* Sort movements ********* //
////////////////////////////////////////
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

////////////////////////////////////////
// ********* Close account ********* //
////////////////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault()

  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(account => account.username === currentAccount.username);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }

});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
