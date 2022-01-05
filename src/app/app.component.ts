import { Component } from '@angular/core';
import { comments } from './class/comments';
import { freeApiService } from './service/freeApiService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private freeApiService:freeApiService) {
  }

  lstcomments!:comments[];

  ngOnInit() {

    this.freeApiService.getComments()
    .subscribe
    (
      data=>{
        this.lstcomments = data;
      }
    );
  }
}
