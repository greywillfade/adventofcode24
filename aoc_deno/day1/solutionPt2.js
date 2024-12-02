const puzzleInput = await Deno.readTextFile("input1.txt");
const inputToUse = puzzleInput.split(/\s+/);
const list1 = []; //Holds elves first list (left col in input)
const list2 = []; //Holds elves second list (right col in input)
let similarity = 0;


// Parse the initial input and process into the two arrays for the location lists
for (let i=0;i<inputToUse.length;i++){
    if ((i+2)%2==0) {
        list1.push(inputToUse[i]);
    }
    else {
        list2.push(inputToUse[i]);
    }
}

//For each item in the first list, find number of times it appears in the second
for (let i=0;i<list1.length;i++){

    const foundTimes = list2.filter((locationId) => parseInt(locationId) == parseInt(list1[i]));
    console.log(list1[i] + " : " + foundTimes.length);
    similarity+= list1[i] * foundTimes.length;
}

console.log("🧮 Similarity score: "+ similarity);