import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phoneNumber', 'address', 'state', 'city', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: ServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.service.getcomments().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(value: any): void {

    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      height: '500px',
      data: value,

    }).afterClosed()
      .subscribe(() => this.refreshParent());
  }

  refreshParent() {
    this.router.navigateByUrl('/home');
  }
  deleteDialog(phoneNumber: number) {
    if (confirm('Are you sure to delete??')) {
      this.service.delete(phoneNumber).subscribe(
        data => {
          this.dataSource = new MatTableDataSource<number>(data);
          this.service.getcomments().subscribe(
            data => {
              this.dataSource = new MatTableDataSource<any>(data);
              this.dataSource.paginator = this.paginator;
            });
         });
    }
  }
}

export interface PeriodicElement {
  name: string;
  phoneNumber: number;
  address: string;
  state: string;
  city: string;
}
