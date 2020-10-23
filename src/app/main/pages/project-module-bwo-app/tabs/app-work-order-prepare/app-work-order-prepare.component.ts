import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';

import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder,  FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog,  MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleBWOAppComponent } from '../../project-module-bwo-app.component';
import { WorkScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/work-schedule/work-schedule.component';
import { PaymentScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/payment-schedule/payment-schedule.component';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { AddKeyDeliverablesComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/add-key-deliverables.component';
import { AddTermsConditionsComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { WOIsuueDateComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/wo-issue-date/wo-issue-date.component';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/termsAndCondition';
import { ProjectModuleBWOComponent } from 'app/main/pages/project-module-bwo/project-module-bwo.component';
import { AppProjectModuleBWOService } from '../../project-module-bwo-app.service';

@Component({
    selector     : 'app-work-order-prepare',
    templateUrl  : 'app-work-order-prepare.component.html',
    styleUrls    : ['./app-work-order-prepare.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AppWorkOrderPrepareComponent implements OnInit
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
    dialogRef_Issue : MatDialogRef<WOIsuueDateComponent>;
    Item_Count : number=0;
    type_ID : number=0;
    items:LabEstimates[];
    Serv_ID =[];
    assocExists_Flag : number=0;
    Est_Flag : number=0;
    InitWO_Flag :number=0;
    payTerms_Flag : number =0;
    paySched_Flag : number =0;
    workSched_Flag : number =0;
    @Input() woSignUp_Flag : number;
    keys_Flag:number=0;
    terms_Flag : number=0;
    assocs : TenderAssocs[];
    assoc_F : TenderAssocs[];
    assocs_T : TenderAssocs[];
    tenders : TenderDetails[];
    tenderFinal : TenderDetails[];
    keys:KeyDeliverables[];
    terms :TermsAndConditions[];
    values=[];
    AssocName : string;
    quoteFormGroup : FormGroup;
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
    paySched:PaymentScheduleDetails[];
    workSched:WorkScheduleDetails[];
    SegmentID : number=0;
    Role_ID : number=0;
    SubTotal : number=0;
    PendingTotal : number=0;
    workStatus : number =0;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute,
        private snackBar : MatSnackBar,
        

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
            this.Role_ID=this.User['Role_ID'];
                 }

        
        this.quoteFormGroup=new FormGroup({
          workID : new FormControl(),
          typeFlag : new FormControl(),
          countItem : new FormControl(),
          countFlag : new FormControl(),
          assocList : new FormControl()
        
            });
            this.finalizeAssocForm=new FormGroup({
              workID : new FormControl(),
              selectedAssoc : new FormControl()
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
      this.woSignUp_Flag=0;
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];         
            console.log('WoekID '+this.Work_ID);  
            
          });
          this.finalizeAssocForm.controls['workID'].setValue(this.Work_ID);
   this.getOneWork(); 
 this.getServiceIDs(this.Work_ID);
 this.getSelectedAssocList();
 this.getAssocDetails(this.AssocName);
 this.getTenderedAssocs();
 this.getFinalTender(this.Work_ID);
 this.getTenderAssoc(this.Work_ID);
 this.getPaymentTerms();
 this.checkPaySchedExists();
 this.checkWorkSchedExists();
 this.checkKeysExists();
 this.checkTermsExists();
 this.getWorkSchedule();
 this.getPaySchedule();
 this.getKeys();
 this.getTerms();
 

 
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{console.log(result);
         
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.SegmentID=result[0]['Segment_ID'];
            this.woSignUp_Flag=result[0]['WOSignUp_Flag'];
            this.workStatus=result[0]['WorkStatus'];
           
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
    
    getSelectedAssocList()
    {
      
      this.projectService.getSelectedAssocs(this.Work_ID).subscribe(result => {
      this.assocs=result;
      });
    
    }
    
  getLabEstimate()
  {
        this.projectService.getallLabTender(this.AssocName).subscribe(resp1=>{
          this.tenders=resp1;
          if(resp1.length==0)
          {
           
           
          }
          if(resp1.length>0){
            
              this.tenders=resp1;
          
          }
        });
      
        
      }
     
      getAssocDetails($id)
      {
        this.projectService.getAssocTenderDetails($id).subscribe(result=>{
        });
      }
      getTenderedAssocs()
      {
        this.projectService.getTenderedAssocs(this.Work_ID).subscribe(result=>{
          this.assocs_T=result;

        })
      }
      
  
      getFinalTender($id)
      {
        this.projectService.getFinalTender($id).subscribe(result=>{
        this.tenderFinal=result;
        this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);})

      }
      getTenderAssoc($id)
      {
        this.projectService.getFinalTenderAssoc($id).subscribe(result=>{
        this.assoc_F=result;
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
   
    getPaymentTerms()
    {
      this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{
        this.payTerms=result[0]['Value'];
     // alert(this.payTerms);
    })
    }
    checkWorkSchedExists()
    {
      this.projectService.chkWorkSchedExists(this.Work_ID).subscribe(result=>{
        this.workSched_Flag=result;
      })
    }
    checkPaySchedExists()
    {
      this.projectService.chkPaySchedExists(this.Work_ID).subscribe(result=>{
        this.paySched_Flag=result;
      })
    }
    checkKeysExists()
    {
      this.projectService.chkKeysExists(this.Work_ID).subscribe(result=>{
        this.keys_Flag=result;
      })
    }
    checkTermsExists()
    {
      this.projectService.checkTermsExists(this.Work_ID).subscribe(result=>{
      this.terms_Flag=result;
    })
    }
    workSchedule(type, id)
    {
      this.dialogRef_Work = this.dialog.open(WorkScheduleComponent, {
        panelClass:'work-schedule-dialog',
        data      : {
         workid : this.Work_ID,
         typeid : type,
         workSchedID : id ,
         viewid:1
        
          
        }
    });
  
    this.dialogRef_Work.afterClosed().subscribe((response: FormGroup) => {
      this.checkWorkSchedExists();
     this.getWorkSchedule();
      
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
        viewid :1
      }
    });
    
    this.dialogRef_Pay.afterClosed().subscribe((response: FormGroup) => {
      this.checkPaySchedExists();
      this.getPaySchedule();
      this.getPaySubTotal();
      
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
        this.checkKeysExists();
        this.getKeys();
        
         if ( !response )
         {
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
   
    this.checkTermsExists();
    this.getTerms(); 
    
    
     if ( !response )
     {
      this.checkTermsExists();
      this.getTerms();
         return;
     }
    });
}
    getWorkSchedule()
    {
      this.projectService.getWorkSchedule(this.Work_ID).subscribe(result=>{
       
        this.workSched=result;
      });
    }
    getPaySchedule()
    {
      this.projectService.getPaySchedule(this.Work_ID).subscribe(result=>{
        this.paySched=result;
        this.getPaySubTotal();
     
      });
    }
    delKeys(id)
    {
      console.log('Delete Term'+id);
      this.projectService.delKeys(this.Work_ID, id).subscribe(result=>{console.log(result);
      if(result.length==1)
    {
      this.openSnackBar('Key Deliverable Deleted Successfully!!','OK');
      this.getKeys();
    }
  else{
    this.openSnackBar('Something went wrong!!','OK');
    this.getKeys();
  }})
    }
    delTerms(id)
    {
      console.log('Delete Term'+id);
      this.projectService.delTerms(this.Work_ID, id).subscribe(result=>{console.log(result);
      if(result.length==1)
    {
      this.openSnackBar('Term Deleted Successfully!!','OK');
      this.getTerms();
    }
  else
{
  this.openSnackBar('Something went wrong!!','OK');
  this.getTerms();
}})
    }
    getKeys()
    {
      this.projectService.getKeyDeliverables(this.Work_ID).subscribe(result=>{
      this.keys=result;
      
    })
    }
    getTerms()
    {
     // debugger;
      this.projectService.getTermsCondition(this.Work_ID).subscribe(result=>{
this.terms=result;

      });
    }
    finishWO()
    {
      this.dialogRef_Issue = this.dialog.open(WOIsuueDateComponent, {
        panelClass:'wo-issue-date-dialog',
        data      : {
          workid : this.Work_ID,
          typeid : 1
        }
      });
      
      this.dialogRef_Issue.afterClosed()
      .subscribe((response: FormGroup) => {
      this.getOneWork();
      
        if ( !response )
        {
          this.getOneWork();
            return;
        }
      });

      
    }
    printWO()
    {
      this.router.navigate(['print-work-order-6/'+this.Work_ID+'/'+0]);
    }
    woSignedUp()
    {
      this.projectService.woSignedUp(this.Work_ID).subscribe(result=>{
      if(result['Success']==true)
      {
        this.router.navigate(['project-management/'+this.Work_ID]);
      }})
    }
    downloadDesign()
       {
     this.projectService.downloadDesign(this.Work_ID).subscribe(
      
         (res) => {console.log(res[0]);
           
               window.open(res[0]);
              
         });
      
     
         
     }
     getPaySubTotal()
     {
       this.projectService.getPaySubTotal(this.Work_ID).subscribe(result=>{console.log(result);
      this.SubTotal=result[0]['Sum'];
      this.getPendingTotal();
    })
     }
     getPendingTotal()
     {
       this.projectService.getPendingTotal(this.Work_ID).subscribe(result=>{console.log(result);
      this.PendingTotal=result;})
     }
     openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
  }
    
    

