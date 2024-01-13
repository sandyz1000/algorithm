/* """
http://www.geeksforgeeks.org/encode-ascii-string-base-64-format/

Encode an ASCII string into Base-64 Format

Base 64 is an encoding scheme that converts binary data into text format so that encoded textual
data can be easily transported over network un-corrupted and without any data loss. Base64 is
used commonly in a number of applications including email via MIME, and storing complex data in
XML.

Problem with sending normal binary data to a network is that bits can be misinterpreted by
underlying protocols, produce incorrect data at receiving node and that is why we use this code.

==Why base 64 ?==

Resultant text after encoding our data has those characters which are widely present in many
character sets so there is very less chance of data being corrupted or modified.

==How to convert into base 64 format ?==

The character set in base64 is
- - - - - - - - - - - - - - - - - - - -
char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz0123456789+/"
// 64 characters
- - - - - - - - - - - - - - - - - - - -

==Basic idea==

Lets take an example. We have to encode string "MENON" into base64 format. Lets call "MENON" as
input_str, above base64 character set ("ABC..+/") as char_set and resultant encoded string as
res_str.

1. Take 3 characters from input_str i.e "MEN" since each character size is 8 bits we will have
(8 * 3) 24 bits with us.

2. Group them in a block of 6 bits each (24 / 6 = 4 blocks). (why 6?) because 2^6 = 64 characters,
with 6 bits we can represent each character in char_set.

3. Convert each block of 6 bits to its corresponding decimal value. Decimal value obtained is the
index of resultant encoded character in char_set.

4. So for each 3 characters from input_str we will receive 4 characters in res_str.

5. What if we have less than 3 characters in input_str left i.e "ON". We have 16 bits and blocks
will be 16 / 6 = 2 blocks. Rightmost 4 bits will not make a proper block (1 block = 6 bits) so we
append zeros to right side of block to make it a proper block i.e 2 zeros will be appended to
right. Now we have 3 proper blocks, find corresponding decimal value of each block to get index.

6. Since There were less than 3 characters ("ON") in input_str we will append "=" in res_str. e.g
"ON" here 3 – 2 = 1 padding of "=" in res_str.

==Example==

1. Convert "MENON" into its (8 bit) binary state format. Take each characters of the string and
write its 8 – bit binary representation.

ASCII values of characters in string to be encoded
- - - - - - - - - - - - - - - - - - - - - - - - -
M : 77 (01001101), E : 69 (01000101),
N : 78 (01001110), O : 79 (01001111), N : 78 (01001110)
- - - - - - - - - - - - - - - - - - - - - - - - -

resultant binary data of above string is :
- - - - - - - - - - - - - - - - - - - - - - - - -
01001101 01000101 01001110 01001111 01001110
- - - - - - - - - - - - - - - - - - - - - - - - -

2. Starting from left make blocks of 6 bits until all bits are covered
BIT-STREAM :
- - - - - - - - - - - - - - - - - - - - - - - - -
(010011) (010100) (010101) (001110) (010011) (110100) (1110)
- - - - - - - - - - - - - - - - - - - - - - - - -

3. If the rightmost block is less than 6 bits just append zeros to the right of that block to
make it 6 bits. Here in above example we have to appended 2 zeros to make it 6.
BIT-STREAM :
- - - - - - - - - - - - - - - - - - - - - - - - -
(010011) (010100) (010101) (001110) (010011) (110100) (111000)
- - - - - - - - - - - - - - - - - - - - - - - - -

Notice the bold zeros.

4. Take 3 characters from input_str ("MEN") i.e 24 bits and find corresponding decimal value
(index to char_set).
BLOCKS :
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
INDEX --> (010011) : 19, (010100) : 20, (010101) : 21, (001110) : 14
char_set[19] = T, char_set[20] = U, char_set[21] = V, char_set[14] = O
So our input_str = "MEN" will be converted to encoded string "TUVO".
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

5. Take remaining characters ("ON"). We have to pad resultant encoded string with 1 "=" as number
of characters is less than 3 in input_str. (3 – 2 = 1 padding)
BLOCKS :
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
INDEX --> (010011) : 19 (110100) : 52 (111000) : 56
char_set[19] = T char_set[52] = 0 char_set[21] = 4
So our input_str = "ON" will be converted to encoded string "T04=".
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Examples:

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Input : MENON // string in ASCII
Output :TUVOT04= // encoded string in Base 64.

Input : geeksforgeeks
Output : Z2Vla3Nmb3JnZWVrcw==
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

==Approach :==
We can use bitwise operators to encode our string. We can take an integer "val" (usually 4 bytes
on most compilers) and store all characters of input_str (3 at a time) in val. The characters
from input_str will be stored in val in form of bits. We will use (OR operator) to store the
characters and (LEFT – SHIFT) by 8 so to make room for another 8 bits. In similar fashion we will
use (RIGHT – SHIFT) to retrieve bits from val 6 at a time and find value of bits by doing & with
63 (111111) which will give us index. Then we can get our resultant character by just going to
that index of char_set.

Time Complexity: O(2 * N) inserting bits into val + retrieving bits form val

*/


export const SIZE = 1000;

export class Base64Encode {
  base64Encoder(inputStr: string, lenStr: number): string {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const resStr: string[] = Array(SIZE);
    let padding = 0;
    let k = 0;

    for (let i = 0; i < lenStr; i += 3) {
      let val = 0;
      let count = 0;
      let j = i;

      while (j < lenStr && j <= i + 2) {
        val = val << 8;
        val = val | inputStr.charCodeAt(j);
        count += 1;
        j += 1;
      }

      let noOfBits = count * 8;
      padding = noOfBits % 3;

      while (noOfBits !== 0) {
        let index = 0;

        if (noOfBits >= 6) {
          const temp = noOfBits - 6;
          index = (val >> temp) & 63;
          noOfBits -= 6;
        } else {
          const temp = 6 - noOfBits;
          index = (val << temp) & 63;
          noOfBits = 0;
        }

        resStr[k] = charSet[index];
        k += 1;
      }
    }

    for (let i = 1; i <= padding; i++) {
      resStr[k] = '=';
      k += 1;
    }

    resStr[k] = ';';
    return resStr.slice(0, k + 1).join('');
  }
}

if (require.main === module) {
  const test = new Base64Encode();
  const inputStr = 'MENON';
  const lenStr = inputStr.length;

  console.log(`Input string is : ${inputStr}\n`);
  console.log(`Encoded string is : ${test.base64Encoder(inputStr, lenStr)}\n`);
}
