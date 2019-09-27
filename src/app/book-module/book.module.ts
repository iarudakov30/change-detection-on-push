import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookComponent } from './book/book.component';
import { BookRoutingModule } from './book-routing.module';
import { MatListModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AddBookComponent } from './components/add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './components/edit-book/edit-book.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookComponent,
    AddBookComponent,
    EditBookComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BookModule { }
