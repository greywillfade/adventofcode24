//Needed to totally rewrite as part 1 obviously wasn't going to scale. Tried splitting into batches but no luck, should have known better!
const puzzleInput = await Deno.readTextFile("inputReal.txt");
const stones = puzzleInput.split(" ").map(Number);
const memo = new Map();


function stoneTransform(stone, blinksLeft) {
    let result;

    // Base case: No blinks left, one stone remains
    if (blinksLeft === 0) return 1;

    // Memoization key
    const key = `${stone},${blinksLeft}`;
    if (memo.has(key)) return memo.get(key);

    // Rule 1: Stone is 0 so needs to be odd
    if (stone === 0) {
        result = stoneTransform(1, blinksLeft - 1);
    }
    // Rule 2: Stone has an even number of digits, so we split
    else if (stone.toString().length % 2 === 0) {
        const numStr = stone.toString();

        const midpoint = Math.ceil(numStr.length / 2);
        const firstHalf = parseInt(numStr.slice(0, midpoint));
        const secondHalf = parseInt(numStr.slice(midpoint));

        result = stoneTransform(firstHalf, blinksLeft - 1) +
        stoneTransform(secondHalf, blinksLeft - 1);
    }
    // Rule 3: Multiply the stone by 2024
    else {
        result = stoneTransform(stone * 2024, blinksLeft - 1);
    }

    // Store result in memoization map
    memo.set(key, result);
    return result;
}


// Get answer
//const totalStones = stones.reduce((sum, stone) => sum + stoneTransform(stone, 6), 0);
//const totalStones = stones.reduce((sum, stone) => sum + stoneTransform(stone, 25), 0);
const totalStones = stones.reduce((sum, stone) => sum + stoneTransform(stone, 75), 0);

console.log(memo);
console.log("🗿 Total no of stones:", totalStones);