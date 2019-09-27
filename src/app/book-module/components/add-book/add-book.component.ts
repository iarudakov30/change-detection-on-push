import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddBookComponent implements OnInit {

  @Output() addBookAction: EventEmitter<any> = new EventEmitter<any>();
  addBookForm: FormGroup;

  constructor(public formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.createAddBookForm();
  }

  private createAddBookForm() {
    this.addBookForm = this.formBuilder.group({
      name: new FormControl('', null, null),
      author: new FormControl('', null, null),
    });
  }

  public addBook() {
    this.addBookAction.emit(this.addBookForm.value);
    this.addBookForm.reset();
  }

}
