/* """
Depth First Traversal (or Search) for a graph is similar to Depth First Traversal (DFS) of a
tree. The only catch here is, unlike trees, graphs may contain cycles, so we may come to the same
node again. To avoid processing a node more than once, we use a boolean visited array.

For example, a DFS of below graph is "0 3 4 2 1", other possible DFS is "0 2 1 3 4".

    (1) --> (0) ---> (3)
     A      /  <-\     |
     |     /      \    |
     |    /        \   V
    (2)<-           - (4)

Time complexity of iterative implementation is O(V + E).
"""
 */

export class Stack<T> {
  private capacity: number;
  private top: number;
  private container: T[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.top = -1;
    this.container = new Array(this.capacity).fill(0) as T[];
  }

  peek(): T {
    return this.container[this.top];
  }

  empty(): boolean {
    return this.top === -1;
  }

  push(item: T): void {
    if (this.top + 1 > this.capacity) {
      throw new Error("Index exceed capacity");
    }

    this.top += 1;
    this.container[this.top] = item;
  }

  pop(): T {
    if (this.top < 0) {
      throw new Error("No item to pop");
    }

    const result = this.container[this.top];
    this.container[this.top] = null as unknown as T;
    this.top -= 1;
    return result;
  }
}

export class Graph {
  private V: number;
  private adj: { [key: number]: number[] };

  constructor(V: number) {
    this.V = V;
    this.adj = {};
  }

  addEdge(v: number, w: number): void {
    if (!this.adj[v]) {
      this.adj[v] = [];
    }
    this.adj[v].push(w);
  }

  dfs(s: number): void {
    const visited: boolean[] = new Array(this.V).fill(false);
    const stack = new Stack<number>(100);
    stack.push(s);

    while (!stack.empty()) {
      s = stack.pop();

      if (!visited[s]) {
        console.log(s + " ");
        visited[s] = true;
      }

      for (const i of this.adj[s] || []) {
        if (!visited[i]) {
          stack.push(i);
        }
      }
    }
  }
}

if (require.main === module) {

  // Testing the TypeScript code with the provided example
  const g = new Graph(5);
  g.addEdge(1, 0);
  g.addEdge(0, 2);
  g.addEdge(2, 1);
  g.addEdge(0, 3);
  g.addEdge(1, 4);

  console.log("Following is Depth First Traversal");
  g.dfs(0);

}