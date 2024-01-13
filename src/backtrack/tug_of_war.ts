/* 
# Tug of War
# ===========
# Given a set of n integers, divide the set in two subsets of n/2 sizes each such that the
# difference of the sum of two subsets is as minimum as possible. If n is even, then sizes of two
# subsets must be strictly n/2 and if n is odd, then size of one subset must be (n-1)/2 and size of
# other subset must be (n+1)/2.

# For example, let given set be {3, 4, 5, -3, 100, 1, 89, 54, 23, 20}, the size of set is 10.
# Output for this set should be {4, 100, 1, 23, 20} and {3, 5, -3, 89, 54}. Both output subsets are
# of size 5 and sum of elements in both subsets is same (148 and 148). Let us consider another
# example where n is odd. Let given set be {23, 45, -34, 12, 0, 98, -99, 4, 189, -1, 4}. The output
# subsets should be {45, -34, 12, 98, -1} and {23, 0, -99, 4, 189, 4}. The sums of elements in two
# subsets are 120 and 121 respectively.

# The following solution tries every possible subset of half size. If one subset of half size is
# formed, the remaining elements form the other subset. We initialize current set as empty and one
# by one build it. There are two possibilities for every element, either it is part of current set,
# or it is part of the remaining elements (other subset). We consider both possibilities for every
# element. When the size of current set becomes n/2, we check whether this solutions is better than
# the best solution available so far. If it is, then we update the best solution.

 */
export class TugOfWar {
  private min_diff: number = Number.MAX_SAFE_INTEGER;

  private printSolution(arr: number[], soln: boolean[], n: number): void {
    console.log("The first subset is:");
    for (let i = 0; i < n; i++) {
      if (soln[i]) {
        console.log(arr[i]);
      }
    }

    console.log("\nThe second subset is:");
    for (let i = 0; i < n; i++) {
      if (!soln[i]) {
        console.log(arr[i]);
      }
    }
  }

  private towUtils(
    arr: number[],
    n: number,
    currElements: boolean[],
    noOfSelectedElements: number,
    soln: boolean[],
    summation: number,
    currSum: number,
    currPosition: number
  ): void {
    if (currPosition === n) {
      return;
    }

    if ((n / 2 - noOfSelectedElements) > (n - currPosition)) {
      return;
    }

    this.towUtils(
      arr, n, currElements,
      noOfSelectedElements, soln, summation,
      currSum,
      currPosition + 1
    );

    noOfSelectedElements += 1;
    currSum = currSum + arr[currPosition];
    currElements[currPosition] = true;

    if (noOfSelectedElements === n / 2) {
      if (Math.abs(summation / 2 - currSum) < this.min_diff) {
        this.min_diff = Math.abs(summation / 2 - currSum);
        for (let i = 0; i < n; i++) {
          soln[i] = currElements[i];
        }
      }
    } else {
      this.towUtils(
        arr, n, currElements, noOfSelectedElements, soln,
        summation,
        currSum,
        currPosition + 1
      );
    }

    currElements[currPosition] = false;
  }

  public tugOfWar(arr: number[], n: number): void {
    // the boolean array that contains the inclusion and exclusion of an element in current set.
    // The number excluded automatically form the other set
    const currElements: boolean[] = Array(n).fill(false);
    const soln: boolean[] = Array(n).fill(false);
    const summation: number = arr.reduce((sum, curr) => sum + curr, 0);

    this.towUtils(arr, n, currElements, 0, soln, summation, 0, 0);

    console.log("The first subset is:", arr.filter((_, i) => soln[i]));
    console.log("The second subset is:", arr.filter((_, i) => !soln[i]));
  }
}

if (require.main === module) {
  const test = new TugOfWar();
  const arr = [23, 45, -34, 12, 0, 98, -99, 4, 189, -1, 4];
  const n = arr.length;
  test.tugOfWar(arr, n);
}