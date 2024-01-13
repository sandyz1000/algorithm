/* Sparse Matrix and its representations | Set 1 (Using Arrays and Linked Lists)

A matrix is a two-dimensional data object made of m rows and n columns, therefore having total
m x n values. If most of the elements of the matrix have 0 value, then it is called a sparse
matrix.

Why to use Sparse Matrix instead of simple matrix ?

Storage: There are lesser non-zero elements than zeros and thus lesser memory can be used to store
only those elements.
Computing time: Computing time can be saved by logically designing a data structure traversing
only non-zero elements..

Example:

0 0 3 0 4
0 0 5 7 0
0 0 0 0 0
0 2 6 0 0

Representing a sparse matrix by a 2D array leads to wastage of lots of memory as zeroes in the
matrix are of no use in most of the cases. So, instead of storing zeroes with non-zero elements,
we only store non-zero elements. This means storing non-zero elements with triples- (Row, Column,
value).

Sparse Matrix Representations can be done in many ways following are two common representations:
1.  Array representation
2.  Linked list representation
 */

class LinkNode {
    value: number;
    rowPosition: number;
    columnPosition: number;
    nextNode: LinkNode | null;

    constructor(value: number, rowPosition: number, columnPosition: number, nextNode: LinkNode | null = null) {
        this.value = value;
        this.rowPosition = rowPosition;
        this.columnPosition = columnPosition;
        this.nextNode = nextNode;
    }
}

class SparseMatrix {
    start: LinkNode;

    constructor(start: LinkNode) {
        this.start = start;
    }

    createNewNode(nonZeroElement: number, rowIndex: number, columnIndex: number): void {
        let temp: LinkNode | null = this.start;

        if (temp === null) {
            // Create new node dynamically
            temp = new LinkNode(nonZeroElement, rowIndex, columnIndex, null);
            this.start = temp;
        } else {
            while (temp.nextNode !== null) {
                temp = temp.nextNode;
            }

            // Create new node dynamically
            const newNode = new LinkNode(nonZeroElement, rowIndex, columnIndex, null);
            temp.nextNode = newNode;
        }
    }

    printList(): void {
        let temp: LinkNode | null = this.start;
        let r: LinkNode | null = this.start;
        let s: LinkNode | null = this.start;

        console.log("rowPosition: ");
        const rowOutput: number[] = [];
        while (temp !== null) {
            rowOutput.push(temp.rowPosition);
            temp = temp.nextNode;
        }
        console.log("\n", rowOutput, "\n");

        console.log("columnPosition: ");
        const columnOutput: number[] = [];
        while (r !== null) {
            columnOutput.push(r.columnPosition);
            r = r.nextNode;
        }
        console.log("\n", columnOutput, "\n");

        console.log("Value: ");
        const valueOutput: number[] = [];
        while (s !== null) {
            valueOutput.push(s.value);
            s = s.nextNode;
        }
        console.log("\n", valueOutput, "\n");
    }
}

function sparseMatrix(matrix: number[][]): void {
    // Assume 4x5 sparse matrix
    const size = matrix.reduce((sum, row) => sum + row.filter(value => value !== 0).length, 0);

    // Number of columns in compactMatrix (size) must be equal to the number of non-zero elements in the matrix
    const compactMatrix: number[][] = Array.from({ length: 3 }, () => Array(size).fill(0));

    // Making of a new matrix
    let k = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] !== 0) {
                compactMatrix[0][k] = i;
                compactMatrix[1][k] = j;
                compactMatrix[2][k] = matrix[i][j];
                k++;
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        const output: string[] = [];
        for (let j = 0; j < size; j++) {
            output.push(`${compactMatrix[i][j]} `);
        }
        console.log(output);
    }
}

// Test linked list based implementation
console.log("Linked list based implementation");
const matrix: number[][] = [
    [0, 0, 3, 0, 4],
    [0, 0, 5, 7, 0],
    [0, 0, 0, 0, 0],
    [0, 2, 6, 0, 0],
];

const sm = new SparseMatrix(new LinkNode(0, 0, 0, null));
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
        // Pass only those values which are non-zero
        if (matrix[i][j] !== 0) {
            sm.createNewNode(matrix[i][j], i, j);
        }
    }
}

sm.printList();

// Test array based implementation
console.log("Array based implementation");
sparseMatrix(matrix);
