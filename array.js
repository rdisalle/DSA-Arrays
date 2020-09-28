const Memory = require('./memory');
let Mem = new Memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = Mem.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Mem.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = Mem.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        Mem.copy(this.ptr, oldPtr, this.length);
        Mem.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }
        return memory.get(this.ptr + index)
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error')
        }
        const value = memory.get(this.ptr + this.length - 1)
        this.length--
        return value
    }
}
Array.SIZE_RATIO = 3;

module.exports = Array;

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    arr.pop();
    arr.pop();
    arr.pop();
    console.log(arr);
    console.log(arr.get(0));
}

//arr.push(3);
//What is the length, capacity and memory address of your array?
//Length is 1, Capacity 3, Ptr 0
//Add the following in the main function and then print the array:
//What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.
//Length is 6, Capacity 12, Ptr 3

//3. Exploring the pop() method
//Add the following in the main function and then print the array:
//[3, 5, 15]
//What is the length, capacity, and address of your array? Explain the result of your program after adding the new lines of code.
//Length is 3, Capacity 12, Ptr 3