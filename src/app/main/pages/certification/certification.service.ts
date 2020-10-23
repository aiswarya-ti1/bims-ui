import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient ,HttpHeaders, HttpParams,HttpRequest,HttpEventType} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import 'rxjs/add/operator/map';

import { id } from '@swimlane/ngx-charts/release/utils';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Associates } from './tabs/cert-assoc-list/associates';
import { AssocDetails } from './certification-process/AssocDetails';
import { SegmentRates } from './certification-process/segmentRate';
import { Projects } from './certification-process/projects';
import { Documents } from './certification-process/tabs/verification/documents';
import { environment } from 'environments/environment.prod';
import { ProdAssociates } from '../associates/prodAssociates';
import { ProductSegments } from '../associates/tabs/mat-assoc-list/productSegments';
import { ProductGroups } from '../associates/tabs/mat-assoc-list/productGroups';
import { User } from 'app/main/user';
import { UsersLists } from '../users/usersList';





@Injectable()
export class CertificationService{
  headers:Headers=new Headers;
  selectedFile: File;
  options:any;
  Seg:string;
  //url="http://ec2-18-191-172-11.us-east-2.compute.amazonaws.com/bims/public";

  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) 
  { 
    this.headers.append('enctype','multipart/form-data');
    this.headers.append('Content-Type','x-www-form-urlencoded');
   this.headers.append('X-Requested-With','XMLHttpRequest');
    this.options=new RequestOptions({headers:this.headers});
  }
  
  getAssociate(type):Observable<Associates[]>
  {
    //var headers = new HttpHeaders();

return this.http.get<Associates[]>(this.API_URL+"/getAssociate/"+type)
.map(response=>response["0"]);
  }
  getOneAssociate(id, type)
  {
    //var headers = new HttpHeaders();

return this.http.get<AssocDetails[]>(this.API_URL+'/getOneAssociate/'+id+'/'+type)
.map(response=>response["0"]);
  }
  getProjectDetails(id)
  {
    //var headers = new HttpHeaders();

    return this.http.get<Projects[]>(this.API_URL+'/getProject/'+id)
    .map(response=>response["0"]);
  }
  getCustomer(value)
  {
    console.log(value);
    return this.http.get(this.API_URL+'/getOneCustomer1/'+value).map(response=>response["0"]); 
  }
  addProjectDetails(value)
  {
    
    var data=JSON.stringify(value);
   // console.log(info);

    return this.http.post(this.API_URL+"/addProject",data,this.options);
  }
  addFeedback(feed)
  {
    
    var data=JSON.stringify(feed);
   // console.log(info);

    return this.http.post(this.API_URL+"/addFeedback",data,this.options);
  }
  getCustomerqa(value)
  {
    console.log(value);
    return this.http.get<Projects[]>(this.API_URL+'/getOneCustomerqa/'+value).map(response=>response["0"]); 
  }
  changeRegStatus(id)
  {
    //var status=JSON.stringify(id);
    return this.http.get(this.API_URL+'/changeRegStatus/'+id).map(response=>response["0"]);
  }
   checkQACount(id)
  {
    return this.http.get(this.API_URL+'/checkQACount/'+id).map(response=>response["0"]); 
  }
  changeStatus(value)
  {
    var status=JSON.stringify(value);
    
    return this.http.post(this.API_URL+"/changeQAStatus",status,this.options);
  
  }
  addQARating(rate)
  {
    var data=JSON.stringify(rate);
    return this.http.post(this.API_URL+"/addQARating",rate,this.options);
  }
  getQAProjectDetails(id)
  {
    return this.http.get<Projects[]>(this.API_URL+'/getQAProject/'+id)
    .map(response=>response["0"]);
  }
  chkAssocDocExists(id)
  {
    return this.http.get(this.API_URL+'/chkAssocDocExists/'+id).map(response=>response["0"]); 
  }
  uploadDoc(type, no,name,  id, file:File)
  {
    //var type=JSON.stringify(typeid);
    const formData1: FormData = new FormData();
    formData1.append('fileKey', file, file.name);
    formData1.append('docNo', no);
    formData1.append('associd', id);
    formData1.append('type', type);
    formData1.append('fileName', name);
    
    return this.http.post(this.API_URL+'/file_uploadAadhar', formData1,this.options);
  }
  getAssocDocs(id)
  {
    return this.http.get<Documents[]>(this.API_URL+'/getAssocDocs/'+id).map(response=>response["0"]); 
  }
  docDownload(type, id)
  {
    return this.http.get(this.API_URL+'/docDownload/'+type+'/'+id);
  }
  changeCertifyStatus(id)
  {
    //console.log(id);
    return this.http.get(this.API_URL+'/changeCertifyStatus/'+id).map(response=>response["0"]);
  }


  /*getFeedback(id):Observable<CustomerWorks[]>
  {
    //var headers = new HttpHeaders();

    return this.http.get<CustomerWorks[]>(this.API_URL+'/getFeedback/'+id)
    .map(response=>response["0"]);
  }
  getBranches()
  {
    console.log('Branches Retrieved');
    return this.http.get<Branches[]>(this.API_URL+'/getBranches').map(response=>response["0"]);

  }
  getSegments()
  {
    console.log('service start');
    return this.http.get<Segments[]>(this.API_URL+'/getSegments').map(response=>response["0"]);
    
  }
 getCategory(id)
  {
    //return this.http.get<Category[]>('http://bims/getCategories').map(response=>response["0"]); 
    var data=JSON.stringify(id);
   // console.log(info);
    return this.http.get<Category[]>(this.API_URL+'/getCategories/'+data).map(response=>response["0"]);
  }
  getOneCategory(id)
  {
    //return this.http.get<Category[]>('http://bims/getCategories').map(response=>response["0"]); 
  var data=JSON.stringify(id);
   // console.log(info);
    return this.http.get(this.API_URL+'/getCategory/'+data).map(response=>response["0"]);
  }
  getUnits()
  {
    console.log('get unit service start');
    return this.http.get<Units[]>(this.API_URL+'/getUnits').map(response=>response["0"]); 
  }
  getLocations()
  {
    console.log('get location service start');
    return this.http.get<Locations[]>(this.API_URL+'/getLocations').map(response=>response["0"]); 
  }
  addAssoc(asso)
  {
    var info=JSON.stringify(asso);
   console.log(info);

    return this.http.post(this.API_URL+"/addAssociate",info,this.options);
  }
  
  addFeedback(feed)
  {
    
    var data=JSON.stringify(feed);
   // console.log(info);

    return this.http.post(this.API_URL+"/addFeedback",data,this.options);
  }
  
  addAvgRating(value)
  {
    return this.http.post(this.API_URL+"/addAvgRating",value).map(response=>response["0"]);
  }
  getOneProject(id)
  {
    console.log(id);
    return this.http.get<Customers[]>(this.API_URL+'/getOneProject/'+id).map(response=>response["0"]); 
  }
  getOneProjectFeed(id)
  {
    console.log(id);
    return this.http.get(this.API_URL+'/getOneProjectFeed/'+id).map(response=>response["0"]); 
  }
  
  
  changeStatus(value)
  {
    var status=JSON.stringify(value);
    console.log(value);
    return this.http.post(this.API_URL+"/changeQAStatus",status,this.options);
  
  }
  changeVerifyStatus(id)
  {
    console.log(id);
    return this.http.get(this.API_URL+'/changeVerifyStatus/'+id).map(response=>response["0"]);
  }
  
  changeFeedStatus(id)
  {
    
    console.log(id);
    return this.http.get(this.API_URL+'/changeFeedStatus/'+id).map(response=>response["0"]);
  }
  
 
  */
  /*onUpload()
  {
    const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.post('my-backend.com/file-upload', uploadData)
    .subscribe(...);
}
  }*/
  postFileAadhar(selectedFile: File, value, id){
    //const endpoint = 'assets/uploads';
    const formData: FormData = new FormData();
    formData.append('fileKey', selectedFile, selectedFile.name);
    formData.append('name', value);
    formData.append('id',id);
    return this.http.post(this.API_URL+'/file_uploadAadhar', formData,this.options);
          
      
}
postFileAgreement(selectedFile1: File, value, id){
  //const endpoint = 'assets/uploads';
  const formData1: FormData = new FormData();
  formData1.append('fileKey1', selectedFile1, selectedFile1.name);
  formData1.append('name', value);
  formData1.append('id',id);
  return this.http.post(this.API_URL+'/file_uploadAgreement', formData1,this.options);
        
    
}
certify(value)
{
  var status=JSON.stringify(value);
    return this.http.post(this.API_URL+"/certification",status,this.options);
}
getSegmentRate(id):Observable<SegmentRates[]>
{
  //console.log(id);
  return this.http.get<SegmentRates[]>(this.API_URL+'/getSegRate/'+id).map(response=>response["0"]);
}
updateRates(values)
{
  
  var data=JSON.stringify(values);
 
    return this.http.post(this.API_URL+"/updateRates",data,this.options);
}
chkProjectExists(id)
{
  return this.http.get(this.API_URL+'/chkProjectExists/'+id).map(response=>response["0"]);
}
getAssocServices(aid,sid)
{
  return this.http.get(this.API_URL+'/getAssocServices/'+aid+'/'+sid).map(response=>response["0"]);
}
getAssocSegments(id)
{
  return this.http.get(this.API_URL+'/getAssocSegments/'+id).map(response=>response["0"]);
}
changeFeedStatus(id)
  {
    
   
    return this.http.get(this.API_URL+'/changeFeedStatus/'+id).map(response=>response["0"]);
  }
  getMatAssociates()
{
  
return this.http.get<Associates[]>(this.API_URL+'/getMaterialAssociates').map(response=>response["0"]);
}
getServiceAssociate()
{
  return this.http.get<Associates[]>(this.API_URL+'/getServiceAssociate').map(response=>response["0"]);
}
getProductSegments()
{
  return this.http.get<ProductSegments[]>(this.API_URL+'/getProductSegments').map(response=>response["0"]);
}
getProductGroup(id)
{
  var data=JSON.stringify(id);
  return this.http.post(this.API_URL+'/getProductGroup',data).map(response=>response["0"]);
}
getMatAssocSegments(id)
{
  return this.http.get(this.API_URL+'/getMatAssocSegments/'+id).map(response=>response["0"]);
}
removeSegmentGroup(id)
{
  var data=JSON.stringify(id);
  return this.http.post(this.API_URL+'/removeSegmentGroup',data);
}
addNewSegment(values)
{
  var data=JSON.stringify(values);
  return this.http.post(this.API_URL+'/addNewSegment',data);
}
/*saveRate(item,value)
{
  var seg=JSON.stringify(item);
  var rates=JSON.stringify(value);
  var data = {param1:seg,param2 :rates};
  
console.log(data);
    return this.http.post(this.API_URL+"/saveRate",data,this.options);
}

getUserName(id)
{
  return this.http.get(this.API_URL+'/getUserName/'+id).map(response=>response["0"]); 
}
createLogin(value)
{
  var status=JSON.stringify(value);
    return this.http.post(this.API_URL+"/createLogin",status,this.options);
}
getSegmentDetails(id):Observable<Rates[]>
{
  return this.http.get<Rates[]>(this.API_URL+'/getSegmentDetails/'+id).map(response=>response["0"]);
}
//To get associate details based on Seg, Serv search
searchAssociate(value):Observable<AssocFilters[]>
{
  console.log(value);
  var data=JSON.stringify(value);  
return this.http.get<AssocFilters[]>(this.API_URL+'/searchAssociate/'+data).map(response=>response["0"]);
}
getSegAssoc(id)
{
  return this.http.get(this.API_URL+'/getSegmentAssoc/'+id).map(response=>response

);
}

getUserPermission(name)
{
  console.log(name);
  return this.http.get(this.API_URL+'/getUserPermission/'+name).map(response=>response);
}
//----------------------------------------------------------------------------------
//MatAssoc Certification


addUpdateLog(value)
{
  console.log(value);
  var status=JSON.stringify(value);
  return this.http.post(this.API_URL+"/addUpdateLog",status,this.options);
}
addRegisterLog(value)
{
  console.log(value);
  var status=JSON.stringify(value);
  return this.http.post(this.API_URL+"/addRegisterLog",status,this.options);
}
addCertifyLog(value)
{
  console.log(value);
  var status=JSON.stringify(value);
  return this.http.post(this.API_URL+"/addCertifyLog",status,this.options);
}
getAssocRole(name)
{
  console.log(name);
  //var UserName=JSON.stringify(name);
  return this.http.get(this.API_URL+'/getUserPermission/'+name);
}
updateAssociate(value)
{
  var details=JSON.stringify(value);
return this.http.post(this.API_URL+'/updateAssociate',details,this.options);
}
getAssocSources()
{
  return this.http.get(this.API_URL+'/getAssocSource').map(response=>response["0"]);
}
getPendingCert()
{
  return this.http.get(this.API_URL+'/getPendingCert').map(response=>response["0"]);
}
getTotalRegistered()
{
  return this.http.get(this.API_URL+'/getTotalReg').map(response=>response["0"]);
}*/
getProdAssocSegments(id)
{
  return this.http.get(this.API_URL+'/getProdAssocSegments/'+id).map(response=>response["0"]);
}
getUsersList()
{
  return this.http.get<UsersLists[]>(this.API_URL+'/getUsersList/').map(response=>response["0"]);
}
changeActiveStatus(id, type)
{
  var data={param1:id, param2 : type};
  return this.http.post(this.API_URL+'/changeActiveStatus',data);
}
}




