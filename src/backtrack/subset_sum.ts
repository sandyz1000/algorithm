
/*
http://www.geeksforgeeks.org/backttracking-set-4-subset-sum/

Backtracking | Set 4 (Subset Sum)

Subset sum problem is to find subset of elements that are selected from a given set whose sum
adds up to a given number K. We are considering the set contains non-negative values. It is
assumed that the input set is unique (no duplicates are presented).

Exhaustive Search Algorithm for Subset Sum:
------------------------------------------------

One way to find subsets that sum to K is to consider all possible subsets. A power set contains
all those subsets generated from a given set. The size of such a power set is 2N.

Backtracking Algorithm for Subset Sum
------------------------------------------------
Using exhaustive search we consider all subsets irrespective of whether they satisfy given
constraints or not. Backtracking can be used to make a systematic consideration of the elements
to be selected.

Assume given set of 4 elements, say w[1] ... w[4]. Tree diagrams can be used to design backtracking
algorithms. The following tree diagram depicts approach of generating variable sized tuple.

    -----  DIAGRAM GOES HERE ----

In the above tree, a node represents function call and a branch represents candidate element. The
root node contains 4 children. In other words, root considers every element of the set as
different branch. The next level sub-trees correspond to the subsets that includes the parent
node. The branches at each level represent tuple element to be considered. For example, if we are
at level 1, tuple_vector[1] can take any value of four branches generated. If we are at level 2
of left most node, tuple_vector[2] can take any value of three branches generated, and so on…

For example the left most child of root generates all those subsets that include w[1]. Similarly
the second child of root generates all those subsets that includes w[2] and excludes w[1].

As we go down along depth of tree we add elements so far, and if the added sum is satisfying
explicit constraints, we will continue to generate child nodes further. Whenever the constraints
are not met, we stop further generation of sub-trees of that node, and backtrack to previous node
to explore the nodes not yet explored. In many scenarios, it saves considerable amount of
processing time.

The tree should trigger a clue to implement the backtracking algorithm (try yourself). It prints
all those subsets whose sum add up to given number. We need to explore the nodes along the
breadth and depth of the tree. Generating nodes along breadth is controlled by loop and nodes
along the depth are generated using recursion (post order traversal).

Pseudo code given below
    if(subset is satisfying the constraint)
        print the subset
        exclude the current element and consider next element
    else
        generate the nodes of present level along breadth of tree and
        recur for next levels
 */
export class SubsetSum {
  total_nodes: number;

  constructor() {
    this.total_nodes = 0;
  }

  subset_sum(
    s: number[],
    t: number[],
    s_size: number,
    t_size: number,
    summation: number,
    ite: number,
    target_sum: number
  ) {
    this.total_nodes += 1;
    if (target_sum == summation && ite < s_size) {
      // We found subset
      this.print_subset(t, t_size);
      // Exclude previously added item and consider next candidate
      this.subset_sum(
        s,
        t,
        s_size,
        t_size - 1,
        summation - s[ite],
        ite + 1,
        target_sum
      );
      return;
    } else {
      // generate nodes along the breadth
      for (let i = ite; i < s_size; i++) {
        t[t_size] = s[i];
        // consider next level node (along depth)
        this.subset_sum(s, t, s_size, t_size + 1, summation + s[i], i + 1, target_sum);
      }
    }
  }

  /* 
  The power of backtracking appears when we combine explicit and implicit constraints,
  and we stop generating nodes when these checks fail. We can improve the above algorithm
  by strengthening the constraint checks and presorting the data. By sorting the initial
  array, we need not to consider rest of the array, once the sum so far is greater than
  target number. We can backtrack and check other possibilities.

  Similarly, assume the array is presorted and we found one subset. We can generate next
  node excluding the present node only when inclusion of next node satisfies the constraints.
  Given below is optimized implementation (it prunes the subtree if it is not satisfying
  constraints).

  Wrapper that prints subsets that sum to target_sum
  */
  generate_subsets(s: number[], size: number, target_sum: number) {
    const tuple_vector = new Array(size).fill(0);
    this.subset_sum(s, tuple_vector, size, 0, 0, 0, target_sum);
  }

  print_subset(arr: number[], size: number) {
    for (let i = 0; i < size; i++) {
      console.log(`${arr[i]}`);
    }
  }
}

export class SubsetSumX {
  total_nodes: number;

  constructor() {
    this.total_nodes = 0;
  }

  print_subset(arr: number[], size: number) {
    for (let i = 0; i < size; i++) {
      console.log(`${arr[i]}`);
    }
  }

  subset_sum(
    s: number[],
    t: number[],
    s_size: number,
    t_size: number,
    summation: number,
    ite: number,
    target_sum: number
  ) {
    this.total_nodes += 1;

    if (target_sum == summation) {
      this.print_subset(t, t_size);

      // constraint check
      if (
        ite + 1 < s_size &&
        summation - s[ite] + s[ite + 1] <= target_sum
      ) {
        // Exclude previous added item and consider next candidate
        this.subset_sum(
          s,
          t,
          s_size,
          t_size - 1,
          summation - s[ite],
          ite + 1,
          target_sum
        );
      }
      return;
    } else {
      // constraint check
      if (ite < s_size && summation + s[ite] <= target_sum) {
        // generate nodes along the breadth
        for (let i = ite; i < s_size; i++) {
          t[t_size] = s[i];
          if (summation + s[i] <= target_sum) {
            // consider next level node (along depth)
            this.subset_sum(
              s, t, s_size, t_size + 1, summation + s[i], i + 1, target_sum
            );
          }
        }
      }
    }
  }

  generate_subsets(s: number[], size: number, target_sum: number) {
    const tuplet_vector = new Array(size).fill(0);
    let total = 0;

    // sort the set
    s.sort((a, b) => a - b);
    for (let i = 0; i < size; i++) {
      total += s[i];
    }

    if (s[0] <= target_sum && target_sum <= total) {
      this.subset_sum(s, tuplet_vector, size, 0, 0, 0, target_sum);
    }
  }
}

if (require.main === module) {
  console.log("\nMethod-1 ----- \n");
  const subset = new SubsetSum();
  const weights = [10, 7, 5, 18, 12, 20, 15];
  const size = weights.length;
  subset.generate_subsets(weights, size, 35);
  console.log(`Nodes generated ${subset.total_nodes}`);

  console.log("\nMethod-2 ----- \n");
  const subsetX = new SubsetSumX();
  const weightsX = [15, 22, 14, 26, 32, 9, 16, 8];
  const target = 53;
  const sizeX = weightsX.length;

  subsetX.generate_subsets(weightsX, sizeX, target);
  console.log(`Nodes generated ${subsetX.total_nodes}`);
}