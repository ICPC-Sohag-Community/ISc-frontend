import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HocDashService {

  constructor(private http:HttpClient) { }
  getData(){
    let token = localStorage.getItem("JWT_TOKEN");
    let options = new HttpHeaders().set("Authorization" , "bearer " + token);
    return this.http.get("https://icpc.runasp.net/api/Head/dashboard", {headers:options})
  }
}
