// Backtracking | Set 6 (Hamiltonian Cycle)


import { assert } from "console";

// Hamiltonian Path in an undirected graph is a path that visits each vertex exactly once. A
// Hamiltonian cycle (or Hamiltonian circuit) is a Hamiltonian Path such that there is an edge (in
// graph) from the last vertex to the first vertex of the Hamiltonian Path. Determine whether a
// given graph contains Hamiltonian Cycle or not. If it contains, then print the path. Following are
// the input and output of the required function.

// --------------------------------
// Example:
// --------------------------------
// Input:
// A 2D array graph[V][V] where V is the number of vertices in graph and graph[V][V] is adjacency
// matrix representation of the graph. A value graph[i][j] is 1 if there is a direct edge from i to
// j, otherwise graph[i][j] is 0.

// Output:
// An array path[V] that should contain the Hamiltonian Path. path[i] should represent the ith
// vertex in the Hamiltonian Path. The code should also return false if there is no Hamiltonian
// Cycle in the graph.

// For example, a Hamiltonian Cycle in the following graph is {0, 1, 2, 4, 3, 0}. There are more
// Hamiltonian Cycles in the graph like {0, 3, 4, 2, 1, 0}

// (0)--(1)--(2)
//  |   / \   |
//  |  /   \  |
//  | /     \ |
// (3)-------(4)
// And the following graph doesn't contain any Hamiltonian Cycle.

// (0)--(1)--(2)
//  |   / \   |
//  |  /   \  |
//  | /     \ |
// (3)      (4)

// --------------------------------
// Naive Algorithm
// --------------------------------
// Generate all possible configurations of vertices and print a configuration that satisfies the
// given constraints. There will be n! (n factorial) configurations.

// while (there are untried configurations):
//    generate the next configuration
//    if ( there are edges between two consecutive vertices of this
//         configuration and there is an edge from the last vertex to
//         the first ):
//         print this configuration;
//         break;

// --------------------------------
// Backtracking Algorithm:
// --------------------------------
// Create an empty path array and add vertex 0 to it. Add other vertices, starting from the vertex
// 1. Before adding a vertex, check for whether it is adjacent to the previously added vertex and
// not already added. If we find such a vertex, we add the vertex as part of the solution. If we do
// not find a vertex then we return false.

// Note that the above code always prints cycle starting from 0. Starting point should not matter as
// cycle can be started from any point. If you want to change the starting point, you should make
// two changes to above code.

// Change "path[0] = 0;" to "path[0] = s;" where s is your new starting point. Also change loop "for
// (int v = 1; v < V; v++)" in hamCycleUtil() to "for (int v = 0; v < V; v++)".



const VERTEX = 5;

/* 
A utility function to check if the vertex v can be added at index 'pos' in the
    Hamiltonian Cycle constructed so far (stored in 'path[]')
*/
function is_safe(v: number, graph: number[][], path: number[], pos: number): boolean {
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    for (let i = 0; i < pos; i++) {
        if (path[i] === v) {
            return false;
        }
    }

    return true;
}

/* 
This function solves the Hamiltonian Cycle problem using Backtracking. It mainly uses
    ham_cycle_util() to solve the problem. It returns false if there is no Hamiltonian Cycle
    possible, otherwise return true and prints the path. Please note that there may be more
    than one solutions, this function prints one of the feasible solutions.
    :param graph: 
*/
function hamilton_cycle(graph: number[][]): boolean {
    const path: number[] = Array(VERTEX).fill(-1);

    path[0] = 0;
    if (!ham_cycle_util(graph, path, 1)) {
        return false;
    }

    return true;
}

function ham_cycle_util(graph: number[][], path: number[], pos: number): boolean {
    if (pos === VERTEX) {
        if (graph[path[pos - 1]][path[0]] === 1) {
            return true;
        } else {
            return false;
        }
    }

    for (let v = 1; v < VERTEX; v++) {
        if (is_safe(v, graph, path, pos)) {
            path[pos] = v;
            if (ham_cycle_util(graph, path, pos + 1)) {
                return true;
            }
            path[pos] = -1;
        }
    }

    return false;
}

if (require.main === module) {
    // Test graph 1
    const graph1: number[][] = [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ];
    
    assert(true === hamilton_cycle(graph1), "Test case 1 doesn't match");
    
    // Test graph 2
    const graph2: number[][] = [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0]
    ];
    
    assert(false === hamilton_cycle(graph2), "Test case 2 doesn't match");
}