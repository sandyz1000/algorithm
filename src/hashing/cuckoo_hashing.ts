/* """
http://www.geeksforgeeks.org/cuckoo-hashing/

Cuckoo Hashing – Worst case O(1) Lookup!

--------------------------------------------------
Background :
--------------------------------------------------

There are three basic operations that must be supported by a hash table (or a dictionary):

==Lookup(key):== return true if key is there in the table, else false
==Insert(key):== adds the item 'key' to the table if not already present
==Delete(key):== removes 'key' from the table

Collisions are very likely even if we have a big table to store keys. Using the results from the
birthday paradox: with only 23 persons, the probability that two people share the same birth date
is 50%! There are 3 general strategies towards resolving hash collisions:

==Closed addressing or Chaining:== store colliding elements in an auxiliary data structure like a
linked list or a binary search tree.

==Open addressing:== allow elements to overflow out of their target bucket and into other spaces.

Although above solutions provide expected lookup cost as O(1), the expected worst-case cost of a
lookup in Open Addressing (with linear probing) is Ω(log n) and Θ(log n / log log n) in simple
chaining (Source : Standford Lecture Notes). To close the gap of expected time and worst case
expected time, two ideas are used:

    ==Multiple-choice hashing:== Give each element multiple choices for positions where it can
    reside in the hash table

    ==Relocation hashing:== Allow elements in the hash table to move after being placed


    --------------------------------------------------
    Cuckoo Hashing :
    --------------------------------------------------

    Cuckoo hashing applies the idea of multiple-choice and relocation together and guarantees O(1)
    worst case lookup time!

    ==Multiple-choice:== We give a key two choices h1(key) and h2(key) for residing.

    ==Relocation:== It may happen that h1(key) and h2(key) are preoccupied. This is resolved by
    imitating the Cuckoo bird: it pushes the other eggs or young out of the nest when it hatches.
    Analogously, inserting a new key into a cuckoo hashing table may push an older key to a
    different location. This leaves us with the problem of re-placing the older key.

        1. If alternate position of older key is vacant, there is no problem.

        2. Otherwise, older key displaces another key. This continues until the procedure finds a
        vacant position, or enters a cycle. In case of cycle, new hash functions are chosen and
        the whole data structure is 'rehashed'. Multiple rehashes might be necessary before
        Cuckoo succeeds.

    ==Insertion== is expected O(1) (amortized) with high probability, even considering the
    possibility rehashing, as long as the number of keys is kept below half of the capacity of
    the hash table, i.e., the load factor is below 50%.

    ==Deletion== is O(1) worst-case as it requires inspection of just two locations in the hash
    table.

    Generalizations of cuckoo hashing that use more than 2 alternative hash functions can be
    expected to utilize a larger part of the capacity of the hash table efficiently while
    sacrificing some lookup and insertion speed. Example: if we use 3 hash functions, it's safe
    to load 91% and still be operating within expected bounds

    --------------------------------------------------
    Illustration :
    --------------------------------------------------
    Input:
    {20, 50, 53, 75, 100, 67, 105, 3, 36, 39}

    Hash Functions:

    h1(key) = key%11
    h2(key) = (key/11)%11

        ----- DIAGRAM GOES HERE -----

 */


export const MAXN: number = 11;  // upper bound on the number of elements in our set
const ver: number = 2;  // choices for position
const INT_MIN: number = -999999;


class CuckooHashing {
    // Auxiliary space bounded by a small multiple of MAXN, minimizing wastage
    hashtable: number[][] = Array.from({ length: ver }, () => Array(MAXN).fill(0));
    // Array to store possible positions for a key
    pos: number[] = Array(ver).fill(0);

    initTable(): void {
        /**
         * Function to fill the hash table with a dummy value
         * Dummy value: INT_MIN
         * Number of hashtables: ver
         */
        for (let j = 0; j < MAXN; j++) {
            for (let i = 0; i < ver; i++) {
                this.hashtable[i][j] = INT_MIN;
            }
        }
    }

