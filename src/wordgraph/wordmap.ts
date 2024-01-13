import { readFileSync } from 'fs';

export class Vertex {
  private __id: string;
  private __connected_to: { [key: string]: number };
  private __color: string;
  private __predecessor: Vertex | null;
  private __distance: number;

  constructor(key: string) {
    this.__id = key;
    this.__connected_to = {};
    this.__color = "white";
    this.__predecessor = null;
    this.__distance = 0;
  }

  public get_id(): string {
    return this.__id;
  }

  public add_neighbour(nbr: Vertex, weight: number = 0): void {
    this.__connected_to[nbr.get_id()] = weight;
  }

  public toString(): string {
    return `${this.__id} connectedTo: ${Object.keys(this.__connected_to)}`;
  }

  public get_connections(): Vertex[] {
    return Object.values(this.__connected_to);
  }

  public get_weight(nbr: Vertex): number {
    return this.__connected_to[nbr.get_id()];
  }

  public get_color(): string {
    return this.__color;
  }

  public set_color(color: string): void {
    this.__color = color;
  }

  public get_predecessor(): Vertex | null {
    return this.__predecessor;
  }

  public set_predecessor(predecessor: Vertex | null): void {
    this.__predecessor = predecessor;
  }

  public get_distance(): number {
    return this.__distance;
  }

  public set_distance(distance: number): void {
    this.__distance = distance;
  }
}

export class Graph {
  private vert_list: { [key: string]: Vertex };
  private num_vertices: number;

  constructor() {
    this.vert_list = {};
    this.num_vertices = 0;
  }

  public add_vertex(key: string): void {
    this.num_vertices++;
    this.vert_list[key] = new Vertex(key);
  }

  public get_vertex(key: string): Vertex | undefined {
    return this.vert_list[key];
  }

  public add_edge(k: string, f: string, weight: number = 0): void {
    if (!this.vert_list[k]) {
      this.vert_list[k] = new Vertex(k);
    }
    if (!this.vert_list[f]) {
      this.vert_list[f] = new Vertex(f);
    }

    this.vert_list[k].add_neighbour(this.vert_list[f], weight);
  }

  public get_vertices(): Vertex[] {
    return Object.values(this.vert_list);
  }

  [Symbol.iterator](): IterableIterator<Vertex> {
    return Object.values(this.vert_list)[Symbol.iterator]();
  }

  public has_vertex(item: string): boolean {
    return item in this.vert_list;
  }
}

export class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  public is_empty(): boolean {
    return this.items.length <= 0;
  }

  public enqueue(item: T): void {
    this.items.unshift(item);
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public size(): number {
    return this.items.length;
  }
}

class WordList {
  private word_file_list: string[];
  private graph: Graph;
  private word_map: { [key: string]: string[] };

  constructor() {
    this.word_file_list = [];
    this.graph = new Graph();
    this.word_map = {};

    const wordfile = readFileSync('wordlist', 'utf-8');
    this.word_file_list = wordfile.split("\n").filter(line => line !== "").map(line => line.trim());

    this.word_mapper();
    this.build_graph();
  }

  public getGraph(): Graph {
    return this.graph;
  }

  private word_mapper(): void {
    for (const word of this.word_file_list) {
      for (let i = 0; i < word.length; i++) {
        const bucket = word.slice(0, i) + '_' + word.slice(i + 1);
        if (!this.word_map[bucket]) {
          this.word_map[bucket] = [];
        }
        this.word_map[bucket].push(word);
      }
    }
  }

  private build_graph(): void {
    for (const bucket in this.word_map) {
      if (Object.prototype.hasOwnProperty.call(this.word_map, bucket)) {
        const words = this.word_map[bucket];
        for (const word1 of words) {
          for (const word2 of words) {
            if (word1 !== word2) {
              this.graph.add_edge(word1, word2);
            }
          }
        }
      }
    }
  }

  public search(start_node: Vertex): void {
    start_node.set_distance(0);
    start_node.set_predecessor(null);
    const vert_queue = new Queue<Vertex>();
    vert_queue.enqueue(start_node);

    while (!vert_queue.is_empty()) {
      const current_vertex = vert_queue.dequeue();
      if (!current_vertex) {
        continue;
      }
      for (const nbr of current_vertex.get_connections()) {
        if (nbr.get_color() === 'white') {
          nbr.set_color('gray');
          nbr.set_distance(current_vertex.get_distance() + 1);
          nbr.set_predecessor(current_vertex);
          vert_queue.enqueue(nbr);
        }
      }
      current_vertex.set_color('black');
    }
  }

  public traverse(start_node: Vertex): string[] {
    let x: Vertex | null = start_node;
    const path: string[] = [];

    while (x && x.get_predecessor()) {
      path.push(x.get_id());
      x = x.get_predecessor();
    }
    path.push(start_node.get_id());
    path.reverse();
    return path;
  }
}


if (require.main === module) {
  if (process.argv.length === 2) {
    const [arg1, arg2] = process.argv.slice(2);
    const wordlist = new WordList();
    const source = wordlist.getGraph().get_vertex(arg1);
    const dest = wordlist.getGraph().get_vertex(arg2);

    if (source && dest) {
      wordlist.search(source);
      const shortest_path = wordlist.traverse(dest);
      console.log(shortest_path);
    } else {
      console.log("Invalid source or destination word.");
    }
  } else {
    console.log("Pass valid arguments.");
  }
}
