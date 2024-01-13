/* """
Weighted Job Scheduling

Given N jobs where every job is represented by following three elements of it.

Start Time
Finish Time
Profit or Value Associated (>= 0)
Find the maximum profit subset of jobs such that no two jobs in the subset overlap.

Example:
========
Input: Number of Jobs n = 4
    Job Details {Start Time, Finish Time, Profit}
    Job 1:  {1, 2, 50}
    Job 2:  {3, 5, 20}
    Job 3:  {6, 19, 100}
    Job 4:  {2, 100, 200}
Output: The maximum profit is 250.
We can get the maximum profit by scheduling jobs 1 and 4.
Note that there is longer schedules possible Jobs 1, 2 and 3
but the profit with this schedule is 20+50+100 which is less than 250.

The above solution may contain many overlapping subproblems. For example if lastNonConflicting()
always returns previous job, then findMaxProfitRec(arr, n-1) is called twice and the time complexity
becomes O(n*2n). As another example when lastNonConflicting() returns previous to previous job,
there are two recursive calls, for n-2 and n-1. In this example case, recursion becomes same as Fibonacci Numbers.

So this problem has both properties of Dynamic Programming,
-> Optimal Substructure and
-> Overlapping Subproblems.
Like other Dynamic Programming Problems, we can solve this problem by
making a table that stores solution of subproblems.
""" */
class Job {
  constructor(public start: number, public finish: number, public profit: number) { }
}

class FindMaxProfit {
  arr: Job[];
  n: number;

  constructor(arr: Job[], n: number) {
    this.arr = arr;
    this.n = n;
  }

  latestNonConflict(arr: Job[], i: number): number {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j].finish <= arr[i].start) {
        return j;
      }
    }
    return -1;
  }

  findMaxProfit(): number {
    // Sort jobs according to finish time
    this.arr.sort((s1, s2) => s1.finish - s2.finish);

    // Create an array to store solutions of subproblems. table[i]
    // stores the profit for jobs till arr[i] (including arr[i])
    const table: number[] = Array(this.n).fill(0);
    table[0] = this.arr[0].profit;

    // Fill entries in table[] using recursive property
    for (let i = 1; i < this.n; i++) {
      // Find profit including the current job
      let inclProf = this.arr[i].profit;
      const l = this.latestNonConflict(this.arr, i);
      if (l !== -1) {
        inclProf += table[l];
      }

      // Store maximum of including and excluding
      table[i] = Math.max(inclProf, table[i - 1]);
    }

    // Store result and free dynamic memory allocated for table[]
    const result = table[this.n - 1];
    return result;
  }
}

if (require.main === module) {

  // Test case
  const arr: Job[] = [
    new Job(3, 10, 20),
    new Job(1, 2, 50),
    new Job(6, 19, 100),
    new Job(2, 100, 200),
  ];

  const findMaxProfitInstance = new FindMaxProfit(arr, arr.length);
  console.log("The optimal profit is", findMaxProfitInstance.findMaxProfit());
}