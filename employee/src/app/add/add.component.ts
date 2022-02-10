import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../app.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  employee : any;

  constructor(public dialog : MatDialog, private service : ServiceService, private fb : FormBuilder,
    public dialogRef : MatDialogRef<AddComponent>,
    @Inject (MAT_DIALOG_DATA) public data: PeriodicElement) { }

  dataSource : any;

  createForm = this.fb.group({
    id:[''],
    name:[''],
    designation:[''],
    state:[''],
    phoneNumber:[''],
  })

  ngOnInit(): void {
    this.employee = this.data;
    if (this.employee !='create') {
      this.createForm.controls['id'].setValue(this.employee.id);
      this.createForm.controls['name'].setValue(this.employee.name);
      this.createForm.controls['designation'].setValue(this.employee.designation);
      this.createForm.controls['state'].setValue(this.employee.state);
      this.createForm.controls['phoneNumber'].setValue(this.employee.phoneNumber)
    }
  }

  createUpdate(): void {
    console.log();

    const obj = {
      "id":this.createForm.controls['id'].value,
      "name":this.createForm.controls['name'].value,
      "designation":this.createForm.controls['designation'].value,
      "state":this.createForm.controls['state'].value,
      "phoneNumber":this.createForm.controls['phoneNumber'].value
    };
    console.log(this.employee.id,obj);
    if (this.employee != 'create'){
      this.service.createUpdate(this.employee.id,obj).subscribe(
        data=>{
              this.dataSource = new MatTableDataSource<any>(data);
        });
      
    }
    else {
    this.service.create(obj).subscribe(
      data=>{
        this.dataSource = new  MatTableDataSource<any>(data);
      });
    }
   
  }

  onCancel() {
    this.dialogRef.close()
  }

}
