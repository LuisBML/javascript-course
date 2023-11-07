// Values and Variables
const country = "Mexico";
const continenet = "America";
let population = 126.7;

console.log(country, continenet, population);

// Data Types
const isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// let, const and var
language = "Spanish";

// Basic Operators
let halfPopulation = population / 2;

const avgPopulation = 33

halfPopulation++;
console.log(halfPopulation);

const moreThanFinland = population > 6;

const moreThanAverage = population > avgPopulation;

const description = country + " is in " + continenet + " and its " + population + " million people speak " + language;

console.log(description);

// Strings and Template Literals
const newDescription = `${country} is in ${continenet} and it's ${population} million people speak ${language}`;

console.log(description);

// Taking Decisions: if / else Statements
if (population > avgPopulation) {
    console.log(`${country}'s population is above average`);
} else {
    console.log(`${country}'s population is ${avgPopulation - population} million below average`);
}

// Type Conversion and Coercion
const res = 4;  // '9' - '5';
const res2 = 617;  // '19' - '13' + '17';
const res3 = 23;  // '19' - '13' + 17;
const res4 = false;  // '123' < 57;
const res5 = 1143;  // 5 + 6 + '4' + 9 - 4 - 2;

// Equality Operators: == vs. ===
// let numNeighbours = Number(prompt('How many neighbour countries does your country have?'));

let numNeighbours = 1

if (numNeighbours === 1) {
    console.log('Only 1 border!');
} else if (numNeighbours > 1) {
    console.log('More than 1 border!');
} else {
    console.log('No borders');
}

// Logical Operators
if (language === "English" && (population < 50) && !isIsland) {
    console.log(`You should live in ${country}`);
} else {
    console.log(`${country} does not meet your criteria`);
}

// The switch Statement
switch (language) {
    case "Chinese":
    case "Mandarin":
        console.log("MOST number of native speakers!");
        break;
    case "Spanish":
        console.log("2nd place in number of native speakers");
        break;
    case "English":
        console.log("3rd place");
        break;
    case "Hindi":
        console.log("'Number 4");
        break;
    case "Arabic":
        console.log("5th most spoken language");
        break;
    default:
        console.log("Great language too :D");
        break;
}

// The Conditional (Ternary) Operator
const result_avg = population > 33 ? "above" : "below";

console.log(`${country}'s population is ${result_avg} average`);
