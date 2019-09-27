import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { BookModel } from '../book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  @Input() books$: Observable<BookModel[]>;

  constructor(public bookService: BookService) { }

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
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
}
