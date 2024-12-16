//Note: takes ages to run, but works

const puzzleInput = await Deno.readTextFile("inputReal.txt");
const inputToUse = puzzleInput.split("\n");
const operators: string[] = ["*", "+", "C"];
let testValSum:number = 0;

function generatePermutations(permLength:number, operatorSymbols: string[]) {
    const results: string[] = [];
    
    function createPerms(current: string) {
        if (current.length === permLength) {
            results.push(current);
            return;
        }
        
        for (const symbol of operatorSymbols) {
            createPerms(current + symbol);
        }
    }
    createPerms("");
    return results;
}

inputToUse.forEach((equation) => {

    const equationTotal = equation.split(": ")[0];
    const numbers = equation.split(": ")[1].split(" ");
    const noOfOperators:number = numbers.length-1;
    let foundSolution:boolean = false;

    const permutations = generatePermutations(noOfOperators, operators);

    for (const perms of permutations) {

        if(foundSolution!=true) { //May be more than one way to solve it but we don't want multiples

            const operatorsToTry = perms.split("");
            let calculation: string = "";
            let runningTotal: number = 0;

            for(let i=0; i<noOfOperators; i++) {
                let num1:string = "";
                const num2:string = numbers[i+1];

                //For the first one use the actual number, else use running total
                if(i==0) {
                    num1 = numbers[i];
                }
                else {
                    num1 = runningTotal;
                }

                //Concatenation
                if (operatorsToTry[i] == "C") {
                    const tmpVal = (`${num1}${num2}`);
                    runningTotal = parseInt(tmpVal);
                }
                else {
                    calculation = num1 + operatorsToTry[i] + num2;
                    const tmpCalcRes = new Function(`return ${calculation}`)();
                    runningTotal=tmpCalcRes;
                }
            }

            //Found a match
            if(parseInt(runningTotal) == parseInt(equationTotal)) {
                foundSolution = true;
                testValSum+=parseInt(equationTotal);
            }    
        }
        else {
            break;
        }
    }
});

console.log("#️⃣ Sum of valid test values: " + testValSum);