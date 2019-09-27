import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookModel } from '../../book.model';
import { FormGroup } from '@angular/forms';
import { BookService } from '../../book.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBookComponent implements OnInit {

  @Output() saveBookAction: EventEmitter<BookModel> = new EventEmitter<BookModel>();
  book$: Observable<BookModel>;
  editBookForm: FormGroup;

  constructor(public bookService: BookService) { }

  ngOnInit() {
    this.editBookForm = this.bookService.getBookForm();
    this.book$ = this.bookService.getEditedBook().pipe(
      tap((book: BookModel) => this.editBookForm.patchValue({ ...book }))
    );
  }

  public saveBook() {
    this.saveBookAction.emit(this.editBookForm.value);
  }

}
