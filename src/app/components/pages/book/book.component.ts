import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books : any;
  searchForm!: FormGroup;
  category:any;

  constructor(private service : BookService, private router : Router) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      searchName: new FormControl()
    });

    this.service.getBooks().subscribe((res:any)=>{
      this.books = res.data;
    })

  }

  searchName(){
    this.service.getBookByName(this.searchForm.value.searchName).subscribe((res:any)=>{
      this.books = res.data;
    })
  }

  deleteBook(id:any){
    if(confirm("Comfirm Delete")){
      this.service.deleteBook(id).subscribe((res)=>{
        this.router.navigateByUrl('/',{skipLocationChange:true})
        .then(()=>{
          this.router.navigate(['/book']);
        });
      });
    }
  }

}
