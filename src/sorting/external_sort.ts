/* https://www.geeksforgeeks.org/external-sorting/

External Sorting

External sorting is a term for a class of sorting algorithms that can handle massive amounts of
data. External sorting is required when the data being sorted do not fit into the main memory of
a computing device (usually RAM) and instead they must reside in the slower external memory (
usually a hard drive). External sorting typically uses a hybrid sort-merge strategy. In the
sorting phase, chunks of data small enough to fit in main memory are read, sorted, and written
out to a temporary file. In the merge phase, the sorted sub-files are combined into a single
larger file.

One example of external sorting is the external merge sort algorithm, which sorts chunks that
each fit in RAM, then merges the sorted chunks together. We first divide the file into runs such
that the size of a run is small enough to fit into main memory. Then sort each run in main memory
using merge sort sorting algorithm. Finally merge the resulting runs together into successively
bigger runs, until the file is sorted.

Prerequisite for the algorithm/code:
MergeSort : Used for sort individual runs (a run is part of file that is small enough to fit in
main memory)
Merge K Sorted Arrays : Used to merge sorted runs.

Below are the steps used in Python implementation.

Inputs:
input_file  : Name of input file. input.txt
output_file : Name of output file, output.txt
run_size : Size of a run (can fit in RAM)
num_ways : Number of runs to be merged

Output:
1) Read input_file such that at most 'run_size' elements are read at a time. Do following for the
     every run read in an array.
      a) Sort the run using MergeSort.
      b) Store the sorted run in a temporary file, say 'i' for i'th run.

2) Merge the sorted files using the approach discussed here


Complexity Analysis:
--------------------
Time Complexity: O(n + run_size log run_size).
Time taken for merge sort is O(nlogn), but there are at most run_size elements. So the time complexity
is O(run_size log run_size) and then to merge the sorted arrays the time complexity is O(n). Therefore,
the overall time complexity is O(n + run_size log run_size).

Auxiliary space:O(run_size).
run_size is the space needed to store the array.
 */

import * as fs from 'fs';

export class MinHeapNode {
    element: number;
    i: number;

    constructor(element: number, i: number) {
        this.element = element;
        this.i = i;
    }

    swap(x: MinHeapNode, y: MinHeapNode): void {
        [x.element, y.element] = [y.element, x.element];
    }
}

export class MinHeap {
    harr: MinHeapNode[];
    heap_size: number;

    constructor(arr: MinHeapNode[], size: number) {
        this.harr = arr;
        this.heap_size = size;
        let i = Math.floor((this.heap_size - 1) / 2);
        while (i >= 0) {
            this.MinHeapify(i);
            i--;
        }
    }

    MinHeapify(i: number): void {
        const l = this.left(i);
        const r = this.right(i);
        let smallest = i;
        if (l < this.heap_size && this.harr[l].element < this.harr[i].element) {
            smallest = l;
        }
        if (r < this.heap_size && this.harr[r].element < this.harr[smallest].element) {
            smallest = r;
        }
        if (smallest !== i) {
            this.harr[i].swap(this.harr[smallest]);
            this.MinHeapify(smallest);
        }
    }

    left(i: number): number {
        return 2 * i + 1;
    }

    right(i: number): number {
        return 2 * i + 2;
    }

    getMin(): MinHeapNode {
        return this.harr[0];
    }

    replaceMin(x: MinHeapNode): void {
        this.harr[0] = x;
        this.MinHeapify(0);
    }
}

export class ExternalSort {
    merge_sort(arr: number[], l: number, r: number): void {
        if (l < r) {
            const m = l + Math.floor((r - l) / 2);
            this.merge_sort(arr, l, m);
            this.merge_sort(arr, m + 1, r);
            this.merge(arr, l, m, r);
        }
    }

    merge(arr: number[], l: number, m: number, r: number): void {
        const n1 = m - l + 1;
        const n2 = r - m;

        const L = Array.from({ length: n1 }, (_, i) => arr[l + i]);
        const R = Array.from({ length: n2 }, (_, j) => arr[m + 1 + j]);

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    open_file(fileName: string, mode: string): fs.ReadStream | fs.WriteStream {
        const fileStream = fs.createReadStream(fileName, { encoding: 'utf-8' });
        fileStream.on('error', () => {
            console.error(`Error while opening the file: ${fileName}`);
            process.exit(1);
        });
        return fileStream;
    }

    merge_files(output_file: string, n: number, k: number): void {
        const input_fp = Array.from({ length: k }, (_, i) => this.open_file(i.toString(), 'r'));
        const output_fp = this.open_file(output_file, 'w') as fs.WriteStream;

        const harr = Array.from({ length: k }, (_, i) => new MinHeapNode(null, i));
        let size = 0;

        for (let i = 0; i < k; i++) {
            for (const line of input_fp[i]) {
                harr[i].element = Number(line);
            }
            harr[i].i = i;
            size += 1;
        }

        const hp = new MinHeap(harr, size);

        let count = 0;

        while (count !== size) {
            const root = hp.getMin();
            output_fp.write(`${root.element} `);

            for (const line of input_fp[root.i]) {
                root.element = Number(line);
            }
            root.element = Number.MAX_SAFE_INTEGER;
            count += 1;

            hp.replaceMin(root);
        }

        input_fp.forEach(fp => fp.close());
        output_fp.close();
    }

    create_initial_runs(file_name: string, run_size: number, num_ways: number): void {
        const input_fp = this.open_file(file_name, 'r') as fs.ReadStream;
        const output_fp = Array.from({ length: num_ways }, (_, i) => this.open_file(i.toString(), 'w') as fs.WriteStream);

        const arr = Array.from({ length: run_size });
        let more_input = true;
        let next_output_file = 0;

        while (more_input) {
            for (let i = 0; i < run_size; i++) {
                arr[i] = input_fp.read();
                if (arr[i] === null) {
                    more_input = false;
                    break;
                }
            }

            this.merge_sort(arr, 0, arr.length - 1);

            for (const j of arr) {
                output_fp[next_output_file].write(`${j} `);
            }

            next_output_file += 1;
        }

        output_fp.forEach(fp => fp.close());
    }

    externalSort(input_file: string, output_file: string, num_ways: number, run_size: number): void {
        this.create_initial_runs(input_file, run_size, num_ways);
        this.merge_files(output_file, run_size, num_ways);
    }
}

if (require.main === module) {
    const num_ways = 10;
    const run_size = 1000;
    const input_file = "input.txt";
    const output_file = "output.txt";

    const fp = fs.createWriteStream(input_file, { encoding: 'utf-8' });

    for (let i = 0; i < num_ways * run_size; i++) {
        fp.write(`${Math.floor(Math.random() * 100)}\n`);
    }

    fp.close();

    const ext_sort = new ExternalSort();
    ext_sort.externalSort(input_file, output_file, num_ways, run_size);
}
