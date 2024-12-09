import { sortBy } from "@std/collections";
import { intersect } from "@std/collections";

const pageOrderingInput = await Deno.readTextFile("pageOrderingReal.txt");
const pageUpdatesInput = await Deno.readTextFile("pageUpdatesReal.txt");
const pageRules: string[] = pageOrderingInput.split("\n").sort();;
const pageUpdates: string[] = pageUpdatesInput.split("\n").sort();;
let pageTotal: number = 0;

interface PageValWithRules {
    v: string;
    commonValues: string[];
}

function checkOrdering(pageUpdateSet: string) {
    let checkSafe:boolean = true;
    let matchingRules = [];
    const pages = pageUpdateSet.split(",");
    const fixArray: PageValWithRules[] = [];
    
    //For each page in the update, get the associated rules for pages it should come before
    pages.forEach((v) => {
        matchingRules = pageRules.filter((x) => x.startsWith(v+"|"));
        matchingRules = matchingRules.map(item => item.split("|")[1]);
        const commonValues = intersect(pages, matchingRules); //Only get rules relevant to this update
        fixArray.push({v, commonValues});

        // Flag to be fixed if we're not abiding with the associated ordering rule
        commonValues.forEach((ruleItem) => {
            if(pages.indexOf(ruleItem) < pages.indexOf(v)) {
                checkSafe = false;
            }
        });
    });

    //Only do for the updates we need to fix
    if(!checkSafe) {
        //This gives us the order the pages should be, based on how many page ordering rules associated with them
        const sortedByLength = sortBy(fixArray, (rules) => rules.commonValues.length, { order: "desc" });
        pageTotal += parseInt(sortedByLength[Math.ceil(sortedByLength.length/2)-1].v); //Get the middle value
    } 
}

//For each of the set of page updates...
pageUpdates.forEach((value) => {
    checkOrdering(value);
});

console.log("📖 Total number of pages: " + pageTotal);