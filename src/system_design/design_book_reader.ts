/* 
Design the data structures for an online book reader system.

Since the problem doesn't describe much about the functionality, let's assume we want to design a
basic online reading system which provides the following functionality:
1. User membership creation and extension.
2. Searching the database of books.
3. Reading a book.
4. Only one active user at a time
5. Only one active book by this user.
To implement these operations we may require many other functions, like get, set, update, and
so on. The objects required would likely include User, Book, and Library.

The class OnlineReaderSystem represents the body of our program. We would implement the class
such that it stores information about all the books, deals with user management, and refreshes
the display, but that would make this class rather hefty. Instead, we've chosen to tear off these
components into Library, UserManager, and Display classes.

The decision to tear off user management, library, and display into their own classes, when this
functionality could have been in the general OnlineReaderSystem class, is an interesting one. On
a very small system, making this decision could make the system overly complex. However,
as the system grows, and more and more functionality gets added to OnlineReaderSystem, breaking
off such components prevents this main class from getting overwhelmingly lengthy

 */

export class OnlineReaderSystem {
    static activeBook: Book | null = null;
    static activeUser: User | null = null;
    display: Display;
    library: Library;
    userManager: UserManager;

    constructor() {
        this.userManager = new UserManager();
        this.library = new Library();
        this.display = new Display();
    }

    setActiveBook(book: Book): void {
        OnlineReaderSystem.activeBook = book;
        this.display.displayBook(book);
    }

    setActiveUser(user: User): void {
        OnlineReaderSystem.activeUser = user;
        this.display.displayUser(user);
    }
}

export class Library {
    books: { [id: string]: Book } = {};

    addBook(id: string, details: string): Book | null {
        if (id in this.books) {
            return null;
        }

        const book = new Book(id, details);
        this.books[id] = book;
        return book;
    }

    remove(book: Book): boolean {
        return this._remove(book.bookId);
    }

    private _remove(id: string): boolean {
        if (!(id in this.books)) {
            return false;
        }

        delete this.books[id];
        return true;
    }

    find(id: string): Book | undefined {
        return this.books[id];
    }
}

export class UserManager {
    users: { [id: string]: User } = {};

    addUser(id: string, details: string, accountType: string): User | null {
        if (id in this.users) {
            return null;
        }

        const user = new User(id, details, accountType);
        this.users[id] = user;
        return user;
    }

    remove(user: User): boolean {
        return this._remove(user.userId);
    }

    private _remove(id: string): boolean {
        if (!(id in this.users)) {
            return false;
        }

        delete this.users[id];
        return true;
    }

    find(id: string): User | undefined {
        return this.users[id];
    }
}

export class Display {
    activeBook: Book | null = null;
    activeUser: User | null = null;
    pageNumber: number = 0;

    displayUser(user: User): void {
        this.activeUser = user;
        this.refreshUsername();
    }

    displayBook(book: Book): void {
        this.pageNumber = 0;
        this.activeBook = book;
        this.refreshTitle();
        this.refreshDetails();
        this.refreshPage();
    }

    turnPageForward(): void {
        this.pageNumber += 1;
        this.refreshPage();
    }

    turnPageBackward(): void {
        this.pageNumber -= 1;
        this.refreshPage();
    }

    refreshUsername(): void {
        // Update username display
    }

    refreshTitle(): void {
        // Update title display
    }

    refreshDetails(): void {
        // Update details display
    }

    refreshPage(): void {
        // Update page display
    }
}

export class Book {
    constructor(public bookId: string, public details: string) {}
}

export class User {
    constructor(public userId: string, public details: string, public accountType: string) {}

    renewMembership(): void {
        // Renew membership logic
    }
}

if (require.main === module) {
    // Entry point for execution
}
