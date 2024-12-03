//Totally revised the approach after everything ended up getting super messy and edgecasey
//This is still pretty messy but hey

// @ts-check
const puzzleInput = await Deno.readTextFile("inputReal.txt");
const allReports = puzzleInput.split("\n");
let safeReportsCount = 0;

function checkSafety(lev) {
    const trendDifs = [];

    //Go through all of the numbers ('levels') in each report, capture the level difference
    for (let l=0;l<lev.length-1;l++){
        trendDifs.push(parseInt(lev[l]) - parseInt(lev[l+1]));
    }
    console.log(lev);
    console.log(trendDifs);

    //Check to see how much is following a directional trend (asc/desc) 
    const positiveIncrements = trendDifs.filter(function(number) {
        return number >= 0;
    });
    const negativeIncrements = trendDifs.filter(function(number) {
        return number < 0;
    });
    const eqNos = trendDifs.filter(function(number) {
        return number == 0;
    });
      
    //Check for increments that fall outside of the allowed rules
    function checkLeaps(number) {
        if(Math.abs(number) < 1 || Math.abs(number) > 3) {
            return true;
        }
        else {return false;}
    }
    const illegalLeaps = trendDifs.filter(checkLeaps);
    
    /* Check whether it meets criteria:
    - all increasing or all decreasing.
    - Any two adjacent levels differ by at least one and at most three. */
    if (
        ((positiveIncrements.length > 0 && negativeIncrements.length == 0 && eqNos.length == 0)
        ||
        (positiveIncrements.length == 0 && negativeIncrements.length > 0 && eqNos.length == 0))
        &&
        illegalLeaps.length == 0
    ) {
        return true;
    }
    else { return false; }
}

//For each report (line of input), check whether it meets criteria
for (let i=0;i<allReports.length;i++){
    const levels = allReports[i].split(" ");

    //Start with the original report, check whether it passes the safety test first go
    let safetyStatus = checkSafety(levels);
    console.log(safetyStatus);

    //If true, increment the safe counter
    if(safetyStatus == true) {
        safeReportsCount++;
    }
    //If not, go through and remove each item to see if it passes. If it does, increment the safe counter and break.
    else {
        for (let l=0;l<levels.length;l++){
            safetyStatus = checkSafety(levels.toSpliced(l, 1));
            console.log("recheck status" + safetyStatus);
            if(safetyStatus == true) {
                safeReportsCount++;
                break;
            }
        }
    }
}

console.log("🧮 Number of safe reports: "+ safeReportsCount);