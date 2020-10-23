import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import { Leads } from '../sales-module/lead';

import { Segments } from '../project-module-bwo/segments';
import { Category } from '../project-module-bwo/category';
import { Units } from '../project-module-bwo/tabs/work-estimation/units';
import { Services } from '../profile/tabs/services/services';
import { LabEstimates } from '../project-module-bwo/labEstimate';
import { TenderDetails } from '../project-module-bwo/tabs/work-tender/tenderDetails';
import { TenderAssocs } from '../project-module-bwo/tabs/work-tender/tenderAssocs';
import { PaymentTerms } from '../project-module-bwo/tabs/work-tender/paymentTerms';
import { PaymentScheduleDetails } from '../project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { WorkScheduleDetails } from '../project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { KeyDeliverables } from '../project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { TermsAndConditions } from '../project-module-bwo/tabs/work-order-prepare/add-terms-conditions/termsAndCondition';
import { CustomerDetails } from '../project-module-bwo/tabs/work-order-prepare/customerDetails';
import { SerWorks } from '../sales-module/serWorks';
import { InitiatePayments } from '../project-module-awo/tabs/payment-initiation/initiatePayments';
import { PurchaseRequests } from '../project-module-awo/tabs/generate-pr-pma/purchaserequest';
import { Suppliers } from '../project-module-awo/tabs/generate-pr-pma/suppliers';
import { PurchaseOders } from '../project-module-awo/tabs/generate-pr-pma/purchaseOrders';
import { PaymentSupplierDetails } from '../payment/paymentSupplierDetails';
import { environment } from 'environments/environment.prod';
import { Locations } from '../sales-module/locations';
import { ReceivedPayments } from '../project-module-awo/tabs/work-summary/recievedPayments';
import { Works } from '../project-module-bwo/works';
import { LabLineItems } from '../project-module-bwo/tabs/work-estimation/labLineItem';
import { TenderKeys } from './tabs/app-work-tender/tenderKeys';
import { TenderTerms } from './tabs/app-work-tender/tenderTerms';





@Injectable({
    providedIn: 'root'
  })
export class AppProjectModuleBWOService
{
    headers:Headers=new Headers;
    options:any;
    
    private API_URL = environment.API_URL;
  
     
    constructor(
        private http: HttpClient
    )
    {
    }
    biws_AllLeads()
    {
      return this.http.get(this.API_URL+'/biws_getAllLeads').map(response=>response["0"]);
    }
    biws_getOneLead(id)
     {
      return this.http.get(this.API_URL+'/biws_getOneLead/'+id).map(response=>response["0"]);
     }
     biws_addWork(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/biws_addWork",info,this.options);
     }
     biws_getTerms(id)
     {
      return this.http.get(this.API_URL+'/biws_getTerms/'+id).map(response=>response["0"]);
     }
     biws_getAllLineItems(id)
     {
      return this.http.get(this.API_URL+'/biws_getAllLineItems/'+id).map(response=>response["0"]);
     }
     biws_addLineItemLab( id, values, type, flag)
     {
     
      var items =[];
        var workID=id;
        for(let v of values)
        {
          var newItem={name :v['LineItem_ID']};
          items.push(newItem);
        }
        
       
        
        var data = {param1:workID,param2 :items, param3:type, param4 :flag };
      return this.http.post(this.API_URL+"/biws_addLabLineItem",data,this.options);
     }
     biws_getOneWork(id)
     {
      return this.http.get<SerWorks[]>(this.API_URL+'/biws_getOneWork/'+id).map(response=>response["0"]);
     }
     biws_finishEstimate(id)
     {
      return this.http.get(this.API_URL+'/biws_changeStatusEst/'+id).map(response=>response["0"]);
     }
     biws_saveTenderKeys(id, values, type, tid)
  {
    var items =[];
    var workID=id;
    for(let v of values)
    {
      var newItem={name :v.value};
      items.push(newItem);
    }
    
   
    
    var data = {param1:workID,param2 :items, param3 :type, param4 : tid};
    
  
    console.log(data);
    return this.http.post(this.API_URL+"/biws_saveTenderKeys",data,this.options);
  }
  biws_saveAssocList(id,values, type)
  {
    var items =[];
    
    var workID=id;
    for(let v of values)
    {
      var newItem={name :v['Assoc_ID']};
      items.push(newItem);
    }
    console.log(type);
    
   
    
    var info = {param1:workID,param2 :items, param3 : type};
    
    
return this.http.post(this.API_URL+'/biws_saveAssocList', info, this.options);
  }
  biws_getOnlineAssocs()
  {
    return this.http.get(this.API_URL+'/biws_getOnlineAssocs').map(response=>response["0"]);
  }   
  biws_getWorkLineItems(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/biws_getWorkLineItems/'+id).map(response=>response["0"]);
  }
  biws_getAllOfflineTenders(id)
  {
    return this.http.get<TenderDetails[]>(this.API_URL+'/biws_getAllOfflineTenders/'+id).map(response=>response["0"]);
  }
  biws_chkTenderKeysExists(id)
  {
    return this.http.get(this.API_URL+'/biws_chkKeysExists/'+id).map(response=>response["0"]);
  }
  biws_checkTermsExists(id)
  {
    return this.http.get(this.API_URL+'/biws_checkTermsExists/'+id).map(response=>response["0"]);
  }
     
