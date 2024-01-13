/* 
## Decode an Encoded Base 64 String to ASCII String

http://www.geeksforgeeks.org/decode-encoded-base-64-string-ascii-string/


Prerequisite : What is base64 Encoding and why we encode strings to base64 format

Base64 encoding is performed at sending node before transmitting bits over a network,
and receiving node decodes that encoded data back to original ASCII string.

Base64 character set is
- - - - - - - - - - - - - - - - - - - - - - - -
// 64 characters
char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz0123456789+/"
- - - - - - - - - - - - - - - - - - - - - - - -

==Examples:==
- - - - - - - - - - - - - - - - - - - - - - - -
Input : TUVO04= // (Encoded into base64 format)
Output : MENON  //  (Decoded back to ASCII string)

Input : Z2Vla3Nmb3JnZWVrcw==
Output : geeksforgeeks
- - - - - - - - - - - - - - - - - - - - - - - -

=Approach:=

1. Here each character in encoded string is considered to be made of 6 bits. We will take 4
characters each from Encoded String at one time i.e 4 * 6 = 24 bits. For each 4 characters of
encoded string we will produce 3 characters of original string which will be of 8 bits each i.e 3
* 8 = 24 bits.

2. Find their respective position in char_set and store it inside a variable (num) by using '|'
OR operator for storing bits and (LEFT – SHIFT) by 6 to make room for another 6 bits. NOTE : We
used '=' in encoder to substitute for 2 missing bits, So here in decoder we have to reverse the
process. Whenever we encounter a '=' we have to delete 2 bits of num by using (RIGHT – SHIFT) by 2.

3. After we have stored all the bits in num we will retrieve them in groups of 8, by using &
operator with 255 (11111111), that will store the 8 bits from num and that will be our original
character from ASCII string.

Time Complexity: O(N)
Space Complexity : O(1)

 */

const SIZE = 100;

export class Base64Decode {
  base64Decoder(encoded: string, lenStr: number): string {
    const decodedString: string[] = Array(SIZE);
    let k = 0;

    for (let i = 0; i < lenStr; i += 4) {
      let num = 0;
      let countBits = 0;

      for (let j = 0; j < 4; j++) {
        if (encoded[i + j] !== '=') {
          num = num << 6;
          countBits += 6;
        }

        if ('A' <= encoded[i + j] && encoded[i + j] <= 'Z') {
          num = num | (encoded[i + j].charCodeAt(0) - 'A'.charCodeAt(0));
        } else if ('a' <= encoded[i + j] && encoded[i + j] <= 'z') {
          num = num | (encoded[i + j].charCodeAt(0) - 'a'.charCodeAt(0) + 26);
        } else if ('0' <= encoded[i + j] && encoded[i + j] <= '9') {
          num = num | (encoded[i + j].charCodeAt(0) - '0'.charCodeAt(0) + 52);
        } else if (encoded[i + j] === '+') {
          num = num | 62;
        } else if (encoded[i + j] === '/') {
          num = num | 63;
        } else {
          num = num >> 2;
          countBits -= 2;
        }
      }

      while (countBits !== 0) {
        countBits -= 8;
        decodedString[k] = String.fromCharCode((num >> countBits) & 255);
        k += 1;
      }
    }

    decodedString[k] = '&#092;&#048;';
    return decodedString.slice(0, k).join('');
  }
}

if (require.main === module) {
  // Encoded string : TUVO04=
  // Decoded string : MENON
  const test = new Base64Decode();
  const encodedString = 'TUVOT04=';
  const lenStr = encodedString.length;

  console.log(`Encoded string : ${encodedString}\n`);
  console.log(`Decoded string : ${test.base64Decoder(encodedString, lenStr)}\n`);
}
