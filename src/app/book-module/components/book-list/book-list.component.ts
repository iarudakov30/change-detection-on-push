import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookModel } from '../../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {

  @Input() books: BookModel[];
  @Output() editBookAction: EventEmitter<BookModel> = new EventEmitter<BookModel>(null);

  constructor() { }

  ngOnInit() {
  }

  editBook(book: BookModel) {
    this.editBookAction.emit(book);
  }

}
