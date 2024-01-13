
/* Design data structures and algorithms for in-memory file system
https://github.com/kamyu104/LeetCode/blob/master/Python/design-in-memory-file-system.py

Explain the data structures and algorithms that you would use to design an in-memory file system.
Illustrate with an example in the code logic where possible.

Time:   ls: O(l + klogk), l is the path length, k is the number of entries in the last level
        directory by sorting those files.
        mkdir: O(l)
        addContentToFile: O(l + c), c is the content size
        readContentFromFile: O(l + c)

Space:  O(n + s), n is the number of dir/file nodes, s is the total content size.

Design an in-memory file system to simulate the following functions:

ls: Given a path in string format. If it is a file path, return a list that only contains this
    file's name.
    If it is a directory path, return the list of file and directory names in this directory.
    Your output (file and directory names together) should in lexicographic order.

mkdir: Given a directory path that does not exist, you should make a new directory according
    to the path.
    If the middle directories in the path don't exist either, you should create them as well.
    This function has void return type.

addContentToFile: Given a file path and file content in string format.
                  If the file doesn't exist, you need to create that file containing given content.
                  If the file already exists, you need to append given content to original content.
                  This function has void return type.

readContentFromFile: Given a file path, return its content in string format.

Example:
Input:
["FileSystem","ls","mkdir","addContentToFile","ls","readContentFromFile"]
[[],["/"],["/a/b/c"],["/a/b/c/d","hello"],["/"],["/a/b/c/d"]]
Output:
[null,[],null,null,["a"],"hello"]

Note:
1.  You can assume all file or directory paths are absolute paths which begin with / and do not
 end with / except that the path is just "/".
2.  You can assume that all operations will be passed valid parameters and users will not attempt
 to retrieve file content or list a directory or file that does not exist.
3.  You can assume that all directory names and file names only contain lower-case letters, and
 same names won't exist in the same directory. */



class TrieNode {
  isFile: boolean = false;
  children: { [key: string]: TrieNode } = {};
  content: string = "";
}

export class FileSystem {
  root: TrieNode = new TrieNode();

  ls(path: string): string[] {
    const curr = this.getNode(path);

    if (curr.isFile) {
      return [this.split(path, '/').pop() || ""];
    }

    return Object.keys(curr.children).sort();
  }

  mkdir(path: string): void {
    const curr = this.putNode(path);
    curr.isFile = false;
  }

  addContentToFile(filePath: string, content: string): void {
    const curr = this.putNode(filePath);
    curr.isFile = true;
    curr.content += content;
  }

  readContentFromFile(filePath: string): string {
    return this.getNode(filePath).content;
  }

  private getNode(path: string): TrieNode {
    let curr = this.root;
    for (const s of this.split(path, '/')) {
      curr = curr.children[s];
    }
    return curr;
  }

  private putNode(path: string): TrieNode {
    let curr = this.root;
    for (const s of this.split(path, '/')) {
      if (!curr.children[s]) {
        curr.children[s] = new TrieNode();
      }
      curr = curr.children[s];
    }
    return curr;
  }

  private split(path: string, delim: string): string[] {
    if (path === '/') {
      return [];
    }
    return path.split('/').slice(1);
  }
}

if (require.main === module) {

  // Your FileSystem object will be instantiated and called as such:
  const obj = new FileSystem();
  const path = "/";
  obj.mkdir("/a/b/c");
  obj.mkdir("/d/c");
  obj.mkdir("/e/c");
  const param1 = obj.ls(path);
  obj.addContentToFile("/a/b/c/d", "hello");
  const param4 = obj.readContentFromFile("/a/b/c/d");

  console.log(param1);
  console.log(param4);
}
