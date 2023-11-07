'use strict';

// Functions
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`
}

const mexico = describeCountry("Mexico", "127", "Ciudad de México")

console.log(mexico)

// Function Declarations vs. Expressions
function percentageOfWorld1(population) {
    return `${(population * 100) / 8000}%`
}

const mexicoPopulationPercen = percentageOfWorld1(127)

console.log(mexicoPopulationPercen)

const percentageOfWorld2 = function (population) {
    return `${(population * 100) / 8000}%`
}

const chinaPopulationPercen = percentageOfWorld2(1441)

console.log(chinaPopulationPercen)

// Arrow Functions
const percentageOfWorld3 = population => `${(population * 100) / 8000}%`

console.log(percentageOfWorld3(1441))

// Functions Calling Other Functions
function describePopulation(country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)} of the world.`
}

console.log(describePopulation("China", 1412))

// Introduction to Arrays
const populations = [128, 30, 9, 7]

console.log(populations.length == 4 ? true : false);

const percenteges = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])]

console.log(percenteges);

// Basic Array Operations (Methods)
const neighbours = ["USA", "Belice", "Guatemala"]
neighbours.push("Utopia")
console.log(neighbours);
neighbours.pop("Utopia")
console.log(neighbours);

if (!neighbours.includes("Germany")) {
    console.log("Probably not a central European country :D");
}

const belizeIndex = neighbours.indexOf("Belice")
neighbours[belizeIndex] = "Belize"
console.log(neighbours);

// Introduction to Objects
const myCountry = {
    country: "Mexico",
    capital: "Ciudad de Mexico",
    language: "Spanish",
    population: 127,
    neighbours: ["USA", "Belize", "Guatemala"]
}

console.log(myCountry);

// Dot vs. Bracket Notation
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

myCountry.population += 2
myCountry["population"] -= 2

// Object Methods
myCountry.describe = function () {
    return `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`
}

console.log(myCountry.describe());

myCountry.checkIsland = function () {
    this.isIsland = this.neighbours.length ? false : true;
    return this.isIsland;
}

myCountry.checkIsland();

console.log(myCountry);

// Iteration: The for Loop
for (let index = 1; index <= 50; index++) {
    console.log(`Voter number ${index} is currently voting`);
}

// Looping Arrays, Breaking and Continuing
const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
    percentages2.push(percentageOfWorld1(populations[i]))
}

console.log(percentages2);

// Looping Backwards and Loops in Loops
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

for (let i = 0; i < listOfNeighbours.length; i++) {
    const neighbours = listOfNeighbours[i];
    for (let j = 0; j < neighbours.length; j++) {
        console.log(`Neighbour: ${neighbours[j]}`);
    }
}

// The while Loop
const percentages3 = [];

let counter = 0
while (counter !== populations.length) {
    percentages3.push(percentageOfWorld1(populations[counter]))
    counter++;
}

console.log(percentages3)

