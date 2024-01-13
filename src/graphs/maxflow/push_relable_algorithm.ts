/* """Push Relabel Algorithm | Set 1 (Introduction and Illustration)

http://www.geeksforgeeks.org/push-relabel-algorithm-set-1-introduction-and-illustration/
http://www.geeksforgeeks.org/push-relabel-algorithm-set-2-implementation/


Given a graph which represents a flow network where every edge has a capacity. Also given two
vertices source 's' and sink 't' in the graph, find the maximum possible flow from s to t with
following constraints:

a) Flow on an edge doesn’t exceed the given capacity of the edge.

b) Incoming flow is equal to outgoing flow for every vertex except s and t.

------------------------------------------------
Explanation:
------------------------------------------------

--Push-Relabel Algorithm--

Push-Relabel approach is the more efficient than Ford-Fulkerson algorithm. In this post,
Goldberg's "generic" maximum-flow algorithm is discussed that runs in O(V2E) time. This time
complexity is better than O(E2V) which is time complexity of Edmond-Karp algorithm (a BFS based
implementation of Ford-Fulkerson). There exist a push-relabel approach based algorithm that works
in O(V3) which is even better than the one discussed here.

--Similarities with Ford Fulkerson--

Like Ford-Fulkerson, Push-Relabel also works on Residual Graph (Residual Graph of a flow network
is a graph which indicates additional possible flow. If there is a path from source to sink in
residual graph, then it is possible to add flow).

--Differences with Ford Fulkerson--

1.  Push-relabel algorithm works in a more localized. Rather than examining the entire residual
    network to find an augmenting path, push-relabel algorithms work on one vertex at a time (Source
    : CLRS Book).
2.  In Ford-Fulkerson, net difference between total outflow and total inflow for every vertex (
    Except source and sink) is maintained 0. Push-Relabel algorithm allows inflow to exceed the
    outflow before reaching the final flow. In final flow, the net difference is 0 for all except
    source and sink.
3.  Time complexity wise more efficient.

The intuition behind the push-relabel algorithm (considering a fluid flow problem) is that we
consider edges as water pipes and nodes are joints. The source is considered to be at the highest
level and it sends water to all adjacent nodes. Once a node has excess water, it pushes water to
a smaller height node. If water gets locally trapped at a vertex, the vertex is Relabeled which
means its height is increased.

Following are some useful facts to consider before we proceed to algorithm.

1. Each vertex has associated to it a height variable and a Excess Flow. Height is used to determine
whether a vertex can push flow to an adjacent or not (A vertex can push flow only to a smaller
height vertex). Excess flow is the difference of total flow coming into the vertex minus the
total flow going out of the vertex.
    - - -- - - - - -- - --  - - - -
    Excess Flow of u = Total Inflow to u - Total Outflow from u
    - - -- - - - - -- - --  - - - -

2.  Like Ford Fulkerson. each edge has associated to it a flow (which indicates current flow) and a
capacity

--------------------------------------------------
Algorithm:
--------------------------------------------------

Following are abstract steps of complete algorithm.

Push-Relabel Algorithm
1) Initialize PreFlow : Initialize Flows and Heights

2) While it is possible to perform a Push() or Relablel() on a vertex
   # Or while there is a vertex that has excess flow
        Do Push() or Relabel()

# At this point all vertices have Excess Flow as 0 (Except source and sink)
3) Return flow.


There are three main operations in Push-Relabel Algorithm

1. Initialize PreFlow() It initializes heights and flows of all vertices.
- - - - - - - - - - - - - - - - - - - - - - - -
    Preflow()
    1) Initialize height and flow of every vertex as 0.
    2) Initialize height of source vertex equal to total number of vertices in graph.
    3) Initialize flow of every edge as 0.
    4) For all vertices adjacent to source s, flow and excess flow is equal to capacity initially.
- - - - - - - - - - - - - - - - - - - - - - - -

2. Push() is used to make the flow from a node which has excess flow. If a vertex has excess flow
and there is an adjacent with smaller height (in residual graph), we push the flow from the
vertex to the adjacent with lower height. The amount of pushed flow through the pipe (edge) is
equal to the minimum of excess flow and capacity of edge.

3. Relabel() operation is used when a vertex has excess flow and none of its adjacent is at lower
height. We basically increase height of the vertex so that we can perform push(). To increase
height, we pick the minimum height adjacent (in residual graph, i.e., an adjacent to whom we can
add flow) and add 1 to it. """
 */

export class Edge {
  // To store current flow and capacity of edge
  flow: number;
  capacity: number;
  u: number;
  v: number;

  constructor(flow: number, capacity: number, u: number, v: number) {
    this.flow = flow;
    this.capacity = capacity;
    this.u = u;
    this.v = v;
  }
}

export class Vertex {
  // Represent a Vertex
  h: number;
  e_flow: number;

  constructor(h: number, e_flow: number) {
    this.h = h;
    this.e_flow = e_flow;
  }
}

export class Graph {
  // To represent a flow network
  V: number;
  ver: Vertex[];
  edge: Edge[];

