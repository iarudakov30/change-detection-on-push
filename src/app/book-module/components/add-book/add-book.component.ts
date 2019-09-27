import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddBookComponent implements OnInit {

  @Output() addBookAction: EventEmitter<any> = new EventEmitter<any>();
  addBookForm: FormGroup;

  constructor(public bookService: BookService) { }

  ngOnInit() {
    this.addBookForm = this.bookService.getBookForm();
  }

  public addBook() {
    this.addBookAction.emit(this.addBookForm.value);
    this.addBookForm.reset();
  }

}
