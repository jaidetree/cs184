#!/usr/bin/env/node 

/**
 * Prime number finder.
 * Finds the first 100 primes.
 */
var PrimeFinder = (function(){

    var primesArray = [];
    var i = 0; /* Our iterator */
    var defaultSettings = {
        startFrom: 1,
        until: 50
    };

    /**
     * Our main running function.
     */
    function findPrimes(options, outputCallback) {
        var settings = extend(defaultSettings, options);
        var currentNumber = settings.startFrom;

        while (primesArray.length <= settings.until) {
            if (isPrime( currentNumber )) {
                primesArray.push(currentNumber);
            }
            currentNumber++;
        }

        if (typeof( outputCallback ) === "function") {
            outputCallback(primesArray, currentNumber);
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
     * If it's not evenly disible by 1-9 it's probably a prime.
     */
    function isPrime(currentNumber) {
        for (i = 1; i < 10; i++) {
            if (isEvenlyDivisible(function(){ return (currentNumber % i === 0) }) === true) {
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
     * Expose any methods and/or properties that should be public.
     */
    return function(outputCallback) {
        this.findPrimes = findPrimes;

        // Work like a constructor.
        this.findPrimes(outputCallback);
    };
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
    console.log( primeNumbers.join(',') );
};

var Primes = new PrimeFinder(initialOptions, outputCallback);