  constructor(V: number) {
    this.V = V;
    this.ver = [];
    this.edge = [];

    // all vertices are initialized with 0 height and 0 excess flow
    for (let i = 0; i < this.V; i++) {
      this.ver.push(new Vertex(0, 0));
    }
  }

  addEdge(u: number, v: number, capacity: number) {
    // flow is initialized with 0 for all edge
    this.edge.push(new Edge(0, capacity, u, v));
  }

  preFlow(s: number) {
    // Making h of source Vertex equal to no. of vertices Height of other vertices is 0.
    this.ver[s].h = this.ver.length;
    for (let i = 0; i < this.edge.length; i++) {
      // If current edge goes from source
      if (this.edge[i].u === s) {
        // Flow is equal to capacity
        this.edge[i].flow = this.edge[i].capacity;

        // Initialize excess flow for adjacent v
        this.ver[this.edge[i].v].e_flow += this.edge[i].flow;

        // Add an edge from v to s in the residual graph with capacity equal to 0
        this.edge.push(new Edge(-this.edge[i].flow, 0, this.edge[i].v, s));
      }
    }
  }

  overflowVertex(ver: Vertex[]) {
    // returns index of overflowing Vertex
    for (let i = 1; i < ver.length - 1; i++) {
      if (ver[i].e_flow > 0) {
        return i;
      }
    }
    // -1 if no overflowing Vertex
    return -1;
  }

  updateReverseEdgeFlow(i: number, flow: number) {
    // Update reverse flow for flow added on the ith Edge
    const u = this.edge[i].v;
    const v = this.edge[i].u;

    for (let j = 0; j < this.edge.length; j++) {
      if (this.edge[j].v === v && this.edge[j].u === u) {
        this.edge[j].flow -= flow;
        return;
      }
    }

    // adding reverse Edge in the residual graph
    const e = new Edge(0, flow, u, v);
    this.edge.push(e);
  }

  push(u: number) {
    // To push flow from overflowing vertex u
    // Traverse through all edges to find an adjacent (of u) to which flow can be pushed
    for (let i = 0; i < this.edge.length; i++) {
      // Checks u of the current edge is the same as the given overflowing vertex
      if (this.edge[i].u === u) {
        // if flow is equal to capacity then no push is possible
        if (this.edge[i].flow === this.edge[i].capacity) {
          continue;
        }

        // Push is only possible if the height of the adjacent is smaller than the height of
        // the overflowing vertex
        if (this.ver[u].h > this.ver[this.edge[i].v].h) {
          // Flow to be pushed is equal to the minimum of remaining flow on the edge
          // and excess flow.
          const flow = Math.min(this.edge[i].capacity - this.edge[i].flow, this.ver[u].e_flow);
          // Reduce excess flow for the overflowing vertex
          this.ver[u].e_flow -= flow;
          // Increase excess flow for adjacent
          this.ver[this.edge[i].v].e_flow += flow;
          // Add residual flow (With capacity 0 and negative flow)
          this.edge[i].flow += flow;
          this.updateReverseEdgeFlow(i, flow);
          return true;
        }
      }
    }
    return false;
  }

  relabel(u: number) {
    // function to relabel vertex u
    // Initialize the minimum height of an adjacent
    let mh = Number.MAX_SAFE_INTEGER;

    // Find the adjacent with the minimum height
    for (let i = 0; i < this.edge.length; i++) {
      if (this.edge[i].u === u) {
        // if flow is equal to capacity then no relabeling
        if (this.edge[i].flow === this.edge[i].capacity) {
          continue;
        }

        // Update the minimum height
        if (this.ver[this.edge[i].v].h < mh) {
          mh = this.ver[this.edge[i].v].h;

          // updating the height of u
          this.ver[u].h = mh + 1;
        }
      }
    }
  }

  getMaxFlow(s: number, t: number): number {
    // main function for printing the maximum flow of the graph
    this.preFlow(s);

    // loop until none of the Vertex is in overflow
    while (this.overflowVertex(this.ver) !== -1) {
      const u = this.overflowVertex(this.ver);
      if (!this.push(u)) {
        this.relabel(u);
      }
    }

    // ver.back() returns the last Vertex, whose e_flow will be the final maximum flow
    const lastVer = this.ver.length - 1;
    return this.ver[lastVer].e_flow;
  }
}

// Driver code
if (require.main === module) {

  // Output: Maximum flow is 23
  const V = 6;
  const g = new Graph(V);

  // Creating the above-shown flow network
  g.addEdge(0, 1, 16);
  g.addEdge(0, 2, 13);
  g.addEdge(1, 2, 10);
  g.addEdge(2, 1, 4);
  g.addEdge(1, 3, 12);
  g.addEdge(2, 4, 14);
  g.addEdge(3, 2, 9);
  g.addEdge(3, 5, 20);
  g.addEdge(4, 3, 7);
  g.addEdge(4, 5, 4);

  // Initialize source and sink
  const source = 0;
  const sink = 5;

  console.log("Maximum flow is", g.getMaxFlow(source, sink));
}
