import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  url : string = "http://localhost:3000/employee";

  //POST
  postData(data : any){
    return this.http.post<any>(this.url, data)
  }

  //GET 
  getData(){
    return this.http.get<any>(this.url)
  }

  //DELETE
  deleteData(id:any){
    return this.http.delete<any>("http://localhost:3000/employee/"+id)
  }
  //UPDATE
  updateData(employee:any, id:number){
    return this.http.put<any>("http://localhost:3000/employee/"+id, employee);
  }
 
}
