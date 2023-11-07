// let me explain why I have used args
// In actual reduce function, if we pass undefined as a second argument, it will still work, it will only throw error when the array is empty and second argument which is inital value is not defined
Array.prototype.customReduce = function (...args) { // if I have used arrow function, this will be {} because it will reference the global scope! 
    const [reduceFunctionCallback, initialValue] = args;
    if (typeof reduceFunctionCallback !== 'function') { // I could have skipped this check, but I don't want to confuse the end user printing error reduceFunctionCallback is not a function
        throw new TypeError(`${reduceFunctionCallback} is not a function`);
    }
    const array = this; // this will be the array value if I use the function ()
    const initalValueIsDefined =  args.length === 2; // undefined won't be correct check there, if we pass undefined in second argument, actual reduce will still execute!
    if (!array.length && args.length === 1) { // should provide some value
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let previous = initalValueIsDefined ? initialValue : array[0];
    let startingIndex = initalValueIsDefined ? 0 : 1;
    for (let arrayIndex = startingIndex; arrayIndex < array.length; arrayIndex += 1) {
        const result = reduceFunctionCallback(previous, array[arrayIndex]);
        previous = result;
    }
    return previous;
};

// testing zone!

const array = [{ a: 1 }, { a: 2 }, { a: 3 }]; // provide any input here!

let initialValue = { a: 7 }; // provide anything

const reduceFunction = (init, curr) => { return { a : init.a * curr.a } };

try {
    // CUSTOM REDUCE TESTING
    const result = array.customReduce(reduceFunction, initialValue);
    console.log('RESULT -->>', result);
} catch (error) {
    console.log('ERROR CUSTOM -->', error);
}

try {
    // ACTUAL REDUCE TESTING
    const result = array.reduce(reduceFunction, initialValue);
    console.log('RESULT ACTUAL -->>', result);
} catch (error) {
    console.log('ERROR ACTUAL -->', error);
}

// const actualResult = array.reduce(reduceFunction, initialValue);
// console.log("ACTUAL RESULT", actualResult);

// Provide feedbacks here for what I have missed 
// I have tried my best to check most of the common used test cases