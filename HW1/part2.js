#!/usr/bin/env/node 

/**
 * Prime number finder.
 * Finds the first 100 primes.
 */
var PrimeFinder = (function(){
    var defaultSettings = {
        startFrom: 1,
        until: 50
    };

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
     * Our main running function.
     */
    function findPrimes() {
        var currentNumber = this.settings.startFrom;

        while (this.primesArray.length < this.settings.until) {
            if (isPrime( currentNumber )) {
                this.primesArray.push(currentNumber);
            }

            currentNumber++;
        }
    }

    /**
     * A necessary function to copy the given options into the defaults.
     */
    function extend(initialObject, newObject) {

        var combinedObject = initialObject;

        for (var key in newObject) {
            initialObject[key] = newObject[key];
        }

        return combinedObject;
    }

    /**
     * If it's not evenly disible it's a prime!
     */
    function isPrime(currentNumber) {
        /**
         * Turns out 1 is not a prime number. Learn something new everyday!
         */
        if (currentNumber < 2) {
            return false;
        }

        for (var i = 2; i < currentNumber; i++) {

            var primeLogic = function(){ 
                return (currentNumber % i === 0) === true;
            };

            if (isEvenlyDivisible(primeLogic)) {
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
     * Tried to come up with a functional programming way of
     * handling this problem. Unfortunately I barely know what
     * that is except for one JS example a friend showed me.
     *
     * The idea is that this function is more easily testable
     * from my understanding of what functional programming is.
     */
    function isEvenlyDivisible(equation) {
        if (equation() === true ) {
            return true;
        } else {
            return false;
        }
    }       
    
    /**
     * Prime finder.
     */
    function App(settings, outputCallback) {
        this.init.apply(this, arguments);
    }      

    App.prototype.init = publicConstructor;
    App.prototype.findPrimes = findPrimes;
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

var outputCallback = function(primeNumbers) { 
    var fs = require('fs');
    var outfile = "primes.txt";
    var out = primeNumbers.join(',');

    fs.writeFileSync(outfile, out + "\n");
    console.log( out );
};

var Primes = new PrimeFinder(initialOptions, outputCallback);
