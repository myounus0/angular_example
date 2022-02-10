import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from './service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'designation', 'state', 'phoneNumber', 'action']
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit() {
    this.service.getComments().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(value: any) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      height: '475px',
      data: value,
    });
  }

  deleteDialog(phoneNumber: number) {
    if (confirm('Are you sure to delete??')) {
      this.service.delete(phoneNumber).subscribe(
        data => {
          this.dataSource = new MatTableDataSource<number>(data);
          this.service.getComments().subscribe(
            data => {
              this.dataSource = new MatTableDataSource<any>(data);
              this.dataSource.paginator = this.paginator;
            });
        });
    }
  }


}
export interface PeriodicElement {
  id: number;
  name: string;
  designation: string;
  state: string;
  phoneNumber: number;
}
