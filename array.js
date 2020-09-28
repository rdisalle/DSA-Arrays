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
}
Array.SIZE_RATIO = 3;

module.exports = Array;