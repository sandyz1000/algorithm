/* """
Implement a jigsaw puzzle. Design the data structures and explain an algorithm to solve the
puzzle. You can assume that you have a fitsWith method which, when passed two puzzle pieces,
returns true if the two pieces belong together.


We will assume that we have a traditional, simple jigsaw puzzle. The puzzle is grid-like,
with rows and columns. Each piece is located in a single row and column and has four edges. Each
edge comes in one of three types: inner, outer, and flat. A corner piece, for example, will have
two flat edges and two other edges, which could be inner or outer.

As we solve the jigsaw puzzle (manually or algorithmically), we'll need to store the position of
each piece. We could think about the position as absolute or relative:
1. Absolute Position: "This piece is located at position (12, 23)." Absolute position would belong
to the Piece class itself and would include an orientation as well.

2. Relative Position: “I don’t know where this piece is actually located, but I know that it is
next to this other piece.” The relative position would belong to the Edge class.

==Algorithm to Solve the Puzzle==
We will sketch this algorithm using a mix of pseudocode and real code.

Just as a kid might in solving a puzzle, we'll start with the easiest pieces first: the corners
and edges. We can easily search through all the pieces to find just the edges. While we're at
it though, it probably makes sense to group all the pieces by their edge types.


We now have a quicker way to zero in on potential matches for any given edge. We then go through
the puzzle, line by line, to match pieces.

The solve method, implemented below, operates by picking an arbitrary start with. It then finds an
open edge on the corner and tries to match it to an open piece. When it finds a match, it does the
following:
1. Attaches the edge.
2. Removes the edge from the list of open edges.
3. Finds the next open edge.

The next open edge is defined to be the one directly opposite the current edge, if it is
available. If it is not available, then the next edge can be any other edge. This will cause the
puzzle to be solved in a spiral-like fashion, from the outside to the inside.

The spiral comes from the fact that the algorithm always moves in a straight line, whenever
possible. When we reach the end of the first edge, the algorithm moves to the only available edge
on that corner piece—a 90-degree turn. It continues to take 90-degree turns at the end of each
side until the entire outer edge of the puzzle is completed. When that last edge piece is in
place, that piece only has one exposed edge remaining, which is again a 90-degree turn. The
algorithm repeats itself for subsequent rings around the puzzle, until finally all the pieces are
in place.

For simplicity, we’re represented inners and outers as an Edge array. This is actually not a
great choice, since we need to add and removed elements from it frequently. If we were writing a
real code, we would probably want to implement these variables as linked lists.

""" */


class Type {
    inner: number = 0;
    outer: number = 0;
    flat: number = 0;
}

class Edge {
    parent: Piece;
    _type: Type;
    index: number;
    attached_to: Edge | null;

    constructor(parent: Piece, _type: Type, index: number, attached_to: Edge | null) {
        this.parent = parent;
        this._type = _type;
        this.index = index;  // Index into Piece.edges
        this.attached_to = attached_to;  // Relative position
    }

    // See Algorithm section. Returns true if the two pieces should be attached to each other.
    fitsWith(edge: Edge): boolean {
        // Implement fitsWith logic
        return true;
    }
}

class Piece {
    edges: Edge[] = [];
    is_corner: boolean = false;

    constructor() {}
}

class Puzzle {
    pieces: Piece[] = [];  // Remaining pieces left to put away.
    solution: any[] = [];
    inners: Edge[] = [];
    outers: Edge[] = [];
    flats: Edge[] = [];
    corners: Piece[] = [];

    constructor() {}

    // See Algorithm section.
    sort(): void {
        for (const piece of this.pieces) {
            if (true) {  // P has two flat edges then add p to corners
                // Implement condition logic
                continue;
            }

            for (const edge of piece.edges) {
                if (true) {  // edge is inner then add to inners
                    // Implement condition logic
                    continue;
                }

                if (true) {  // edge is outer then add to outers
                    // Implement condition logic
                    continue;
                }
            }
        }
    }

    solve(): void {
        // Pick any corner to start with
        const current_edge = this.getExposedEdge(this.corners[0]);

        // Loop will iterate in a spiral-like fashion until the puzzle is full.
        while (current_edge !== null) {
            // Match with opposite edges. Inners with outers, etc.
            const opposites = current_edge._type === this.inners ? this.outers : this.inners;

            for (const fittingEdge of opposites) {
                if (current_edge.fitsWith(fittingEdge)) {
                    this.attachEdges(current_edge, fittingEdge);  // attach edge
                    this.removeFromList(current_edge);
                    this.removeFromList(fittingEdge);

                    // get next edge
                    const nextEdge = this.nextExposedEdge(fittingEdge);
                    if (nextEdge !== null) {
                        current_edge = nextEdge;
                        break;  // Break out of inner loop. Continue in outer.
                    }
                }
            }
        }
    }

    removeFromList(edge: Edge): void {
        if (edge._type === this.flat) {
            return;
        }

        const arr = edge._type === this.inners ? this.inners : this.outers;
        const index = arr.indexOf(edge);
        if (index !== -1) {
            arr.splice(index, 1);
        }
    }

    // Return the opposite edge if possible. Else, return any exposed edge.
    nextExposedEdge(edge: Edge): Edge | null {
        const next_index = (edge.index + 2) % 4;  // Opposite edge
        const next_edge = edge.parent.edges[next_index];
        if (this.isExposed(next_edge)) {
            return next_edge;
        }

        return this.getExposedEdge(edge.parent);
    }

    attachEdges(e1: Edge, e2: Edge): void {
        e1.attached_to = e2;
        e2.attached_to = e1;
    }

    isExposed(edge: Edge): boolean {
        return edge._type !== this.flat && edge.attached_to === null;
    }

    getExposedEdge(p: Piece): Edge | null {
        for (const edge of p.edges) {
            if (this.isExposed(edge)) {
                return edge;
            }
        }

        return null;
    }
}

if (require.main === module) {
    // Entry point
}
