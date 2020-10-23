import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { ViewWorkScheduleDialogComponent } from './view-work-schedule/view-work-schedule.component';


@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentScheduleComponent implements OnInit {

  paymentForm : FormGroup;
  TypeID : number=0;
  SchedID : number=0;
  ViewID : number;
  dialogRef_View : MatDialogRef<ViewWorkScheduleDialogComponent>;
  Amend_ID : number;
  WOTotal : number;

  constructor(public matDialogRef: MatDialogRef<PaymentScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,private dialog : MatDialog,
    private formBuilder: FormBuilder,public projectService:ProjectModuleService) { 
      this.paymentForm = new FormGroup(
        {
          type_ID : new FormControl(),
          work_ID : new FormControl(),
          payStage : new FormControl(),
          amount : new FormControl(),
          payDate :new FormControl(),
          cmnts  : new FormControl(),
          sched_ID : new FormControl(),
          amend_ID : new FormControl()

        });
        this.paymentForm = this.formBuilder.group({
          type_ID :[''],
          work_ID :[''],
          payStage :  ['', Validators.required],
          amount :['', Validators.required],
          payDate : ['', Validators.required],
          cmnts : [''],
          sched_ID :[''],
          amend_ID :['']
        });
    }

  ngOnInit() {
    this.paymentForm.controls["work_ID"].setValue(this.data['workid']);
    this.paymentForm.controls["type_ID"].setValue(this.data['typeid']);
    this.paymentForm.controls["sched_ID"].setValue(this.data['paySchedID']);
    this.paymentForm.controls["amend_ID"].setValue(this.data['amendid']);
    this.TypeID=this.data['typeid'];
    this.SchedID=this.data['paySchedID'];
    this.ViewID=this.data['viewid'];
    this.Amend_ID=this.data['amendid'];
    if(this.SchedID!==0)
    {
      this.getOnePaySchedDetails(this.SchedID);
    }
    if(this.Amend_ID==0)
    {
      this.getWOTotal(this.data['workid']);
    }
    else if(this.Amend_ID!=0){
this.getAmendTotal(this.data['workid'], this.Amend_ID);

    }
  }
  saveDetails($values)
  {
    console.log($values);
    this.projectService.savePaymentDetails($values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Payment Schedule Added Successfully!!', 'OK');
      }
      else{
        this.openSnackBar('Something went wrong!!', 'OK');
      }

    })
  }
  getWOTotal(id)
  {
    this.projectService.getTenderTotal(id).subscribe(result=>{console.log(result);
    this.WOTotal=result['Total'];})
  }
  getAmendTotal(wid, aid)
  {
    this.projectService.getAmendSubTotals(wid, aid).subscribe(result=>{console.log(result);
    this.WOTotal=result['Total'];})
  }
  getOnePaySchedDetails(id)
  {
    this.projectService.getOnePaySchedDetails(id).subscribe(result=>{console.log(result);
      this.paymentForm.controls["payStage"].setValue(result[0]['Payment_Phase']);
      this.paymentForm.controls["amount"].setValue(result[0]['Amount']);
      this.paymentForm.controls["payDate"].setValue(result[0]['Payment_Date']);
      this.paymentForm.controls["cmnts"].setValue(result[0]['Remarks']);

    })
  }
  editPaySchDetails(values)
  {
    this.projectService.editPaySchDetails(values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Payment Schedule Added Successfully!!', 'OK');
      }
      else{
        this.openSnackBar('Something went wrong!!', 'OK');
      }
    })
  }

  clear()
  {
    this.paymentForm.controls["payStage"].reset();
    this.paymentForm.controls["amount"].reset();
    this.paymentForm.controls["payDate"].reset();
    this.paymentForm.controls["cmnts"].reset();
    
    this.paymentForm.controls["work_ID"].setValue(this.data['workid']);
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  deletePaySch(values)
  {
    this.projectService.deletePaySch(values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Payment Schedule deleted Successfully!!', 'OK');
      }
      else{
        this.openSnackBar('Something went wrong!!', 'OK');
      }
    }) 
  }
  viewSched()
  {
    this.dialogRef_View = this.dialog.open(ViewWorkScheduleDialogComponent, {
      panelClass:'view-work-schedule-dialog',
      data      : {
        workid : this.data['workid'],
        viewid : this.ViewID 
       
      }
    });
    
    this.dialogRef_View.afterClosed().subscribe((response: FormGroup) => {
     
          
       if ( !response )
       {
       
           return;
       }
      });

  }
}
