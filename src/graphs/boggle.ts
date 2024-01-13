/* """
Boggle (Find all possible words in a board of characters) | Set 1
https://www.geeksforgeeks.org/boggle-find-possible-words-board-characters/

Given a dictionary, a method to do lookup in dictionary and a M x N board where every cell has one
character.
Find all possible words that can be formed by a sequence of adjacent characters. Note
that we can move to any of 8 adjacent characters, but a word should not have multiple instances of
same cell.

Example:

Input: dictionary = ["GEEKS", "FOR", "QUIZ", "GO"]
       boggle = {{'G','I','Z'},
                {'U','E','K'},
                {'Q','S','E'}};
      isWord(str): returns true if str is present in dictionary else false.

Output:  Following words of dictionary are present
         GEEKS
         QUIZ

""" */

export class Boggle {
  M: number = 3;
  N: number = 3;
  dictionary: string[] = ["GEEKS", "FOR", "QUIZ", "GO"];
  size_n: number = this.dictionary.length;
  m_string: string;

  constructor(m_string: string = "") {
    this.m_string = m_string;
  }

  isWord(m_string: string): boolean {
    for (let i = 0; i < this.size_n; i++) {
      if (m_string === this.dictionary[i]) {
        return true;
      }
    }
    return false;
  }

  findWordsUtil(boggle: string[][], visited: boolean[][], i: number, j: number): void {
    visited[i][j] = true;
    this.m_string += boggle[i][j];

    if (this.isWord(this.m_string)) {
      console.log(this.m_string);
    }

    for (let row = i - 1; row <= i + 1 && row < this.M; row++) {
      for (let col = j - 1; col <= j + 1 && col < this.N; col++) {
        if (row >= 0 && col >= 0 && !visited[row][col]) {
          this.findWordsUtil(boggle, visited, row, col);
        }
      }
    }

    this.m_string = this.m_string.slice(0, -1);
    visited[i][j] = false;
  }

  findWords(boggle: string[][]): void {
    const visited: boolean[][] = Array.from({ length: this.M }, () => Array(this.N).fill(false));

    for (let i = 0; i < this.M; i++) {
      for (let j = 0; j < this.N; j++) {
        this.findWordsUtil(boggle, visited, i, j);
      }
    }
  }
}

if (require.main === module) {
  const test = new Boggle();
  const boggle: string[][] = [
    ['G', 'I', 'Z'],
    ['U', 'E', 'K'],
    ['Q', 'S', 'E']
  ];

  console.log("Following words of dictionary are present\n");
  test.findWords(boggle);
}