    hashing(func: number, key: number): number {
        /**
         * Return hashed value for a key
         * @param func: ID of the hash function according to which the key has to be hashed
         * @param key: Item to be hashed
         * @returns Hashed value
         */
        if (func === 1) {
            return key % MAXN;
        }

        if (func === 2) {
            return Math.floor(key / MAXN) % MAXN;
        }

        return -1;  // Default case
    }

    place(key: number, tableID: number, cnt: number, n: number): void {
        /**
         * Function to place a key in one of its possible positions
         * @param key: Key to be placed
         * @param tableID: Table in which the key has to be placed, also equal to the function
         *                 according to which the key must be hashed
         * @param cnt: Number of times the function has already been called to place the first input key
         * @param n: Maximum number of times the function can be recursively called before stopping
         *           and declaring the presence of a cycle
         */
        // If the function has been recursively called the max number of times, stop and declare a cycle. Rehash.
        if (cnt === n) {
            console.log(` ${key} unpositioned`);
            console.log("Cycle present. REHASH.");
            return;
        }

        // Calculate and store possible positions for the key.
        // Check if the key is already present at any of the positions.
        // If yes, return.
        for (let i = 0; i < ver; i++) {
            this.pos[i] = this.hashing(i + 1, key);
            if (this.hashtable[i][this.pos[i]] === key) {
                return;
            }
        }

        // Check if another key is already present at the position for the new key in the table.
        // If yes, place the new key in its position and place the older key in an
        // alternate position for it in the next table.
        if (this.hashtable[tableID][this.pos[tableID]] !== INT_MIN) {
            const dis: number = this.hashtable[tableID][this.pos[tableID]];
            this.hashtable[tableID][this.pos[tableID]] = key;
            this.place(dis, (tableID + 1) % ver, cnt + 1, n);
        } else {
            // Place the new key in its position.
            this.hashtable[tableID][this.pos[tableID]] = key;
        }
    }

    printTable(): void {
        /** Function to print hash table contents */
        console.log("Final hash tables:");
        for (let i = 0; i < ver; i++) {
            console.log(this.hashtable[i].map(val => (val === INT_MIN) ? '-' : val).join(' '));
        }
        console.log();
    }

    cuckoo(keys: number[], n: number): void {
        /**
         * Function for Cuckoo-hashing keys
         * @param keys: Input array of keys
         * @param n: Size of the input array
         */
        // Initialize hash tables to a dummy value (INT-MIN) indicating an empty position.
        this.initTable();

        // Start with placing every key at its position in the first hash table according
        // to the first hash function.
        let i: number = 0;
        let cnt: number = 0;
        while (i < n) {
            this.place(keys[i], 0, cnt, n);
            i++;
        }

        // Print the final hash tables.
        this.printTable();
    }
}

if (require.main === module) {
    // Output:
    // Final hash tables:
    // - 100 - 36 - - 50 - - 75 - 3 20 - 39 53 - 67 - - 105 -
    //
    // 105 unpositioned
    // Cycle present. REHASH.
    // Final hash tables:
    // - 67 - 3 - - 39 - - 53 - 6 20 - 36 50 - 75 - - 100 -

    // Following array doesn't have any cycles, and hence, all keys will be inserted without any rehashing.
    const cuckooHash = new CuckooHashing();
    const keys1: number[] = [20, 50, 53, 75, 100, 67, 105, 3, 36, 39];
    const n1: number = keys1.length;
    cuckooHash.cuckoo(keys1, n1);

    // Following array has a cycle, and hence we will have to rehash to position every key.
    const keys2: number[] = [20, 50, 53, 75, 100, 67, 105, 3, 36, 39, 6];
    const n2: number = keys2.length;
    cuckooHash.cuckoo(keys2, n2);
}
