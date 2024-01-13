/* """
UNIT 4: Search

Your task is to maneuver a car in a crowded parking lot. This is a kind of 
puzzle, which can be represented with a diagram like this: 

| | | | | | | |  
| G G . . . Y |  
| P . . B . Y | 
| P * * B . Y @ 
| P . . B . . |  
| O . . . A A |  
| O . S S S . |  
| | | | | | | | 

A '|' represents a wall around the parking lot, a '.' represents an empty square,
and a letter or asterisk represents a car.  '@' marks a goal square.
Note that there are long (3 spot) and short (2 spot) cars.
Your task is to get the car that is represented by '**' out of the parking lot
(on to a goal square).  Cars can move only in the direction they are pointing.  
In this diagram, the cars GG, AA, SSS, and ** are pointed right-left,
so they can move any number of squares right or left, as long as they don't
bump into another car or wall.  In this diagram, GG could move 1, 2, or 3 spots
to the right; AA could move 1, 2, or 3 spots to the left, and ** cannot move 
at all. In the up-down direction, BBB can move one up or down, YYY can move 
one down, and PPP and OO cannot move.

You should solve this puzzle (and ones like it) using search.  You will be 
given an initial state like this diagram and a goal location for the ** car;
in this puzzle the goal is the '.' empty spot in the wall on the right side.
You should return a path -- an alternation of states and actions -- that leads
to a state where the car overlaps the goal.

An action is a move by one car in one direction (by any number of spaces).  
For example, here is a successor state where the AA car moves 3 to the left:

| | | | | | | |  
| G G . . . Y |  
| P . . B . Y | 
| P * * B . Y @ 
| P . . B . . |  
| O A A . . . |  
| O . . . . . |  
| | | | | | | | 

And then after BBB moves 2 down and YYY moves 3 down, we can solve the puzzle
by moving ** 4 spaces to the right:

| | | | | | | |
| G G . . . . |
| P . . . . . |
| P . . . . * *
| P . . B . Y |
| O A A B . Y |
| O . . B . Y |
| | | | | | | |

You will write the function

    solve_parking_puzzle(start, N=N)

where 'start' is the initial state of the puzzle and 'N' is the length of a side
of the square that encloses the pieces (including the walls, so N=8 here).

We will represent the grid with integer indexes. Here we see the 
non-wall index numbers (with the goal at index 31):

 |  |  |  |  |  |  |  |
 |  9 10 11 12 13 14  |
 | 17 18 19 20 21 22  |
 | 25 26 27 28 29 30 31
 | 33 34 35 36 37 38  |
 | 41 42 43 44 45 46  |
 | 49 50 51 52 53 54  |
 |  |  |  |  |  |  |  |

The wall in the upper left has index 0 and the one in the lower right has 63.
We represent a state of the problem with one big tuple of (object, locations)
pairs, where each pair is a tuple and the locations are a tuple.  Here is the
initial state for the problem above in this format:
*/

export type Location = number[];
export type Car = [string, Location];

const N: number = 8;

function solve_parking_puzzle(start: Car[], N: number = 8): [Car, number][] {
    // Your implementation here
    return [];
}

function locs(start: number, n: number, incr: number = 1): Location {
    const locations: Location = [];
    for (let i = 0; i < n; i++) {
        locations.push(start + i * incr);
    }
    return locations;
}

export function grid(cars: Car[], N: number = 8): Car[] {
    // Your implementation here
    return [];
}

function show(state: Car[], N: number = 8): void {
    // Your implementation here
}

if (require.main === module) {
    // Example usage
    const puzzle1: Car[] = grid([
        ['*', locs(26, 2)],
        ['G', locs(9, 2)],
        ['Y', locs(14, 3, N)],
        ['P', locs(17, 3, N)],
        ['O', locs(41, 2, N)],
        ['B', locs(20, 3, N)],
        ['A', locs(45, 2)],
    ]);
    
    const puzzle2: Car[] = grid([
        ['*', locs(26, 2)],
        ['B', locs(20, 3, N)],
        ['P', locs(33, 3)],
        ['O', locs(41, 2, N)],
        ['Y', locs(51, 3)],
    ]);
    
    const puzzle3: Car[] = grid([
        ['*', locs(25, 2)],
        ['B', locs(19, 3, N)],
        ['P', locs(36, 3)],
        ['O', locs(45, 2, N)],
        ['Y', locs(49, 3)],
    ]);
    
    const path: [Car, number][] = solve_parking_puzzle(puzzle1, N);
    console.log(path);
}
