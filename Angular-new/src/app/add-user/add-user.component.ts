import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../home/home.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dailog: MatDialog, private service: ServiceService, private fb: FormBuilder,
    public dailogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) { }

  dataSource: any;
  createForm = this.fb.group({
    name: [''],
    phoneNumber: [''],
    address: [''],
    state: [''],
    city: [''],
  })

  ngOnInit(): void {
    this.user = this.data;
    if (this.user != 'create') {
      this.createForm.controls['name'].setValue(this.user.name);
      this.createForm.controls['phoneNumber'].setValue(this.user.phoneNumber);
      this.createForm.controls['address'].setValue(this.user.address);
      this.createForm.controls['state'].setValue(this.user.state);
      this.createForm.controls['city'].setValue(this.user.city)
    }

  }
  createUpdate(): void {
    console.log();

    const obj = {
      "name": this.createForm.controls['name'].value,
      "phoneNumber": this.createForm.controls['phoneNumber'].value,
      "address": this.createForm.controls['address'].value,
      "state": this.createForm.controls['state'].value,
      "city": this.createForm.controls['city'].value
    };
    console.log(this.user.id, obj);
    if (this.user != 'create') {
      this.service.createUpdate(this.user.id, obj).subscribe(
        data => {
          this.dataSource = new MatTableDataSource<any>(data);
        });

    }
    else {
      this.service.create(obj).subscribe(
        data => {
          this.dataSource = new MatTableDataSource<any>(data);
        });
    }
  }

  onCancel() {
    this.dailogRef.close()

  }

}
