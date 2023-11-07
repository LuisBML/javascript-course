'use strict';
//////////////////////// Coding Challenge 1 //////////////////////
console.log("------------  Coding Challenge 1  ----------------");
const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section! 
    answers: new Array(4).fill(0),
    registerNewAnswer: function () {
        const message = `${this.question}\n${this.options.join("\n")}(Write option number)`;
        const userInput = Number(prompt(message));
        if (this.answers[userInput] !== undefined) {
            this.answers[userInput]++;
            this.displayResults();
        } else {
            console.log("Wrong option number!");
        }
    },
    displayResults: function (type = "array") {
        if (type === "string") {
            console.log(`Poll results are ${this.answers.join(", ")}.`);
        } else {
            console.log(this.answers);
        }
    }
};

poll.displayResults.call({ answers: [6, 9, 3] }, "string");



document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll))

//////////////////////// Coding Challenge 2 //////////////////////
console.log("------------  Coding Challenge 2  ----------------");

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    header.addEventListener('click', function () {
        header.style.color = 'blue';
    })
})();