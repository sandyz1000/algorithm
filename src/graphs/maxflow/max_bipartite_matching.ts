/* Maximum Bipartite Matching

A matching in a Bipartite Graph is a set of the edges chosen in such a way that no two edges
share an endpoint. A maximum matching is a matching of maximum size (maximum number of edges). In
a maximum matching, if any edge is added to it, it is no longer a matching. There can be more
than one maximum matchings for a given Bipartite Graph.

Why do we care?
There are many real world problems that can be formed as Bipartite Matching. For example, consider
the following problem:
There are M job applicants and N jobs. Each applicant has a subset of jobs that he/she is
interested in. Each job opening can only accept one applicant and a job applicant can be
appointed for only one job. Find an assignment of jobs to applicants in such that as many
applicants as possible get jobs.

------------------------------------------------
Explanation:-
------------------------------------------------

Maximum Bipartite Matching and Max Flow Problem

Maximum Bipartite Matching (MBP) problem can be solved by converting it into a flow network (See
this video to know how did we arrive this conclusion).

Following are the steps.

1) Build a Flow Network
There must be a source and sink in a flow network. So we add a source and add edges from source
to all applicants. Similarly, add edges from all jobs to sink. The capacity of every edge is
marked as 1 unit.

    --- DIAGRAM-GOES-HERE ---

2) Find the maximum flow.
We use Ford-Fulkerson algorithm to find the maximum flow in the flow network built in step 1. The
maximum flow is actually the MBP we are looking for.

    --- DIAGRAM-GOES-HERE ---


How to implement the above approach?

Let us first define input and output forms. Input is in the form of Edmonds matrix which is a 2D
array 'bpGraph[M][N]' with M rows (for M job applicants) and N columns (for N jobs). The value
bpGraph[i][j] is 1 if i'th applicant is interested in j'th job, otherwise 0.
Output is number maximum number of people that can get jobs.

A simple way to implement this is to create a matrix that represents adjacency matrix
representation of a directed graph with M+N+2 vertices. Call the fordFulkerson() for the matrix.
This implementation requires O((M+N)*(M+N)) extra space.

Extra space can be be reduced and code can be simplified using the fact that the graph is
bipartite and capacity of every edge is either 0 or 1. The idea is to use DFS traversal to find a
job for an applicant (similar to augmenting path in Ford-Fulkerson). We call bpm() for every
applicant, bpm() is the DFS based function that tries all possibilities to assign a job to the
applicant.

In bpm(), we one by one try all jobs that an applicant 'u' is interested in until we find a job, or
all jobs are tried without luck. For every job we try, we do following.

If a job is not assigned to anybody, we simply assign it to the applicant and return true. If a
job is assigned to somebody else say x, then we recursively check whether x can be assigned some
other job. To make sure that x doesn’t get the same job again, we mark the job 'v' as seen before
we make recursive call for x. If x can get other job, we change the applicant for job 'v' and
return true. We use an array maxR[0..N-1] that stores the applicants assigned to different jobs.
If bmp() returns true, then it means that there is an augmenting path in flow network and 1 unit
of flow is added to the result in maxBPM(). */

export class Graph {
    private graph: number[][];
    private ppl: number;
    private jobs: number;

    constructor(graph: number[][]) {
        this.graph = graph;
        this.ppl = graph.length;
        this.jobs = graph[0].length;
    }

    private bpm(u: number, matchR: number[], seen: boolean[]): boolean {
        for (let v = 0; v < this.jobs; v++) {
            if (this.graph[u][v] && !seen[v]) {
                seen[v] = true;

                if (matchR[v] === -1 || this.bpm(matchR[v], matchR, seen)) {
                    matchR[v] = u;
                    return true;
                }
            }
        }
        return false;
    }

    maxBpm(): number {
        const matchR: number[] = Array(this.jobs).fill(-1);
        let result: number = 0;

        for (let i = 0; i < this.ppl; i++) {
            const seen: boolean[] = Array(this.jobs).fill(false);

            if (this.bpm(i, matchR, seen)) {
                result++;
            }
        }

        return result;
    }
}

if (require.main === module) {
    const bpGraph: number[][] = [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1],
    ];

    const g = new Graph(bpGraph);
    console.log(`Maximum number of applicants that can get a job is ${g.maxBpm()}`);
}
