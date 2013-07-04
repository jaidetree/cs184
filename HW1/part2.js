#!/usr/bin/env/node 

/**
 * Prime number finder.
 * Finds the first 100 primes.
 */
var PrimeFinder = (function(){
    var primesArray = [];
    var settings = {
        startFrom: 1,
        until: 50
    };

    /**
     * Handle options and application logic.
     */
    function publicConstructor(options, outputCallback) {
        console.log("Public Constructor!");
        var settings = extend(settings, options);

        this.findPrimes();  /* Meat of the app */

        if (typeof( outputCallback ) === "function") {
            outputCallback(primesArray, currentNumber);
        }
    }

    /**
     * Our main running function.
     */
    function findPrimes() {
        var currentNumber = settings.startFrom;

        while (primesArray.length <= settings.until) {
            if (isPrime( currentNumber )) {
                primesArray.push(currentNumber);
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
        for (var i = 2; i < currentNumber; i++) {

            var testLogic = function(){ 
                return (currentNumber % i === 0);
            };

            if (isEvenlyDivisible(testLogic) === true && curentNumber > 1) {
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
    function App(settings, outputCallback) {};      

    App.prototype = publicConstructor;
    App.findPrimes = findPrimes;

    /**
     * Expose any methods and/or properties that should be public.
     */
    return App;
})();

var initialOptions = {
    startFrom: 1,
    until: 100
};

var outputCallback = function(primeNumbers, totalNumbersTested) { 
    var fs = require('fs');
    var outfile = "primes.txt";
    var out = primeNumbers.join(',');

    fs.writeFileSync(outfile, out);
};

var Primes = new PrimeFinder(initialOptions, outputCallback);
