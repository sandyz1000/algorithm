/* Average of a stream of numbers (Difficulty Level: Rookie)

Given a stream of numbers, print average (or mean) of the stream at every point.
For example, let us consider the stream as 10, 20, 30, 40, 50, 60, ....

- - - - - - - - - - - - - - - - - - - -
  Average of 1 numbers is 10.00
  Average of 2 numbers is 15.00
  Average of 3 numbers is 20.00
  Average of 4 numbers is 25.00
  Average of 5 numbers is 30.00
  Average of 6 numbers is 35.00
  ..................
- - - - - - - - - - - - - - - - - - - -
### Method-1:
To print mean of a stream, we need to find out how to find average when a new number is
being added to the stream. To do this, all we need is count of numbers seen so far in the
stream, previous average and new number. Let n be the count, prev_avg be the previous average
and x be the new number being added. The average after including x number can be written as
(prev_avg*n + x)/(n+1).


### Method-2:
The above function getAvg() can be optimized using following changes.
We can avoid the use of prev_avg and number of elements by using static variables
(Assuming that only this function is called for average of stream).
 */



function staticVars<T extends { [key: string]: any }>(options: T) {
  return function <U>(target: U, propertyKey: string, descriptor: PropertyDescriptor): void {
    for (const key of Object.keys(options)) {
      (target as any)[key] = options[key];
    }
  };
}

function getAvg1(prevAvg: number, x: number, n: number): number {
  return (prevAvg * n + x) / (n + 1);
}

function streamAvg1(arr: number[], n: number): void {
  let avg = 0;
  for (let i = 0; i < n; i++) {
    avg = getAvg1(avg, arr[i], i);
    console.log(`Average of ${i + 1} numbers is ${avg}`);
  }
}

class Avg2Container {
  summation: number = 0;
  n: number = 0;

  getAvg2(x: number): number {
    this.summation += x;
    this.n += 1;
    return this.summation / this.n;
  }
}

function streamAvg2(arr: number[], n: number): void {
  const avgContainer = new Avg2Container();
  let avg = 0;
  for (let i = 0; i < n; i++) {
    avg = avgContainer.getAvg2(arr[i]);
    console.log(`Average of ${i + 1} numbers is ${avg}`);
  }
}

if (require.main === module) {
  const arr = [10, 20, 30, 40, 50, 60];
  const n = arr.length;

  console.log("\nMethod-1:");
  streamAvg1(arr, n);

  console.log("\nMethod-2:");
  streamAvg2(arr, n);

}
