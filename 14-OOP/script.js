'use strict';

//////// Constructor function   ////////
console.log('------Constructor function ------');
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

const matilda = new Person('Matilda', 2017);

// Prototypes
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}

console.log(matilda);
matilda.calcAge();
console.log(Person.prototype.isPrototypeOf(matilda));

// static method
Person.hey = function () {
    console.log('Hello there');
};

Person.hey();

//////// Class declaration   ////////
console.log('\n------ Class declaration -------');
class PersonClass {
    constructor(inputName, birthYear) {
        this.fullName = inputName;
        this.birthYear = birthYear;
    }

    // Instance methods
    // Methods will be added to .prototype proeprty
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    // Set a property that already exists
    set fullName(name) {
        if (name.includes(' ')) {
            this._fullName = name;
        } else {
            console.log(`${name} is not a full name`);
        }
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('Hello there');
    }


}

const jessica = new PersonClass('Jessica Jones', 1996);
console.log(jessica);
console.log(jessica.fullName);
jessica.calcAge();
PersonClass.hey();

//////// Object.create   ////////
console.log('\n------ Object.create ------');
const PersonaProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

const sarah = Object.create(PersonaProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
console.log(sarah);

//////// Inheritance Constructor functions   ////////
console.log('\n----- Inheritance Constructor functions ------');

const PersonBase = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

PersonBase.prototype.calcAge = function (params) {
    console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
    PersonBase.call(this, firstName, birthYear)
    this.course = course;
};

Student.prototype = Object.create(PersonBase.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

//////// Inheritance ES6 Classes   ////////
console.log('\n----- Inheritance ES6 Classes ------');

class PersonClassBase {
    constructor(inputName, birthYear) {
        this.fullName = inputName;
        this.birthYear = birthYear;
    }

    // Instance methods
    // Methods will be added to .prototype proeprty
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.fullName}`);
    }

    // Set a property that already exists
    set fullName(name) {
        if (name.includes(' ')) {
            this._fullName = name;
        } else {
            console.log(`${name} is not a full name`);
        }
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('Hello there');
    }


}

class StudentClass extends PersonClassBase {
    constructor(inputName, birthYear, course) {
        super(inputName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    };
}

const martha = new StudentClass('Marth Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

//////// Another class example   ////////
console.log('\n----- Another class example ------');
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        // protected property
        this._movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}`);
    }

    deposit(value) {
        this._movements.push(value);
    }

    withdraw(value) {
        this.deposit(-value);
    }
}

const account1 = new Account('Jim', 'EUR', 1111);
account1.deposit(250);
account1.withdraw(140);
console.log(account1);

/////////////////////////////////
////// Coding Challenge #1 //////
/////////////////////////////////

console.log('\n////// Coding Challenge #1 //////');
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`Accelerate: ${this.make} is going at ${this.speed} km/h`);
}

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`Brake: ${this.make} is going at ${this.speed} km/h`);
}

const carOne = new Car('BMW', 120);
const carTwo = new Car('Mercedes', 95);

carOne.accelerate();
carOne.brake();
carTwo.accelerate();
carTwo.accelerate();

/////////////////////////////////
////// Coding Challenge #2 //////
/////////////////////////////////

console.log('\n////// Coding Challenge #2 //////');
class CarClass {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`Accelerate: ${this.make} is going at ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`Brake: ${this.make} is going at ${this.speed} km/h`);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(inputSpeed) {
        this.speed = inputSpeed * 1.6;
    }
}

const carThree = new CarClass('Ford', 120);
console.log(carThree.speedUS);
carThree.accelerate();
carThree.brake();
carThree.speedUS = 50;
console.log(carThree.speed);

/////////////////////////////////
////// Coding Challenge #3 //////
/////////////////////////////////

console.log('\n////// Coding Challenge #3 //////');

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const tesla = new EV('Tesla', 120, 10);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();


/////////////////////////////////
////// Coding Challenge #4 //////
/////////////////////////////////

console.log('\n////// Coding Challenge #4 //////');

class EVClass extends CarClass {
    constructor(make, speed, charge) {
        super(make, speed);
        this.charge = charge;
    }

    chargeBattery(chargeTo) {
        this.charge = chargeTo;
        return this
    }

    accelerate() {
        this.speed += 20;
        this.charge--;
        console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
        return this
    }
}

const nissan = new EVClass('Nissan', 120, 10);
nissan.chargeBattery(90);
nissan.accelerate().accelerate();
nissan.brake();