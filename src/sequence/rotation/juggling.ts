
/* Program for array rotation
Write a function rotate(ar[], d, n) that rotates arr[] of size n by d elements.

----------------------------------------
Example:
----------------------------------------
Input: [1, 2, 3, 4, 5, 6, 7]
Output: [3, 4, 5, 6, 7, 1, 2]

Function to left Rotate arr[] of size n by 1
Time complexity: O(n*d)
Auxiliary Space: O(1)
 
## Juggling Algorithm
Instead of moving one by one, divide the array in different sets where number of sets is
equal to GCD of n and d and move the elements within sets. If GCD is 1 as it is for the above
example array (n = 7 and d =2), then elements will be moved within one set only,
we just start with temp = arr[0] and keep moving arr[I+d] to arr[I] and finally store temp at
the right place.

Here is an example for n =12 and d = 3. GCD is 3 and

Let arr[] be {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}

a)	Elements are first moved in first set arr[]
    after this step --> {4 2 3 7 5 6 10 8 9 1 11 12}

b)	Then in second set.
    arr[] after this step --> {4 5 3 7 8 6 10 11 9 1 2 12}

c)	Finally in third set.
    arr[] after this step --> {4 5 6 7 8 9 10 11 12 1 2 3}

Time complexity: O(n)
Auxiliary Space: O(1)
    
*/


class Rotation {
    leftRotate(arr: number[], d: number, n: number): void {
        for (let i = 0; i < d; i++) {
            this.leftRotateByOne(arr, n);
        }
    }

    leftRotateByOne(arr: number[], n: number): void {
        const temp: number = arr[0];
        for (let i = 0; i < n - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr[n - 1] = temp;
    }
}

class JugglingAlgorithm {
    leftRotate(arr: number[], d: number, n: number): void {
        const gcdVal: number = this.gcd(d, n);

        for (let i = 0; i < gcdVal; i++) {
            let temp: number = arr[i];
            let j: number = i;

            while (true) {
                let k: number = j + d;

                if (k >= n) {
                    k -= n;  // Wrap around
                }

                if (k === i) {
                    break;
                }

                arr[j] = arr[k];
                j = k;
            }

            arr[j] = temp;
        }
    }

    gcd(a: number, b: number): number {
        return b === 0 ? a : this.gcd(b, a % b);
    }
}

if (require.main === module) {
    // Example usage
    const rotation = new Rotation();
    let arr1: number[] = [1, 2, 3, 4, 5, 6, 7];
    rotation.leftRotate(arr1, 2, arr1.length);
    console.log("Method -1: Rotate one by one:", arr1);
    
    const jugglingAlgorithm = new JugglingAlgorithm();
    let arr2: number[] = [1, 2, 3, 4, 5, 6, 7];
    jugglingAlgorithm.leftRotate(arr2, 2, arr2.length);
    console.log("Method -2: Juggling algorithm:", arr2);
}
