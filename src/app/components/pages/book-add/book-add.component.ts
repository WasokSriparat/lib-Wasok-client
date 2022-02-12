import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private service: BookService,private router: Router) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      bookId: new FormControl(),
      name: new FormControl(),
      author: new FormControl(),
      publicher: new FormControl(),
      price: new FormControl(),
      stdCanBorrow: new FormControl(),
      tecCanBorrow: new FormControl()
    });
  }

  addBook(){
    let book = {
      bookId:this.bookForm.value.bookId,
      name: this.bookForm.value.name,
      author: this.bookForm.value.author,
      publicher: this.bookForm.value.publicher,
      price: this.bookForm.value.price,
      stdCanBorrow: this.bookForm.value.stdCanBorrow,
      tecCanBorrow: this.bookForm.value.tecCanBorrow,
    }
    this.service.addBook(book).subscribe((res)=>{
      console.log(res);
      if(res.msg="Add a book complete."){
        window.alert("Add Complete");
        this.router.navigate(["/book"]);
      }else{
        window.alert("Add Not Complete !");
        this.router.navigate(["/book/add"]);
      }
      
    });
  }

}
