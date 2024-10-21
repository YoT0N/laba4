export class Library<
    BookType extends Bookable<string>,
    UserType extends Identifiable<string, number>,
> {
    private books: BookType[] = [];
    private users: UserType[] = [];

    addBook(book: BookType): void {
        this.books.push(book);
    }

    addUser(user: UserType): void {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }

    getBooks() {
        return this.books;
    }

    find(id: number): UserType | undefined {
        return this.users.filter((x) => x.id === id)[0];
    }

    findBook(info: string): void {
        let flag = true;
        this.books.forEach((book) => {
            if (book.author === info || book.bookName === info) {
                alert(JSON.stringify(book));
                flag = false;
            }
        });
        if (flag) {
            alert("Книги з таким ім'ям чи автором не знайдено");
        }
    }

    saveToLocalStorage() {
        localStorage.clear();
        localStorage.setItem(
            'library',
            JSON.stringify({
                books: this.books,
                users: this.users,
            }),
        );
    }

    loadFromLocalStorage() {
        const savedData = localStorage.getItem('library');
        if (savedData) {
            const {books, users} = JSON.parse(savedData);
            this.books = books;
            this.users = users;
        }
    }
    clear() {
        localStorage.clear();
    }
}

export interface Identifiable<T, T1> {
    readonly name: T;
    readonly email: T;
    readonly id: T1;
    readonly borrowedBooks: number[];

    getId(): T1;

    borrow(id: T1): void;
    canBorrow(): boolean;
    return(id: number): void;
    canReturn(id: number): boolean;
}

export interface Bookable<T> {
    bookName: T;
    author: T;
    yearOfPublishing: number;
    isBorrowed: boolean;
    id: number;

    borrow(): void;
    return(): void;
}
