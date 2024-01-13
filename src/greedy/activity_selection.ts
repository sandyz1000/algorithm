/* """
The following implementation assumes that the activities are already sorted according to their
finish time.

Prints a maximum set of activities that can be done by a single person, one at a time
# n --> Total number of activities
# s[]--> An array that contains start time of all activities
# f[] --> An array that contains finish time of all activities

""" */

function printMaxActivities(s: number[], f: number[]): void {
    const n: number = f.length;
    console.log("The following activities are selected");

    // The first activity is always selected
    let i: number = 0;
    console.log(i + " ");

    // Consider rest of the activities
    for (let j = 1; j < n; j++) {
        // If this activity has a start time greater than or equal to the finish time of previously
        // selected activity, then select it
        if (s[j] >= f[i]) {
            console.log(j+" ");
            i = j;
        }
    }
}

if (require.main === module) {
    // Example usage
    const startTimes: number[] = [1, 3, 0, 5, 8, 5];
    const finishTimes: number[] = [2, 4, 6, 7, 9, 9];
    printMaxActivities(startTimes, finishTimes);
}
