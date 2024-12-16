import { distinct } from "@std/collections";

const puzzleInput = await Deno.readTextFile("inputReal.txt");
const inputToUse = puzzleInput.split("\n");
const visitedPos = [];

//Creates a struture with arrays for rows, e.g.
/*
['.', ',', '.', '#', '.', '.', '.', '.', '.', ''],
...*/
function createGrid(inputArr){
    return inputArr.map((row) => row.split(""));
}

//Get starting position (marked with ^ on grid)
function getInitPos(inputArr) {
    let retVal = [];
    inputArr.forEach((val, index) => {
        const isStartRes = val.findIndex((element) => element == "^");
        if(isStartRes > -1) {
            retVal = [index, isStartRes];
        }
    });
    return retVal;
}

//Use this to compare our marker for a hash sign being found (we can't do if(!hashFound== [0,0]))
function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}

//Functions to move around the grid. Could be refactored into one but keeping for readability
function goUp (arr, y, x){
    let hashFound = [0,0];
    for (let i = y; i >= 0; i--) { 
        if(arraysEqual(hashFound, [0, 0])) {            
            if(arr[i][x] == "#") {
                hashFound = [i,x];
            }
            else { //Keep track of where we've been
                visitedPos.push(i+","+x);
            }
        }
    }
    // If we've hit a hash, change direction 90°
    if (!arraysEqual(hashFound, [0, 0])) {
        goRight(arr, hashFound[0]+1, hashFound[1]);
    } 
}

function goRight (arr, y, x){
    let hashFound = [0,0];
    for (let i = x; i < arr[0].length; i++) {
        if(arraysEqual(hashFound, [0, 0])) {
            if(arr[y][i] == "#") {
                hashFound = [y, i];
            }
            else {
                visitedPos.push(y+","+i);
            }
        }
    }
    if (!arraysEqual(hashFound, [0, 0])) {
        goDown(arr, hashFound[0], hashFound[1]-1);
    }
}

function goDown (arr, y, x){
    let hashFound = [0,0];
    for (let i = y; i < arr.length; i++) { 
        if(arraysEqual(hashFound, [0, 0])) {
            if(arr[i][x] == "#") {
                hashFound = [i, x];
            }
            else {
                visitedPos.push(i+","+x);
            }
        }
    }
    if (!arraysEqual(hashFound, [0, 0])) {
        goLeft(arr, hashFound[0]-1, hashFound[1]);
    }
}

function goLeft (arr, y, x){
    let hashFound = [0,0];
    for (let i = x; i >= 0; i--) {
        if(arraysEqual(hashFound, [0, 0])) {
            if(arr[y][i] == "#") {
                hashFound = [y, i];
            }
            else {
                visitedPos.push(y+","+i);
            }
        }
    }
    if (!arraysEqual(hashFound, [0, 0])) {
        goUp(arr, hashFound[0], hashFound[1]+1);
        
    }
}

const grid = createGrid(inputToUse);
const initPos = getInitPos(grid);
goUp(grid, initPos[0], initPos[1]);

const distinctPos = distinct(visitedPos);
console.log("🚶🏻‍♂️ Distinct positions: " + distinctPos.length);