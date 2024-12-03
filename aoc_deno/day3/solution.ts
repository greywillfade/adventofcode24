const puzzleInput = await Deno.readTextFile("inputReal.txt");
let total: number = 0;
const pattern: RegExp = /mul\((\d{1,3}),(\d{1,3})\)/g;

//const matches: [number, number][] = []; //In case we need it later...
let match: RegExpExecArray | null;

while ((match = pattern.exec(puzzleInput)) !== null) {
    //matches.push([+match[1], +match[2]]);
    total += (+match[1]) * (+match[2]);
}

//console.log(matches);
console.log("💻 Calculation answer: " + total);