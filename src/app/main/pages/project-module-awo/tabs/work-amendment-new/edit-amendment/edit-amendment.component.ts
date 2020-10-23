import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { WorkScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/work-schedule/work-schedule.component';
import { PaymentScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/payment-schedule/payment-schedule.component';
import { AddKeyDeliverablesComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/add-key-deliverables.component';
import { AmendIssueDateComponent } from '../../work-amendment/amend-issue-date/amend-issue-date.component';
import { AddTermsConditionsComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { EditItemDetailsComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/edit-item-details/edit-item-details.component';
import { AddLineItemsFormDialogComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/add-line-items/add-line-items.component';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/termsAndCondition';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


@Component({
    selector     : 'edit-amendment',
    templateUrl  : './edit-amendment.component.html',
    styleUrls    : ['./edit-amendment.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditAmendmentComponent implements OnInit
{
    Work_ID : number;
    AmendNo : number;
    payTerms : string;
    dialogRef_Work: MatDialogRef<WorkScheduleComponent>;
    dialogRef_Pay: MatDialogRef<PaymentScheduleComponent>;
    dialogRef_Key: MatDialogRef<AddKeyDeliverablesComponent>;
    dialogRef_Terms: MatDialogRef<AddTermsConditionsComponent>;
    dialogRef_IssueDate: MatDialogRef<AmendIssueDateComponent>;
    dialogRef_Edit : MatDialogRef<EditItemDetailsComponent>;
    dialogRef_Scope : MatDialogRef<AddLineItemsFormDialogComponent>;
    confirmDialogRef : MatDialogRef<FuseConfirmDialogComponent>;
    Item_Count : number=0;
    type_ID : number=0;
    items:LabEstimates[];
    Serv_ID =[];
    assocExists_Flag : number=0;
    Est_Flag : number=0;
    InitWO_Flag :number=0;
    payTermsA_Flag : number =0;
    paySchedA_Flag : number =0;
    workSchedA_Flag : number =0;
    itemsA_Flag:number=0;
    woSignUp_Flag : number=0;
    keysA_Flag:number=0;
    termsA_Flag : number=0;
   // amendmentFormGroup : FormGroup;
    workSched : WorkScheduleDetails[];
    paySched : PaymentScheduleDetails[];
    keys : KeyDeliverables[];
    SegmentID : number;
    terms : TermsAndConditions[];



 constructor(public projectService: ProjectModuleService,  public router:Router,private snackBar : MatSnackBar,
      private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }

    ngOnInit(): void
    {
         this.activatedRoute.params.subscribe((params: Params) => {
      
        this.Work_ID=params['workid'];
        this.AmendNo=params['no'];
      });
      this.getOneWork();
      this.getServiceIDs(this.Work_ID);
 this.getAmendKeyDeliverables(this.Work_ID);
 this.getAmendLineItems(this.Work_ID);
 this.getAmendPaySchedule(this.Work_ID);
 this.getAmendWorkSchedule(this.Work_ID);
 
 this.getAmendTerms(this.Work_ID);
    }

    getServiceIDs($id)
    {
    var ids=[];
    this.projectService.getServiceIDs($id).subscribe(result=>{
            for(var i=0;i<result.length;i++)
      {
        ids.push(result[i]["service_ID"]);
    }

      this.Serv_ID.push(ids);
    });
    
    
    }
    getPaymentTerms()
    {
      this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{
        this.payTerms=result[0]['Value'];
     
    })
    }
    getAmendLineItems($id)
    {
     
      this.projectService.getAmendLineItems($id, this.AmendNo).subscribe(result=>{console.log(result);
        
        this.checkAmendLineItemsExists();
        this.items=result;
        if(result.length==0)
     {
         
     }     
     else{
     }
         
       },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
    }
    getAmendWorkSchedule($id)
  {
    this.projectService.getAmendWorkSchedule($id , this.AmendNo).subscribe(result=>{
      this.checkAmendWorkSchedExists();
     this.workSched=result;
     if(result.length==0)
     {
           
     }     
     else{
      
     
       
     }
     
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }
  getAmendPaySchedule($id)
  {
    this.projectService.getAmendPaySchedule($id, this.AmendNo).subscribe(result=>{
      this.checkAmendPaySchedExists();
     this.paySched=result;
     if(result.length==0)
      {
       // this.amendmentFormGroup.controls['pay_Flag'].setValue('0');
      }  
      else{
      //  this.amendmentFormGroup.controls['pay_Flag'].setValue('1');
      }
     
     
      
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }
  getAmendKeyDeliverables($id)
  {
    this.projectService.getAmendKeyDeliverables($id, this.AmendNo).subscribe(result=>{
      this.checkAmendKeysExists();
     this.keys=result;
     if(result.length==0)
      {
       // this.amendmentFormGroup.controls['key_Flag'].setValue('0');
      }  
      else{
      //  this.amendmentFormGroup.controls['key_Flag'].setValue('1');
      }
    
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }
  getAmendTerms($id)
  {
    this.projectService.getAmendTerms($id, this.AmendNo).subscribe(result=>{
      this.checkAmendTermsExists();
this.terms=result;
if(result.length==0)
{
//  this.amendmentFormGroup.controls['terms_Flag'].setValue('0');
}
else
{
//this.amendmentFormGroup.controls['terms_Flag'].setValue('1');
}
    });
  }
    checkAmendLineItemsExists()
    {
      this.projectService.chkAmendLineItemsExists(this.Work_ID, this.AmendNo).subscribe(result=>{
        this.itemsA_Flag=result;
      })
    }
    checkAmendWorkSchedExists()
    {
      this.projectService.chkAmendWorkSchedExists(this.Work_ID, this.AmendNo).subscribe(result=>{
        this.workSchedA_Flag=result;
      })
    }
    checkAmendPaySchedExists()
    {
      this.projectService.chkAmendPaySchedExists(this.Work_ID, this.AmendNo).subscribe(result=>{
        this.paySchedA_Flag=result;
      })
    }
    checkAmendKeysExists()
    {
      this.projectService.chkAmendKeysExists(this.Work_ID, this.AmendNo).subscribe(result=>{
        this.keysA_Flag=result;
      })
    }
    checkAmendTermsExists()
    {
      this.projectService.checkAmendTermsExists(this.Work_ID , this.AmendNo).subscribe(result=>{
      this.termsA_Flag=result;
    })
    }
    addLineItems($type)
  {
   
    this.dialogRef_Scope = this.dialog.open(AddLineItemsFormDialogComponent, {
      panelClass:'add-line-items-dialog',
      data      : {
        workid : this.Work_ID,
        servid: this.Serv_ID,
        type : $type,
        new : this.AmendNo
      }
  });
    this.dialogRef_Scope.afterClosed()
    .subscribe((response: FormGroup) => {
     //this.getAmendNo();
     this.getAmendLineItems(this.Work_ID);
      if ( !response )
      {
          return;
      }
    });
  }
   
  addLineItemDetails($id)
    {
      console.log($id);
    this.dialogRef_Edit = this.dialog.open(EditItemDetailsComponent, {
      panelClass:'edit-item-details-dialog',
      data      : {
        leID : $id,
        workID : this.Work_ID,
      
      }
  });

  this.dialogRef_Edit.afterClosed()
      .subscribe((response: FormGroup) => {
      this.getAmendLineItems(this.Work_ID);
    //  this.getTotalAmend1Items();
       
            
            
    });
  }
    workSchedule(type, id)
    {
      this.dialogRef_Work = this.dialog.open(WorkScheduleComponent, {
        panelClass:'work-schedule-dialog',
        data      : {
         workid : this.Work_ID,
         typeid : type,
         workSchedID : id,
         viewid : 2 ,
         amendid : this.AmendNo
        
          
        }
    });
  
    this.dialogRef_Work.afterClosed().subscribe((response: FormGroup) => {
    
      this.getAmendWorkSchedule(this.Work_ID);
       if ( !response )
       {
           return;
       }
      });
    }
    paymentSchedule(type, id)
    {

    
    this.dialogRef_Pay = this.dialog.open(PaymentScheduleComponent, {
      panelClass:'payment-schedule-dialog',
      data      : {
        workid : this.Work_ID,
        typeid : type,
        paySchedID : id,
        viewid :2,
        amendid : this.AmendNo
      }
    });
    
    this.dialogRef_Pay.afterClosed().subscribe((response: FormGroup) => {
     this.getAmendPaySchedule(this.Work_ID);
       if ( !response )
       {
           return;
       }
      });
    }
    addKeys(type)
    {
      this.dialogRef_Key = this.dialog.open(AddKeyDeliverablesComponent, {
        panelClass:'add-key-deliverables-dialog',
        data      : {
          workid : this.Work_ID,
          typeid : type,
          amendid : this.AmendNo
        }
      });
      
      this.dialogRef_Key.afterClosed().subscribe((response: FormGroup) => {
      this.getAmendKeyDeliverables(this.Work_ID);
        
         if ( !response )
         {
          this.getAmendKeyDeliverables(this.Work_ID);
             return;
         }
        });
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.SegmentID=result[0]['Segment_ID'];
            this.woSignUp_Flag=result[0]['WOSignUp_Flag'];
            console.log('Segment' +this.SegmentID);
           
           
                })
    }  

    addTerms($type)
 {
  this.dialogRef_Terms = this.dialog.open(AddTermsConditionsComponent, {
    panelClass:'add-terms-conditions-dialog',
    data      : {
      workid : this.Work_ID,
      typeid : $type,
      segid : this.SegmentID,
      amendid : this.AmendNo
    }
  });
  
  this.dialogRef_Terms.afterClosed().subscribe((response: FormGroup) => {
      this.getAmendTerms(this.Work_ID);
    
     if ( !response )
     {
      this.getAmendTerms(this.Work_ID);
         return;
     }
    });
}
delKeys(id)
{
  
  this.projectService.delKeys(this.Work_ID, id).subscribe(result=>{
  if(result.length==1)
{
  this.openSnackBar('Key Deliverable Deleted Successfully!!','OK');
  this.getAmendKeyDeliverables(this.Work_ID);
}
else{
this.openSnackBar('Something went wrong!!','OK');
this.getAmendKeyDeliverables(this.Work_ID);
}
},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
}
delTerms(id)
{
  console.log('Delete Term'+id);
  this.projectService.delTerms(this.Work_ID, id).subscribe(result=>{
  if(result.length==1)
{
  this.openSnackBar('Term Deleted Successfully!!','OK');
  this.getAmendTerms(this.Work_ID);
}
else
{
this.openSnackBar('Something went wrong!!','OK');
this.getAmendTerms(this.Work_ID);
}},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
finishAmendment()
{
  this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
    disableClose: false
});

this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish Amendment?';

this.confirmDialogRef.afterClosed().subscribe(result => {
    if ( result )
    {
        if(result==true)
        {
         
          this.projectService.finishAmend(this.Work_ID, this.AmendNo).subscribe(result=>{console.log(result);
            if(result==true)
            {
              this.openSnackBar('Amendment Completed Successfully!!','OK');
              this.router.navigate(['/pages/project-management/',this.Work_ID]);
            }
            else
            {
              this.openSnackBar('Something went wrong!!','Ok');
            }
           
          },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            })
        }
    }
    this.confirmDialogRef = null;
});
}
}
