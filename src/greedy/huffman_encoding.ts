/* 
## Greedy Algorithms | Set 3 (Huffman Coding)
http://bhrigu.me/blog/2017/01/17/huffman-coding-python-implementation/
http://www.geeksforgeeks.org/greedy-algorithms-set-3-huffman-coding/

Huffman coding is a lossless data compression algorithm. The idea is to assign variable-length
codes to input characters, lengths of the assigned codes are based on the frequencies of
corresponding characters. The most frequent character gets the smallest code and the least
frequent character gets the largest code.
The variable-length codes assigned to input characters are Prefix Codes, means the codes (bit
sequences) are assigned in such a way that the code assigned to one character is not prefix of
code assigned to any other character. This is how Huffman Coding makes sure that there is no
ambiguity when decoding the generated bit stream.
Let us understand prefix codes with a counter example. Let there be four characters a, b,
c and d, and their corresponding variable length codes be 00, 01, 0 and 1. This coding leads to
ambiguity because code assigned to c is prefix of codes assigned to a and b. If the compressed
bit stream is 0001, the de-compressed output may be "cccd" or "ccb" or "acd" or "ab".

See this for applications of Huffman Coding.

There are mainly two major parts in Huffman Coding
1) Build a Huffman Tree from input characters.
2) Traverse the Huffman Tree and assign codes to characters.

----------------------------------------------------
Steps to build Huffman Tree
----------------------------------------------------
Input is array of unique characters along with their frequency of occurrences and output is
Huffman Tree.

1.  Create a leaf node for each unique character and build a min heap of all leaf nodes (Min Heap
    is used as a priority queue. The value of frequency field is used to compare two nodes in min
    heap. Initially, the least frequent character is at root)
2.  Extract two nodes with the minimum frequency from the min heap.
3.  Create a new internal node with frequency equal to the sum of the two nodes frequencies. Make
    the first extracted node as its left child and the other extracted node as its right child. Add
    this node to the min heap.
4.  Repeat steps#2 and #3 until the heap contains only one node. The remaining node is the root
    node and the tree is complete.

Let us understand the algorithm with an example:
- - - - - - - - - - - - - - - - - - - -
character   Frequency
    a	        5
    b           9
    c           12
    d           13
    e           16
    f           45
- - - - - - - - - - - - - - - - - - - -

Step 1. Build a min heap that contains 6 nodes where each node represents root of a tree with
single node.

Step 2 Extract two minimum frequency nodes from min heap. Add a new internal node with frequency
5 + 9 = 14.
                    14
                  /    \
                a|5   b|9

Now min heap contains 5 nodes where 4 nodes are roots of trees with single element each, and one
heap node is root of tree with 3 elements
- - - - - - - - - - - - - - - - - - - -
character           Frequency
       c               12
       d               13
 Internal Node         14
       e               16
       f               45
- - - - - - - - - - - - - - - - - - - -

Step 3: Extract two minimum frequency nodes from heap. Add a new internal node with frequency
12 + 13 = 25
                    25
                  /    \
                c|12  d|13

Now min heap contains 4 nodes where 2 nodes are roots of trees with single element each, and two
heap nodes are root of tree with more than one nodes.

- - - - - - - - - - - - - - - - - - - -
character           Frequency
Internal Node          14
       e               16
Internal Node          25
       f               45
- - - - - - - - - - - - - - - - - - - -

Step 4: Extract two minimum frequency nodes. Add a new internal node with frequency
14 + 16 = 30
                    30
                  /    \
                 14   e|16
                /  \
              a|5  b|9

Now min heap contains 3 nodes.
- - - - - - - - - - - - - - - - - - - -
character          Frequency
Internal Node         25
Internal Node         30
      f               45
- - - - - - - - - - - - - - - - - - - -

Step 5: Extract two minimum frequency nodes. Add a new internal node with frequency
25 + 30 = 55
                     55
                  /     \
                25      30
              /   \    /   \
            c|12 d|13 14  e|16
                     /  \
                   a|5  b|9

Now min heap contains 2 nodes.
- - - - - - - - - - - - - - - - - - - -
character     Frequency
       f         45
Internal Node    55
- - - - - - - - - - - - - - - - - - - -

Step 6: Extract two minimum frequency nodes. Add a new internal node with frequency
45 + 55 = 100
                    100
                  /     \
               f|45     55
                     /      \
                   25        30
                  /  \      /   \
                c|12 d|13  14   e|16
                          /  \
                        a|5 b|9

Now min heap contains only one node.
- - - - - - - - - - - - - - - - - - - -
character      Frequency
Internal Node    100
- - - - - - - - - - - - - - - - - - - -

Since the heap contains only one node, the algorithm stops here.

==Steps to print codes from Huffman Tree:=
Traverse the tree formed starting from the root. Maintain an auxiliary array. While moving to
the left child, write 0 to the array. While moving to the right child, write 1 to the array.
Print the array when a leaf node is encountered.


The codes are as follows:
- - - - - - - - - - - - - - - - - - - -
character   code-word
    f          0
    c          100
    d          101
    a          1100
    b          1101
    e          111
- - - - - - - - - - - - - - - - - - - - */

