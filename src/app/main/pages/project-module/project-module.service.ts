import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
import { ProductGroups } from '../associates/tabs/mat-assoc-list/productGroups';
import { ProductSegments } from '../associates/tabs/mat-assoc-list/productSegments';
import { Associates } from '../certification/tabs/cert-assoc-list/associates';








@Injectable({
    providedIn: 'root'
  })
export class ProjectModuleService
{
    headers:HttpHeaders;
    options:any;
    
    
    //private API_URL= "http://bims";
    private API_URL = environment.API_URL;
  
     
    constructor(
        private http: HttpClient
    )
    {
    }
    getToken()
  {
    return localStorage.getItem('Token');
  }
    addWork(value)
    {
        var data=JSON.stringify(value);
    
    return this.http.post(this.API_URL+'/saveWorkSales', data, this.options);
    }
    getLeads()
    {
        return this.http.get<Leads[]>(this.API_URL+'/getFullLeads').map(response=>response["0"]).catch(this.errorHandler);
    }
    getOneWork(id)
    {
        return this.http.get<SerWorks[]>(this.API_URL+'/getOneWork/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    getServiceList(id)
  {
    return this.http.get(this.API_URL+'/getServiceList/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getSegments()
  {
    return this.http.get<Segments[]>(this.API_URL+'/getSegments').map(response=>response["0"]).catch(this.errorHandler);
   }
  getCategory(id)
  {
    var data=JSON.stringify(id);
     return this.http.post<Category[]>(this.API_URL+'/getSegCategories',id).map(response=>response["0"]).catch(this.errorHandler);
  }
  updateWork(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/updatePMQAWork',data,this.options).catch(this.errorHandler);
  }
  getLineItems(ids)
  {
var id=JSON.stringify(ids);
    return this.http.get(this.API_URL+'/getAllLineItems/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  chkLineItemsExists(id)
  {
    return this.http.get(this.API_URL+'/chkLineItemsExists/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getUnits()
  {
    return this.http.get<Units[]>(this.API_URL+'/getUnits').map(response=>response["0"]).catch(this.errorHandler);
  }
  getAllLineItems(id)
  {
    console.log(id);
    return this.http.get(this.API_URL+'/getAllLineItems/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  addLineItemLab(id, values, type, flag)
  {
   // debugger;
  var items =[];
    var workID=id;
    for(let v of values)
    {
      var newItem={name :v['LineItem_ID']};
      items.push(newItem);
    }
    
   
    
    var data = {param1:workID,param2 :items, param3:type, param4 :flag };
    
  
    console.log(data);
    return this.http.post(this.API_URL+"/addLabLineItem",data,this.options).catch(this.errorHandler);
  }
  saveCustLabItems(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+"/saveCustLabItems",data,this.options).catch(this.errorHandler);
  }
  getWorkServices(id)
  {
    return this.http.get<Services[]>(this.API_URL+'/getWorkServices/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getWorkLineItems(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAllLabEst/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAllWorkLineItems(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAllWorkLineItems/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getWorkLineItemsCount($id)
  {
    return this.http.get(this.API_URL+'/getWorkItemsCount/'+$id).map(response => response["0"]).catch(this.errorHandler);
  }
  getLineItemName(id)
  {
    return this.http.get(this.API_URL+"/getLineItemName/"+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  removeLabItem(id)
  {
    return this.http.get(this.API_URL+"/removeLabItem/"+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  saveLabourDetails(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+"/saveLabDetails",data,this.options).catch(this.errorHandler);
  }
  finishEstimate(id)
  {
    return this.http.get(this.API_URL+'/changeStatusEst/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getCertifyAssocList(id)
  {
return this.http.get(this.API_URL+'/getCertifyAssocList/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getServiceAssocs(id)
  {
    return this.http.get(this.API_URL+'/getServiceAssociates/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
getAssocList()
  {
return this.http.get(this.API_URL+'/getAssocList').map(response=>response["0"]).catch(this.errorHandler);
  }
  getServiceIDs(id)
  {
    return this.http.get(this.API_URL+'/getServiceIDs/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  saveAssocList(id, values)
  {
    var items =[];
    var workID=id;
    for(let v of values)
    {
      var newItem={name :v['Assoc_ID']};
      items.push(newItem);
    }
    
   
    
    var data = {param1:workID,param2 :items};
    
    console.log(data);
return this.http.post(this.API_URL+'/saveAssocList', data, this.options).catch(this.errorHandler);
  }
   postFile(selectedFile: File, value, id)
   {
    //const endpoint = 'assets/uploads';
    const formData: FormData = new FormData();
    formData.append('fileKey', selectedFile, selectedFile.name);
    formData.append('workid', value);
    formData.append('id',id);
    return this.http.post(this.API_URL+'/design_upload', formData,this.options).catch(this.errorHandler);
  }
  getDesignCount(id)
  {
    return this.http.get(this.API_URL+'/designExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getSelectedAssocs(id)
  {
    return this.http.get(this.API_URL+'/getTenderAssocs/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  checkAssocSelected(id)
  {
    return this.http.get(this.API_URL+'/checkAssocSelected/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getLinItemID(id)
  {
    return this.http.get(this.API_URL+'/getLineItemID/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  addTenderLab(values, id)
  {
    var items =[];
    var workTID=id;
    for(let v of values)
    {
      var newItem={name :v['LineItem_ID'], qty: v['Quantity'], comment:v['Comments'], priority:v['Priority']};
      items.push(newItem);
    }
    
   
    
    var data = {param1:workTID,param2 :items};
    
    console.log(data);
return this.http.post(this.API_URL+'/addTenderLabItems', data, this.options).catch(this.errorHandler);
  }
  getallLabTender(tid)
  {
    
    return this.http.get<TenderDetails[]>(this.API_URL+'/getTenderDetails/'+tid).map(response=>response["0"]).catch(this.errorHandler);
  }
  getCountItemsLabTender(id)
  {
    console.log(id);
    return this.http.get(this.API_URL+'/getCountItemsLabTender/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getCountFlagsLabTender(id)
    {
      console.log(id);
      return this.http.get(this.API_URL+'/getCountFlagsLabTender/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    removeAssoc(id)
  {
    return this.http.get(this.API_URL+'/removeAssocName/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  saveTenderLabDetails(values)
    {
      console.log(values);
      return this.http.post(this.API_URL+'/saveTenderLabDetails',values, this.options);
    }
    getAssocName(id)
    {
      return this.http.get(this.API_URL+'/getAssocName/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    getAssocTenderDetails(id)
  {
    return this.http.get(this.API_URL+'/getAssocTenderDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getTenderedAssocs(id)
  {
    return this.http.get<TenderAssocs[]>(this.API_URL+'/getTenderedAssocs/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  initiateWO(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+"/initiateWO",data,this.options);
  }
  getAssocTender(value)
    {
      return this.http.get<TenderDetails[]>(this.API_URL+'/getAssocTender/'+value).map(response=>response["0"]).catch(this.errorHandler);
    }
    getFinalTender(id)
    {
      return this.http.get<TenderDetails[]>(this.API_URL+'/getFinalTender/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    getFinalTenderAssoc(id)
    {
      return this.http.get<TenderAssocs[]>(this.API_URL+'/getFinalTenderAssoc/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    addPaymentTerms(values)
    {
      return this.http.post(this.API_URL+'/addPaymentTerms', values);
    }
    getPaymentTerms(id)
    {
      return this.http.get(this.API_URL+'/getPaymentTerms/'+id).map(response=>response["0"]);
    }
    checkPaymentTermsExists(id)
    {
      return this.http.get(this.API_URL+'/checkPaymentTermsExists/'+id).map(response=>response["0"]).catch(this.errorHandler);

    }
    chkAmendLineItemsExists(id,no)
    {
      return this.http.get(this.API_URL+'/chkAmendLineItemsExists/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
    }
    chkWorkSchedExists(id)
    {
      return this.http.get(this.API_URL+'/chkWorkSchedExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    chkAmendWorkSchedExists(id,no)
    {
      return this.http.get(this.API_URL+'/chkAmendWorkSchedExists/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
    }
    chkAmendPaySchedExists(id,no)
    {
      return this.http.get(this.API_URL+'/chkAmendPaySchedExists/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
    }
    chkAmendKeysExists(id,no)
    {
      return this.http.get(this.API_URL+'/chkAmendKeysExists/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
    }
    checkAmendTermsExists(id,no)
    {
      return this.http.get(this.API_URL+'/checkAmendTermsExists/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
    }

    chkPaySchedExists(id)
    {
      return this.http.get(this.API_URL+'/chkPaySchedExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    getPaySchedule(id)
    {
      return this.http.get<PaymentScheduleDetails[]>(this.API_URL+'/getPaySchedule/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    getPrintPaySchedule(id,no)
    {
      return this.http.get<PaymentScheduleDetails[]>(this.API_URL+'/getPrintPaySchedule/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
    }
    getWorkSchedule(id)
  {
    
    return this.http.get<WorkScheduleDetails[]>(this.API_URL+'/getWorkSchedule/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getViewWorkSchedule(id, view)
  {
    return this.http.get<WorkScheduleDetails[]>(this.API_URL+'/getViewWorkSchedule/'+id+'/'+view).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getOneWorkSchedDetails(id)
  {
    return this.http.get<WorkScheduleDetails[]>(this.API_URL+'/getOneWorkSchedDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getOnePaySchedDetails(id)
  {
    return this.http.get<PaymentScheduleDetails[]>(this.API_URL+'/getOnePaySchedDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getKeys(id)
  {
    //console.log(id);
    return this.http.get<KeyDeliverables[]>(this.API_URL+'/getKeys/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  chkKeyDeliExists(id)
  {
    return this.http.get(this.API_URL+'/chkKeyDeliExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
  } 
saveKeys(id, values, type, amend)
  {
    var items =[];
    var workID=id;
    for(let v of values)
    {
      var newItem={name :v.value};
      items.push(newItem);
    }
    
   
    
    var data = {param1:workID,param2 :items, param3 :type, param4 : amend};
    
  
    console.log(data);
    return this.http.post(this.API_URL+"/saveKeys",data,this.options).catch(this.errorHandler);
  }
  saveTerms(id, values, type, amend)
  {
    var items =[];
    var workID=id;
    for(let v of values)
    {
      var newItem={name :v.value};
      items.push(newItem);
    }
    
   
    
    var data = {param1:workID,param2 :items, param3 :type, param4 : amend};
    
  
    console.log(data);
    return this.http.post(this.API_URL+"/saveTerms",data,this.options).catch(this.errorHandler);
  }
  getKeyDeliverables(id)
  {
    return this.http.get<KeyDeliverables[]>(this.API_URL+'/getWOKeys/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  saveCustKeys(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/saveCustKeys',data,this.options).catch(this.errorHandler);
  }
  chkKeysExists(id)
  {
    return this.http.get(this.API_URL+'/chkKeysExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getTermsCondition(id)
  {
    return this.http.get<TermsAndConditions[]>(this.API_URL+'/getTermsConditions/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getTermsConditionWO(id)
  {
    return this.http.get<TermsAndConditions[]>(this.API_URL+'/getTermsConditionWO/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  checkTermsExists(id)
  {
    return this.http.get(this.API_URL+'/checkTermsExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getTerms()
    {
      return this.http.get(this.API_URL+'/getTerms').map(response=>response["0"]).catch(this.errorHandler);
    }
    saveCustTerms(values)
    {
      var data=JSON.stringify(values);
      return this.http.post(this.API_URL+'/saveCustTerms',data,this.options).catch(this.errorHandler);
    }
    saveWorkSchedule(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/saveWorkSchedule',data,this.options);
  }
  editWorkSchDetails(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/editWorkSchDetails',data,this.options).catch(this.errorHandler);
  }
  editPaySchDetails(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/editPaySchDetails',data,this.options).catch(this.errorHandler);
  }
  savePaymentDetails(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/savePaymentSchedule',data,this.options).catch(this.errorHandler);
  }
  deleteWorkSch(values)
  {
      var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/deleteWorkSch',data,this.options).catch(this.errorHandler);
  }
  finishWO(id)
  {
    var data = {param1:id};
    return this.http.post(this.API_URL+'/woSignUp',data,this.options).catch(this.errorHandler);
  }
  updateWOIssueDate(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/updateWOIssueDate',data,this.options).catch(this.errorHandler);
  }
  getIssueDate(id)
  {
    return this.http.get(this.API_URL+'/getIssueDate/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  woSignedUp(id)
  {
    var data = {param1:id};
    return this.http.post(this.API_URL+'/woSignedUp',data,this.options).catch(this.errorHandler);
  }
  getCustomerDetails(id)
  {
    return this.http.get<CustomerDetails[]>(this.API_URL+'/getCustomerDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getCustomer(id)
  {
    return this.http.get<CustomerDetails[]>(this.API_URL+'/getCustomer/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
 
  deletePaySch(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/deletePaySched',data,this.options).catch(this.errorHandler);
  }
  workStart(value)
  {
    var data=JSON.stringify(value);
    return this.http.post(this.API_URL+'/workStart', data, this.options).catch(this.errorHandler);
  }
  saveWorkDate(values)
  {
    //var data=JSON.stringify(datas);
    var value=JSON.stringify(values);
 
  //var param_data = {param1:data,param2 :value};
    return this.http.post(this.API_URL+'/saveWorkDate', value, this.options).catch(this.errorHandler);
  }

  savePayDate(datas, values)
  {
    var data=JSON.stringify(datas);
    var value=JSON.stringify(values);
 
  var param_data = {param1:data,param2 :value};
    return this.http.post(this.API_URL+'/savePayDate', param_data, this.options).catch(this.errorHandler);
  }
  getTotalAmendItems(id, no)
  {
    return this.http.get(this.API_URL+'/getTotalAmendItems/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getTotalAmendedItems(id, no)
  {
    return this.http.get(this.API_URL+'/getTotalAmendedItems/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getTotalAmend1Items(id, no)
  {
    return this.http.get(this.API_URL+'/getTotalAmend1Items/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getTotalAmend2Items(id, no)
  {
    return this.http.get(this.API_URL+'/getTotalAmend2Items/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getTotalAmend3Items(id, no)
  {
    return this.http.get(this.API_URL+'/getTotalAmend3Items/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendWorkSchedule(id, no)
  {
    return this.http.get<WorkScheduleDetails[]>(this.API_URL+'/getAmendWorkSchedule/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendPaySchedule(id, no)
  {
    return this.http.get<PaymentScheduleDetails[]>(this.API_URL+'/getAmendPaySchedule/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendKeyDeliverables(id,no)
  {
    return this.http.get<KeyDeliverables[]>(this.API_URL+'/getAmendKeyDeliverables/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendTerms(id,no)
  {
    return this.http.get<TermsAndConditions[]>(this.API_URL+'/getAmendTerms/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendedWorkSchedule(id, no)
  {
    return this.http.get<WorkScheduleDetails[]>(this.API_URL+'/getAmendedWorkSchedule/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendedPaySchedule(id, no)
  {
    return this.http.get<PaymentScheduleDetails[]>(this.API_URL+'/getAmendedPaySchedule/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendedKeyDeliverables(id,no)
  {
    return this.http.get<KeyDeliverables[]>(this.API_URL+'/getAmendedKeyDeliverables/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendedTerms(id,no)
  {
    return this.http.get<TermsAndConditions[]>(this.API_URL+'/getAmendedTerms/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  updateAmendIssueDate(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/updateAmendIssueDate',data,this.options).catch(this.errorHandler);
  }
  updateRemeasureIssueDate(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/updateRemeasureIssueDate',data,this.options).catch(this.errorHandler);
  }
  getAmendLineItems(id,type)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAmendLineItems/'+id+'/'+type).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendedLineItems(id,type)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAmendedLineItems/'+id+'/'+type).map(response=>response["0"]).catch(this.errorHandler); 
  }
  
  getAmended1LineItems(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAmended1LineItems/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmended2LineItems(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAmended2LineItems/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmended3LineItems(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAmended3LineItems/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getGrandTotal(id)
  {
    return this.http.get(this.API_URL+'/getGrandTotal/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getTenderTotal(id)
  {
    return this.http.get(this.API_URL+'/getTenderQuote/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  finishAmend(wid, aid)
  {
    /*var data=JSON.stringify(values);
    console.log(data);
    return this.http.post(this.API_URL+'/finishAmend',data,this.options);*/
    return this.http.get(this.API_URL+'/finishAmendment/'+wid+'/'+aid).map(response=>response["0"]).catch(this.errorHandler);

  }
   getFinalLabTenderDetails(id)
    {
      console.log(id);
      return this.http.get<TenderDetails[]>(this.API_URL+'/getFinalLabTenderDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
    }
    saveReMeasureDetails(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/saveReMeasureDetails',data,this.options);
  }
  getTenderItemDetails(id)
  {
return this.http.get<TenderDetails[]>(this.API_URL+'/getTenderItemDetails/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getReMeasuredTenderDetails(id)
  {
    return this.http.get<TenderDetails[]>(this.API_URL+'/getReMeasuredTenderDetails/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getReMeasuredAmendDetails(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getReMeasuredAmendDetails/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  finishReMeasure(id,no)
  {
   /* var workid=JSON.stringify(id);
    var type=JSON.stringify(no);
 
  var param_data = {param1:workid,param2 :type};*/
   
    return this.http.get(this.API_URL+'/finishReMeasure/'+id+'/'+no).catch(this.errorHandler); 
  }
  getReMeasureSummary(id,no)
  {
    return this.http.get(this.API_URL+'/getReMeasureSummary/'+id+'/'+no).catch(this.errorHandler); 
  }
  initiatePayment(values)
  {
    var data=JSON.stringify(values); 
    return this.http.post(this.API_URL+'/initiatePayment', data, this.options).catch(this.errorHandler);
  }
  getInitiatePayDetails(id)
  {
    return this.http.get<InitiatePayments[]>(this.API_URL+'/getInitiatePayDetails/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getOneInitiatePay(id)
  {
    return this.http.get<InitiatePayments[]>(this.API_URL+'/getOneInitiatePay/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  savePRItemDetails(values)
  {
    var data=JSON.stringify(values);
   
    return this.http.post(this.API_URL+'/savePRItemDetails', data, this.options).catch(this.errorHandler);
  }
  getPRCount(id)
  {
return this.http.get(this.API_URL+'/getPRCount/'+id).map(response=>response["0"]).catch(this.errorHandler);

  }
  getPRDetails(id)
  {
    return this.http.get<PurchaseRequests[]>(this.API_URL+'/getPRDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getBIPRDetails()
  {
    return this.http.get<PurchaseRequests[]>(this.API_URL+'/getBIPRDetails').map(response=>response["0"]).catch(this.errorHandler);
  }
  getPRDetailsForPO()
  {
    return this.http.get<PurchaseRequests[]>(this.API_URL+'/getPRDetailsForPO').map(response=>response["0"]).catch(this.errorHandler);
  }
  getPRDetailsForGoods(id)
  {
    return this.http.get<PurchaseRequests[]>(this.API_URL+'/getPRDetailsForGoods/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }

  getSuppliers()
  {
    return this.http.get<Suppliers[]>(this.API_URL+'/getSuppliers').map(response=>response["0"]).catch(this.errorHandler);
  }
  savePO(values, items)
  {
    var data=JSON.stringify(values);
    var value=JSON.stringify(items);
 
  var param_data = {param1:data,param2 :value};
    return this.http.post(this.API_URL+'/savePO', param_data, this.options).catch(this.errorHandler);
  }
  addSupplier(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/addSupplier', data, this.options).catch(this.errorHandler);
  }
  updateGoodsDate(values)
  {
    var data=JSON.stringify(values); 
    return this.http.post(this.API_URL+'/updateGoodsDate', data, this.options).catch(this.errorHandler);
  }
  getItemDetails(id)
  {
    return this.http.get<PurchaseRequests[]>(this.API_URL+'/getItemDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getServiceNames(id)
  {
    return this.http.get<Services[]>(this.API_URL+'/getServiceNames/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
 
  editPRItemDetails(values)
  {
    var data=JSON.stringify(values); 
    return this.http.post(this.API_URL+'/editPRItemDetails', data, this.options).catch(this.errorHandler);
  }
  deletePR(id)
  {
    return this.http.get(this.API_URL+'/deletePR/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getOnePRDetailsForPO(id)
  {
    return this.http.get<PurchaseRequests[]>(this.API_URL+'/getOnePRDetailsForPO/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getWorkPOList(id)
  {
    return this.http.get<PurchaseOders[]>(this.API_URL+'/getWorkPOList/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getPOItemList(id)
  {
    return this.http.get<PurchaseRequests[]>(this.API_URL+'/getPOItemList/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAllInitiatePayDetails()
{
  return this.http.get<InitiatePayments[]>(this.API_URL+'/getAllInitiatePayDetails').map(response=>response["0"]).catch(this.errorHandler);
}
updateMFee(values)
{
  var data=JSON.stringify(values);
    
  return this.http.post(this.API_URL+'/updateMFee', data, this.options).catch(this.errorHandler);
}
approvePay(id)
{
  return this.http.post(this.API_URL+'/approveInitPay', id, this.options).catch(this.errorHandler);
}
getOneContractorInitPayDetails(id)
{
  return this.http.get<InitiatePayments[]>(this.API_URL+'/getOneContractorInitPayDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
updateContractorInitPaymentDetails(values)
{
  var data=JSON.stringify(values);
    
    return this.http.post(this.API_URL+'/updateContractorInitPaymentDetails', data, this.options).catch(this.errorHandler);
    }

    getAllSupplPayDetails()
    {
      return this.http.get<PaymentSupplierDetails[]>(this.API_URL+'/getAllSupplPayDetails').map(response=>response["0"]).catch(this.errorHandler);
    }
    approveSuppPayment(id)
{
  return this.http.get(this.API_URL+'/approveSuppPayment/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
updateSupplierPaymentDetails(values)
{
  var data=JSON.stringify(values);
    
  return this.http.post(this.API_URL+'/updateSupplierPaymentDetails', data, this.options).catch(this.errorHandler);
}
getOneSupplierPayDetails(id)
{
  return this.http.get<PaymentSupplierDetails[]>(this.API_URL+'/getOneSupplierPayDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
getOneContractorPayDetails(id)
{
  return this.http.get<PaymentScheduleDetails[]>(this.API_URL+'/getOneContractorPayDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
updateContractorPaymentDetails(values)
{
  var data=JSON.stringify(values);
    
    return this.http.post(this.API_URL+'/updateContractorPaymentDetails', data, this.options).catch(this.errorHandler);
}
downloadDesign(id)
  {
    
    
   //this.options=new RequestOptions({headers: this.header});
    return this.http.get(this.API_URL+'/downloadDesign/'+id);
}
reEstimate(id)
{
  var data={param1:id};
  return this.http.post(this.API_URL+'/reEstimateTender', data, this.options).catch(this.errorHandler);
}
getBIMSPrivillageDetails(id)
{
  return this.http.get(this.API_URL+'/getBIMSPrivillageDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
}   
chkServiceAssocExists(id)
{
  console.log(id);
  return this.http.get(this.API_URL+'/chkServiceAssocExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
addAssoc(asso)
  {
    var info=JSON.stringify(asso);
   console.log(info);

    return this.http.post(this.API_URL+"/addAssociate",info,this.options);
  }
   getLocations()
  {
    console.log('get location service start');
    return this.http.get<Locations[]>(this.API_URL+'/getLocations').map(response=>response["0"]).catch(this.errorHandler); 
  }
  FinishWork(values)
  {
    var info=JSON.stringify(values);
   // console.log(info);
 
     return this.http.post(this.API_URL+"/finishWork",info,this.options).catch(this.errorHandler);
  }
  saveExtraServices(id, values)
  {
    var data=id;
    //var value=JSON.stringify(values);
    var items =[];
   // var workID=id;
    for(let v of values)
    {
      var newItem={name :v['Service_ID']};
      items.push(newItem);
    }
 
  var param_data = {param1:data,param2 :items};
    return this.http.post(this.API_URL+'/saveExtraServices', param_data, this.options).catch(this.errorHandler);
  }
  getAmendNo(id)
  {
    return this.http.get(this.API_URL+'/getAmendNo/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getPaySubTotal(id)
  {
    return this.http.get(this.API_URL+'/getPaySubTotal/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getPendingTotal(id)
  {
    return this.http.get(this.API_URL+'/getPendingTotal/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  chkAmendIssueDateExists(id,no)
  {
    return this.http.get(this.API_URL+'/chkAmendIssueDateExists/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  chkAmend1IssueDateExists(id)
  {
    return this.http.get(this.API_URL+'/chkAmend1IssueDateExists/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  chkAmend2IssueDateExists(id)
  {
    return this.http.get(this.API_URL+'/chkAmend2IssueDateExists/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  chkAmend3IssueDateExists(id)
  {
    return this.http.get(this.API_URL+'/chkAmend3IssueDateExists/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  chkAmend4IssueDateExists(id)
  {
    return this.http.get(this.API_URL+'/chkAmend4IssueDateExists/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getAmendIssueDate(id, no)
  {
    return this.http.get(this.API_URL+'/getAmendIssueDate/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getReTotalAmend1Items(id, no)
  {
    return this.http.get(this.API_URL+'/getReTotalAmend1Items/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getReTotalAmend2Items(id, no)
  {
    return this.http.get(this.API_URL+'/getReTotalAmend2Items/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getReTotalAmend3Items(id, no)
  {
    return this.http.get(this.API_URL+'/getReTotalAmend3Items/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getReTotalAmendItems(id, no)
  {
    return this.http.get(this.API_URL+'/getReTotalAmendItems/'+id+'/'+no).map(response=>response["0"]).catch(this.errorHandler); 
  }
  delKeys(Work_ID,Key_ID)
  {
    return this.http.get(this.API_URL+'/delKeys/'+Work_ID+'/'+Key_ID).map(response=>response["0"]).catch(this.errorHandler); 
  }
  delTerms(Work_ID,Key_ID)
  {
    return this.http.get(this.API_URL+'/delTerms/'+Work_ID+'/'+Key_ID).map(response=>response["0"]).catch(this.errorHandler); 
  }
  saveExtraPayment(values)
  {
    var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/saveExtraPayment",info,this.options).catch(this.errorHandler);
  }
  getPayments(id)
  {
return  this.http.get(this.API_URL+'/getPayments/'+id).map(response=>response["0"]).catch(this.errorHandler); 
  }
  getTenderTerms(id)
  {
    return this.http.get<TermsAndConditions[]>(this.API_URL+'/getTenderTerms/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  addTenderLabNew(id)
  {
    return this.http.get(this.API_URL+'/addTenderLabNew/'+ id).catch(this.errorHandler);
  }
  getAmendTotals(id,no)
  {
    return this.http.get(this.API_URL+'/getTotalAmend1Items/'+ id+'/'+no).catch(this.errorHandler);
  }
  getEstimateTotal(id)
  {
    return this.http.get(this.API_URL+'/getEstimateTotal/'+ id).catch(this.errorHandler);
  }
  
  getAmendSubTotals(id, no)
  {
    return this.http.get(this.API_URL+'/getAmendSubTotals/'+ id+'/'+no).catch(this.errorHandler);
  }
  chkAmendPayExists(id, no)
  {
    return this.http.get(this.API_URL+'/chkAmendPayExists/'+ id+'/'+no).catch(this.errorHandler); 
  }
  chkAmendSchedExists(id, no)
  {
    return this.http.get(this.API_URL+'/chkAmendSchedExists/'+ id+'/'+no).catch(this.errorHandler);
  }
  getRemeasureIssueDate(id, no)
  {
    return this.http.get(this.API_URL+'/getRemeasureIssueDate/'+ id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
  }
  chkRemeasureIssueDateExists(id,no)
  {
    return this.http.get(this.API_URL+'/chkReMeasureIssueDateExists/'+ id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
  }
  getReFlag(id,no)
  {
    return this.http.get(this.API_URL+'/getReFlag/'+ id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
  }
  getReItems(id, no)
  {
    return this.http.get(this.API_URL+'/getReItems/'+ id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
  }
  closePaySched(id, no)
  {
    return this.http.get(this.API_URL+'/closePaySched/'+ id+'/'+no).map(response=>response["0"]).catch(this.errorHandler);
  }
  getAmendLineItemsNew(id)
  {
    return this.http.get<LabEstimates[]>(this.API_URL+'/getAmendLineItemsNew/'+ id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getWorkingAmends(id)
  {
    return this.http.get(this.API_URL+'/getWorkingAmends/'+ id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getOneLead(id)
  {
    return this.http.get(this.API_URL+'/getOneLead/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getPayAmounts(id)
  {
    return this.http.get(this.API_URL+'/getPayAmounts/'+id).catch(this.errorHandler);
  }
  savePriority(index, leid, wid)
  {
    var param_data = {param1:index,param2 :leid, param3: wid};
    return this.http.post(this.API_URL+'/savePriority', param_data, this.options).catch(this.errorHandler);

  }
  editPriority(wid)
  {
    var param_data = {param1: wid};
    return this.http.post(this.API_URL+'/editPriority', param_data, this.options).catch(this.errorHandler);
  }
  getPaySummary(id)
  {
    return this.http.get(this.API_URL+'/getAllSubTotals/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getAllRecievedPayments(id)
  {
    return this.http.get<ReceivedPayments[]>(this.API_URL+'/getAllRecievedPayments/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getAllTotals(id)
  {
    return this.http.get(this.API_URL+'/getAllTotals/'+id).catch(this.errorHandler);
  }
  getAllPaidPayments(id)
  {
    return this.http.get<InitiatePayments[]>(this.API_URL+'/getAllPaidPayments/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getAllReciepts()
  {
    return this.http.get<ReceivedPayments[]>(this.API_URL+'/getAllReceipts').map(response=>response["0"]).catch(this.errorHandler);
  }
  updateReceivedPayment(values)
  {
    var info=JSON.stringify(values);
    return this.http.post(this.API_URL+'/updateReceivedPayment', info, this.options).catch(this.errorHandler);
  }
  getAllWorkID()
  {
    return this.http.get(this.API_URL+'/getAllWorkID').map(response=>response["0"]).catch(this.errorHandler);
  }
  getAllCustomers()
  {
    return this.http.get(this.API_URL+'/getAllCustomers').map(response=>response["0"]).catch(this.errorHandler);
  }
  applyFilter(values)
  {
    var info=JSON.stringify(values);
    return this.http.post(this.API_URL+'/getFilteredRecPay', info, this.options).catch(this.errorHandler);
  }
  getFilteredReceipts(wid,cid, tid)
  {
    return this.http.get<ReceivedPayments[]>(this.API_URL+'/getFilteredRecPay/'+wid+'/'+cid+'/'+tid).map(response=>response["0"]).catch(this.errorHandler);
  }
  getAllAssocs()
  {
    return this.http.get(this.API_URL+'/getAllAssocs').map(response=>response["0"]);
  }
  getFilteredPayments(wid,cid,tid,aid,finit,fauth,fapprove,fmfee,fafee)
  {
    console.log('Init'+finit+'Auth'+fauth,'App'+fapprove+'Mfe'+fmfee+'AFee'+fafee);
    return this.http.get<InitiatePayments[]>(this.API_URL+'/getFilteredPayments/'+wid+'/'+cid+'/'+tid+'/'+aid+'/'+finit+'/'+fauth+'/'+fapprove+'/'+fmfee+'/'+fafee).map(response=>response["0"]).catch(this.errorHandler);
  }
  getFilPayments(fArr)
  {
    console.log(fArr);
    //var info=JSON.stringify(fArr);
    return this.http.get<InitiatePayments[]>(this.API_URL+'/getFilPayments/'+fArr).map(response=>response["0"]).catch(this.errorHandler);
  }
  
  checkPaymentExists(id)
  {
    return this.http.get(this.API_URL+'/checkPaymentExists/'+id).catch(this.errorHandler);
  }
  getAssocServices(id)
  {
    return this.http.get(this.API_URL+'/getAssociateServices/'+id).catch(this.errorHandler);
  }
  getRecAmountByDate(id)
  {
    return this.http.get(this.API_URL+'/getRecAmountByDate/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  updateAmendReason(data)
  {
    var info=JSON.stringify(data);
    return this.http.post(this.API_URL+'/updateAmendReason', info, this.options).catch(this.errorHandler);
  }
  chkReasonExists(id)
  {
    return this.http.get(this.API_URL+'/chkReasonExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getAmendReasons()
  {
    return this.http.get(this.API_URL+'/getAmendReasons').map(response=>response["0"]).catch(this.errorHandler);
  }
  chkStartDateExists(id)
  {
    return this.http.get(this.API_URL+'/chkStartDateExists/'+id).map(response=>response["0"]).catch(this.errorHandler);
  }
  getAllMFeeDetails()

{
  return this.http.get<InitiatePayments[]>(this.API_URL+'/getAllMFeeDetails').map(response=>response["0"]).catch(this.errorHandler);
}
getAllPaidDetails()
{
  return this.http.get<InitiatePayments[]>(this.API_URL+'/getAllPaidDetails').map(response=>response["0"]).catch(this.errorHandler);
}
getPayDetails(id)
{
  return this.http.get<InitiatePayments[]>(this.API_URL+'/getPayDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
}

workLost(values)
{
  var info=JSON.stringify(values);
  return this.http.post(this.API_URL+'/workLost',info,this.options).catch(this.errorHandler);
}
getWorkLostReason(id)
{
  return this.http.get(this.API_URL+'/getWorkLostReason/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
getBalReceipt(id)
{
  return this.http.get(this.API_URL+'/getBalReceipt/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
getReciptDetails(id)
{
  return this.http.get(this.API_URL+'/getReciptDetails/'+id).map(response=>response["0"]).catch(this.errorHandler);
}
generateReport(values)
{
  var info=JSON.stringify(values);
  return this.http.post<InitiatePayments[]>(this.API_URL+'/generateReport', info, this.options).catch(this.errorHandler);
  
}
getAllMigrateData()
{
  return this.http.get<Works[]>(this.API_URL+'/getAllMigrateData').map(response=>response["0"]).catch(this.errorHandler);
}
addNewSeg(values)
{
  var info=JSON.stringify(values);
  return this.http.post(this.API_URL+"/addSegment",info,this.options).catch(this.errorHandler);
}
getCivilServices()
      {
          return this.http.get<Services[]>(this.API_URL+'/getCivilServices').map(response=>response["0"]).catch(this.errorHandler);
      }
      addService(values)
      {
        var info=JSON.stringify(values);
  return this.http.post(this.API_URL+"/addService",info,this.options).catch(this.errorHandler);
      }
      
      getItemsByServ(id)
      {
        return this.http.get<LabLineItems[]>(this.API_URL+'/getItemsByServ/'+id).map(response=>response["0"]).catch(this.errorHandler);
      }
      addItem(values)
      {
        var info=JSON.stringify(values);
  return this.http.post(this.API_URL+"/addItem",info,this.options).catch(this.errorHandler);
      }

      getFilteredAssocs(values)
      {
        var info=JSON.stringify(values);
  return this.http.post(this.API_URL+"/getFilteredAssocs",info,this.options).catch(this.errorHandler);
      }
      getAssoServices(id)
      {
        return this.http.get(this.API_URL+'/getAssoServices/'+id).catch(this.errorHandler);
      }
      deleteRate(id)
     {
      return this.http.get(this.API_URL+'/deleteRate/'+id).catch(this.errorHandler);
     }
     addNewService(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/addNewService",info,this.options);
     }
     addMaterialAssoc(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/addMaterialAssoc",info,this.options);
     }
     getProductSegments()
     {
      return this.http.get<ProductSegments[]>(this.API_URL+'/getProductSegments').map(response=>response["0"]).catch(this.errorHandler);
     }
     addNewProdSeg(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/addNewProdSeg",info,this.options);
     }
     getProdGroups()
     {
      return this.http.get<ProductGroups[]>(this.API_URL+'/getProdGroups').map(response=>response["0"]).catch(this.errorHandler);
     }
     addProdGroup(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/addProdGroup",info,this.options);
     }
     //-----------for wisebrix-----------------
     getEndDate(value,date)
     {
       var param_data = {param1: value, param2 : date};
       return this.http.post(this.API_URL+'/getEndDate',param_data, this.options);
     }
     getLineItemRate(id)
     {
      return this.http.get<TenderDetails[]>(this.API_URL+'/getLineItemRate/'+id);
     }
     getTenderTotals(id)
     {
      return this.http.get<TenderDetails[]>(this.API_URL+'/getTenderTotals/'+id).map(response=>response["0"]);
     }
     sendMail(type)
     {
       var data={param1: type};
       return this.http.post(this.API_URL+'/sendMail',data, this.options);
     }
     getLineItemByService(id)
     {
      return this.http.get<LabEstimates[]>(this.API_URL+'/getLineItemByService/'+id).map(response=>response["0"]);
     }
     editMaterialAssoc(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/editMaterialAssoc",info,this.options);
     }
     getAssocByService(values)
     {
       console.log('Assoc Services'+values);
       return this.http.get<Associates[]>(this.API_URL+'/getAssocByService/'+values).map(response=>response["0"]);
     }
     addTemplateEst(wid, tid)
     {
       var data={param1: wid, param2: tid};
     return this.http.post(this.API_URL+'/addTemplateEst',data, this.options);
     }
     chkTemplateWorkID(id)
     {
      return this.http.get(this.API_URL+'/chkTemplateWorkID/'+id).map(response=>response["0"]);
     }
     
     addTempSchedules(wid, tid)
     {
      var data={param1: wid, param2: tid};
      return this.http.post(this.API_URL+'/addTempSchedules',data, this.options);
     }
     //for error handling
     errorHandler(error : HttpErrorResponse)
  {
    return Observable.throw(error.message || "Server Error");
    
  }
}