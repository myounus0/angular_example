import { Component } from '@angular/core';


export interface PeriodicElement {
  position: number;
  description: string;
  type: string;
  
}

const ELEMENT_DATA:PeriodicElement[] = [
    {position: 1001, description: 'Hydrogen', type: 'Unauthorised Leave'},
    {position: 1001, description: 'Hydrogen', type: 'Unauthorised Leave'},
    {position: 1001, description: 'Hydrogen', type: 'Unauthorised Leave'}
  ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 displayedColumns: string[] = ['position', 'description', 'type'];
 dataSource = ELEMENT_DATA;
}
