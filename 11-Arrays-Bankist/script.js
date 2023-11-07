'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;

  moves.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${movement}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);

  });
}


const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((sum, movement) => sum + movement);
  account.balance = balance;
  labelBalance.textContent = `${account.balance}€`;
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

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  labelSumInterest.textContent = `${interests}€`;
};


const createUsernames = function (user_accounts) {
  user_accounts.forEach(function (user_account) {
    user_account.username = user_account.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(element => element[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (account) {
  displayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
}
////////////////////////////////////////
// ********* Login ********* //
////////////////////////////////////////
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault()

  currentAccount = accounts.find(account => account.username === inputLoginUsername.value)


  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    // Remove focus
    inputLoginPin.blur()

    updateUI(currentAccount);

  }
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

    updateUI(currentAccount);
  }


});

////////////////////////////////////////
// ********* Loan money ********* //
////////////////////////////////////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(move => move >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

////////////////////////////////////////
// ********* Sort movements ********* //
////////////////////////////////////////
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
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
/////////////////////  LECTURES /////////////////

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// map()
const euroToUsd = 1.1;
const movementUSD = movements.map(movement => movement * euroToUsd);
console.log(movementUSD);

// filter()
const deposits = movements.filter(movement => movement > 0);
const withdrawals = movements.filter(movement => movement < 0);
console.log(deposits);
console.log(withdrawals);


// reduce()
const balance = movements.reduce(function (sum, movement) {
  return sum + movement
}, 0);

console.log(balance);

// reduce() - Max value
const maxValue = movements.reduce(function (sum, movement) {
  return sum < movement ? movement : sum
}, movements[0]);
console.log(maxValue);

// find()
const accountJessica = accounts.find(account => account.owner == 'Jessica Davis')

console.log(accountJessica);

// includes() - Equality
console.log(movements);
console.log(`Movements includes -130: ${movements.includes(-130)}`);

// some() - Condition
const anyDeposits = movements.some(movement => movement > 0);
console.log(anyDeposits);

// every()
console.log(`Every: ${movements.every(movement => movement > 0)}`);

// flap(), flapMap()
const myArray = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(myArray.flat());

const myArray2 = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(myArray2.flat(2));  // depth = 2

// sort()
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// sort() with Numbers
movements.sort((a, b) => {
  // Switch order
  if (a > b)
    return 1;
  // Keep order
  return -1;
});
console.log(movements);

// Descending
movements.sort((a, b) => {
  // Keep order
  if (a > b)
    return -1;
  // Switch order
  return 1;
});
console.log(movements);

// Simplified ascending
movements.sort((a, b) => a - b);
console.log(movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////////// Array Methods Practice /////////////////
console.log('****Array Methods Practice****');

// 1.
const bankDepositSum = accounts
  .flatMap(account => account.movements)
  .filter(move => move > 0)
  .reduce((sum, value) => sum + value, 0);
console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(account => account.movements)
//   .filter(move => move >= 1000).length;

// 2.
const numDeposits1000 = accounts
  .flatMap(account => account.movements)
  .reduce((count, value) => value >= 1000 ? ++count : count, 0);

console.log(numDeposits1000);

// 3.
const sums = accounts
  .flatMap(account => account.movements)
  .reduce((object, value) => {
    // value > 0 ? object.deposits += value : object.withdrawals += value;
    object[value > 0 ? 'deposits' : 'withdrawals'] += value;
    return object;
  }, { deposits: 0, withdrawals: 0 });

console.log(sums);

// 4.
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1)
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLocaleLowerCase()
    .split(' ')
    .map(word => exceptions.includes(word) ? word : capitalize(word))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('and this is a nice title'));

/////////////////////////////////////////////////
///////////// Coding Challenge #1 /////////////
console.log('-------- Coding Challenge #1 --------');

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = [...dogsJulia].slice(1, -2)
  const dogs = [...dogsJuliaCopy, ...dogsKate]
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

///////////// Coding Challenge #2 /////////////
console.log('-------- Coding Challenge #2 --------');

const dogsAges = [5, 2, 4, 1, 15, 8, 3];

function calcAverageHumanAge(ages) {
  const humanAges = ages.map(function (age) {
    if (age <= 2) {
      return 2 * age
    }
    return 16 + age * 4
  });

  const moreThan18 = humanAges.filter(age => age >= 18);

  const averageHumanAge = moreThan18.reduce((sum, age) => sum + age, 0) / moreThan18.length;

  // Alternative way for calculating the average
  // const averageHumanAge = moreThan18.reduce((sum, age, i, arr) => sum + age / arr.length, 0);

  console.log(humanAges);
  console.log(moreThan18);
  console.log(`Average human age: ${averageHumanAge}`);
}

calcAverageHumanAge(dogsAges);

///////////// Coding Challenge #3 ////////////////////
console.log('-------- Coding Challenge #3 --------');
const calcAverageHumanAge2 = function (ages) {
  const averageHumanAge = ages
    .map(age => age <= 2 ? 2 * age : 16 + age * 4)
    .filter(age => age >= 18)
    .reduce((sum, age, i, arr) => sum + age / arr.length, 0);

  return averageHumanAge
}

console.log(`Average human age: ${calcAverageHumanAge2(dogsAges)}`);

///////////// Coding Challenge #4 ////////////////////
console.log('-------- Coding Challenge #4 --------');
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28)
});
console.log(dogs);

// 2
const foodVerification = function (dog) {
  const above = dog.recommendedFood + dog.recommendedFood * .10
  const below = dog.recommendedFood - dog.recommendedFood * .10

  if (dog.curFood < below) {
    return 'little';
  } else if (dog.curFood > above) {
    return 'much';
  } else if (dog.curFood === dog.recommendedFood) {
    return 'exactly';
  }
  return 'ok';
};
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahsDog);
console.log(`Sarah's dog eat too ${foodVerification(sarahsDog)}!`);

// 3
const ownersEatTooMuch = [];
const ownersEatTooLittle = [];

for (const dog of dogs) {
  if (foodVerification(dog) === 'much') {
    ownersEatTooMuch.push(...dog.owners)
  } else if (foodVerification(dog) === 'little') {
    ownersEatTooLittle.push(...dog.owners)
  }
}

console.log(`Too much: ${ownersEatTooMuch}`);
console.log(`Too little: ${ownersEatTooLittle}`);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5
const foodAmounts = dogs.map(dog => foodVerification(dog));

console.log(foodAmounts.includes('exactly'));

// 6
console.log(foodAmounts.includes('ok'));

// 7
const okDogs = [];
for (const dog of dogs) {
  if (foodVerification(dog) === 'ok') {
    okDogs.push(dog)
  }
}
console.log(okDogs);

// 8
const dogsCopy = [...dogs];
dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);

