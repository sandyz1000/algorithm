/* """
Next Greater Element

Given an array, print the Next Greater Element (NGE) for every element. The Next greater Element
for an element x is the first greater element on the right side of x in an array. Elements for
which no greater element exist, consider next greater element as -1.

Examples:
a) For any array, rightmost element always has next greater element as -1.
b) For an array which is sorted in decreasing order, all elements have next greater element as -1.
c) For the input array [4, 5, 2, 25}, the next greater elements for each element are as follows.

  Element       NGE
   4      -->   5
   5      -->   25
   2      -->   25
   25     -->   -1

d) For the input array [13, 7, 6, 12], the next greater elements for each element are as follows.

  Element        NGE
   13     -->    -1
   7      -->    12
   6      -->    12
   12     -->    -1

## Method 2 (Using Stack)
1) Push the first element to stack.
2) Pick rest of the elements one by one and follow following steps in loop.
    a) Mark the current element as next.
    b) If stack is not empty, then pop an element from stack and compare it with next.
    c) If next is greater than the popped element, then next is the next greater element for
    the popped element.
    d) Keep popping from the stack while the popped element is smaller than next. next becomes
    the next greater element for all such popped elements
    g) If next is smaller than the popped element, then push the popped element back.
3) After the loop in step 2 is over, pop all the elements from stack and print -1 as next
element for them

prints element and NGE pair for all elements of arr[]

Time Complexity: O(n). The worst case occurs when all elements are sorted in decreasing order.
If elements are sorted in decreasing order, then every element is processed at most 4 times.
a) Initially pushed to the stack.
b) Popped from the stack when next element is being processed.
c) Pushed back to the stack because next element is smaller.
d) Popped from the stack in step 3 of algo.

   */


class StackX {
    private items: number[];

    constructor() {
        this.items = [];
    }

    push(element: number): void {
        this.items.push(element);
    }

    pop(): number {
        let item = this.items.pop();
        if (item !== undefined) {
            return item;
        }
        return -1;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

function printNGE(arr: number[]): void {
    const s = new StackX();
    s.push(arr[0]); // push the first element to the stack

    // iterate for the rest of the elements
    for (let i = 1; i < arr.length; i++) {
        const next_g = arr[i];

        if (!s.isEmpty()) {
            let element = s.pop(); // if the stack is not empty, then pop an element from the stack

            // If the popped element is smaller than next_g, then
            // a) print the pair
            // b) keep popping while elements are smaller and the stack is not empty
            while (element < next_g) {
                console.log(`${element} -- ${next_g}`);
                if (s.isEmpty()) {
                    break;
                }
                element = s.pop();
            }

            // If the element is greater than next_g, then push the element back
            if (element > next_g) {
                s.push(element);
            }
        }

        // push next_g to the stack so that we can find the next_g greater for it
        s.push(next_g);
    }

    // After iterating over the loop, the remaining elements in the stack do not have the next_g greater
    // element, so print -1 for them
    while (!s.isEmpty()) {
        const element = s.pop();
        const next_g = -1;
        console.log(`${element} -- ${next_g}`);
    }
}

if (require.main === module) {
    // Test
    const arr1 = [11, 13, 21, 3];
    const arr2 = [13, 7, 6, 12];
    
    console.log("NGE pairs for arr1:");
    printNGE(arr1);
    
    console.log("NGE pairs for arr2:");
    printNGE(arr2);
}
