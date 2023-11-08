const fs = require("fs");

const runExample = process.env.EXAMPLE ? true : false;

var fileName = runExample ? "example" : "input";
var fileContent = fs.readFileSync(`${__dirname}/${fileName}.txt`, { encoding: 'utf-8' });

/**
 * @typedef { [index: String]: [String] } Stacks  
 * @typedef {{ amount: Int, fromStack: String, toStack: String }} Procedure
 * @typedef {{ stacks: Stacks, rearrangements: [Procedure] }} ElfDrawing
 */

/**
 * @param {String} stackNote
 * @returns {Stacks}
 */
const parseStacksNote = (stackNote) => {
    var stacks = {};

    var rows = stackNote.split("\n");
    var stackIds = rows.pop().split("");

    stackIds.forEach((stackIdString, index) => {
        if (stackIdString !== " ") {
            var stackId = parseInt(stackIdString, 10);
            var stackCrates = rows.map(row => row[index]).reverse().filter(crate => crate != " ");
            stacks[stackId] = stackCrates;
        }
    })

    return stacks;
}

/**
 * @param {String} rearrangementNote
 * @returns {Array<Procedure>}
 */
 const parseRearrangementsNote = (rearrangementNote) => {
    var procedures = [];

    var rearrangements = rearrangementNote.split("\n");
    rearrangements.forEach(rearrangement => {
        var parts = rearrangement.split(" ");
        
        var amount = parts[1];
        var fromStack = parts[3];
        var toStack = parts[5];

        procedures.push({
            amount,
            fromStack,
            toStack
        })
    })

    return procedures;
}

/**
 * 
 * @param {String} elfDrawingNote 
 * @returns {ElfDrawing}
 */
const parseElfDrawingNote = (elfDrawingNote) => {
    var parts = elfDrawingNote.split("\n\n");
    
    var stacks = parseStacksNote(parts[0]);
    var rearrangements = parseRearrangementsNote(parts[1]);

    return {
        stacks,
        rearrangements,
    }
}
/**
 * 
 * @param {ElfDrawing} elfDrawing 
 */
const drawElfDrawingNote = (elfDrawing) => {
    var note = ""

    var highestStackNumber = Math.max(...Object.values(elfDrawing.stacks).map(crates => crates.length));
    var stackRows = Array(highestStackNumber + 1).fill([]).map(_ => []);

    Object.entries(elfDrawing.stacks).forEach(([stackId, crates]) => {
        for (var i = 0; i < highestStackNumber; i++) {
            var crate = crates[highestStackNumber - i - 1];
            var stackRowCrateValue = crate !== undefined ? `[${crate}]` : "   "
            stackRows[i].push(stackRowCrateValue)
        }
        stackRows[highestStackNumber].push(` ${stackId} `)
    })

    note += stackRows.map(r => r.join(" ")).join("\n");

    var predictionRows = elfDrawing.rearrangements.map(procedure => {
        return `move ${procedure.amount} from ${procedure.fromStack} to ${procedure.toStack}`
    })

    if (predictionRows.length > 0) {
        note += "\n\n";
        note += predictionRows.join("\n");
    }

    console.log(note);
}

const getTopCrates = (elfDrawingNote) => {
    var elfDrawing = parseElfDrawingNote(elfDrawingNote)
    
    console.log(elfDrawingNote)
    drawElfDrawingNote(elfDrawing);
    
    return ""
}

var resultPart1 = getTopCrates(fileContent);
console.log("Result Day 5 Part 1:", resultPart1);

// var resultPart2 = getNumberOfOverlappingAssignments(fileContent);
// console.log("Result Day 5 Part 2:", resultPart2);
