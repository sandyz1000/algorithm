/* """
Find the largest multiple of 3 | Set 1 (Using Queue)

Given an array of non-negative integers. Find the largest multiple of 3 that can be formed from
array elements.

For example, if the input array is {8, 1, 9}, the output should be “9 8 1”, and if the input
array is {8, 1, 7, 6, 0}, output should be “8 7 6 0”.

-----------------------------------------------------------------
Method 1 (Brute Force)
-----------------------------------------------------------------

The simple & straight forward approach is to generate all the combinations of the elements and keep
track of the largest number formed which is divisible by 3.

Time Complexity: O(n x 2^n). There will be 2^n combinations of array elements. To compare each
combination with the largest number so far may take O(n) time.
Auxiliary Space: O(n) // to avoid integer overflow, the largest number is assumed to be stored in
the form of array.

-----------------------------------------------------------------
Method 2 (Tricky)
-----------------------------------------------------------------

This problem can be solved efficiently with the help of O(n) extra space. This method is based on
the following facts about numbers which are multiple of 3.

1) A number is multiple of 3 if and only if the sum of digits of number is multiple of 3.
For example, let us consider 8760, it is a multiple of 3 because sum of digits is 8 + 7+ 6+ 0 = 21,
which is a multiple of 3.

2) If a number is multiple of 3, then all permutations of it are also multiple of 3.
For example, since 6078 is a multiple of 3, the numbers 8760, 7608, 7068, ... are also multiples
of 3.

3) We get the same remainder when we divide the number and sum of digits of the number.
For example, if divide number 151 and sum of it digits 7, by 3, we get the same remainder 1.

==What is the idea behind above facts?==
The value of 10%3 and 100%3 is 1. The same is true for all the higher powers of 10, because 3
divides 9, 99, 999, .... etc.
Let us consider a 3 digit number n to prove above facts. Let the first, second and third digits
of n be 'a', 'b' and 'c' respectively. n can be written as

n = 100.a + 10.b + c
Since (10^x)%3 is 1 for any x, the above expression gives the same remainder as following expression

 1.a + 1.b + c
So the remainder obtained by sum of digits and 'n' is same.

Following is a solution based on the above observation.

1. Sort the array in non-decreasing order.

2. Take three queues. One for storing elements which on dividing by 3 gives remainder as 0.The
second queue stores digits which on dividing by 3 gives remainder as 1. The third queue stores
digits which on dividing by 3 gives remainder as 2. Call them as queue0, queue1 and queue2

3. Find the sum of all the digits.

4. Three cases arise:
    4.1 The sum of digits is divisible by 3. Dequeue all the digits from the three queues.
    Sort them in non-increasing order. Output the array.

    4.2 The sum of digits produces remainder 1 when divided by 3.
    Remove one item from queue1. If queue1 is empty, remove two items from queue2. If queue2
    contains less than two items, the number is not possible.

    4.3 The sum of digits produces remainder 2 when divided by 3.
    Remove one item from queue2. If queue2 is empty, remove two items from queue1. If queue1
    contains less than two items, the number is not possible.

5. Finally empty all the queues into an auxiliary array. Sort the auxiliary array in non-increasing
order. Output the auxiliary array.

==The above method can be optimized in following ways.==
1) We can use Heap Sort or Merge Sort to make the time complexity O(nLogn).

2) We can avoid extra space for queues. We know at most two items will be removed from the input
array. So we can keep track of two items in two variables.

3) At the end, instead of sorting the array again in descending order, we can print the ascending
sorted array in reverse order. While printing in reverse order, we can skip the two elements to be
removed.

Time Complexity: O(nLogn), assuming a O(nLogn) algorithm is used for sorting.   

*/

export class MyQueue {
    private front: number;
    private rear: number;
    private capacity: number;
    private queue: (number | null)[];

    constructor(capacity: number = 10) {
        this.front = -1;
        this.rear = -1;
        this.capacity = capacity;
        this.queue = Array(this.capacity).fill(null);
    }

    isEmpty(): boolean {
        return this.front === -1;
    }

    enqueue(item: number): void {
        this.rear += 1;
        this.queue[this.rear] = item;
        if (this.isEmpty()) {
            this.front += 1;
        }
    }

    dequeue(): number | null {
        const item = this.queue[this.front];
        this.queue[this.front] = null;
        if (this.front === this.rear) {
            this.front = this.rear = -1;
        } else {
            this.front += 1;
        }
        return item;
    }

    peek(): number | null {
        return this.queue[this.front];
    }
}

function populateAux(queue0: MyQueue, queue1: MyQueue, queue2: MyQueue, aux: number[]): number {
    let top = 0;
    while (!queue0.isEmpty()) {
        aux[top] = queue0.dequeue() as number;
        top += 1;
    }

    while (!queue1.isEmpty()) {
        aux[top] = queue1.dequeue() as number;
        top += 1;
    }

    while (!queue2.isEmpty()) {
        aux[top] = queue2.dequeue() as number;
        top += 1;
    }

    return top;
}

function findMaxMultipleOf3(arr: number[], size: number): number {
    arr.sort((a, b) => a - b);
    let summation = 0;

    const queue0 = new MyQueue(size);
    const queue1 = new MyQueue(size);
    const queue2 = new MyQueue(size);

    for (let i = 0; i < size; i++) {
        summation += arr[i];
        if (arr[i] % 3 === 0) {
            queue0.enqueue(arr[i]);
        } else if (arr[i] % 3 === 1) {
            queue1.enqueue(arr[i]);
        } else if (arr[i] % 3 === 2) {
            queue2.enqueue(arr[i]);
        }
    }

    if (summation % 3 === 1) {
        if (!queue1.isEmpty()) {
            queue1.dequeue();
        } else {
            if (!queue2.isEmpty()) {
                queue2.dequeue();
            } else {
                return 0;
            }

            if (!queue2.isEmpty()) {
                queue2.dequeue();
            } else {
                return 0;
            }
        }
    }

    if (summation % 3 === 2) {
        if (!queue2.isEmpty()) {
            queue2.dequeue();
        } else {
            if (!queue1.isEmpty()) {
                queue1.dequeue();
            } else {
                return 0;
            }

            if (!queue1.isEmpty()) {
                queue1.dequeue();
            } else {
                return 0;
            }
        }
    }

    const aux: number[] = new Array(size);
    const top = populateAux(queue0, queue1, queue2, aux);
    aux.sort((a, b) => b - a);
    console.log("Multiple of 3", aux.slice(0, top));
    return top;
}

if (require.main === module) {
    const arr: number[] = [8, 1, 7, 6, 0];
    const size: number = arr.length;
    
    const result: number = findMaxMultipleOf3(arr, size);
    
    console.log(result ? "Multiple of 3" : "Not possible");
}
