#!/usr/bin/env node

const { fork } = require("child_process");
const fs = require("fs");
const test = process.argv[2] === "test";
const day = process.argv[3];

try {
    const dayFiles = fs.readdirSync(`${__dirname}/day${day}`);
    const jsFile = dayFiles.find(f => f.includes(".js"))
    if (jsFile) {
        fork(`${__dirname}/day${day}/${jsFile}`, {
            env: test ? { EXAMPLE: true, } : {},
        })
    }
} catch (error) {
    console.info(`Day ${day} does not exist!`)
}
