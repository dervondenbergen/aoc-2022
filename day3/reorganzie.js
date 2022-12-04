const fs = require("fs");

const runExample = false;

var fileName = runExample ? "example" : "input";
var fileContent = fs.readFileSync(`${__dirname}/${fileName}.txt`, { encoding: 'utf-8' });

/**
 * 
 * @param {String} letter 
 * @returns Int
 */
const getPriority = (letter) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    if (~alphabet.indexOf(letter)) {
        return alphabet.indexOf(letter) + 1;
    } else if(~alphabet.indexOf(letter.toLowerCase())) {
        return alphabet.indexOf(letter.toLowerCase()) + 27;
    } else {
        return 0
    }
}

/**
 * 
 * @param {String} part1 
 * @param {String} part2 
 * @returns String
 */
const findCommonType = (part1, part2) => {
    var common = new Set();
    part1.split("").forEach(item => {
        if (part2.includes(item)) {
            common.add(item);
        }
    })
    return Array.from(common.values()).join("");
}

/**
 * 
 * @param {String} rucksack 
 * @returns Array<String>
 */
const getCompartments = (rucksack) => {
    const rucksackSize = rucksack.length;
    return [
        rucksack.slice(0, rucksackSize / 2),
        rucksack.slice(rucksackSize / 2),
    ]
}

const getNumberOfRucksacksTogether = (rucksacks, size) => {
    var packs = [];
    for (var i = 0; i < rucksacks.length; i += size) {
        packs.push(rucksacks.slice(i, i + size))
    }
    return packs;
}

/**
 * 
 * @param {String} rucksackContent 
 * @returns Int
 */
const getRearrangementPriority = (rucksackContent) => {
    const rucksacks = rucksackContent.split("\n");
    
    const rucksacksWithCompartments = rucksacks.map(rucksack => getCompartments(rucksack));
    
    const wrongTypesForRucksacks = rucksacksWithCompartments.map(compartments => {
        return findCommonType(compartments[0], compartments[1])
    });
    
    const priorityOfWrongTypes = wrongTypesForRucksacks.map(type => getPriority(type));

    const totalPriority = priorityOfWrongTypes.reduce((total, priority) => total + priority, 0);

    return totalPriority;
}

/**
 * 
 * @param {String} rucksackContent 
 * @returns Int
 */
const getBadgePriority = (rucksackContent) => {
    const rucksacks = rucksackContent.split("\n");
    
    const rucksacksTrios = getNumberOfRucksacksTogether(rucksacks, 3);
    
    const wrongTypesForRucksacks = rucksacksTrios.map(rucksacks => {
        return findCommonType(findCommonType(rucksacks[0], rucksacks[1]), rucksacks[2])
    });
    
    const priorityOfWrongTypes = wrongTypesForRucksacks.map(type => getPriority(type));

    const totalPriority = priorityOfWrongTypes.reduce((total, priority) => total + priority, 0);

    return totalPriority;
}

var resultPart1 = getRearrangementPriority(fileContent);
console.log("Result Day 3 Part 1:", resultPart1);

var resultPart2 = getBadgePriority(fileContent);
console.log("Result Day 3 Part 2:", resultPart2);
