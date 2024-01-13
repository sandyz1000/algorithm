/* 
## Pigeonhole Sort
http://www.geeksforgeeks.org/pigeonhole-sort/

Pigeonhole sorting is a sorting algorithm that is suitable for sorting lists of elements where the
number of elements and the number of possible key values are approximately the same.
It requires O(n + Range) time where n is number of elements in input array and 'Range' is number of
possible values in array.

Working of Algorithm :

1. Find minimum and maximum values in array. Let the minimum and maximum values be 'min' and 'max'
 respectively. Also find range as ' max-min+1 '.
2. Set up an array of initially empty "pigeonholes" the same size as of the range.
3. Visit each element of the array and then put each element in its pigeonhole. An element arr[i]
 is put in hole at index arr[i] – min.
4. Start the loop all over the pigeonhole array in order and put the elements from non- empty holes
 back into the original array.

Comparison with Counting Sort :
It is similar to counting sort, but differs in that it
moves items twice: once to the bucket array and again to the final destination

Pigeonhole sort has limited use as requirements are rarely met. For arrays where range is much
larger than n, bucket sort is a generalization that is more efficient in space and time. 
 */

// TypeScript program to implement Pigeonhole Sort

function pigeonholeSort(arr: number[]): void {
    // Find minimum and maximum values in arr[]
    const minimum: number = Math.min(...arr);
    const maximum: number = Math.max(...arr);
    const rangediff: number = maximum - minimum + 1;
  
    // Our list of pigeonholes
    const holes: number[] = new Array(rangediff).fill(0);
  
    // Traverse through input array and put every element in its respective hole
    for (let i = 0; i < arr.length; i++) {
      holes[arr[i] - minimum]++;
    }
  
    // Put the elements back into the array in order.
    let i: number = 0;
    for (let count = 0; count < rangediff; count++) {
      while (holes[count] > 0) {
        holes[count]--;
        arr[i] = count + minimum;
        i++;
      }
    }
  }
  
  // Test
  if (require.main === module) {
    // Output: Sorted order is : 2 3 4 6 7 8 8
    const arr: number[] = [8, 3, 2, 7, 4, 6, 8];
    pigeonholeSort(arr);
    console.log("Sorted order is : ", arr);
  }
  