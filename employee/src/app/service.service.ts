import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 

  constructor(private http : HttpClient) { }

  getComments() : Observable<any> {
    return this.http.get("https://61efa7c0732d93001778e4e9.mockapi.io/employee")
  }
  delete(id: number) : Observable<any> {
    return this.http.delete("https://61efa7c0732d93001778e4e9.mockapi.io/employee/"+id)
  } 
  create(obj : object) : Observable<any> {
    return this.http.post("https://61efa7c0732d93001778e4e9.mockapi.io/employee/",obj)
  }
  createUpdate(id:number, obj : object) : Observable<any> {
    return this.http.put("https://61efa7c0732d93001778e4e9.mockapi.io/employee/"+id , obj)
  }
}
