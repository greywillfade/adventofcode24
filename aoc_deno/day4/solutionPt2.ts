const puzzleInput = await Deno.readTextFile("inputReal.txt");
const inputToUse = puzzleInput.split("\n");

//Creates a struture with arrays for rows, e.g.
/*
['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'],
['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'],...*/
function createGrid(inputArr: string[]): string[][] {
    return inputArr.map((row) => row.split(""));
  }

function checkXMAS(inputArr: string[][]): number {
    let xCounter = 0;

    for (let y = 1; y < inputArr.length-1; y++) { //don't check for starting points in the end rows
        for (let x = 1; x<inputArr[y].length-1; x++ ) {
            if(inputArr[y][x] == "A") {
                console.log("A! y:" + y + ", x:" + x);
                
                const tl = inputArr[y-1][x-1]; //↖️
                const br = inputArr[y+1][x+1]; //↘️
                const tr = inputArr[y-1][x+1]; //↗️
                const bl = inputArr[y+1][x-1]; //↙️

                //Check for MAS (and SAM)
                if (
                    ((tl === "M" && br === "S") || (tl === "S" && br === "M"))
                    &&
                    ((bl === "M" && tr === "S") || (bl === "S" && tr === "M"))
                ) {
                    //console.log("tl:" + tl + ", br:" + br + ", bl:" + bl + ", tr:" + tr)
                    xCounter++;
                }
            }
        }
    }
    return xCounter;
}

const grid = createGrid(inputToUse);
const processed = checkXMAS(grid);
console.log("🎄 Answer: " + processed);