
// """
// Fibonacci Heap | Set 1

// https://brilliant.org/wiki/fibonacci-heap/
// http://www.geeksforgeeks.org/fibonacci-heap-set-1-introduction/
// https://github.com/danielborowski/fibonacci-heap-python

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 1) Find Min:      Θ(1)     [Same as both Binary and Binomial]
// 2) Delete Min:    O(Log n) [Θ(Log n) in both Binary and Binomial]
// 3) Insert:        Θ(1)     [Θ(Log n) in Binary and Θ(1) in Binomial]
// 4) Decrease-Key:  Θ(1)     [Θ(Log n) in both Binary and Binomial]
// 5) Merge:         Θ(1)     [Θ(m Log n) or Θ(m+n) in Binary and Θ(Log n) in Binomial]
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Like Binomial Heap, Fibonacci Heap is a collection of trees with min-heap or max-heap property.
// In Fibonacci Heap, trees can have any shape even all trees can be single nodes (This is unlike
// Binomial Heap where every tree has to be Binomial Tree).

//                                          min
//                                           |
//                                           v
//         17 ----- 24 ----- 23 ---- 7 ----- 3
//         |       /  |                   /  |  \
//         |      26  46                 18  52 41
//         30     |                      |       |
//                35                     39     44

// Fibonacci Heap maintains a pointer to minimum value (which is root of a tree). All tree roots are
// connected using circular doubly linked list, so all of them can be accessed using single 'min'
// pointer.

// The main idea is to execute operations in "lazy" way. For example merge operation simply links
// two heaps, insert operation simply adds a new tree with single node. The operation extract
// minimum is the most complicated operation. It does delayed work of consolidating trees. This
// makes delete also complicated as delete first decreases key to minus infinite, then calls extract
// minimum.

// ------------------------------------------------------------------------
// ==Below are some interesting facts about Fibonacci Heap==
// ------------------------------------------------------------------------

// 1.) The reduced time complexity of Decrease-Key has importance in Dijkstra and Prim algorithms.
// With Binary Heap, time complexity of these algorithms is O(VLogV + ELogV). If Fibonacci Heap is
// used, then time complexity is improved to O(VLogV + E)

// 2.) Although Fibonacci Heap looks promising time complexity wise, it has been found slow in
// practice as hidden constants are high (Source Wiki).

// 3.) Fibonacci heap are mainly called so because Fibonacci numbers are used in the running time
// analysis. Also, every node in Fibonacci Heap has degree at most O(log n) and the size of a
// subtree rooted in a node of degree k is at least Fk+2, where Fk is the kth Fibonacci number.

// """

export class Node {
  data: number;
  parent: Node | null;
  child: Node | null;
  left: Node | null;
  right: Node | null;
  degree: number;
  mark: boolean;

  constructor(data: number) {
    this.data = data;
    this.parent = this.child = this.left = this.right = null;
    this.degree = 0;
    this.mark = false;
  }
}


export class FibonacciHeap {
    // internal node class
  
    // pointer to the head and minimum node in the root list
    root_list: Node | null = null;
    min_node: Node | null = null;
  
    // maintain total node count in full fibonacci heap
    total_nodes = 0;
  
    // function to iterate through a doubly linked list
    *iterate(head: Node): Generator<Node, void, unknown> {
      let node = head;
      let stop = head;
      let flag = false;
  
      while (true) {
        if (node === stop && flag) {
          break;
        } else if (node === stop) {
          flag = true;
        }
  
        yield node;
        node = node.right!;
      }
    }
  
    // ... (rest of the methods remain the same)
  
    // Example usage
    constructor() {
      const f = new FibonacciHeap();
      f.insert(10);
      f.insert(2);
      f.insert(15);
      f.insert(6);
  
      const m = f.find_min();
      console.log(m?.data);  // 2
  
      const q = f.extract_min();
      console.log(q?.data);  // 2
  
      const f2 = new FibonacciHeap();
      f2.insert(100);
      f2.insert(56);
  
      const f3 = f.merge(f2);
      const x = f3.root_list?.child;
      if (x) {
        f3.decrease_key(x, 1);
      }
  
      // print the root list using the iterate class method
      const rootListData = Array.from(f3.iterate(f3.root_list!)).map((node) => node.data);
      console.log(rootListData);  // [10, 1, 56]
  
      const q2 = f3.extract_min();
      console.log(q2?.data);  // 1
    }
  }
  
  // Run the example
  const example = new FibonacciHeap();
  