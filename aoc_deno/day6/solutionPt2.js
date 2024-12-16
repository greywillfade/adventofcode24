//exit point found from previous puzzle = y=129 / x=98 | Test 
//start point from the previous puzzle : [ 59, 62 ] | Test 


//Note: this is unfinished - the logic around the spot to the right needing to be in the previous collection of steps is wrong.


import { distinct } from "@std/collections";

const puzzleInput = await Deno.readTextFile("inputTest.txt");
const inputToUse = puzzleInput.split("\n");
const visitedPos = [];
const obstructions = [];
const exitPos = [9, 7]; //Test data
//const exitPos = [129, 98]; //Real data

//Creates a struture with arrays for rows, e.g.
/*
['.', ',', '.', '#', '.', '.', '.', '.', '.', ''],
...*/
function createGrid(inputArr){
    return inputArr.map((row) => row.split(""));
}

//Use this to compare our marker for a hash sign being found (we can't do if(!hashFound== [0,0]))
function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}

function checkRight(y, x) {
    const strToCheck = y + "," + x;
    return visitedPos.includes(strToCheck);
}

function checkToEnd(dir, fromY, fromX) {

    if(dir =="up") {
        for (let i = fromY; i >= 0; i--) { 
            if(grid[i][fromX] == "#") {
                return true;
            }
        }
    }
    else {
        for (let i = fromY; i < grid.length; i++) { 
            if(grid[i][fromX] == "#") {
                return true;
            }
        }
    }

    return false;
}

