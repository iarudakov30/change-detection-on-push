import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookModel } from '../../book.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  book$: Observable<BookModel>;
  @Output() saveBookAction: EventEmitter<BookModel> = new EventEmitter<BookModel>();

  editBookForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public bookService: BookService) { }

  ngOnInit() {
    this.createAddBookForm();

    this.book$ = this.bookService.getEditedBook().pipe(
      tap((book: BookModel) => this.editBookForm.patchValue({ ...book }))
    );
  }

  private createAddBookForm() {
    this.editBookForm = this.formBuilder.group({
      id: new FormControl(null, null, null),
      name: new FormControl('', null, null),
      author: new FormControl('', null, null),
    });
  }

  public saveBook() {
    this.saveBookAction.emit(this.editBookForm.value);
  }

}
