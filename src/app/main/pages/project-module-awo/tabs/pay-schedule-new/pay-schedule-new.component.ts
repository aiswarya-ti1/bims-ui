import { Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ExtraPaymentDialog } from '../pay-schedule-awo/extra-payment/extra-payment.component';
import { Payments } from '../pay-schedule-awo/payments';

@Component({
    selector   : 'pay-schedule-new',
    templateUrl: './pay-schedule-new.component.html',
    styleUrls  : ['./pay-schedule-new.component.scss'],
    
    
})
export class PayScheduleNewComponent
{
   
    dataSource2;
    type: number=0;
    work_ID : number=0;
    User:Array<User>;
    User_Name: string='';
    Role_ID : number=0;
    //dialogRef_Extra: MatDialogRef<ExtraPaymentDialog>;
    displayedColumns2 = ['Stage','Amount','ExpPayDate'];
    dialogRef_Extra: MatDialogRef<ExtraPaymentDialog>;
    payments :Payments;
    payDetails : PaymentScheduleDetails;
    
    tableFormGroup : FormGroup;
    constructor(public projectService:ProjectModuleService,
      public router:Router,
      private _formBuilder: FormBuilder,private sessionSt:SessionStorageService,private activatedRoute: ActivatedRoute,
      private dialog : MatDialog) 
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
        this.getPaySchedule();
        this.getPayments();
    }
    
    getPaySchedule()
    {
      this.projectService.getPaySchedule(this.work_ID).subscribe(result=>{
               this.payDetails=result;})

    }
    getPayments()
    {
      this.projectService.getPayments(this.work_ID).subscribe(result=>{
        this.payments=result;
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
      }
    })
    }
   
    addPayment(id)
    {
      //console.log(id);
      this.dialogRef_Extra = this.dialog.open(ExtraPaymentDialog, {
        panelClass:'extra-payment-dialog',
        data      : {
       payid : id,
          
        } 
    });
  
    this.dialogRef_Extra.afterClosed()
    .subscribe((response: FormGroup) => {
        
      this.getPaySchedule();
      this.getPayments();
        if ( !response )
        {
          this.getPaySchedule();
          this.getPayments();
            return;
        }
    });
    }

    
  
  }
  
  
  
  

