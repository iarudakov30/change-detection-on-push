import { Injectable } from '@angular/core';
import { BookModel } from './book.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books$: BehaviorSubject<BookModel[]> = new BehaviorSubject<BookModel[]>(null);
  private editedBook$: BehaviorSubject<BookModel> = new BehaviorSubject<BookModel>(null);
  readonly bookForm: FormGroup;
  books: BookModel[];

  constructor(public formBuilder: FormBuilder) {
    this.books$.next([
      {
        id: 1,
        name: 'Name1',
        author: 'Author1'
      },
      {
        id: 2,
        name: 'Name2',
        author: 'Author2'
      },
      {
        id: 3,
        name: 'Name3',
        author: 'Author3'
      }
    ]);

    this.bookForm = this.formBuilder.group({
      id: new FormControl(null, null, null),
      name: new FormControl('', null, null),
      author: new FormControl('', null, null),
    });

    this.books$.subscribe((books: BookModel[]) => this.books = books);
  }

  public getBooks(): Observable<BookModel[]> {
    return this.books$.asObservable();
  }

  public addBook(book: BookModel) {
    const books = this.books$.getValue();

    let bookId = books.reduce((index, value, maxBookId) => {
      maxBookId = value.id > maxBookId ? value.id : maxBookId;
      return maxBookId;
    }, 0);

    book.id = ++bookId;
    this.books$.next([...books, book]);
  }

  public setEditedBook(book: BookModel) {
    this.editedBook$.next(book);
  }
  public saveEditedBook(updatedBook: BookModel) {
    const books = this.books$.getValue();
    const indexOfUpdated = books.findIndex(book => book.id === updatedBook.id);
    books[indexOfUpdated] = updatedBook;

    this.books$.next([...books]);

    this.setEditedBook(null);
  }

  public getEditedBook(): Observable<BookModel> {
    return this.editedBook$.asObservable();
  }

  public getBookForm() {
    return this.bookForm;
  }
}
