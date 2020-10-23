import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { Leads } from '../sales-module/lead';
//import { Works } from './works';






@Injectable({
    providedIn: 'root'
  })
export class ProjectModuleBWOService
{
    headers:Headers=new Headers;
    options:any;
    
    
    private API_URL= "http://bims";
  
     
    constructor(
        private http: HttpClient
    )
    {
    }
   
    getOneWork(id)
    {
        return this.http.get(this.API_URL+'/getOneWork/'+id).map(response=>response["0"]);
    }

   
}
