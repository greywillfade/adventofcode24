//This is very messy and un type safe!
const puzzleInput = await Deno.readTextFile("inputReal.txt");
let stones = puzzleInput.split(" ");
let tmpStones = "";

function splitInHalf(str) {
    const midpoint = Math.ceil(str.length / 2);
    const firstHalf = str.slice(0, midpoint);
    const secondHalf = str.slice(midpoint);
    return [firstHalf, secondHalf];
}

function stoneTransform(stoneVal:number) {
    let retStoneVal: string;
    const stoneLen = (stoneVal as string).length;

    //console.log("StoneVal:" + stoneVal);
    //console.log((stoneVal as string).length);

    //If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
    if (stoneVal == 0) {
        retStoneVal = "1";
    }
    
    //If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
    else if (stoneLen % 2 == 0) {
        const remZeros = (str) => str.replace(/^0+(?!$)/, "");
        const [firstHalf, secondHalf] = splitInHalf(stoneVal as string);
        retStoneVal = remZeros(firstHalf) + " " + remZeros(secondHalf);

    }
    
    //If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
    else {

        retStoneVal = (stoneVal * 2024) as string;
    }

    return retStoneVal;
}

//blink 25 times
for (let i = 0; i < 38; i++) {

    console.log("--- 👁️   Blink: " + i);

    //for each item in the stones array, check it against the rules
    stones.forEach((stoneVal) => {
        const ret = stoneTransform(stoneVal as number);
        //console.log("Return val:" + ret);
        //console.log("");
        tmpStones = tmpStones + ret + " ";
        //console.log(tmpStones);
    });
    
    //console.log(tmpStones);
    stones = tmpStones.trimEnd().split(" ");
    tmpStones = "";
    
}

//count the number of stones we have now
console.log(stones);
console.log("🗿 No of stones:" + stones.length);