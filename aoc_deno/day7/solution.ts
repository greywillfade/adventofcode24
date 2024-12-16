const puzzleInput = await Deno.readTextFile("inputTest.txt");
const inputToUse = puzzleInput.split("\n");
const operators: string[] = ["*", "+"];
let testValSum:number = 0;

function generatePermutations(permLength:number, operatorSymbols: string[]) {
    const results: string[] = [];
    
    function createPerms(current: string) {
        // If the current string has reached the desired length, add it to our permutations to try to get the result
        if (current.length === permLength) {
            results.push(current);
            return;
        }
        
        // Add each symbol and call recursively
        for (const symbol of operatorSymbols) {
            createPerms(current + symbol);
        }
    }
    
    // Start recursion with an empty string
    createPerms("");
    return results;
}

inputToUse.forEach((equation) => {

    const equationTotal = equation.split(": ")[0];
    const numbers = equation.split(": ")[1].split(" ");
    const noOfOperators:number = numbers.length-1;
    let foundSolution:boolean = false;

    const permutations = generatePermutations(noOfOperators, operators);

    //For each one of the permutations of all the operators...
    permutations.forEach((perms) => {
        if(foundSolution!=true) { //May be more than one way to solve it but we don't want multiples
            const operatorsToTry = perms.split("");
            const brackets: string = "(";
            let calculation: string = brackets.repeat(noOfOperators-1);

            //Make a string of the equation by adding in the numbers, and then run it
            for(let i=0; i<noOfOperators; i++) {
                let num1 = numbers[i];
                if(i>0) {num1+=")";}
                const op = operatorsToTry[i];
                calculation+= num1 + op;
            }
            calculation+=numbers[numbers.length-1]; //We're missing one as the operator loop is one less
            const calcRes = new Function(`return ${calculation}`)();

            if(parseInt(calcRes) == parseInt(equationTotal)) {
                //console.log("🚨🚨🚨found match:" + calcRes);
                foundSolution = true;
                testValSum+=parseInt(equationTotal);
            }
        }
    });
});

console.log("#️⃣ Sum of valid test values: " + testValSum);