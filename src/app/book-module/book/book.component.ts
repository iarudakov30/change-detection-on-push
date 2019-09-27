import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Observable, ReplaySubject } from 'rxjs';
import { BookModel } from '../book.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit, OnDestroy {

  public books$: Observable<BookModel[]>;
  public lastEditedBook: BookModel = null;

  public directMutableData = {
    counter: 1
  };

  private isComponentActive$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(public bookService: BookService) { }

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
    this.getLastEditedBook();
    this.showActualBooksData();
  }

  ngOnDestroy(): void {
    this.isComponentActive$.next(false);
    this.isComponentActive$.complete();
  }

  addBook(book: BookModel) {
    this.bookService.addBook(book);
  }

  editBook(book: BookModel) {
    this.bookService.setEditedBook(book);
  }

  saveBook(book: BookModel) {
    this.bookService.saveEditedBook(book);
  }

  getLastEditedBook() {
    this.books$.pipe(takeUntil(this.isComponentActive$))
      .subscribe((books: BookModel[]) => {
        this.lastEditedBook = books[books.length - 1];
      });
  }

  showActualBooksData() {
    setTimeout(() => {
      console.log('Initial books - ', this.bookService.books);
    }, 1000);

    setTimeout(() => {
      console.log('After 10 sec - ', this.bookService.books);
    }, 10000);

    setTimeout(() => {
      console.log('After 20 sec - ', this.bookService.books);
    }, 20000);
  }

  public increaseCounter() {
    this.directMutableData.counter = this.directMutableData.counter + 1;
    console.log('directMutableData - ', this.directMutableData.counter);
  }

}
