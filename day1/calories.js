const fs = require("fs");

const runExample = false;

var fileName = runExample ? "example" : "input";
var fileContent = fs.readFileSync(`${__dirname}/${fileName}.txt`, { encoding: 'utf-8' });

const getCaloriesOfTopAmountElfsWithMostCalories = (caloriesList, topAmount = 1) => {
    var caloriesPerElf = caloriesList.split('\n\n');
    var caloriesPerElfCombined = caloriesPerElf.map(notePerElf => {
        var totalCaloriePerElf = notePerElf.split('\n').reduce((totalCalories, currentCaloriesString) => {
            return totalCalories + parseInt(currentCaloriesString, 10);
        }, 0);
        return totalCaloriePerElf
    });
    var sortedCalories = caloriesPerElfCombined.sort((a, b) => b - a);
    var topCaloriesPerElf = sortedCalories.slice(0, topAmount);
    return topCaloriesPerElf.reduce((sum, calories) => sum + calories, 0);
};
const getCaloriesOfElfWithMostCalories = (caloriesList) => {
    return getCaloriesOfTopAmountElfsWithMostCalories(caloriesList, 1)
}

module.exports = {
    getCaloriesOfElfWithMostCalories,
    getCaloriesOfTopAmountElfsWithMostCalories,
}

var resultPart1 = getCaloriesOfElfWithMostCalories(fileContent);
console.log("Result Day 1 Part 1:", resultPart1);

var resultPart2 = getCaloriesOfTopAmountElfsWithMostCalories(fileContent, 3);
console.log("Result Day 1 Part 2:", resultPart2);