  biws_getKeyDeliverables(id)
  {
    return this.http.get(this.API_URL+'/biws_getKeyDeliverables/'+id).map(response=>response["0"]);
  }
  biws_updateSiteAnalysisDate(values)
  {
    var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/biws_updateSiteAnalysisDate",info,this.options);
  }
  biws_chkSiteAnalysis(id)
  {
    return this.http.get(this.API_URL+'/biws_chkSiteAnalysis/'+id).map(response=>response["0"]);
  }
  changeCustStatus(id, type)
  {
    var data = {param1:id,param2 :type};
    
    console.log(data);
return this.http.post(this.API_URL+'/changeCustStatus', data, this.options);
  }
  biws_getOnlineWorks()
  {
    return this.http.get<SerWorks[]>(this.API_URL+'/biws_AllWorks').map(response=>response["0"]);
  }
  biws_chkOffTenderExists(id)
  {
    return this.http.get(this.API_URL+'/biws_chkOffTenderExists/'+id).map(response=>response["0"]);
  }
  biws_chkOnTenderExists(id)
  {
    return this.http.get(this.API_URL+'/biws_chkOnTenderExists/'+id).map(response=>response["0"]);
  }
  biws_getAllOfflineAssocs(id)
  {
    return this.http.get<TenderAssocs[]>(this.API_URL+'/biws_getAllOfflineAssocs/'+id).map(response=>response["0"]);
  }
  getAllTenderKeys(id)
  {
    return this.http.get<TenderKeys[]>(this.API_URL+'/getAllTenderKeys/'+id).map(response=>response["0"]);
  }
  getAllTenderTerms(id)
  {
    return this.http.get<TenderTerms[]>(this.API_URL+'/getAllTenderTerms/'+id).map(response=>response["0"]);
  }
  saveWorkDays(values)
  {
    var info=JSON.stringify(values);
    return this.http.post(this.API_URL+"/biws_saveWorkDays",info,this.options);
  }
  biws_saveTenderLabDetails(values)
  {
    var info=JSON.stringify(values);
      return this.http.post(this.API_URL+'/biws_saveTenderLabDetails',info, this.options);
  }
  biws_saveCustKeys(values)
  {
    var info=JSON.stringify(values);
    return this.http.post(this.API_URL+'/biws_saveCustKeys',info, this.options);
  }
  biws_delInTenderKeys(kid, tid)
  {
    var data = {param1:kid,param2 :tid};
    
    console.log(data);
return this.http.post(this.API_URL+'/biws_delInTenderKeys', data, this.options);
  }
  biws_saveTenderTerms(id, values, type, tid)
  {
    
      var items =[];
      var workID=id;
      for(let v of values)
      {
        var newItem={name :v.value};
        items.push(newItem);
      }
      
     
      
      var data = {param1:workID,param2 :items, param3 :type, param4 : tid};
      
    
      console.log(data);
      return this.http.post(this.API_URL+"/biws_saveTenderTerms",data,this.options);
    
  }
  biws_saveCustTerms(values)
  {
    var info=JSON.stringify(values);
    return this.http.post(this.API_URL+'/biws_saveCustTerms',info, this.options);
  }
  biws_delInTenderTerm(termid, tid)
  {
    var data = {param1:termid,param2 :tid};
    
    console.log(data);
return this.http.post(this.API_URL+'/biws_delInTenderTerm', data, this.options);
  }
  biws_getTenderPayTerm(tid)
  {
    return this.http.get(this.API_URL+'/biws_getTenderPayTerm/'+tid).map(response=>response["0"]);
  }
  biws_finishTender(tid)
  {
    var data = {param1:tid};
    return this.http.post(this.API_URL+'/biws_finishTender', data, this.options);
  }
  getAllOnlineTenders(id)
  {
    return this.http.get<TenderDetails[]>(this.API_URL+'/biws_getAllOnlineTenders/'+id).map(response=>response["0"]);
  }
  getAllOnlineAssocs(id)
  {
    return this.http.get<TenderAssocs[]>(this.API_URL+'/biws_getAllOnlineAssocs/'+id).map(response=>response["0"]);
  }
  getAllTenderList(id)
  {
    return this.http.get<TenderAssocs[]>(this.API_URL+'/biws_getAllTenderList/'+id).map(response=>response["0"]);
  }
  chkFinishTenderExists(id)
  {
    return this.http.get(this.API_URL+'/biws_chkFinishTenderExists/'+id).map(response=>response["0"]); 
  }
  editTender(tid)
  {
    var data = {param1:tid};
    return this.http.post(this.API_URL+'/biws_editTender', data, this.options);
  }
  deleteTender(tid)
  {
    var data = {param1:tid};
    return this.http.post(this.API_URL+'/biws_deleteTender', data, this.options);
  }
  biws_pushTenderToCust(wid, values)
  {
    var items =[];
    
    var workID=wid;
    for(let v of values)
    {
      var newItem={name :v['Assoc_ID']};
      items.push(newItem);
    }
    
    
   
    
    var info = {param1:workID,param2 :items};
    
    
return this.http.post(this.API_URL+'/biws_pushTenderToCust', info, this.options);
  }
  biws_finishWO(id)
  {
    var data = {param1:id};
    return this.http.post(this.API_URL+'/biws_finishWO',data,this.options);
  }
}
