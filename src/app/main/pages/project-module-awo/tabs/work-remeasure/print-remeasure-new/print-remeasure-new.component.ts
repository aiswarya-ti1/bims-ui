import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/customerDetails';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';


@Component({
    selector     : 'print-remeasure-new',
    templateUrl  : './print-remeasure-new.component.html',
    styleUrls    : ['./print-remeasure-new.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PrintReMeasureNewComponent 
{
    
  custDetails:CustomerDetails[];

  items:LabEstimates[];
  Work_ID : number;
  Assoc_ID : number=0;
  a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
  n ;
  Total :number;
  words: string;
  Issue_Date :Date;
  Work_Type : string;
  AmdTotal : number;
  TypeNo : number=0;
  ReTotal : number;
  ReTotal_Words : string;
  

  constructor(public projectService: ProjectModuleService,  public router:Router,
    private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
    
      this.Work_ID=params['workid'];
      this.TypeNo=params['type'];
      
    });
this.getCustomerDetails(this.Work_ID);
   this.getOneWork();
   this.getReItems();
   this.getReMeasureIssueDate();
   this.getReMeasureSummary(this.TypeNo);

    
  }
  getReItems()
  {
    this.projectService.getReItems(this.Work_ID, this.TypeNo).subscribe(result=>{
    this.items=result;
  })
  }
getReMeasureIssueDate()
{
  this.projectService.getRemeasureIssueDate(this.Work_ID,this.TypeNo).subscribe(result=>{
    this.Issue_Date=result[0]['IssueDate'];
  })
}
  getReMeasureSummary(no)
  {
    this.projectService.getReMeasureSummary(this.Work_ID,no).subscribe(result=>{
      this.ReTotal=result['TotalAfterRe'];
      this.ReTotal_Words=this.inWords( this.ReTotal);
    });
  }
  

  getOneWork()
  {
      this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
       
         this.Work_Type=result[0]['Work_Type'];
              })
  }

  inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    this.n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!this.n) return; var str = '';
    str += (this.n[1] != 0) ? (this.a[Number(this.n[1])] || this.b[this.n[1][0]] + ' ' + this.a[this.n[1][1]]) + 'crore ' : '';
    str += (this.n[2] != 0) ? (this.a[Number(this.n[2])] || this.b[this.n[2][0]] + ' ' + this.a[this.n[2][1]]) + 'lakh ' : '';
    str += (this.n[3] != 0) ? (this.a[Number(this.n[3])] || this.b[this.n[3][0]] + ' ' + this.a[this.n[3][1]]) + 'thousand ' : '';
    str += (this.n[4] != 0) ? (this.a[Number(this.n[4])] || this.b[this.n[4][0]] + ' ' + this.a[this.n[4][1]]) + 'hundred ' : '';
    str += (this.n[5] != 0) ? ((str != '') ? 'and ' : '') + (this.a[Number(this.n[5])] || this.b[this.n[5][0]] + ' ' + this.a[this.n[5][1]]) + 'only ' : '';
    return str;
}
getCustomerDetails($id)
{
  this.projectService.getCustomerDetails($id).subscribe(result=>{
  this.custDetails=result;
})
}
printDoc()
  {
window.print();
  }


 
}
