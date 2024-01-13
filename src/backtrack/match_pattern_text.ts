
/* 
Match a pattern and String without using regular expressions

Given a string, find out if string follows a given pattern or not without using any regular
expressions.

Examples:
- - - - - - - - - - - - - - - - - - - - -
Input:
string - GraphTreesGraph
pattern - aba
Output:
a->Graph
b->Trees

Input:
string - GraphGraphGraph
pattern - aaa
Output:
a->Graph

Input:
string - GeeksforGeeks
pattern - GfG
Output:
G->Geeks
f->for

Input:
string - GeeksforGeeks
pattern - GG
Output:
No solution exists
- - - - - - - - - - - - - - - - - - - - -

We can solve this problem with the help of Backtracking. For each character in the pattern,
if the character is not seen before, we consider all possible sub-strings and recurse to see if
it leads to the solution or not. We maintain a map that stores sub-string mapped to a pattern
character. If pattern character is seen before, we use the same sub-string present in the map. If
we found a solution, for each distinct character in the pattern, we print string mapped to it
using our map

 */
export class PatternMatch {
    /**
     * Function to find out if string follows a given pattern or not
     *
     * @param string - given string
     * @param n - length of given string
     * @param i - current index in input string
     * @param pat - given pattern
     * @param m - length of given pattern
     * @param j - current index in given pattern
     * @param mapper - stores mapping between pattern and string
     * @returns boolean - true if string follows the pattern, false otherwise
     */
    pattern_match_util(
        string: string,
        n: number,
        i: number,
        pat: string,
        m: number,
        j: number,
        mapper: { [key: string]: string }
    ): boolean {
        // If both string and pattern reach their end
        if (i === n && j === m) {
            return true;
        }

        // If either string or pattern reach their end
        if (i === n || j === m) {
            return false;
        }

        // read next character from the pattern
        const ch = pat[j];

        // if character is seen before
        if (ch in mapper) {
            const s = mapper[ch];
            const size = s.length;
            // consider next len characters of str
            const subStr = string.slice(i, i + size);
            // if next len characters of string str don't match with s, return false
            if (subStr !== s) {
                return false;
            }

            // if it matches, recurse for remaining characters
            return this.pattern_match_util(string, n, i + size, pat,m, j + 1, mapper);
        }

        // If character is seen for first time, try out all remaining characters in the string
        for (let size = 1; size <= n - i; size++) {
            // consider substring that starts at position i and spans len characters and add it
            // to map
            mapper[ch] = string.slice(i, i + size);

            // see if it leads to the solution
            if (
                this.pattern_match_util(
                    string, n, i + size, pat, m, j + 1, mapper
                )
            ) {
                return true;
            }

            // if not, remove ch from the map
            delete mapper[ch];
        }

        return false;
    }

    /**
     * A wrapper over pattern_match_util() function
     *
     * @param string - given string
     * @param pat - given pattern
     * @param n - length of given string
     * @param m - length of given pattern
     * @returns boolean - true if string follows the pattern, false otherwise
     */
    pattern_match(string: string, pat: string, n: number, m: number): boolean {
        if (n < m) {
            return false;
        }

        // create an empty hash map
        const mapp: { [key: string]: string } = {};
        // store result in a boolean variable res
        const res = this.pattern_match_util(string, n, 0, pat, m, 0, mapp);

        // if solution exists, print the mappings
        for (const [k, v] of Object.entries(mapp)) {
            console.log(`${k}->${v}`);
        }

        return res;
    }
}


if (require.main === module) {
    const string = "GeeksforGeeks";
    const pat = "GfG";
    const n = string.length;
    const m = pat.length;
    const obj = new PatternMatch();
    obj.pattern_match(string, pat, n, m);
}