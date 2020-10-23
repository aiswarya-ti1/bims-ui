import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef, MatSnackBar } from '@angular/material';

import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { WorkScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/work-schedule/work-schedule.component';
import { PaymentScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/payment-schedule/payment-schedule.component';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { AddKeyDeliverablesComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/add-key-deliverables.component';
import { AddTermsConditionsComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { EditItemDetailsComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/edit-item-details/edit-item-details.component';
import { AddLineItemsFormDialogComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/add-line-items/add-line-items.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AmendIssueDateComponent } from '../work-amendment/amend-issue-date/amend-issue-date.component';
import { AmendReasonComponent } from './amend-reason/amend-reason.component';
@Component({
    selector     : 'work-amendment-new',
    templateUrl  : './work-amendment-new.component.html',
    styleUrls    : ['./work-amendment-new.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkAmendmentNewComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
       Work_ID : number=0;
    payTerms : string;
    dialogRef_Work: MatDialogRef<WorkScheduleComponent>;
    dialogRef_Pay: MatDialogRef<PaymentScheduleComponent>;
    dialogRef_Key: MatDialogRef<AddKeyDeliverablesComponent>;
    dialogRef_Terms: MatDialogRef<AddTermsConditionsComponent>;
    dialogRef_IssueDate: MatDialogRef<AmendIssueDateComponent>;
    dialogRef_Edit : MatDialogRef<EditItemDetailsComponent>;
    dialogRef_Scope : MatDialogRef<AddLineItemsFormDialogComponent>;
    dialogRef_Reason : MatDialogRef<AmendReasonComponent>;
    
    amendmentFormGroup : FormGroup;
    
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
    paySched:PaymentScheduleDetails[];
    workSched:WorkScheduleDetails[];
    items: LabEstimates[];
    A_Flag : number=0;
    Amend_No : number;
    Arr=Array;
    Serv_ID =[];
    amends=[];
    
    
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,public snackBar: MatSnackBar,
        
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute,

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
                 }

        
        this.amendmentFormGroup=new FormGroup({
             
          work_ID : new FormControl()  ,
          work_Flag : new FormControl(),
          pay_Flag : new FormControl(),
          key_Flag : new FormControl(),
          terms_Flag : new FormControl(),
          est_Flag : new FormControl(),
          totalEst : new FormControl(),
          amend_Flag : new FormControl()
        });
       
       
       }
      
       
    

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
     
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
          this.amendmentFormGroup.controls['work_ID'].setValue(this.Work_ID);
        
   this.getOneWork();       
   this.getAmendNo();
   this.getWorkingAmends();
   
  
    }
    getAmendTotal(no)
    {
      this.projectService.getTotalAmendedItems(this.Work_ID, no).subscribe(result=>{
       
        return result;
      })
    }
    chkAmendIssueDateExists(no)
    {
      this.projectService.chkAmendIssueDateExists(this.Work_ID,no).subscribe(result=>{
        if(result==0)
        {
          this.addAmendIssueDate(no);
        }
        else
        {
          this.router.navigate(['/print-amendment/'+this.Work_ID,no]);
        }
      })
    }
    addAmendIssueDate(no)
    {
      this.dialogRef_IssueDate = this.dialog.open(AmendIssueDateComponent, {
        panelClass:'amend-issue-date-dialog',
        data      : {
         workid : this.Work_ID,
        amendno : no
          
        } 
    });
  
    this.dialogRef_IssueDate.afterClosed()
    .subscribe((response: FormGroup) => {
        
       
        if ( !response )
        {
           
            return;
        }
    });
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
            
            this.A_Flag=result[0]['Amend_Flag'];
                })
    }
    getAmendNo()
    {
      this.projectService.getAmendNo(this.Work_ID).subscribe(result=>{
      this.Amend_No=result;
      this.amendmentFormGroup.controls['amend_Flag'].setValue(this.Amend_No);
    
    })
    }
    getWorkingAmends()
    {
      this.projectService.getWorkingAmends(this.Work_ID).subscribe(result=>{
        this.amends=result;
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
    }
    getAmendLineItems()
    {
      this.projectService.getAmendLineItemsNew(this.Work_ID).subscribe(result=>{
               this.items=result;
        
         
       });
    }
    editAmend(no)
{
  
  this.router.navigate(['/edit-amendment/'+this.Work_ID,no]);
  
}
    printAmend(no)
    {
      
      this.chkAmendIssueDateExists(no);
    }
    addNewAmendment()
    {
      this.projectService.chkReasonExists(this.Work_ID).subscribe(result=>{console.log(result);
      if(result.length==0)
    {
      this.dialogRef_Reason = this.dialog.open(AmendReasonComponent, {
        panelClass:'amend-reason-dialog',
        data      : {
          workid : this.Work_ID,
          
        }
    });
      this.dialogRef_Scope.afterClosed()
      .subscribe((response: FormGroup) => {
       this.getAmendNo();
      
        if ( !response )
        {
            return;
        }
      });
    }
  else{
    this.dialogRef_Scope = this.dialog.open(AddLineItemsFormDialogComponent, {
        panelClass:'add-line-items-dialog',
        data      : {
          workid : this.Work_ID,
          servid: this.Serv_ID,
          type : 1,
          new : 0
        }
    });
      this.dialogRef_Scope.afterClosed()
      .subscribe((response: FormGroup) => {
        
       this.getAmendNo();
       this.getWorkingAmends();
       this.getAmendLineItems();

      
        if ( !response )
        {
          this.getAmendNo();
          this.getWorkingAmends();
          this.getAmendLineItems();
        }
      });

  }});
    
      
      
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
    

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }  
   
  }
    
    

