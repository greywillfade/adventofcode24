// @ts-check
const puzzleInput = await Deno.readTextFile("inputReal.txt");
const inputToUse = puzzleInput.split("\n");
let safeReports = 0;

//For each report (line of input), check whether it meets criteria
for (let i=0;i<inputToUse.length;i++){
    let statusResult = true;
    const levels = inputToUse[i].split(" ");
    let trendDirection = "desc";

    //Go through all of the numbers (levels) in each report
    for (let l=0;l<levels.length;l++){

        //Check for the jump in difference between the numbers
        if (l<levels.length-1) {//Don't overflow too far
            if (
                (Math.abs(parseInt(levels[l]) - parseInt(levels[l+1])) > 3) || (levels[l] == levels[l+1])) {
                statusResult = false;
                break;
            }
        }

        //Set initial trend direction
        if (l==0) {
            if (parseInt(levels[l+1]) > parseInt(levels[l])) {
                trendDirection = "asc";
            }
        }
    
        //If current and next number go against the established trend, fail
        if ((trendDirection == "desc" && parseInt(levels[l]) < parseInt(levels[l+1])) || (trendDirection == "asc" && parseInt(levels[l]) > parseInt(levels[l+1]))) {
            statusResult = false;
            break;
        }
    }

    if(statusResult == true) {
        safeReports++;}
}

console.log("🧮 Number of safe reports: "+ safeReports);