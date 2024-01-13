/* """
Check for Palindrome after every character replacement Query

Given a string str and Q queries. Each query contains a pair of integers (i1, i2) and a character
'ch'. We need to replace characters at indexes i1 and i2 with new character 'ch' and then tell if
string str is palindrome or not. (0 <= i1, i2 < string_length)

------------------------------------------------------------
Examples:
------------------------------------------------------------

Input : str = "geeks"  Q = 2
        query 1: i1 = 3 ,i2 = 0, ch = 'e'
        query 2: i1 = 0 ,i2 = 2 , ch = 's'
Output : query 1: "NO"
         query 2: "YES"

Explanation :
        In query 1 : i1 = 3 , i2 = 0 ch = 'e'
                    After replacing char at index i1, i2
                    str[3] = 'e', str[0] = 'e'
                    string become "eeees" which is not
                    palindrome so output "NO"
        In query 2 : i1 = 0 i2 = 2  ch = 's'
                    After replacing char at index i1 , i2
                     str[0] = 's', str[2] = 's'
                    string become "seses" which is
                    palindrome so output "YES"

Input : str = "jasonamat"  Q = 3
        query 1: i1 = 3, i2 = 8 ch = 'j'
        query 2: i1 = 2, i2 = 6 ch = 'n'
        query 3: i1 = 3, i2 = 7 ch = 'a'
Output :
       query 1: "NO"
       query 2: "NO"
       query 3: "YES"

METHOD - 1
    A Simple solution is that for each query , we replace character at indexes (i1 & i2) with a new
    character 'ch' and then check if string is palindrome or not.

    Python program to find if string becomes palindrome after every query.
    Time complexity O(Q*n) (n is length of string )

    METHOD - 2
    An efficient solution is to use hashing. We create an empty hash set that stores indexes that
    are unequal in palindrome (Note: "we have to store indexes only first half of string that are
    unequal").

    Given string "str" and length 'n'.
    Create an empty set S and store unequal indexes in first half.
    Do following for each query :
       1. First replace character at indexes i1 & i2 with new char "ch"

       2. If i1 and/or i2 are/is greater than n/2 then convert into first half index(es)

       3. In this step we make sure that S contains maintains unequal indexes of first half.
          a) If str[i1] == str [n - 1 - i1] means i1 becomes equal after replacement, remove
          it from S (if present) Else add i1 to S

          b) Repeat step a) for i2 (replace i1 with i2)

       4. If S is empty then string is palindrome else NOT

    Time Complexity : O(Q + n) under the assumption that set insert, delete and find operations
    take O(1) time.

*/
export class CheckIsPalindrome {
  isPalindrome(mystring: string[]): boolean {
    const n = mystring.length;
    for (let i = 0; i < n / 2; i++) {
      if (mystring[i] !== mystring[n - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  query(inString: string[], mystring: string[], Q: number): void {
    for (let q = 0; q < Q; q++) {
      const estring = inString[q].split(" ");
      const i1 = parseInt(estring[0]);
      const i2 = parseInt(estring[1]);
      const ch = estring[2];

      mystring[i1] = mystring[i2] = ch;

      console.log(this.isPalindrome(mystring) ? "YES" : "NO");
    }
  }

  addRemoveUnequal(mystr: string[], index: number, n: number, S: Set<number>): void {
    if (mystr[index] === mystr[n - 1 - index]) {
      if (index < S.size) {
        S.delete(index);
      }
    } else {
      S.add(index);
    }
  }

  query2(inString: string[], mystr: string[], Q: number): void {
    const n = mystr.length;
    const S = new Set<number>();

    for (let i = 0; i < n / 2; i++) {
      if (mystr[i] !== mystr[n - 1 - i]) {
        S.add(i);
      }
    }

    for (let q = 0; q < Q; q++) {
      const estring = inString[q].split(" ");
      let i1 = parseInt(estring[0]);
      let i2 = parseInt(estring[1]);
      const ch = estring[2];

      mystr[i1] = mystr[i2] = ch;

      if (i1 > n / 2) {
        i1 = n - 1 - i1;
      }
      if (i2 > n / 2) {
        i2 = n - 1 - i2;
      }

      this.addRemoveUnequal(mystr, i1, n, S);
      this.addRemoveUnequal(mystr, i2, n, S);

      console.log(S.size === 0 ? "YES" : "NO");
    }
  }
}

if (require.main === module) {

  // Example usage
  const isPalindrome = new CheckIsPalindrome();
  const mystr = Array.from("geeks");
  const inString = ["3 0 e", "0 2 s"];
  const Q = 2;

  console.log("\n--- Method-1 --- ------- -- -- ------ ");
  isPalindrome.query(inString, mystr.slice(), Q);

  console.log("\n--- Method-2 --- ------- -- -- ------ ");
  isPalindrome.query2(inString, mystr.slice(), Q);

}