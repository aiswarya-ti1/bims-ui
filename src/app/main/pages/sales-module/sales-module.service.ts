import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { environment } from 'environments/environment.prod';
import { SerWorks } from './serWorks';
import { Leads } from './lead';
import { Locations } from './locations';
import { Sources } from './source';
import { SalesCustomers } from './salesCustomers';
import { Works } from '../project-module-bwo/works';








@Injectable({
    providedIn: 'root'
  })
export class SalesModuleService
{
    headers:Headers=new Headers;
    options:any;
    
    
    private API_URL= environment.API_URL;
  
     
    constructor(
        private http: HttpClient
    )
    {
    }

    getMyList(name)
    {
        console.log(name);
    return this.http.get<Works[]>(this.API_URL+"/getAllSalesWorkList/"+name).map(response=>response["0"]);
    }
    getAllList()
    {
        return this.http.get<Works[]>(this.API_URL+"/getAllSalesWorkList").map(response=>response["0"]);
    }
    getMyLeads(name)
    {
        return this.http.get<Leads[]>(this.API_URL+'/getAllLeads/'+name).map(response=>response["0"]);
    }
    getAllLeads()
    {
        return this.http.get<Leads[]>(this.API_URL+'/getFullLeads').map(response=>response["0"]);
    }
    getLocations()
  {
    console.log('get location service start');
    return this.http.get<Locations[]>(this.API_URL+'/getLocations').map(response=>response["0"]); 
  }
  addCustomer(value)
  {
    return this.http.post(this.API_URL+'/addCustomer',value,this.options);
  }
  getSource()
  {
    return this.http.get<Sources[]>(this.API_URL+'/getSources').map(response=>response["0"]); 
  }
  getAllCustomers()
  {
    return this.http.get<SalesCustomers[]>(this.API_URL+'/getAllCustomers').map(response=>response["0"]); 
  }
  getOneCustomer(id)
  {
    return this.http.get(this.API_URL+'/getOneCustomer/'+id).map(response=>response["0"]); ; 
  }
  addLead(value)
  {
    
    var data=JSON.stringify(value);
    
    return this.http.post(this.API_URL+'/addLead', data, this.options);
  }
  updateLead(value)
  {
    var data=JSON.stringify(value);
    return this.http.post(this.API_URL+'/changeLeadStatus', data, this.options);
  }
  //For wisebrix
  biws_AllLeads()
  {
    return this.http.get<Leads[]>(this.API_URL+'/biws_getAllLeads').map(response=>response["0"]);
  }
  biws_AllWorks()
  {
    return this.http.get<Works[]>(this.API_URL+'/biws_AllWorks').map(response=>response["0"]);
  }
   
}
