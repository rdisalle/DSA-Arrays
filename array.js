const Memory = require('./memory');

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = Memory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = Memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        Memory.copy(this.ptr, oldPtr, this.length);
        Memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }
        return Memory.get(this.ptr + index)
    }
    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        Memory.set(this.ptr + index, value);
        this.length++;
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error')
        }
        const value = Memory.get(this.ptr + this.length - 1)
        this.length--
        return value
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        Memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
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
    console.log(arr);

    arr.pop();
    arr.pop();
    arr.pop();
    console.log(arr);

    console.log(arr.get(0));

    arr.pop();
    arr.pop();
    arr.pop();
    arr.push("tauhida")
    console.log(arr.get(0))
}
main();

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
//4. Understanding more about how arrays work
//Print the 1st item in the array arr.
//3
//Empty the array and add just 1 item: arr.push("tauhida");
//Print this 1 item that you just added. What is the result? Can you explain your result?
////Returns NaN because our Memory class only accepts 
//What is the purpose of the _resize() function in your Array class?
//Add more capacity to the array without having to run everytime a new item is added

//5. URLify a string
//A common mistake users make when they type in an URL is to put spaces between words or letters. A solution that developers can use to solve 
//this problem is to replace any spaces with a %20. Write a method that takes in a string and replaces all its empty spaces with a %20. Your algorithm 
//can only make 1 pass through the string. Examples of input and output for this problem can be

//Input: tauhida parveen

//Output: tauhida%20parveen

//Input: www.thinkful.com /tauh ida parv een

//Output: www.thinkful.com%20/tauh%20ida%20parv%20een

function urlify(str) {
    let spaceIndexes = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === ' ') {
        spaceIndexes.push(i);
      }
    }
    let newStr = '';
    let last = 0;
    for (let i = 0; i <= spaceIndexes.length; i++) {
      let add = str.slice(last, spaceIndexes[i]);
      if (i === spaceIndexes.length) {
        newStr += add;
      } else newStr += str.slice(last, spaceIndexes[i]) + '%20';
      last = spaceIndexes[i] + 1;
    }
    return newStr;
  }

//6. Filtering an array
//Imagine you have an array of numbers. Write an algorithm to remove all numbers less than 5 from the array. DO NOT use Array's 
//built-in .filter() method here; write the algorithm from scratch.'

function filterLessThan(arr) {
    let newArr = []; 
  for (let i = 0; i< arr.length; i++) { 
    if (arr[i] >= 5) {
      newArr.push(arr[i]); 
    }
  }
  return newArr;
};

//7. Max sum in the array
//You are given an array containing positive and negative integers. Write an algorithm which will find the largest sum in a continuous sequence.

//Input: [4, 6, -3, 5, -2, 1]
//Output: 12

function maxSum(arr) {
    let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        let total = arr[i];
        for(let j = i + 1; j < arr.length; j++) {
            total += arr[j];
            if (total > sum) {
                sum = total;
            }
        }
     }
    return sum;
}

//8. Merge arrays
//Imagine you have 2 arrays which have already been sorted. Write an algorithm to merge the 2 arrays into a single array, which should also be sorted.

//Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
//Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]

function mergeArrays(arr1, arr2) {
    let merged = [...arr1, ...arr2]; 
    merged.sort((a, b) => a - b); 
    return merged;
};

//9. Remove characters
//Write an algorithm that deletes given characters from a string. For example, given a string of "Battle of the Vowels: Hawaii vs. Grozny" 
//and the characters to be removed are "aeiou", the algorithm should transform the original string to "Bttl f th Vwls: Hw vs. Grzny". Do not use 
//Javascript's filter, split, or join methods.

//Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
//Output: 'Bttl f th Vwls: Hw vs. Grzny'

function removeCharacters(str, char) {
    let newStr = ' ';
    let last = 0;
    for (let i = 0; i <= str.length; i++) {
      if (char.includes(str[i]) || i === str.length) {
        newStr += str.slice(last, i);
        last = i + 1;
      }
    }
    return newStr;
  }

  //10. Products
  //Given an array of numbers, write an algorithm that outputs an array where each index is the product of all the numbers in the input 
  //array except for the number at each current index. See the following example input and output.
  
  //Input:[1, 3, 9, 4]
  //Output:[108, 36, 12, 27]

  function products(arr) {
    let total = arr.reduce((a, b) => a * b);
    let products = [];
    arr.forEach(val => products.push(total/val));
    return products;
  }

  //11. 2D array
//Write an algorithm which searches through a 2D array, and whenever it finds a 0 should set the entire row and column to 0.

//Input:
//[[1,0,1,1,0],
//[0,1,1,1,0],
//[1,1,1,1,1],
//[1,0,1,1,1],
//[1,1,1,1,1]];
//Output:
//[[0,0,0,0,0],
//[0,0,0,0,0],
//[0,0,1,1,0],
//[0,0,0,0,0],
//[0,0,1,1,0]];

function arraySearch(arr) {
    let zeroes = new Array(arr.length);
    zeroes.fill(0, 0, arr.length);
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr[i] = arr[i].slice();
    }
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] === 0) {
          newArr[i] = zeroes;
          for (let h = 0; h < newArr.length; h++) {
            newArr[h][j] = 0;
          }
        }
      }
    }
  
    return newArr;
  }

  //12. String rotation
//Given 2 strings, str1 and str2, write a program that checks if str2 is a rotation of str1.

//Input: amazon, azonma

//Output: False

//Input: amazon, azonam

//Output: true

function stringRotation(str1, str2) {
    let isValid = false;
    for (let i = 0; i < str2.length; i < i++) {
      let tempStr = str2.slice(i) + str2.slice(0, i)
      console.log(tempStr);
      if (str1 === tempStr) {
        isValid = true;
      }
    }
    return isValid
  }