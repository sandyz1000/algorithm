/* """
Design data structures and algorithms for in-memory file system

Design data structures and algorithms for in-memory file system

Explain the data structures and algorithms that you would use to design an in-memory file system.
Illustrate with an example in the code logic where possible.

Alternatively, we could have implemented Directory such that it contains separate lists for files
and subdirectories. This makes the nurnberOfFiles () method a bit cleaner, since it doesn't need
to use the instanceof operator, but it does prohibit us from cleanly sorting files and
directories by dates or names.

For data block allocation, we can use bitmask vector and linear search (see "Practical File
System Design") or B+ trees (see Reference or Wikipedia).


"""
 */


abstract class Entry {
    parent: Entry | null = null;
    created: number = 0;
    lastUpdated: number = 0;
    lastAccessed: number = 0;
    name: string = "";

    constructor(name: string, parent: Entry | null) {
        this.name = name;
        this.parent = parent;
        this.created = Date.now();
        this.lastUpdated = Date.now();
        this.lastAccessed = Date.now();
    }

    delete(): boolean {
        if (this.parent === null) {
            return false;
        }
        return this.parent.deleteEntry(this);
    }

    abstract size(): number;

    getCreationTime(): number {
        return this.created;
    }

    getLastUpdatedTime(): number {
        return this.lastUpdated;
    }

    getLastAccessedTime(): number {
        return this.lastAccessed;
    }

    changeName(n: string): void {
        this.name = n;
    }

    getName(): string {
        return this.name;
    }
}

export class File extends Entry {
    _size: number = 0;
    content: string | null = null;

    constructor(name: string, parent: Entry | null, sz: number) {
        super(name, parent);
        this._size = sz;
    }

    size(): number {
        return this._size;
    }

    getContents(): string | null {
        return this.content;
    }

    setContents(c: string): void {
        this.content = c;
    }
}

class Directory extends Entry {
    contents: Entry[] = [];

    constructor(name: string, parent: Entry | null) {
        super(name, parent);
    }

    size(): number {
        let size = 0;
        for (const entry of this.contents) {
            size += entry.size();
        }
        return size;
    }

    numberOfFiles(): number {
        let count = 0;
        for (const entry of this.contents) {
            if (entry instanceof Directory) {
                count += 1 + entry.numberOfFiles(); // Directory counts as a file
            } else if (entry instanceof File) {
                count += 1;
            }
        }
        return count;
    }

    deleteEntry(entry: Entry): boolean {
        const index = this.contents.indexOf(entry);
        if (index !== -1) {
            this.contents.splice(index, 1);
            return true;
        }
        return false;
    }

    addEntry(entry: Entry): void {
        this.contents.push(entry);
    }

    getContents(): Entry[] {
        return this.contents;
    }
}

if (require.main === module) {
    // Entry point for execution
}
