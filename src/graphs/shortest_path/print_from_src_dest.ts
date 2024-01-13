/* """Print all paths from a given source to a destination
Given a directed graph, a source vertex 's' and a destination vertex 'd', print all paths from
given 's' to 'd'.

    0 ----> 3
    ^ \     ^
    |   \   |
    v     \ |
    2 ----> 1

""" */

// This class represents a directed graph using adjacency list representation
export class Graph {
  private V: number;
  private graph: { [key: number]: number[] };

  constructor(vertices: number) {
    // No. of vertices
    this.V = vertices;

    // default dictionary to store graph
    this.graph = {};
  }

  // function to add an edge to the graph
  public addEdge(u: number, v: number): void {
    if (!this.graph[u]) {
      this.graph[u] = [];
    }
    this.graph[u].push(v);
  }

  private printAllPathsUtil(u: number, d: number, visited: boolean[], path: number[]): void {
    /**
     * A recursive function to print all paths from 'u' to 'd'. visited[] keeps track of
     * vertices in the current path. path[] stores actual vertices and path_index is the current index
     * in path[]
     * @param u Current vertex
     * @param d Destination vertex
     * @param visited Boolean array to keep track of visited vertices
     * @param path Array to store the current path
     */
    // Mark the current node as visited and store it in the path
    visited[u] = true;
    path.push(u);

    // If the current vertex is the same as the destination, then print the current path
    if (u === d) {
      console.log(path);
    } else {
      // If the current vertex is not the destination
      // Recur for all the vertices adjacent to this vertex
      for (const i of this.graph[u] || []) {
        if (!visited[i]) {
          this.printAllPathsUtil(i, d, visited, path);
        }
      }
    }

    // Remove the current vertex from the path and mark it as unvisited
    path.pop();
    visited[u] = false;
  }

  public printAllPaths(s: number, d: number): void {
    /** Prints all paths from 's' to 'd' */
    // Mark all the vertices as not visited
    const visited: boolean[] = Array.from({ length: this.V }, () => false);

    // Create an array to store paths
    const path: number[] = [];

    // Call the recursive helper function to print all paths
    this.printAllPathsUtil(s, d, visited, path);
  }
}

if (require.main === module) {
  const g: Graph = new Graph(4);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(0, 3);
  g.addEdge(2, 0);
  g.addEdge(2, 1);
  g.addEdge(1, 3);
  const s: number = 2;
  const d: number = 3;
  console.log(`Following are all different paths from ${s} to ${d} :`);
  g.printAllPaths(s, d);
}