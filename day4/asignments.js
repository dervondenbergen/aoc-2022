const fs = require("fs");

const runExample = process.env.EXAMPLE ? true : false;

var fileName = runExample ? "example" : "input";
var fileContent = fs.readFileSync(`${__dirname}/${fileName}.txt`, { encoding: 'utf-8' });

/** @typedef {{ to: Int, from: Int }} Assignment */
/**
 * 
 * @param {String} range 
 * @returns Assignment
 */
const getAssignmentsFromRange = (range) => {
    var fromTo = range.split("-");
    return {
        from: parseInt(fromTo[0], 10),
        to: parseInt(fromTo[1], 10),
    };
}

/**
 * 
 * @param {String} assignmentPair 
 * @returns Array<Assignment>
 */
const getAssignmentsForPair = (assignmentPair) => {
    var assignmentRanges = assignmentPair.split(",");
    var elf1Range = getAssignmentsFromRange(assignmentRanges[0]);
    var elf2Range = getAssignmentsFromRange(assignmentRanges[1]);
    return [elf1Range, elf2Range]
}

/**
 * 
 * @param {Assignment} assignment1 
 * @param {Assignment} assignment2 
 * @returns 
 */
const doAssignmentsOverlapFully = (assignment1, assignment2) => {
    var oneSmallerTwo = (assignment1.from <= assignment2.from) && (assignment1.to >= assignment2.to)
    var twoSmallerOne = (assignment2.from <= assignment1.from) && (assignment2.to >= assignment1.to)
    if (oneSmallerTwo || twoSmallerOne) {
        return true
    } else {
        return false
    }
}

/**
 * 
 * @param {Assignment} assignment1 
 * @param {Assignment} assignment2 
 * @returns 
 */
const doAssignmentsOverlapPartially = (assignment1, assignment2) => {
    var overlapFully = doAssignmentsOverlapFully(assignment1, assignment2);
    var overlapPartially = (assignment1.from <= assignment2.to) && (assignment1.to >= assignment2.from)
    if (overlapFully || overlapPartially) {
        return true
    } else {
        return false
    }
}

/**
 * 
 * @param {String} assignmentList 
 * @returns Int
 */
const getNumberOfContainedAssignments = (assignmentList) => {
    const assignmentPairs = assignmentList.split("\n");

    const assignmentsRanges = assignmentPairs.map(assignment => getAssignmentsForPair(assignment));

    const containedAssignments = assignmentsRanges.map(assignment => doAssignmentsOverlapFully(assignment[0], assignment[1]))

    const numberOfContainedAssignments = containedAssignments.filter(assignment => assignment === true).length;

    return numberOfContainedAssignments
}

/**
 * 
 * @param {String} assignmentList 
 * @returns Int
 */
const getNumberOfOverlappingAssignments = (assignmentList) => {
    const assignmentPairs = assignmentList.split("\n");

    const assignmentsRanges = assignmentPairs.map(assignment => getAssignmentsForPair(assignment));

    const overlappingAssignments = assignmentsRanges.map(assignment => doAssignmentsOverlapPartially(assignment[0], assignment[1]))

    const numberOfOverlappingAssignments = overlappingAssignments.filter(assignment => assignment === true).length;

    return numberOfOverlappingAssignments
}

var resultPart1 = getNumberOfContainedAssignments(fileContent);
console.log("Result Day 4 Part 1:", resultPart1);

var resultPart2 = getNumberOfOverlappingAssignments(fileContent);
console.log("Result Day 4 Part 2:", resultPart2);
