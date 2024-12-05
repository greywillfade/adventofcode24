const puzzleInput = await Deno.readTextFile("inputReal.txt");
let total: number = 0;
const pattern: RegExp = /mul\((\d{1,3}),(\d{1,3})\)/g;
let match: RegExpExecArray | null;

//While there are still regex matches, keep adding to the total
while ((match = pattern.exec(puzzleInput)) !== null) {
    total += (+match[1]) * (+match[2]);
}

console.log("💻 Calculation answer: " + total);