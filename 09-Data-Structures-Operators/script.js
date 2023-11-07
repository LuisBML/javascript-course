'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

///////////////////////////////////////////////////////
///////////// Coding Challenge #1 /////////////////////
console.log('--------------- Coding Challenge #1 -------------------');
const game = {
  team1: 'Bayern Munich', team2: 'Borrussia Dortmund', players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ], [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
    'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// 2
const [gk, ...fieldPlayers] = players1
console.log(gk, fieldPlayers);

// 3
const allPlayers = [...players1, ...players2]
console.log(allPlayers);

// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
console.log(players1Final);

// 5
const { team1, x: draw, team2 } = game.odds
console.log(team1, draw, team2);

// 6
const printGoals = function (...players) {
  console.log(players, players.length);
}

printGoals(...game.scored)

// 7
team1 < team2 && console.log('Team 1 is more likely to win.');
team1 > team2 && console.log('Team 2 is more likely to win.');

///////////////////////////////////////////////////////
///////////// Coding Challenge #2 /////////////////////
console.log('--------------- Coding Challenge #2 -------------------');

// 1
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

// 2
const odds = Object.values(game.odds);
let totalOdds = 0;
for (const odd of odds) {
  totalOdds += odd;
}
const avgOdds = totalOdds / (odds.length)
console.log(`Average Odd: ${avgOdds}`);

// 3
for (const [team, odd] of Object.entries(game.odds)) {
  console.log(`${game[team] ? "Odd of victory " + game[team] : "Odd of draw"}: ${odd}`);
}

// 4
const scorers = {}

for (const player of game.scored) {
  if (Object.keys(scorers).includes(player)) {
    scorers[player]++;
  } else {
    scorers[player] = 1;
  }

  // Another solution
  // scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

///////////////////////////////////////////////////////
///////////// Coding Challenge #3 /////////////////////
console.log('--------------- Coding Challenge #3 -------------------');

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1
const events = [...new Set(gameEvents.values())]
console.log(events);

// 2
gameEvents.delete(64)
console.log(gameEvents);

// 3
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

// 4
for (const [minute, event] of gameEvents.entries()) {
  const halfStr = minute > 45 ? "[SECOND HALF]" : "[FIRST HALF]"
  console.log(`${halfStr} ${minute}: ${event}`);
}

///////////////////////////////////////////////////////
///////////// Coding Challenge #4 /////////////////////
console.log('--------------- Coding Challenge #4 -------------------');

// 1

const btn = document.createElement('button');
const textarea = document.createElement('textarea')
document.body.append(textarea);
document.body.append(btn);

btn.addEventListener('click', function () {
  const words = textarea.value.split("\n")

  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    const [first, second] = word.trim().toLowerCase().split('_');
    const output = `${first}${second[0].toUpperCase()}${second.slice(1)}`
    console.log(`${output.padEnd(20)}${'✅'.repeat(index + 1)}`);
  }
});