//Functions to move around the grid
function goUp (arr, y, x) {
    let hashFound = [0,0];

    for (let i = y; i >= 0; i--) { 

        console.log("⬆️ " + i + ", " + x);

        if(arraysEqual(hashFound, [0, 0])) {            
            if(arr[i][x] == "#") {
                hashFound = [i,x];
            }
            else { //Keep track of where we've been
                visitedPos.push(i+","+x);
                let canObstruct = true;


                //CHECKING FOR OBSTRUCTION OPPORTUNITIES
                if(i > 0) { //Can't already be at the edge 

                    //If there's a historic position to the right
                    if(checkRight(i, x+1) == true) {
                        //console.log("PASS 1");
                    }
                    else {
                       // console.log("FAIL 1");
                        canObstruct = false;
                    }
                    
                    //And there's an empty space ahead
                    if(arr[i-1][x] != "#") {
                        //console.log("PASS 2");
                    }
                    else {
                        //console.log("FAIL 2");
                        canObstruct = false;
                    }
                    
                    
                    //And it's not the starting point ahead
                    if ( (initPos[0] == i-1 && initPos[1] == x) == false ) {
                            //console.log("PASS 3");
                    }
                    else {
                        //console.log("FAIL 3");
                        canObstruct = false;
                    }

                    //And there's either another hash in the path to make us loop rather than fall out, or it's the designated exit
                    if (
                            (arr[i].slice(x+1).includes("#")) ||
                            (arr[i].slice(x+1).includes("#") == false && arraysEqual(exitPos, [i,arr[0].length]) == true)
                        ) {
                            //console.log("PASS 4");
                        }
                    else {
                        //console.log("FAIL 4");
                        canObstruct = false;
                    }
                }
                else {
                    canObstruct = false;
                }

                if(canObstruct == true) {
                    console.log("can add obstruction: " + (i-1) + ","+(x));
                    obstructions.push((i-1) + ","+(x));
                }

                /*
                //CHECKING FOR OBSTRUCTION OPPORTUNITIES
                if(
                    (i > 0) //Can't already be at the edge
                    &&
                    (checkRight(i, x+1) == true) //And there's an opportunity to loop into an existing path
                    &&
                    (arr[i-1][x] != "#") //And there's an empty space ahead
                    &&
                    (   //And it's not the starting point ahead
                        (initPos[0] == i-1)
                        &&
                        (initPos[1] == x)
                        == false
                    )
                    && //And there's either another hash in the path to make us loop rather than fall out, or it's the designated exit
                    (arr[i].slice(x+1).includes("#") == true ||
                        (arr[i].slice(x+1).includes("#") == false && arraysEqual(exitPos, [i,arr[0].length]) == true)
                    )
                ) {
                    console.log("can add obstruction");
                    obstructions.push(i-1+","+x);
                }*/

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

        console.log("➡️ " + y + ", " + i);

        if(arraysEqual(hashFound, [0, 0])) {
            if(arr[y][i] == "#") {
                hashFound = [y, i];
            }
            else {
                visitedPos.push(y+","+i);
                const checkToEndRes = checkToEnd("down", y, i);
                let canObstruct = true;


                if(i < arr[0].length-1) {

                    //If there's a historic position to the right
                    if(checkRight(y+1, i) == true) {
                        console.log("PASS 1");
                    }
                    else {
                        console.log("FAIL 1");
                        canObstruct = false;
                    }
                    
                    //And there's an empty space ahead
                    if(arr[y][i+1] != "#") {
                        console.log("PASS 2");
                    }
                    else {
                        console.log("FAIL 2");
                        canObstruct = false;
                    }
                    
                    //And it's not the starting point ahead
                    if ( (initPos[0] == y && initPos[1] == i+1) == false ) {
                            console.log("PASS 3");
                    }
                    else {
                        console.log("FAIL 3");
                        canObstruct = false;
                    }

                    if (
                        checkToEndRes == true ||
                        (checkToEndRes == false && arraysEqual(exitPos, [arr.length, i]) == true)
                    ) {
                        console.log("PASS 4");
                    }
                    else {
                        console.log("FAIL 4");
                        canObstruct = false;
                    }
                }
                else {
                    canObstruct = false;
                }

                if(canObstruct == true) {
                    console.log("can add obstruction: " + y + ","+(i+1));
                    obstructions.push(y + ","+(i+1));
                }



                //CHECKING FOR OBSTRUCTION OPPORTUNITIES
                /*
                if(
                    (i < arr[0].length-1) //Can't already be at the edge
                    &&
                    (checkRight(y+1, i) == true) //And there's an opportunity to loop into an existing path
                    &&
                    (arr[y][i+1] != "#") //And there's an empty space ahead
                    &&
                    (   //And it's not the starting point ahead
                        (initPos[0] == y)
                        &&
                        (initPos[1] == i+1)
                        == false
                    )
                    &&
                    (checkToEndRes == true ||
                        (checkToEndRes == false && arraysEqual(exitPos, [arr.length, i]) == true)
                    )
                ) {
                    console.log("can add obstruction");
                    obstructions.push((y+1) + ","+i);
                }
                    */



            }
        }
    }
    console.log(hashFound);
    if (!arraysEqual(hashFound, [0, 0])) {
        goDown(arr, hashFound[0], hashFound[1]-1);
    }
}

function goDown (arr, y, x){
    let hashFound = [0,0];
    for (let i = y; i < arr.length; i++) { 

        console.log("⬇️ " + i + ", " + x);

        if(arraysEqual(hashFound, [0, 0])) {
            if(arr[i][x] == "#") {
                hashFound = [i, x];
            }
            else {
                visitedPos.push(i+","+x);
                let canObstruct = true;


                //CHECKING FOR OBSTRUCTION OPPORTUNITIES
                if(i < arr.length-1) { //Can't already be at the edge 

                    /*console.log("-----");
                    //console.log(i < arr.length-1);
                    console.log("checking right: " + checkRight(i, x-1));
                    console.log(arr[i+1][x] != "#");
                    console.log((initPos[0] == i+1)&&(initPos[1] == x));
                    console.log(arr[i].slice(0, x-1).includes("#"));
                    console.log("-----");*/

                    //If there's a historic position to the right
                    if(checkRight(i, x-1) == true) {
                       // console.log("PASS 1");
                    }
                    else {
                        //console.log("FAIL 1");
                        canObstruct = false;
                    }
                    
                    //And there's an empty space ahead
                    if(arr[i+1][x] != "#") {
                        //console.log("PASS 2");
                    }
                    else {
                        //console.log("FAIL 2");
                        canObstruct = false;
                    }
                    
                    
                    //And it's not the starting point ahead
                    if ( (initPos[0] == i+1 && initPos[1] == x) == false ) {
                            //console.log("PASS 3");
                    }
                    else {
                        //console.log("FAIL 3");
                        canObstruct = false;
                    }

                    //And there's either another hash in the path to make us loop rather than fall out, or it's the designated exit
                    if (
                            (arr[i].slice(0, x-1).includes("#") == true) ||
                            ((arr[i].slice(0, x-1).includes("#") == false) && (arraysEqual(exitPos, [i,0]) == true))
                        ) {
                            //console.log("PASS 4");
                        }
                    else {
                        //console.log("FAIL 4");
                        canObstruct = false;
                    }
                }
                else {
                    canObstruct = false;
                }

                if(canObstruct == true) {
                    console.log("can add obstruction: " + (i+1) + ","+x);
                    obstructions.push((i+1) + ","+x);
                }
                



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

        console.log("⬅️ " + y + ", " + i);

        if(arraysEqual(hashFound, [0, 0])) {
            if(arr[y][i] == "#") {
                hashFound = [y, i];
            }
            else {
                visitedPos.push(y+","+i);
                const checkToEndRes = checkToEnd("up", y, i);
                let canObstruct = true;


                if(i < arr.length-1) {

                    //If there's a historic position to the right
                    if(checkRight(y-1, i) == true) {
                        console.log("PASS 1");
                    }
                    else {
                        console.log("FAIL 1");
                        canObstruct = false;
                    }
                    
                    //And there's an empty space ahead
                    if(arr[y][i-1] != "#") {
                        console.log("PASS 2");
                    }
                    else {
                        console.log("FAIL 2");
                        canObstruct = false;
                    }
                    
                    //And it's not the starting point ahead
                    if ( (initPos[0] == y && initPos[1] == i-1) == false ) {
                            console.log("PASS 3");
                    }
                    else {
                        console.log("FAIL 3");
                        canObstruct = false;
                    }

                    if (
                        checkToEndRes == true ||
                        (checkToEndRes == false && arraysEqual(exitPos, [0, i]) == true)
                    ) {
                        console.log("PASS 4");
                    }
                    else {
                        console.log("FAIL 4");
                        canObstruct = false;
                    }
                }
                else {
                    canObstruct = false;
                }

                if(canObstruct == true) {
                    console.log("can add obstruction: " + y + ","+(i-1));
                    obstructions.push(y + ","+(i-1));
                }

            }
        }
    }
    if (!arraysEqual(hashFound, [0, 0])) {
        goUp(arr, hashFound[0], hashFound[1]+1);
        
    }
}



const grid = createGrid(inputToUse);

const initPos = [6, 4]; //Test
//const initPos = [59, 62]; //Real

goUp(grid, initPos[0], initPos[1]);

//console.log(visitedPos);

const distinctPos = distinct(visitedPos);
//console.log("🚶🏻‍♂️ Distinct positions: " + distinctPos.length);

console.log(obstructions);