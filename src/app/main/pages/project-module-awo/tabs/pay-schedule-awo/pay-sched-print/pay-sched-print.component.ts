import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/customerDetails';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { Payments } from '../payments';


@Component({
    selector     : 'pay-sched-print',
    templateUrl  : './pay-sched-print.component.html',
    styleUrls    : ['./pay-sched-print.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaySchedPrintComponent 
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
  payDetails : PaymentScheduleDetails;
  EstTotal : number;
  EstSubTotal:number;
  EstBal:number;
  EstReTotal:number=0;
  EstReBal :number=0;
  payments :Payments[];
  RecAmt : number=0;
  SplitTotal : number=0;
  RecBal : number=0;
  SplitBal : number=0;

  constructor(public projectService: ProjectModuleService,  public router:Router,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.Work_ID=params['workid'];
      this.TypeNo=params['type'];
    });
this.getCustomerDetails(this.Work_ID);
   this.getOneWork();
   this.getPrintPaySchedule(this.TypeNo);
   this.getPayments();
   this.getTotal(this.TypeNo);
   this.getReMeasureSummary();
 
   
 

    
  }
  getPrintPaySchedule(no)
  {
    this.projectService.getPrintPaySchedule(this.Work_ID,no).subscribe(result=>{
      this.payDetails=result;},  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
   
  }

  getOneWork()
  {
      this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
       
         this.Work_Type=result[0]['Work_Type'];
              },  error=>{console.log(error);
    
                this.openSnackBar('Server Error. Please try again!!','OK');
                })
  }
  getPayments()
  {
    this.projectService.getPayments(this.Work_ID).subscribe(result=>{
      this.payments=result;
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  getReMeasureSummary()
  {
    this.projectService.getReMeasureSummary(this.Work_ID,this.TypeNo).subscribe(result=>{
      this.EstReTotal=result['TotalAfterRe'];
      this.EstReBal=this.EstReTotal-this.SplitTotal;

    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
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

getTotal(no)
{
  this.projectService.getAmendSubTotals(this.Work_ID, this.TypeNo).subscribe(result=>{
    this.EstTotal=result['Total'];
   // this.EstSubTotal=result['SubTotal'];
   // this.EstBal=result['Balance'];
   this.RecAmt=result['RecTotal'];
   this.SplitTotal=result['SplitTotal'];
   this.RecBal=result['BalanceRec'];
   this.SplitBal=result['BalanceSplit'];
  });
}


openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


 
}
