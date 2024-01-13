/* 
https://www.geeksforgeeks.org/print-all-possible-expressions-that-evaluate-to-a-target/

Print all possible expressions that evaluate to a target
Given a string that contains only digits from 0 to 9, and an integer value, target.
Find out how many expressions are possible which evaluate to target using binary
operator +, – and * in given string of digits.

Input : "123",  Target : 6
Output : {“1+2+3”, “1*2*3”}

Input : “125”, Target : 7
Output : {“1*2+5”, “12-5”}



This problem can be solved by putting all possible binary operator in mid between to digits and
evaluating them and then check they evaluate to target or not.

While writing the recursive code, we need to keep these variable as argument of recursive method
– result vector, input string, current expression string, target value, position till which input
is processed, current evaluated value and last value in evaluation.

Last value is kept in recursion because of multiplication operation, while doing multiplication we
need last value for correct evaluation.

See below example for better understanding –
---------------------------------------------
Input is 125, suppose we have reached till 1+2 now,
Input = “125”, current expression = “1+2”,
position = 2, current val = 3, last = 2

Now when we go for multiplication, we need last
value for evaluation as follows:

current val = current val - last + last * current val

First we subtract last and then add last * current
val for evaluation, new last is last * current val.
current val = 3 – 2 + 2*5 = 11
last = 2*5 = 10
---------------------------------------------
Another thing to note in below code is, we have ignored all numbers which start from 0 by imposing a
condition as first condition inside the loop so that we will not process number like 03, 05 etc.
*/
// TypeScript program to find all possible expressions which evaluate to target

import assert  from 'assert';

// Utility recursive method to generate all possible expressions
function getExprUtil(
  res: string[],
  curExp: string,
  input_string: string,
  target: number,
  pos: number,
  curVal: number,
  last: number
) {
  // True if whole input is processed with some operators
  if (pos === input_string.length) {
    // If current value is equal to target then only add to final solution
    // If the question is: all possible output, then just push_back without the condition
    if (curVal === target) {
      res.push(curExp);
    }
    return;
  }

  // Loop to put operator at all positions
  for (let i = pos; i < input_string.length; i++) {
    // Ignoring case which starts with 0 as they are useless for evaluation
    if (i !== pos && input_string[pos] === '0') {
      break;
    }

    // Take part of input from pos to i
    const part = input_string.slice(pos, i + 1);

    // Take numeric value of part
    const cur = parseInt(part);
    // If pos is 0 then just send numeric value for the next recursion
    if (pos === 0) {
      getExprUtil(res, curExp + part, input_string, target, i + 1, cur, cur);
    } else {
      // Try all given binary operators for evaluation
      getExprUtil(res, curExp + "+" + part, input_string, target, i + 1, curVal + cur, cur);
      getExprUtil(res, curExp + "-" + part, input_string, target, i + 1, curVal - cur, -cur);
      getExprUtil(
        res, curExp + "*" + part, input_string,
        target, i + 1, curVal - last + last * cur, last * cur
      );
    }
  }
}

// Below method returns all possible expressions evaluating to target
function getExprs(input_string: string, target: number) {
  const res: string[] = [];
  getExprUtil(res, "", input_string, target, 0, 0, 0);
  return res;
}

// Test case - 1
(() => {
  const input_string = "123";
  const target = 6;
  const res = getExprs(input_string, target);
  assert.deepEqual(res, ["1+2+3", "1*2*3"], "Test case 1 failed");
  // console.log(res);
})();

// Test case -2
(() => {
  const input_string = "125";
  const target = 7;
  const res = getExprs(input_string, target);
  assert.deepEqual(res, [ '1*2+5', '12-5' ], "Test case 2 failed");
  // console.log(res);
})();
