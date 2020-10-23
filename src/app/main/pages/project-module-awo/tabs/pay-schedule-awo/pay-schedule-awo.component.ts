import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { ExtraPaymentDialog } from '../pay-schedule-awo/extra-payment/extra-payment.component';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Payments } from '../pay-schedule-awo/payments';
import { ViewPaySummaryComponent } from './view-pay-summary/view-pay-summary.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { RecPayDates } from './recPayDate';




@Component({
    selector     : 'pay-schedule-awo',
    templateUrl  : './pay-schedule-awo.component.html',
    styleUrls    : ['./pay-schedule-awo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PayScheduleAWOComponent implements OnInit
{ 
  Total0:number=0;
  Total1:number=0;
  Total2:number=0;
  Total3:number=0;
  Total4:number=0;
  Total5:number=0;
  Total6:number=0;
  Total7:number=0;
  Total8:number=0;
  Total9:number=0;
  Total10:number=0;
   
  dataSource2;
  type: number=0;
  work_ID : number=0;
  User:Array<User>;
  User_Name: string='';
  Role_ID : number=0;
  //dialogRef_Extra: MatDialogRef<ExtraPaymentDialog>;
  displayedColumns2 = ['Stage','Amount','ExpPayDate'];
  dialogRef_Extra: MatDialogRef<ExtraPaymentDialog>;
  confirmDialogRef : MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef_Summary : MatDialogRef<ViewPaySummaryComponent>;
  payments :Payments;
  payDetails : PaymentScheduleDetails;
  EstTotal : number;
  Amd1Total : number;
  Amd2Total : number;
  Amd3Total : number;
  EstSubTotal : number;
  Amd1SubTotal : number;
  Amd2SubTotal : number;
  Amd3SubTotal : number;
  EstBal : number;
  Amd1Bal : number;
  Amd2Bal : number;
  Amd3Bal : number;
  A1Exists : number;
  A2Exists : number;
  A3Exists : number;
  payCount : number=0;
  tableFormGroup : FormGroup;
  GrandTotal : number;
  Amend_No : number;
  Totals=[];
  RecAmounts:RecPayDates;
  RecAmt : number;
  constructor(public projectService:ProjectModuleService,
    public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService,private activatedRoute: ActivatedRoute,
    private dialog : MatDialog, private snackBar : MatSnackBar) 
    { 
      this.tableFormGroup=new FormGroup({             
        workID : new FormControl()  ,
        ActualStart : new FormControl(),
        ActualClose : new FormControl(),
        SchedID : new FormControl(),
        ActualPayDate : new FormControl(),
        ActualAmount : new FormControl()
      }); 
    }

  ngOnInit() {  
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_Name=this.User['User_Login'];
      this.Role_ID=this.User['Role_ID'];
           }
   
      this.activatedRoute.params.subscribe((params: Params) => {            
    this.work_ID=params['workid'];     
    this.tableFormGroup.controls['workID'].setValue(params['workid']);
    });
    this.getAmendNo();
    this.getPaySummary();
      this.getPaySchedule();
      this.getPayments();
      this.chkPayExists();
      this.getSubtotals();
      this.getGrandTotal();
      this.getPaySummary();
      this.getRecivedAmountByDate();
  }
  chkPayExists()
  {
    this.projectService.chkAmendPayExists(this.work_ID, 1).subscribe(result=>{
this.payCount=result[0];
if(this.payCount==0)
{
  this.A1Exists=0;
}
else{
  this.A1Exists=1;
}
    });
    this.projectService.chkAmendPayExists(this.work_ID, 2).subscribe(result=>{
      this.payCount=result[0];
      if(this.payCount==0)
      {
        this.A2Exists=0;
      }
      else{
        this.A2Exists=1;
      }
          })
          this.projectService.chkAmendPayExists(this.work_ID, 3).subscribe(result=>{
            this.payCount=result[0];
            if(this.payCount==0)
            {
              this.A3Exists=0;
            }
            else{
              this.A3Exists=1;
            }
                })
  }
  
  getPaySchedule()
  {
    this.projectService.getPaySchedule(this.work_ID).subscribe(result=>{
             this.payDetails=result;},  error=>{console.log(error);
    
              this.openSnackBar('Server Error. Please try again!!','OK');
              }
                 )

  }
  getPayments()
  {
    this.projectService.getPayments(this.work_ID).subscribe(result=>{
      this.payments=result;
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      }
         )
  }
  getGrandTotal()
  {
    this.projectService.getGrandTotal(this.work_ID).subscribe(result=>{
      this.GrandTotal=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      }
         )
  }
  getAmendNo()
  {
    this.projectService.getAmendNo(this.work_ID).subscribe(result=>{
    this.Amend_No=result;
  })
  }
  getPaySummary()
  {  
    this.projectService.getPaySummary(this.work_ID).subscribe(result=>{console.log(result);
      this.Totals=result;
      this.Total0=result[0];
      this.Total1=result[1];
      this.Total2=result[2];
      this.Total3=result[3];
      this.Total4=result[4];
      this.Total5=result[5];
      this.Total6=result[6];
      this.Total7=result[7];
      this.Total8=result[8];
      this.Total9=result[9];
      this.Total10=result[10];

    })
  }
  

getSubtotals()
{
  this.getReceivedTotal();
  this.projectService.getAmendSubTotals(this.work_ID, 0).subscribe(result=>{
    this.EstTotal=result['Total'];
    this.EstSubTotal=result['SubTotal'];
    this.EstBal=result['Balance'];
      
  })
  this.projectService.getAmendSubTotals(this.work_ID, 1).subscribe(result=>{
    this.Amd1Total=result['Total'];
    this.Amd1SubTotal=result['SubTotal'];
    this.Amd1Bal=result['Balance'];
  })
  this.projectService.getAmendSubTotals(this.work_ID, 2).subscribe(result=>{
    this.Amd2Total=result['Total'];
    this.Amd2SubTotal=result['SubTotal'];
    this.Amd2Bal=result['Balance'];
  })
  this.projectService.getAmendSubTotals(this.work_ID, 3).subscribe(result=>{
    this.Amd3Total=result['Total'];
    this.Amd3SubTotal=result['SubTotal'];
    this.Amd3Bal=result['Balance'];
  })
}

  savePayDate($data, $values)
  {
    
    this.projectService.savePayDate($data, $values).subscribe(result=>{
      this.tableFormGroup.controls['ActualPayDate'].reset();
      this.tableFormGroup.controls['ActualAmount'].reset();
      this.getPaySchedule();
    if(result['Success']==true)
    {
    this.getPaySchedule();
    this.getPaySummary();
    this.getRecivedAmountByDate();
    }
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    }
       )
  }
 
  paymentReceipt()
  {
    
    this.dialogRef_Extra = this.dialog.open(ExtraPaymentDialog, {
      panelClass:'extra-payment-dialog',
     
      data      : {
     payid : 0,
     typeid : 1,
     workid :this.work_ID
        
      } 
  });

  this.dialogRef_Extra.afterClosed()
  .subscribe((response: FormGroup) => {
      
    this.getPaySchedule();
    this.getPayments();
    this.getSubtotals();
    this.getPaySummary();
    this.getRecivedAmountByDate();
      if ( !response )
      {
        this.getPaySchedule();
        this.getPayments();
        this.getSubtotals();
        this.getPaySummary();
        this.getRecivedAmountByDate();
          return;
      }
  });
  }
  addPayment(id)
  {
    this.dialogRef_Extra = this.dialog.open(ExtraPaymentDialog, {
      panelClass:'extra-payment-dialog',
     
      data      : {
     payid : id,
     typeid : 2,
     workid :this.work_ID
        
      } 
  });

  this.dialogRef_Extra.afterClosed()
  .subscribe((response: FormGroup) => {
      
    this.getPaySchedule();
    this.getPayments();
    this.getSubtotals();
    this.getPaySummary();
    this.getRecivedAmountByDate();
      if ( !response )
      {
        this.getPaySchedule();
        this.getPayments();
        this.getSubtotals();
        this.getPaySummary();
        this.getRecivedAmountByDate();
          return;
      }
  });
  }

  printPaySched(no)
  {
    
      this.router.navigate(['/pay-sched-print/'+this.work_ID,no]);
    
  }
  closePaySched(no)
  {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
  });

  this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to close this pay schedule?';

  this.confirmDialogRef.afterClosed().subscribe(result => {
      if ( result )
      {
          if(result==true)
          {
           
            this.projectService.closePaySched(this.work_ID, no).subscribe(result=>{
            
              if(result["Success"]==true)
              {
                this.openSnackBar('Completed Successfully!!','OK');
                
              }
              this.getPaySchedule();
              this.getPayments();
            })
          }
      }
      this.confirmDialogRef = null;
  });
 

   
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  viewPaySummary(no)
  {
    this.dialogRef_Summary = this.dialog.open(ViewPaySummaryComponent, {
      panelClass:'view-pay-summary-dialog',
      width: '250px',height :'175px',
      data      : {
     wid : this.work_ID,
     amendno : no
        
      } 
  });

  this.dialogRef_Summary.afterClosed()
  .subscribe((response: FormGroup) => {
      
    this.getPaySchedule();
    this.getPayments();
    this.getSubtotals();
      if ( !response )
      {
        this.getPaySchedule();
        this.getPayments();
        this.getSubtotals();
          return;
      }
  });
  }

  getRecivedAmountByDate()
  {
    this.projectService.getRecAmountByDate(this.work_ID).subscribe(result=>{console.log(result);
this.RecAmounts=result
    })
  }
  addSplitPay(id)
  {
    this.dialogRef_Extra = this.dialog.open(ExtraPaymentDialog, {
      panelClass:'extra-payment-dialog',
     
      data      : {
     payid : id,
     typeid: 2,
     workid :this.work_ID
        
      } 
  });

  this.dialogRef_Extra.afterClosed()
  .subscribe((response: FormGroup) => {
      
    this.getPaySchedule();
    this.getPayments();
    this.getSubtotals();
    this.getPaySummary();
    this.getRecivedAmountByDate();
      if ( !response )
      {
        this.getPaySchedule();
        this.getPayments();
        this.getSubtotals();
        this.getPaySummary();
        this.getRecivedAmountByDate();
          return;
      }
  });
  }
  getReceivedTotal()
  {

    this.projectService.getAmendSubTotals(this.work_ID, this.Amend_No).subscribe(result=>{
      this.EstTotal=result['Total'];
     // this.EstSubTotal=result['SubTotal'];
     // this.EstBal=result['Balance'];
     this.RecAmt=result['RecTotal'];
    });
    
  }
  
  }
  
  
  
  

