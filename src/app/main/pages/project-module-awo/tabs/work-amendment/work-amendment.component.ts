import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef, MatSnackBar } from '@angular/material';
import { Pipe, PipeTransform } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { FuseNavHorizontalItemComponent } from '@fuse/components/navigation/horizontal/item/item.component';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { WorkScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/work-schedule/work-schedule.component';
import { PaymentScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/payment-schedule/payment-schedule.component';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { AddKeyDeliverablesComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/add-key-deliverables.component';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/termsAndCondition';
import { AddTermsConditionsComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { EditItemDetailsComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/edit-item-details/edit-item-details.component';
import { AddLineItemsFormDialogComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/add-line-items/add-line-items.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AmendIssueDateComponent } from './amend-issue-date/amend-issue-date.component';

@Component({
    selector     : 'work-amendment',
    templateUrl  : './work-amendment.component.html',
    styleUrls    : ['./work-amendment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkAmendmentComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    finalizeAssocForm : FormGroup;
    Work_ID : number=0;
    payTerms : string;
    dialogRef_Work: MatDialogRef<WorkScheduleComponent>;
    dialogRef_Pay: MatDialogRef<PaymentScheduleComponent>;
    dialogRef_Key: MatDialogRef<AddKeyDeliverablesComponent>;
    dialogRef_Terms: MatDialogRef<AddTermsConditionsComponent>;
    dialogRef_IssueDate: MatDialogRef<AmendIssueDateComponent>;
    dialogRef_Edit : MatDialogRef<EditItemDetailsComponent>;
    dialogRef_Scope : MatDialogRef<AddLineItemsFormDialogComponent>;
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
    assocs : TenderAssocs[];
    assoc_F : TenderAssocs[];
    assocs_T : TenderAssocs[];
    tenders : TenderDetails[];
    tenderFinal : TenderDetails[];
    keys:KeyDeliverables[];
    terms :TermsAndConditions[];
    values=[];
    AssocName : string;
    amendmentFormGroup : FormGroup;
    
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
    paySched:PaymentScheduleDetails[];
    workSched:WorkScheduleDetails[];
    SegmentID : number=0;
    GrandTotal : number=0;
    TenderTotal : number=0;
    AmdTotal1 : number=0;
    AmdTotal2 : number=0;
    AmdTotal3 : number=0;
    AmdTotal4 : number=0;
    A_Flag : number=0;
    Amend_No : number=1;
    
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
          this.getAmendNo();
   this.getOneWork();       
 
 this.getServiceIDs(this.Work_ID);
 this.getAmendKeyDeliverables(this.Work_ID);
 this.getAmendLineItems(this.Work_ID);
 this.getAmendPaySchedule(this.Work_ID);
 this.getAmendWorkSchedule(this.Work_ID);
 
 this.getAmendTerms(this.Work_ID);
 this.getTotalAmend1Items();
 this.getTotalAmend2Items();
 this.getTotalAmend3Items();
 this.getTotalAmend4Items();
 this.getGrandTotal();
 this.getTenderTotal();
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.SegmentID=result[0]['Segment_ID'];
            this.woSignUp_Flag=result[0]['WOSignUp_Flag'];
            this.A_Flag=result[0]['Amend_Flag'];
          //  alert('AFlag'+this.A_Flag);
           
                })
    }
    getAmendNo()
    {
      this.projectService.getAmendNo(this.Work_ID).subscribe(result=>{
      
      if(result[0]['Max']==0)
      {
        this.Amend_No=1;
      }
      else{
        this.Amend_No=result[0]['Max'];
      }
      this.amendmentFormGroup.controls['amend_Flag'].setValue(this.Amend_No);
    })
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
   
    getPaymentTerms()
    {
      this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{
        this.payTerms=result[0]['Value'];
     
    })
    }
    getAmendLineItems($id)
    {
      this.getAmendNo();
      this.projectService.getAmendLineItems($id, this.Amend_No).subscribe(result=>{
        
        this.checkAmendLineItemsExists();
        this.items=result;
        if(result.length==0)
     {
             this.amendmentFormGroup.controls['est_Flag'].setValue('0');
     }     
     else{
      
       this.amendmentFormGroup.controls['est_Flag'].setValue('1');
       
     }
         
       });
    }
    getAmendWorkSchedule($id)
  {
    this.projectService.getAmendWorkSchedule($id , this.Amend_No).subscribe(result=>{
      this.checkAmendWorkSchedExists();
     this.workSched=result;
     if(result.length==0)
     {
             this.amendmentFormGroup.controls['work_Flag'].setValue('0');
     }     
     else{
      
       this.amendmentFormGroup.controls['work_Flag'].setValue('1');
       
     }
     
      
    });
  }
  getAmendPaySchedule($id)
  {
    this.projectService.getAmendPaySchedule($id, this.Amend_No).subscribe(result=>{
      this.checkAmendPaySchedExists();
     this.paySched=result;
     if(result.length==0)
      {
        this.amendmentFormGroup.controls['pay_Flag'].setValue('0');
      }  
      else{
        this.amendmentFormGroup.controls['pay_Flag'].setValue('1');
      }
     
     
      
      
    });
  }
  getAmendKeyDeliverables($id)
  {
    this.projectService.getAmendKeyDeliverables($id, this.Amend_No).subscribe(result=>{
      this.checkAmendKeysExists();
     this.keys=result;
     if(result.length==0)
      {
        this.amendmentFormGroup.controls['key_Flag'].setValue('0');
      }  
      else{
        this.amendmentFormGroup.controls['key_Flag'].setValue('1');
      }
    
    });
  }
  getAmendTerms($id)
  {
    this.projectService.getAmendTerms($id, this.Amend_No).subscribe(result=>{
      this.checkAmendTermsExists();
this.terms=result;
if(result.length==0)
{
  this.amendmentFormGroup.controls['terms_Flag'].setValue('0');
}
else
{
this.amendmentFormGroup.controls['terms_Flag'].setValue('1');
}
    });
  }
    checkAmendLineItemsExists()
    {
      this.projectService.chkAmendLineItemsExists(this.Work_ID, this.Amend_No).subscribe(result=>{
        this.itemsA_Flag=result;
      })
    }
    checkAmendWorkSchedExists()
    {
      this.projectService.chkAmendWorkSchedExists(this.Work_ID, this.Amend_No).subscribe(result=>{
        this.workSchedA_Flag=result;
      })
    }
    checkAmendPaySchedExists()
    {
      this.projectService.chkAmendPaySchedExists(this.Work_ID, this.Amend_No).subscribe(result=>{
        this.paySchedA_Flag=result;
      })
    }
    checkAmendKeysExists()
    {
      this.projectService.chkAmendKeysExists(this.Work_ID, this.Amend_No).subscribe(result=>{
        this.keysA_Flag=result;
      })
    }
    checkAmendTermsExists()
    {
      this.projectService.checkAmendTermsExists(this.Work_ID , this.Amend_No).subscribe(result=>{
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
        type : $type
      }
  });
    this.dialogRef_Scope.afterClosed()
    .subscribe((response: FormGroup) => {
     this.getAmendNo();
     this.getAmendLineItems(this.Work_ID);
      if ( !response )
      {
          return;
      }
    });
  }
   
  addLineItemDetails($id)
    {
      
    this.dialogRef_Edit = this.dialog.open(EditItemDetailsComponent, {
      panelClass:'edit-item-details-dialog',
      data      : {
        leID : $id,
        workID : this.Work_ID
      }
  });

  this.dialogRef_Edit.afterClosed()
      .subscribe((response: FormGroup) => {
      this.getAmendLineItems(this.Work_ID);
       
            
            
    });
  }
    workSchedule(type, id)
    {
      this.dialogRef_Work = this.dialog.open(WorkScheduleComponent, {
        panelClass:'work-schedule-dialog',
        data      : {
         workid : this.Work_ID,
         typeid : type,
         workSchedID : id 
        
          
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
        paySchedID : id
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
          typeid : type
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
    addTerms($type)
 {
  this.dialogRef_Terms = this.dialog.open(AddTermsConditionsComponent, {
    panelClass:'add-terms-conditions-dialog',
    data      : {
      workid : this.Work_ID,
      typeid : $type,
      segid : this.SegmentID
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
getTotalAmend1Items()
  {
    
    this.projectService.getTotalAmend1Items(this.Work_ID, 1).subscribe(result=>{
     this.AmdTotal1=result;
     this.amendmentFormGroup.controls['totalEst'].setValue(result);
     
    });

  }
  getTotalAmend2Items()
  {
    
    this.projectService.getTotalAmend2Items(this.Work_ID, 2).subscribe(result=>{
   
     this.AmdTotal2=result;

     this.amendmentFormGroup.controls['totalEst'].setValue(result);
     
    });

  }
  getTotalAmend3Items()
  {
    
    this.projectService.getTotalAmend3Items(this.Work_ID, 3).subscribe(result=>{
     this.AmdTotal3=result;
     this.amendmentFormGroup.controls['totalEst'].setValue(result);
     
    });

  }
  getTotalAmend4Items()
  {
    
    this.projectService.getTotalAmend3Items(this.Work_ID, 4).subscribe(result=>{
     this.AmdTotal4=result;
 
     this.amendmentFormGroup.controls['totalEst'].setValue(result);
     
    });

  }
  getGrandTotal()
  {
     this.projectService.getGrandTotal(this.Work_ID).subscribe(result=>{
      this.GrandTotal=result[0];
    })
  }
  getTenderTotal()
  {
    this.projectService.getTenderTotal(this.Work_ID).subscribe(result=>{
      this.TenderTotal=result;
    })
  }
  finishAmendment(values)
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
            this.getTotalAmend1Items();
            this.getTotalAmend2Items();
            this.getTotalAmend3Items();
            this.getTotalAmend4Items();

            
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
   
  printAmend(no)
    {
      if(no==1)
      {
        this.chkAmend1IssueDateExists(1);
      }
      else if(no==2)
      {
        this.chkAmend2IssueDateExists(2);
      }
      else if(no==3)
      {
        this.chkAmend3IssueDateExists(3);
      }else if(no==4)
      {
        this.chkAmend3IssueDateExists(4);
      }
      
    }
    chkAmend1IssueDateExists(no)
    {
      this.projectService.chkAmend1IssueDateExists(this.Work_ID).subscribe(result=>{
        if(result==0)
        {
          this.addAmendIssueDate(1);
        }
        else
        {
          this.router.navigate(['/pages/project-management/print-amendment/'+this.Work_ID,no]);
        }
      })
    }
    chkAmend2IssueDateExists(no)
    {
      this.projectService.chkAmend2IssueDateExists(this.Work_ID).subscribe(result=>{
        if(result==0)
        {
          this.addAmendIssueDate(2);
        }
        else
        {
          this.router.navigate(['/pages/project-management/print-amendment/'+this.Work_ID,no]);
        }
      })
    }
    chkAmend3IssueDateExists(no)
    {
      this.projectService.chkAmend3IssueDateExists(this.Work_ID).subscribe(result=>{
        if(result==0)
        {
          this.addAmendIssueDate(3);
        }
        else
        {
          this.router.navigate(['/pages/project-management/print-amendment/'+this.Work_ID,no]);
        }
      })
    }
    chkAmend4IssueDateExists(no)
    {
      this.projectService.chkAmend4IssueDateExists(this.Work_ID).subscribe(result=>{
        if(result==0)
        {
          this.addAmendIssueDate(4);
        }
        else
        {
          this.router.navigate(['/pages/project-management/print-amendment/'+this.Work_ID,no]);
        }
      })
    }
    addAmendIssueDate($no)
    {
      this.dialogRef_IssueDate = this.dialog.open(AmendIssueDateComponent, {
        panelClass:'amend-issue-date-dialog',
        data      : {
         workid : this.Work_ID,
        amendno : $no
          
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

    viewAmend(no)
    {
      this.router.navigate(['/pages/project-management/view-amendment/'+this.Work_ID,no]);
    }
    
   
  }
    
    

