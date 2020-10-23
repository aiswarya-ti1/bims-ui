import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Types } from './types';
import { Locations } from '../../sales-module/locations';
import { environment } from 'environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class Register2Service {
  headers:HttpHeaders;
  options:any;
  
  private API_URL= environment.API_URL;


  constructor(
    private http: HttpClient
  ) { }

  SignUp(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/signupAssoc',data,this.options);
  }
  saveDetails(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/saveDetails',data,this.options);
  }
  getLocations()
  {
    
    return this.http.get<Locations[]>(this.API_URL+'/getLocations').map(response=>response["0"]); 
  }
  create_Token(user:any)
  {
    var userData="username="+user.username+"&password="+user.password+ "&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    console.log('UserData'+userData);
    return this.http.post(this.API_URL+'/CreateToken',userData,{headers:reqHeader});
  }
  login(user) 
  {
    var data=JSON.stringify(user);
  
    return this.http.post(this.API_URL+'/login',data,this.options);
  }
  getAssocTypes()
  {
    return this.http.get<Types[]>(this.API_URL+'/getAssocTypes').map(response=>response["0"]); 
  }
  getUserTypes(id)
  {
    return this.http.get(this.API_URL+'/getUserTypes/'+id).map(response=>response["0"]); 
  }
  saveContractorDetails(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/saveContractorDetails',data,this.options);
  }
  getPrivillageDetails(category)
  {
    return this.http.get(this.API_URL+'/getBIWSPermissions/'+category).map(response=>response["0"]);
  }
  errorHandler(error : HttpErrorResponse)
  {
    return Observable.throw(error.message || "Server Error");
    
  }
  
}
