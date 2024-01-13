/* Length of the longest substring without repeating characters

Given a string, find the length of the longest substring without repeating characters. For
example, the longest substrings without repeating characters for "ABDEFGABEF" are "BDEFGA" and
"DEFGAB", with length 6. For "BBBB" the longest substring is "B", with length 1. For
"GEEKSFORGEEKS", there are two longest substrings shown in the below diagrams, with length 7.

    ['G', 'E', 'E', 'K', 'S', 'F', 'O', 'R', 'G', 'E', 'E', 'K', 'S']

    ['G', 'E', |'E'|, |'K'|, |'S'|, |'F'|, |'O'|, |'R'|, |'G'|, 'E', 'E', 'K', 'S']

    ['G', 'E', 'E', |'K'|, |'S'|, |'F'|, |'O'|, |'R'|, |'G'|, |'E'|, 'E', 'K', 'S']


The desired time complexity is O(n) where n is the length of the string.

------------------------------------
Method 1 (Simple)
------------------------------------
We can consider all substrings one by one and check for each substring whether it contains all
unique characters or not. There will be n*(n+1)/2 substrings. Whether a substirng contains all
unique characters or not can be checked in linear time by scanning it from left to right and
keeping a map of visited characters. Time complexity of this solution would be O(n^3).


------------------------------------
Method 2 (Linear Time)
------------------------------------
Let us talk about the linear time solution now. This solution uses extra space to store the last
indexes of already visited characters. The idea is to scan the string from left to right,
keep track of the maximum length Non-Repeating Character Substring (NRCS) seen so far. Let the
maximum length be max_len. When we traverse the string, we also keep track of length of the
current NRCS using cur_len variable. For every new character, we look for it in already processed
part of the string (A temp array called visited[] is used for this purpose). If it is not
present, then we increase the cur_len by 1. If present, then there are two cases:

a) The previous instance of character is not part of current NRCS (The NRCS which is under
process). In this case, we need to simply increase cur_len by 1.

b) If the previous instance is part of the current NRCS, then our current NRCS changes. It
becomes the substring staring from the next character of previous instance to currently scanned
character. We also need to compare cur_len and max_len, before changing current NRCS (or changing
cur_len).

 */

function longestUniqueSubstr(str: string): number {
  const NO_OF_CHARS: number = 256;
  const n: number = str.length;

  let cur_len: number = 1;
  let max_len: number = 1;
  let prev_index: number = 0;
  let i: number = 0;

  const visited: number[] = Array(NO_OF_CHARS).fill(-1);
  visited[str.charCodeAt(0)] = 0;

  for (i = 1; i < n; i++) {
    prev_index = visited[str.charCodeAt(i)];

    if (prev_index === -1 || i - cur_len > prev_index) {
      cur_len++;
    } else {
      if (cur_len > max_len) {
        max_len = cur_len;
      }
      cur_len = i - prev_index;
    }

    visited[str.charCodeAt(i)] = i;
  }

  if (cur_len > max_len) {
    max_len = cur_len;
  }

  return max_len;
}

if (require.main === module) {
  // Test case
  const inputString: string = "ABDEFGABEF";
  console.log("The input string is", inputString);
  const length: number = longestUniqueSubstr(inputString);
  console.log("The length of the longest non-repeating character substring is", length);
}