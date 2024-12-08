const pageOrderingInput = await Deno.readTextFile("pageOrderingReal.txt");
const pageUpdatesInput = await Deno.readTextFile("pageUpdatesReal.txt");
const pageRules: string[] = pageOrderingInput.split("\n").sort(); //We don't have to sort, but doing so for easier debugging
const pageUpdates: string[] = pageUpdatesInput.split("\n");
let pageTotal: number = 0;

//For each of the set of page updates...
pageUpdates.forEach((value) => {
    let checkSafe:boolean = true;
 
    //Get all of the pages in the update
    const pages = value.split(",");
    let matchingRules = [];

    //for each number in the update
    pages.forEach((v) => {
        console.log("v:" + v);

        //find the rules that have that number on the left (returns array)
        matchingRules = pageRules.filter((x) => x.startsWith(v+"|"));
        matchingRules = matchingRules.map(item => item.split("|")[1]);
        
        //if the righthand rule number exists in the update, it must not be to the left of the number we're checking
        matchingRules.forEach((ruleItem) => {
            if(pages.includes(ruleItem) && (pages.indexOf(ruleItem) < pages.indexOf(v))) {
                checkSafe = false;
            }
        });
    });

    if(checkSafe == true) {
        pageTotal += parseInt(pages[Math.ceil(pages.length/2)-1]);

    } 
});

console.log("📚 page total calculated:" + pageTotal);