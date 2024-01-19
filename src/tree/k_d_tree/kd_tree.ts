export class Node {
    point: number[];
    left: Node | null;
    right: Node | null;

    constructor(arr: number[]) {
        this.point = arr;
        this.left = this.right = null;
    }
}

const k = 2;

function newNode(arr: number[]): Node {
    return new Node(arr);
}

function insertRec(root: Node | null, point: number[], depth: number): Node {
    if (root === null) {
        return newNode(point);
    }

    const cd = depth % k;

    if (point[cd] < root.point[cd]) {
        root.left = insertRec(root.left, point, depth + 1);
    } else {
        root.right = insertRec(root.right, point, depth + 1);
    }

    return root;
}

function insert(root: Node | null, point: number[]): Node | null {
    return insertRec(root, point, 0);
}

function arePointsSame(point1: number[], point2: number[]): boolean {
    for (let i = 0; i < k; ++i) {
        if (point1[i] !== point2[i]) {
            return false;
        }
    }

    return true;
}

function searchRec(root: Node | null, point: number[], depth: number): boolean {
    if (root === null) {
        return false;
    }

    if (arePointsSame(root.point, point)) {
        return true;
    }

    const cd = depth % k;

    if (point[cd] < root.point[cd]) {
        return searchRec(root.left, point, depth + 1);
    }

    return searchRec(root.right, point, depth + 1);
}

function search(root: Node | null, point: number[]): boolean {
    return searchRec(root, point, 0);
}

function main() {
    let root: Node | null = null;
    const points: number[][] = [
        [3, 6], [17, 15], [13, 15], [6, 12],
        [9, 1], [2, 7], [10, 19]
    ];

    const n = points.length;

    for (let i = 0; i < n; i++) {
        root = insert(root, points[i]);
    }

    const point1 = [10, 19];
    search(root, point1) ? console.log("Found") : console.log("Not Found");

    const point2 = [12, 19];
    search(root, point2) ? console.log("Found") : console.log("Not Found");
}

main();
