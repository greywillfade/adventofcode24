const puzzleInput = await Deno.readTextFile("inputReal.txt");
let xmasCount: number = 0;
const patterns: string[] = ["XMAS", "SAMX"];
const cols = [];

//Use thie function to check for the patterns once we've built up all the options to check
function findMatches(itemToCheck: string, patterns: string[]): { match: string; index: number }[] {
    const matches = [];
    
    //Regex's /g by itself doesn't handle overlapping without extra handling, so just keeping it simple
    // Loop through every starting position in the text
    for (let i = 0; i < itemToCheck.length; i++) {
      // Check each pattern at the current position
      for (const pattern of patterns) {
        if (itemToCheck.startsWith(pattern, i)) {
          matches.push({ match: pattern, index: i });
        }
      }
    }
    return matches;
}

//Getting the rows is simple
const rows = puzzleInput.split(/\n/);

//Build up our view of the columns
for (let c = 0; c < rows[0].length; c++) {
    let column = "";
    for (let r = 0; r < rows.length; r++) {
      column += rows[r][c];
    }
    cols.push(column);
}

//Now do the diagonals
const diagonals1 = [];
const diagonals2 = [];

// Collect diagonals starting from the first column (0,0), covering to the bottom right and bottom left ↘️
const rowLen = rows[0].length;
const colLen = cols[0].length;

for (let startRow = 0; startRow < rowLen; startRow++) {
    let diagonal = "";
    for (let row = startRow, col = 0; row < rowLen && col < colLen; row++, col++) {
        diagonal += rows[row][col];
    }
    diagonals1.push(diagonal);
}
  
// Collect diagonals starting from the second item of the first row, working over to the right ↘️
for (let startCol = 1; startCol < colLen; startCol++) {
    let diagonal = "";
    for (let row = 0, col = startCol; row < rowLen && col < colLen; row++, col++) {
        diagonal += rows[row][col];
    }
    diagonals1.push(diagonal);
}

// Now do it the other way too (top right to bottom left)
for (let startCol = colLen - 1; startCol >= 0; startCol--) {
    let diagonal = "";
    for (let row = 0, col = startCol; row < rowLen && col >= 0; row++, col--) {
        diagonal += rows[row][col];
    }
    diagonals2.push(diagonal);
}

for (let startRow = 1; startRow < rowLen; startRow++) {
    let diagonal = "";
    for (let row = startRow, col = colLen - 1; row < rowLen && col >= 0; row++, col--) {
        diagonal += rows[row][col];
    }
    diagonals2.push(diagonal);
}
  
//combine all the arrays
const allOptions = rows.concat(cols).concat(diagonals1).concat(diagonals2);
console.log(allOptions);

//for each item, count the number of XMASs (whichever way round they're written) 
allOptions.forEach((item) => {
    const results = findMatches(item, patterns);
    xmasCount+= results.length;
});
  
console.log("🎄 XMAS count: " + xmasCount);