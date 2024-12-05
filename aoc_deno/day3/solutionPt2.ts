const puzzleInput = await Deno.readTextFile("inputReal.txt");
let total: number = 0;
//matches on the multiplication items as well as the do/don't commands
const pattern: RegExp =/mul\((\d{1,3}),(\d{1,3})\)|do(?:n't)?\(\)/g; 
let match: RegExpExecArray | null;
const matches: [string, number, number][] = [];
let executeStatus: boolean = true;

//Go through the puzzle input and find all of the matches against the puzzle input
while ((match = pattern.exec(puzzleInput)) !== null) {
    //Grab the details we need to work out whether we should execute or not
    matches.push([match[0], +match[1], +match[2]]);
}

//Go through the split out instructions to set status and multiple if appropriate
for (let i=0;i<matches.length;i++){
    if(matches[i][0] == "don't()") {
        executeStatus = false;
    }
    else if(matches[i][0] == "do()") {
        executeStatus = true;
    }
    else {
        if(executeStatus == true) {
            total += (+matches[i][1]) * (+matches[i][2]);
        }
    }
}

console.log("💻 Calculation answer: " + total);