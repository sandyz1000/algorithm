/* Maximum and minimum of an array using minimum number of comparisons 

## METHOD 1 (Simple Linear Search)

Initialize values of min and max as minimum and maximum of the first two elements respectively.
Starting from 3rd, compare each element with max and min, and change max and min accordingly
(i.e., if the element is smaller than min then change min, else if the element is greater than
max then change max, else ignore the element)

Time Complexity: O(n)

In this method, total number of comparisons is 1 + 2(n-2) in worst case and 1 + n - 2 in best
case. In the above implementation, worst case occurs when elements are sorted in descending
order and best case occurs when elements are sorted in ascending order.


## METHOD 2 (Tournament Method)
Divide the array into two parts and compare the maximums and minimums of the the two parts to
get the maximum and the minimum of the the whole array.

Time Complexity: O(n)
Total number of comparisons: let number of comparisons be T(n). T(n) can be written as follows:

Algorithmic Paradigm: Divide and Conquer
- - - - - - - - - - - - - - - - - - - - - - - - - - -
    T(n) = T(floor(n/2)) + T(ceil(n/2)) + 2
    T(2) = 1
    T(1) = 0
- - - - - - - - - - - - - - - - - - - - - - - - - - -

If n is a power of 2, then we can write T(n) as:
- - - - - - - - - - - - - - - - - - - - - - - - - - -
    T(n) = 2T(n/2) + 2
- - - - - - - - - - - - - - - - - - - - - - - - - - -

After solving above recursion, we get
- - - - - - - - - - - - - - - - - - - - - - - - - - -
    T(n)  = 3/2n -2
- - - - - - - - - - - - - - - - - - - - - - - - - - -

Thus, the approach does 3/2n -2 comparisons if n is a power of 2. And it does more than 3/2n
-2 comparisons if n is not a power of 2.
 */

export class Pair {
    constructor(public minimum: number = 0, public maximum: number = 0) {}
}

function getMinMaxLinear(arr: number[], n: number): Pair {
    const minmax = new Pair();

    // If there is only one element, then return it as min and max both
    if (n === 1) {
        minmax.maximum = arr[0];
        minmax.minimum = arr[0];
        return minmax;
    }

    // If there are more than one elements, then initialize min and max
    if (arr[0] > arr[1]) {
        minmax.maximum = arr[0];
        minmax.minimum = arr[1];
    } else {
        minmax.maximum = arr[1];
        minmax.minimum = arr[0];
    }

    for (let i = 2; i < n; i++) {
        if (arr[i] > minmax.maximum) {
            minmax.maximum = arr[i];
        } else if (arr[i] < minmax.minimum) {
            minmax.minimum = arr[i];
        }
    }

    return minmax;
}

function getMinMaxTournament(arr: number[], low: number, high: number): Pair {
    const minmax = new Pair();
    let mml = new Pair();
    let mmr = new Pair();

    if (low === high) {  // If there is only one element
        minmax.maximum = arr[low];
        minmax.minimum = arr[low];
        return minmax;
    }

    if (high === low + 1) {  // If there are two elements
        if (arr[low] > arr[high]) {
            minmax.maximum = arr[low];
            minmax.minimum = arr[high];
        } else {
            minmax.maximum = arr[high];
            minmax.minimum = arr[low];
        }

        return minmax;
    }

    const mid = Math.floor((low + high) / 2);  // If there are more than 2 elements
    mml = getMinMaxTournament(arr, low, mid);
    mmr = getMinMaxTournament(arr, mid + 1, high);

    if (mml.minimum < mmr.minimum) {  // compare minimums of two parts
        minmax.minimum = mml.minimum;
    } else {
        minmax.minimum = mmr.minimum;
    }

    // compare maximums of two parts
    if (mml.maximum > mmr.maximum) {
        minmax.maximum = mml.maximum;
    } else {
        minmax.maximum = mmr.maximum;
    }

    return minmax;
}

if (require.main === module) {
    // Test
    console.log("\nGet min-max linear");
    const arrLinear = [1000, 11, 445, 1, 330, 3000];
    const arrSizeLinear = arrLinear.length;
    const minmaxLinear = getMinMaxLinear(arrLinear, arrSizeLinear);
    console.log("Minimum element is " + minmaxLinear.minimum);
    console.log("Maximum element is " + minmaxLinear.maximum);
    
    console.log("\nGet min-max tournament");
    const arrTournament = [1000, 11, 445, 1, 330, 3000];
    const arrSizeTournament = arrTournament.length;
    const minmaxTournament = getMinMaxTournament(arrTournament, 0, arrSizeTournament - 1);
    console.log("Minimum element is " + minmaxTournament.minimum);
    console.log("Maximum element is " + minmaxTournament.maximum);
}
