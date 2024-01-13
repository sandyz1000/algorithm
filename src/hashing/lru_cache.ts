/* """
LRU Cache Implementation

How to implement LRU caching scheme? What data structures should be used? We are given
total possible page numbers that can be referred. We are also given cache (or memory)
size (Number of page frames that cache can hold at a time). The LRU caching scheme is
to remove the least recently used frame when the cache is full and a new page is
referenced which is not there in cache.

We use two data structures to implement an LRU Cache.

1. Queue which is implemented using a doubly linked list. The maximum size of the queue
will be equal to the total number of frames available (cache size).The most recently
used pages will be near front end and least recently pages will be near rear end.

2. A Hash with page number as key and address of the corresponding queue node as value.

When a page is referenced, the required page may be in the memory. If it is in the
memory, we need to detach the node of the list and bring it to the front of the queue.
If the required page is not in the memory, we bring that in memory. In simple words,
we add a new node to the front of the queue and update the corresponding node address
in the hash. If the queue is full, i.e. all the frames are full, we remove a node from
the rear of queue, and add the new node to the front of queue.

Example - Consider the following reference string :

1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 Find the number of page faults using least recently
used (LRU) page replacement algorithm with 3 page frames.

---------------------------------------------
Explanation -
---------------------------------------------

REFER-DIAGRAM
http://www.geeksforgeeks.org/lru-cache-implementation/


*/


export class QNode {
    pageNumber: number;
    prev: QNode | null;
    next: QNode | null;

    constructor(page_number: number, prev_node: QNode | null = null, next_node: QNode | null = null) {
        this.pageNumber = page_number;
        this.prev = prev_node;
        this.next = next_node;
    }
}

export class Queue {
    count: number;
    numberOfFrames: number;
    front: QNode | null;
    rear: QNode | null;

    constructor(number_of_frames: number, front: QNode | null = null, rear: QNode | null = null) {
        this.count = 0;
        this.numberOfFrames = number_of_frames;
        this.front = front;
        this.rear = rear;
    }
}

export class Hash {
    capacity: number;
    arr: (QNode | null)[];

    constructor(capacity: number) {
        this.capacity = capacity;
        this.arr = new Array(capacity).fill(null);
    }
}

export class LRUCache {
    hash: Hash;
    queue: Queue;

    constructor(hash: Hash, q: Queue) {
        this.hash = hash;
        this.queue = q;
    }

    private _areAllFramesFull(queue: Queue): boolean {
        return queue.count === queue.numberOfFrames;
    }

    private _isQueueEmpty(queue: Queue): boolean {
        return queue.rear === null;
    }

    dequeue(): void {
        if (this._isQueueEmpty(this.queue)) {
            return;
        }

        if (this.queue.front === this.queue.rear) {
            this.queue.front = null;
        }

        this.queue.rear = this.queue.rear!.prev;

        if (this.queue.rear) {
            this.queue.rear.next = null;
        }

        this.queue.count--;
    }

    enqueue(pageNumber: number): void {
        if (this._areAllFramesFull(this.queue)) {
            if (this.queue.rear) {
                this.hash.arr[this.queue.rear.pageNumber] = null;
            }
            this.dequeue();
        }

        const temp = new QNode(pageNumber);
        temp.next = this.queue.front;

        if (this._isQueueEmpty(this.queue)) {
            this.queue.rear = this.queue.front = temp;
        } else {
            this.queue.front!.prev = temp;
            this.queue.front = temp;
        }

        this.hash.arr[pageNumber] = temp;
        this.queue.count++;
    }

    referencePage(pageNumber: number): void {
        const reqPage = this.hash.arr[pageNumber];

        if (reqPage === null) {
            this.enqueue(pageNumber);
        } else if (reqPage !== this.queue.front) {
            if (reqPage.prev) {
                reqPage.prev.next = reqPage.next;
            }

            if (reqPage.next) {
                reqPage.next.prev = reqPage.prev;
            }

            if (reqPage === this.queue.rear) {
                this.queue.rear = reqPage.prev;
                if (this.queue.rear) {
                    this.queue.rear.next = null;
                }
            }

            reqPage.next = this.queue.front;
            reqPage.prev = null;

            if (reqPage.next) {
                reqPage.next.prev = reqPage;
            }

            this.queue.front = reqPage;
        }
    }
}

if (require.main === module) {
    const q = new Queue(4);
    const hash = new Hash(10);
    const test = new LRUCache(hash, q);

    test.referencePage(1);
    test.referencePage(2);
    test.referencePage(3);
    test.referencePage(1);
    test.referencePage(4);
    test.referencePage(5);

    console.log(q.front!.pageNumber, q.front!.next!.pageNumber, q.front!.next!.next!.pageNumber, q.front!.next!.next!.next!.pageNumber);
}