import fs from 'fs';
import path from 'path';
import { MinHeap } from 'datastructures-js';

export class HeapNode {
    char: string;
    freq: number;
    left: null;
    right: null;

    constructor(char: string, freq: number) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }

    compareTo(other: HeapNode) {
        if (other === null || !(other instanceof HeapNode)) {
            return -1;
        }
        return this.freq - other.freq;
    }
}

export class HuffmanCoding<T> {
    path: any;
    heap: MinHeap<T>;
    codes: {[key: string]: string};
    reverseMapping: {[key: string]: string};
    
    constructor(filePath: string) {
        this.path = filePath;
        this.heap = new MinHeap((a, b) => a.compareTo(b));
        this.codes = {};
        this.reverseMapping = {};
    }

    makeFrequencyDict(text: string) {
        const frequency = {};
        for (const character of text) {
            frequency[character] = (frequency[character] || 0) + 1;
        }
        return frequency;
    }

    makeHeap(frequency: {}) {
        for (const key in frequency) {
            const node = new HeapNode(key, frequency[key]);
            this.heap.insert(node);
        }
    }

    mergeNodes() {
        while (this.heap.size() > 1) {
            const node1 = this.heap.extractMin();
            const node2 = this.heap.extractMin();

            const merged = new HeapNode(null, node1.freq + node2.freq);
            merged.left = node1;
            merged.right = node2;

            this.heap.insert(merged);
        }
    }

    makeCodesHelper(root, currentCode: string) {
        if (root === null) {
            return;
        }

        if (root.char !== null) {
            this.codes[root.char] = currentCode;
            this.reverseMapping[currentCode] = root.char;
            return;
        }

        this.makeCodesHelper(root.left, currentCode + "0");
        this.makeCodesHelper(root.right, currentCode + "1");
    }

    makeCodes() {
        const root = this.heap.extractMin();
        const currentCode = "";
        this.makeCodesHelper(root, currentCode);
    }

    getEncodedText(text: string) {
        let encodedText = "";
        for (const character of text) {
            encodedText += this.codes[character];
        }
        return encodedText;
    }

    padEncodedText(encodedText: string) {
        const extraPadding = 8 - encodedText.length % 8;
        for (let i = 0; i < extraPadding; i++) {
            encodedText += "0";
        }

        const paddedInfo = extraPadding.toString(2).padStart(8, '0');
        encodedText = paddedInfo + encodedText;
        return encodedText;
    }

    getByteArray(paddedEncodedText: string) {
        if (paddedEncodedText.length % 8 !== 0) {
            console.log("Encoded text not padded properly");
            process.exit(0);
        }

        const byteArray = [];
        for (let i = 0; i < paddedEncodedText.length; i += 8) {
            const byte = paddedEncodedText.slice(i, i + 8);
            byteArray.push(parseInt(byte, 2));
        }
        return byteArray;
    }

    compress() {
        const { dir, name } = path.parse(this.path);
        const outputFilePath = path.join(dir, name + '.bin');

        const text = fs.readFileSync(this.path, 'utf-8').trim();

        const frequency = this.makeFrequencyDict(text);
        this.makeHeap(frequency);
        this.mergeNodes();
        this.makeCodes();

        const encodedText = this.getEncodedText(text);
        const paddedEncodedText = this.padEncodedText(encodedText);

        const byteArray = this.getByteArray(paddedEncodedText);

        fs.writeFileSync(outputFilePath, Buffer.from(byteArray));

        console.log("Compressed");
        return outputFilePath;
    }

    removePadding(paddedEncodedText: string) {
        const paddedInfo = paddedEncodedText.slice(0, 8);
        const extraPadding = parseInt(paddedInfo, 2);

        const encodedText = paddedEncodedText.slice(8, -1 * extraPadding);
        return encodedText;
    }

    decodeText(encodedText: string) {
        let currentCode = "";
        let decodedText = "";

        for (const bit of encodedText) {
            currentCode += bit;
            if (currentCode in this.reverseMapping) {
                const character = this.reverseMapping[currentCode];
                decodedText += character;
                currentCode = "";
            }
        }

        return decodedText;
    }

    decompress(inputFilePath: string) {
        const { dir, name } = path.parse(this.path);
        const outputFilePath = path.join(dir, name + '_decompressed.txt');

        const data = fs.readFileSync(inputFilePath);
        let bitString = "";
        for (let i = 0; i < data.length; i++) {
            const byte = data[i];
            const bits = byte.toString(2).padStart(8, '0');
            bitString += bits;
        }

        const encodedText = this.removePadding(bitString);
        const decompressedText = this.decodeText(encodedText);

        fs.writeFileSync(outputFilePath, decompressedText);

        console.log("Decompressed");
        return outputFilePath;
    }
}

if (require.main === module) {
    // Example usage
    const filePath = "/Volumes/Transcend/Downloads/sample.txt";

    const huffman = new HuffmanCoding(filePath);

    const compressedFilePath = huffman.compress();
    console.log("Output path:", compressedFilePath);

    const decompressedFilePath = huffman.decompress(compressedFilePath);
    console.log("Done");
}
