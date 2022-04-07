import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  Baseapi="http://localhost:3000/user";
  public getuserdetail():Observable<any>
  {
    return this.http.get(`${this.Baseapi}`);
  }
  public postusetdetail(data:any):Observable<any>
  {
    return this.http.post(`${this.Baseapi}`,data)
  }
  public deleteuserdetail(id:number):Observable<any>
  {
    return this.http.delete(`${this.Baseapi}/${id}`);
  }
  public updateuserdetail(id:any,data:any):Observable<any>
  {
    return this.http.put(`${this.Baseapi}/${id}`,data)
  }
  get_id()
  {
    return sessionStorage.getItem("_id");
  }
}
