#!/usr/bin/env/node 

/**
 * Prime number finder.
 * Finds the first 100 primes.
 */
var PrimeFinder = (function(){
    var defaultSettings = {
        startFrom: 1,
        until: 50,
    };

    /**
     * Our main running function.
     * First lets keep looping until we have however many
     * primes we have specified in the settings startFrom.
     *
     * Then we run our isPrime function.
     */
    function findPrimes() {
        var currentNumber = this.settings.startFrom;

        while (this.primesArray.length < this.settings.until) {
            /**
             * Check if current number is prime.
             */
            if (this.isPrime(currentNumber)) {
                this.primesArray.push(currentNumber);
            }

            currentNumber++;
        }
    }

    /**
     * Check if a number is prime.
     * First make sure it's not 1 or 0. Then iterate through
     * all numbers up to the current number and get the
     * remainder. If the remainder is 0 it's not a prime.
     */
    function isPrime(currentNumber) {
        /**
         * Turns out 1 is not a prime number. Learn something new everyday!
         */
        if (currentNumber < 2) {
            return false;
        }

        for (var i = 2; i < currentNumber; i++) {

            /**
             * primeLogic is a separate function, this way it can be 
             * separated from this app and tested externally against an array 
             * of numbers or whatever is needed.
             */
            if (this.isEvenlyDivisible(this.primeLogic, currentNumber, i)) {
                /**
                 * So the number is evenly divisible, therefore we should return
                 * false since the given number is not a prime.
                 */
                return false;
            }
        }

        return true;
    }

    /**
     * Logic to test if a number is divisible 
     * evenly or not since modulus returns 0 if
     * there is no remainder.
     */
    function primeLogic(possiblePrime, testNumber){ 
        return (possiblePrime % testNumber === 0) === true;
    }

    /**
     * Tried to come up with a functional programming way of
     * handling this problem. Unfortunately I barely know what
     * that is except for one JS example a friend showed me.
     *
     * The idea is that this function is more easily testable
     * from my understanding of what functional programming is.
     */
    function isEvenlyDivisible(equation, possiblePrime, testNumber) {
        if (equation(possiblePrime, testNumber) === true) {
            return true;
        } else {
            return false;
        }
    }       

    /**
     * A necessary function to copy the given options into the defaults.
     * I believe it is referred to as a shallow copy as it's not recursive.
     */
    function extend(initialObject, newObject) {

        var combinedObject = initialObject;

        for (var key in newObject) {
            initialObject[key] = newObject[key];
        }

        return combinedObject;
    }

    /**
     * Handle options and application logic.
     */
    var publicConstructor = function (options, outputCallback) {
        this.settings = extend(defaultSettings, options);

        this.findPrimes();  /* Meat of the app */

        if (typeof( outputCallback ) === "function") {
            outputCallback(this.primesArray);
        }
    }
    
    /**
     * Prime finder. Just a little bit of logic to setup the pattern I 
     * like to use so the code is well architected to be testable 
     * and reusable.
     */
    function App() {
        this.init.apply(this, arguments);
    }      

    App.prototype.init = publicConstructor;
    App.prototype.findPrimes = findPrimes;
    App.prototype.isPrime = isPrime;
    App.prototype.isEvenlyDivisible = isEvenlyDivisible;
    App.prototype.primeLogic = primeLogic;
    App.prototype.primesArray = [];

    /**
     * Expose any methods and/or properties that should be public.
     */
    return App;
})();

var initialOptions = {
    startFrom: 1,
    until: 100
};

/**
 * This logic is sent in a callback to write it.
 */
var outputCallback = function(primeNumbers) { 
    var fs = require('fs');
    var outfile = "primes.txt";
    var out = primeNumbers.join(',');

    fs.writeFileSync(outfile, out + "\n");
    console.log( out );
};

var Primes = new PrimeFinder(initialOptions, outputCallback);
