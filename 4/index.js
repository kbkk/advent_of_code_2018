const fs = require('fs');

const indexOfMax = (arr) => arr.indexOf(Math.max(...arr));
const sum = arr => arr.reduce((a, x) => a + x);

const entryDateTime = entry => entry.slice(1, 17);
const entryMinutes = entry => +entry.slice(15, 17);
const sortFn = (a, b) => {
    [a, b] = [a, b].map(entryDateTime);
    if (a > b)
        return 1;
    if (a < b)
        return -1;
    return 0;
};

const guardActivity =
    fs.readFileSync('./input.txt', {encoding: 'utf-8'})
        .split('\n')
        .sort(sortFn);

const guardSleepMinutesMap = {};
let currentGuard, asleepAt;
guardActivity.forEach(entry => {
    [, currentGuard] = entry.match(/#(\d+)/) || [undefined, currentGuard];

    if(entry.includes('falls asleep')) {
        asleepAt = entryMinutes(entry);
    }

    if(entry.includes('wakes up')) {
        const wokeAt = entryMinutes(entry);

        if(!guardSleepMinutesMap[currentGuard]) {
            guardSleepMinutesMap[currentGuard] = new Array(60).fill(0);
        }

        for(let min = asleepAt; min < wokeAt; min++) {
            guardSleepMinutesMap[currentGuard][min]++;
        }
    }
});

const asleepSumTuple = Object.entries(guardSleepMinutesMap).map(([key, val]) => [key, sum(val)]);
const [mostAsleepGuardId] = asleepSumTuple.reduce((a, b) => a[1] > b[1] ? a : b);
const part1Answer = indexOfMax(guardSleepMinutesMap[mostAsleepGuardId]) * mostAsleepGuardId;
console.log(part1Answer);

const asleepMaxTuple = Object.entries(guardSleepMinutesMap).map(([key, val]) => [key, Math.max(...val)]);
const [guardId] = asleepMaxTuple.reduce((a, b) => a[1] > b[1] ? a : b);
const part2Answer = indexOfMax(guardSleepMinutesMap[guardId]) * guardId;
console.log(part2Answer);
