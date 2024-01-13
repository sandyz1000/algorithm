// http://www.growingwiththeweb.com/data-structures/binomial-heap/overview/


export class Node {
    key: number;
    degree: number;
    parent: Node | null;
    child: Node | null;
    sibling: Node | null;

    constructor(key: number, degree = 0, parent: Node | null = null, child: Node | null = null, sibling: Node | null = null) {
        this.key = key;
        this.degree = degree;
        this.parent = parent;
        this.child = child;
        this.sibling = sibling;
    }

    compareTo(other: Node): number {
        return this.key - other.key;
    }
}

export class BinomialHeap {
    head: Node | null;

    constructor(head: Node | null = null) {
        this.head = head;
    }

    isEmpty(): boolean {
        return this.head === null;
    }

    clear(): void {
        this.head = null;
    }

    insert(key: number): void {
        const node = new Node(key);
        const tempHeap = new BinomialHeap(node);
        this.head = this.union(tempHeap);
    }

    findMinimum(): number | null {
        if (this.head === null) {
            return null;
        } else {
            let minimum = this.head;
            let nextt = minimum.sibling;

            while (nextt !== null) {
                if (nextt.compareTo(minimum) < 0) {
                    minimum = nextt;
                }
                nextt = nextt.sibling;
            }

            return minimum.key;
        }
    }

    search(key: number): Node | null {
        const nodes: Node[] = [this.head as Node];
        while (nodes.length !== 0) {
            const curr = nodes[0];
            nodes.shift();

            if (curr.key === key) {
                return curr;
            }

            if (curr.sibling !== null) {
                nodes.push(curr.sibling);
            }

            if (curr.child !== null) {
                nodes.push(curr.child);
            }
        }

        return null;
    }

    decreaseKey(node: Node, newKey: number): void {
        node.key = newKey;
        this.bubbleUp(node, false);
    }

    delete(node: Node): void {
        node = this.bubbleUp(node, true);
        if (this.head === node) {
            this.removeTreeRoot(node, null);
        } else {
            let prev = this.head;
            while (prev.sibling?.compareTo(node) !== 0) {
                prev = prev.sibling as Node;
            }
            this.removeTreeRoot(node, prev);
        }
    }

    bubbleUp(node: Node, toRoot: boolean): Node {
        let parent = node.parent;
        while (parent !== null && (toRoot || node.compareTo(parent) < 0)) {
            [node.key, parent.key] = [parent.key, node.key];
            node = parent;
            parent = parent.parent;
        }

        return node;
    }

    extractMin(): number | null {
        if (this.head === null) {
            return null;
        }

        let minimum = this.head;
        let minPrev = null;
        let next = minimum.sibling;
        let nextPrev = minimum;

        while (next !== null) {
            if (next.compareTo(minimum) < 0) {
                minimum = next;
                minPrev = nextPrev;
            }
            nextPrev = next;
            next = next.sibling;
        }

        this.removeTreeRoot(minimum, minPrev);
        return minimum.key;
    }

    removeTreeRoot(root: Node, prev: Node | null): void {
        if (root === this.head) {
            this.head = root.sibling;
        } else {
            prev!.sibling = root.sibling;
        }

        let newHead: Node | null = null;
        let child = root.child;
        while (child !== null) {
            const nextt = child.sibling;
            child.sibling = newHead;
            child.parent = null;
            newHead = child;
            child = nextt;
        }

        const newHeap = new BinomialHeap(newHead);
        this.head = this.union(newHeap);
    }

    linkTree(minNodeTree: Node, other: Node): void {
        other.parent = minNodeTree;
        other.sibling = minNodeTree.child;
        minNodeTree.child = other;
        minNodeTree.degree += 1;
    }

    union(heap: BinomialHeap): Node | null {
        const newHead = this.merge(this, heap);

        this.head = null;
        heap.head = null;

        if (newHead === null) {
            return null;
        }

        let prev: Node | null = null;
        let curr = newHead;
        let nextt = newHead.sibling;

        while (nextt !== null) {
            if (curr.degree !== nextt.degree || (nextt.sibling !== null && nextt.sibling.degree === curr.degree)) {
                prev = curr;
                curr = nextt;
            } else {
                if (curr.compareTo(nextt) < 0) {
                    curr.sibling = nextt.sibling;
                    this.linkTree(curr, nextt);
                } else {
                    if (prev === null) {
                        newHead = nextt;
                    } else {
                        prev.sibling = nextt;
                    }

                    this.linkTree(nextt, curr);
                    curr = nextt;
                }
            }

            nextt = curr.sibling;
        }

        return newHead;
    }

    merge(heap1: BinomialHeap, heap2: BinomialHeap): Node | null {
        if (heap1.head === null) {
            return heap2.head;
        } else if (heap2.head === null) {
            return heap1.head;
        } else {
            let head: Node | null = null;
            let heap1Next = heap1.head;
            let heap2Next = heap2.head;

            if (heap1.head.degree <= heap2.head.degree) {
                head = heap1.head;
                heap1Next = heap1Next.sibling;
            } else {
                head = heap2.head;
                heap2Next = heap2Next.sibling;
            }

            let tail = head;

            while (heap1Next !== null && heap2Next !== null) {
                if (heap1Next.degree <= heap2Next.degree) {
                    tail.sibling = heap1Next;
                    heap1Next = heap1Next.sibling;
                } else {
                    tail.sibling = heap2Next;
                    heap2Next = heap2Next.sibling;
                }

                tail = tail.sibling as Node;
            }

            if (heap1Next !== null) {
                tail.sibling = heap1Next;
            } else {
                tail.sibling = heap2Next;
            }

            return head;
        }
    }

    printer(): void {
        console.log("Binomial heap:", end=" ");
        if (this.head !== null) {
            this.printNode(this.head, 0);
        }
    }

    printNode(curr: Node, level: number): void {
        while (curr !== null) {
            let sb = "";
            for (let i = 0; i < level; i++) {
                sb += " ";
            }
            sb += curr.key;
            console.log(sb);
            if (curr.child !== null) {
                this.printNode(curr.child, level + 1);
            }
            curr = curr.sibling as Node;
        }
    }
}

// Code execution starts here
if (require.main === module) {
    const heapObj = new BinomialHeap();
    heapObj.insert(3);
    heapObj.insert(2);
    heapObj.delete(heapObj.search(2) as Node);
    heapObj.insert(15);
    heapObj.insert(5);
    heapObj.insert(4);
    heapObj.insert(45);

    console.log("Extract min:", heapObj.extractMin());
    console.log("Get min:", heapObj.findMinimum());
    heapObj.decreaseKey(2, 1);
    console.log("Get min:", heapObj.findMinimum());
}
