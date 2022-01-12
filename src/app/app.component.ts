import { Component } from '@angular/core';
import { comments } from './class/comments';
import { freeApiService } from './service/freeApiService';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  columnDef:ColDef[] = [
    { field: 'postId'},
    { field: 'id'},
    { field: 'name'},
    { field: 'email'},
    { field: 'body'}
  ]
  lstcomments!:comments[];

  rowD = []

  constructor(private freeApiService:freeApiService) {
  }

  ngOnInit() {

    this.freeApiService.getComments()
    .subscribe
    (
      data=>{
        this.rowD = data;
      }
    );
  }
}
