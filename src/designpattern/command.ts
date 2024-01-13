/* Command pattern:
When you wanted to execute macro operation i.e execute a set of command or maintain a history of command this pattern
help you to achieve this.
Advantages:
1. It can be used if you wanted to maintain history of command
2. When the creating of request and executing are not dependent on each other.
3. This pattern help in term of extensibility you can add new command without modifying the existing code.
 */

import * as fs from 'fs';

interface Command {
  execute(): void;
  undo(): void;
}

class TouchCommand implements Command {
  private receiver: TouchReceiver;

  constructor(receiver: TouchReceiver) {
    this.receiver = receiver;
  }

  execute(): void {
    this.receiver.createFile();
  }

  undo(): void {
    this.receiver.removeFile();
  }
}

class LSCommand implements Command {
  private receiver: LSReceiver;

  constructor(receiver: LSReceiver) {
    this.receiver = receiver;
  }

  execute(): void {
    this.receiver.showFiles();
  }

  undo(): void {
    // LSCommand does not have an undo operation
  }
}

class RmCommand implements Command {
  private receiver: RMReceiver;

  constructor(receiver: RMReceiver) {
    this.receiver = receiver;
  }

  execute(): void {
    this.receiver.deleteFile();
  }

  undo(): void {
    this.receiver.undo();
  }
}

class TouchReceiver {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  createFile(): void {
    fs.writeFileSync(this.filename, '');
  }

  removeFile(): void {
    if (fs.existsSync(this.filename)) {
      fs.unlinkSync(this.filename);
    }
  }
}

class LSReceiver {
  showFiles(): string {
    const currentDir = '/';
    const files = fs.readdirSync(currentDir).filter(filename => fs.statSync(filename).isFile());
    return files.join('');
  }
}

class RMReceiver {
  private filename: string;
  private backupName: string | null;

  constructor(filename: string) {
    this.filename = filename;
    this.backupName = null;
  }

  deleteFile(): void {
    this.backupName = `.${this.filename}`;
    fs.renameSync(this.filename, this.backupName);
  }

  undo(): void {
    if (this.backupName) {
      fs.renameSync(this.backupName, this.filename);
    }
    this.backupName = null;
  }
}

class Invoker {
  private history: Command[];
  private createFileCommands: Command[];
  private deleteFileCommands: Command[];

  constructor(createFileCommands: Command[], deleteFileCommands: Command[]) {
    this.history = [];
    this.createFileCommands = createFileCommands;
    this.deleteFileCommands = deleteFileCommands;
  }

  createFile(): void {
    for (const command of this.createFileCommands) {
      command.execute();
      this.history.push(command);
    }
  }

  deleteFile(): void {
    for (const command of this.deleteFileCommands) {
      command.execute();
      this.history.push(command);
    }
  }

  undoAll(): void {
    console.log('Undo all...');
    for (const command of this.history.reverse()) {
      command.undo();
    }
    console.log('Undo all finished.');
  }
}

// Example usage:
const filename = 'temp_file.txt';
const touchCommand = new TouchCommand(new TouchReceiver(filename));
const rmCommand = new RmCommand(new RMReceiver(filename));
const lsCommand = new LSCommand(new LSReceiver());

const invoker = new Invoker([lsCommand, touchCommand, lsCommand], [lsCommand, rmCommand, lsCommand]);
invoker.createFile();
invoker.deleteFile();
invoker.undoAll();
