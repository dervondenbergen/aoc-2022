const fs = require("fs");

const runExample = false;

var fileName = runExample ? "example" : "input";
var fileContent = fs.readFileSync(`${__dirname}/${fileName}.txt`, { encoding: 'utf-8' });

const OUTCOMES = {
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
}

const SHAPES = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
}

const outcomeOfTwoShapes = (opponentShape, ownShape) => {
    if (opponentShape === ownShape) {
        return OUTCOMES.DRAW;
    } else {
        switch (opponentShape) {
            case SHAPES.ROCK:
                return ownShape === SHAPES.PAPER    ? OUTCOMES.WIN : OUTCOMES.LOSE;
            case SHAPES.PAPER:
                return ownShape === SHAPES.SCISSORS ? OUTCOMES.WIN : OUTCOMES.LOSE;
            case SHAPES.SCISSORS:
                return ownShape === SHAPES.ROCK     ? OUTCOMES.WIN : OUTCOMES.LOSE;
        }
    }
}

const shapeForWantedOutcome = (opponentShape, outcome) => {
    if (outcome === OUTCOMES.DRAW) {
        return opponentShape;
    } else {
        switch (opponentShape) {
            case SHAPES.ROCK:
                return outcome === OUTCOMES.WIN ? SHAPES.PAPER    : SHAPES.SCISSORS;
            case SHAPES.PAPER:
                return outcome === OUTCOMES.WIN ? SHAPES.SCISSORS : SHAPES.ROCK;
            case SHAPES.SCISSORS:
                return outcome === OUTCOMES.WIN ? SHAPES.ROCK     : SHAPES.PAPER;
        }
    }
}

const opponentMoves = {
    A: SHAPES.ROCK,
    B: SHAPES.PAPER,
    C: SHAPES.SCISSORS,
}

const ownMoves = {
    X: SHAPES.ROCK,
    Y: SHAPES.PAPER,
    Z: SHAPES.SCISSORS,
}

const ownOutcomes = {
    X: OUTCOMES.LOSE,
    Y: OUTCOMES.DRAW,
    Z: OUTCOMES.WIN,
}

const outcomeOfTwoMoves = (opponentMove, ownMove) => {
    const opponentShape = opponentMoves[opponentMove];
    const ownShape = ownMoves[ownMove];
    return outcomeOfTwoShapes(opponentShape, ownShape) + ownShape;
}

const outcomeOfMoveAndOutcome = (opponentMove, ownOutcome) => {
    const opponentShape = opponentMoves[opponentMove];
    const ownShape = shapeForWantedOutcome(opponentShape, ownOutcomes[ownOutcome]);
    return outcomeOfTwoShapes(opponentShape, ownShape) + ownShape;
}

const getGameScoreWithWrongAssumption = (strategyGuide) => {

    var strategyMoves = strategyGuide.split("\n").map(move => {
        var moveNames = move.split(" ");
        return {
            opponent: moveNames[0],
            own: moveNames[1],
        }
    });

    var totalScore = 0;
    strategyMoves.forEach(move => {
        totalScore += outcomeOfTwoMoves(move.opponent, move.own)
    })

    return totalScore
}

const getGameScore = (strategyGuide) => {

    var strategyMoves = strategyGuide.split("\n").map(move => {
        var moveNames = move.split(" ");
        return {
            opponent: moveNames[0],
            own: moveNames[1],
        }
    });

    var totalScore = 0;
    strategyMoves.forEach(move => {
        totalScore += outcomeOfMoveAndOutcome(move.opponent, move.own)
    })

    return totalScore
}

var resultPart1 = getGameScoreWithWrongAssumption(fileContent);
console.log("Result Day 2 Part 1:", resultPart1);

var resultPart2 = getGameScore(fileContent);
console.log("Result Day 2 Part 2:", resultPart2);
