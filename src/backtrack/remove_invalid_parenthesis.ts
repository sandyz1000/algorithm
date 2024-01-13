/* 
Remove Invalid Parentheses

An expression will be given which can contain open and close parentheses and optionally some
characters, No other operator will be there in string. We need to remove minimum number of
parentheses to make the input string valid. If more than one valid output are possible removing
same number of parentheses then print all such output.

Examples:
- - - - - - - - - - - - - - - - - - - -
Input  : str = "()())()" -
Output : ()()() (())()
There are two possible solutions
"()()()" and "(())()"

Input  : str = (v)())()
Output : (v)()()  (v())()
- - - - - - - - - - - - - - - - - - - -

As we need to generate all possible output we will backtrack among all states by removing one
opening or closing bracket and check if they are valid, if invalid then add the removed bracket
back and go for next state.
We will use BFS for moving through states, use of BFS will assure removal of minimal number
of brackets because we traverse into states level by level and each level corresponds to one
extra bracket removal.
Other than this BFS involve no recursion so overhead of passing parameters is also saved.

Below code has a method isValidString to check validity of string, it counts open and closed
parenthesis at each index ignoring non-parenthesis character. If at any instant count of close
parenthesis becomes more than open then we return false else we keep update the count variable.

*/

export class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    enqueue(element: T): void {
        this.items.push(element);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

function isValidString(mString: string): boolean {
    let cnt = 0;
    for (let i = 0; i < mString.length; i++) {
        if (mString[i] === '(') {
            cnt += 1;
        } else if (mString[i] === ')') {
            cnt -= 1;
        }
        if (cnt < 0) {
            return false;
        }
    }
    return cnt === 0;
}

function removeInvalidParenthesis(mString: string): void {
    const isParenthesis = (c: string): boolean => c === '(' || c === ')';
    if (mString.length === 0) {
        return;
    }

    const visit = new Set<string>();
    const queue = new Queue<string>();
    let level = false;

    queue.enqueue(mString);
    visit.add(mString);
    while (!queue.isEmpty()) {
        mString = queue.dequeue()!;
        if (isValidString(mString)) {
            console.log(mString);
            level = true;
        }

        if (level) {
            continue;
        }

        for (let i = 0; i < mString.length; i++) {
            if (!isParenthesis(mString[i])) {
                continue;
            }

            const temp = mString.slice(0, i) + mString.slice(i + 1);
            if (!visit.has(temp)) {
                queue.enqueue(temp);
                visit.add(temp);
            }
        }
    }
}

const expression1 = "()())()";
removeInvalidParenthesis(expression1);

const expression2 = "(v)())()";
removeInvalidParenthesis(expression2);