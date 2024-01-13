// coding=utf-8
// n=range(100) -- [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ...]
// delete every second number 1,3,5,7,9,11,13,15,17,19, ....
// delete every third number 1, 3, 7, 9, 13, 15, 19, ....


let COUNTER: number = 2;

function isLucky(n: number): number {
    let position: number = n;

    if (COUNTER > n) {
        return 1;
    }

    if (COUNTER % n === 0) {
        return 0;
    }

    position -= position / COUNTER;
    COUNTER += 1;
    return isLucky(position);
}

if (require.main === module) {
    const x: number = 7;

    if (isLucky(x)) {
        console.log(`${x} is a lucky number.`);
    } else {
        console.log(`${x} is not a lucky number.`);
    }
}
