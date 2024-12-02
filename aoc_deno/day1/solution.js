const puzzleInput = await Deno.readTextFile("input1.txt");
const inputToUse = puzzleInput.split(/\s+/);
const list1 = []; //Holds elves first list (left col in input)
const list2 = []; //Holds elves second list (right col in input)
let totalDist = 0;

//Utility
function compareNumbers(a, b) {
    return a - b;
  }

// Parse the initial input and process into the two arrays for the location lists
for (let i=0;i<inputToUse.length;i++){
    if ((i+2)%2==0) {
        list1.push(inputToUse[i]);
    }
    else {
        list2.push(inputToUse[i]);
    }
}

//Sort both arrays asc
list1.sort(compareNumbers);
list2.sort(compareNumbers);

//Go through both lists and do the calculation
for (let i=0;i<list1.length;i++){
    //console.log(list1[i] + " | " + list2[i]);
    totalDist+= Math.abs(list2[i] - list1[i]);
}

console.log("🧮 Total distance: "+ totalDist);