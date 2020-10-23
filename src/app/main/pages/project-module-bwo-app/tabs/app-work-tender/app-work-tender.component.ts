import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog,  MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';



import { ProjectModuleBWOAppComponent } from '../../project-module-bwo-app.component';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { TenderDetailsComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/tender-details/tender-details.component';
import { PaymentTermsComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/payment-terms/payment-terms.component';
import { AssociateSelectionNewComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/assoc-selection-new/assoc-selection-new.component';
import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/termsAndCondition';
import { AddTermsConditionsComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { AppAssociateSelectionNewComponent } from './app-assoc-selection-new/app-assoc-selection-new.component';
import { AddKeyDeliverablesComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/add-key-deliverables.component';
import { AppAddKeyDeliverablesComponent } from './app-add-key-deliverables/app-add-key-deliverables.component';
import { AppAddTermsConditionsComponent } from './app-add-terms-conditions/app-add-terms-conditions.component';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { AppProjectModuleBWOService } from '../../project-module-bwo-app.service';
import { TenderKeys } from './tenderKeys';
import { TenderTerms } from './tenderTerms';
import { AppWorkTenderDetailsComponent } from './app-work-tender-details/app-work-tender-details.component';
import { AppTenderRateComponent } from './app-tender-rate/app-tender-rate.component';
import { PushTenderToCustomerComponent } from './push-tender-customer/push-tender-customer.component';


@Component({
    selector     : 'app-work-tender',
    templateUrl  : './app-work-tender.component.html',
    styleUrls    : ['./app-work-tender.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers:[ProjectModuleBWOAppComponent]
})
export class AppWorkTenderComponent implements OnInit
{
  loading: boolean=false;
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    finalizeAssocForm : FormGroup;
    Work_ID : number=0;
    payTerms : string;
    dialogRef;
    Item_Count : number=0;
    type_ID : number=0;
    items:LabEstimates[];
    Serv_ID =[];
   @Input() assocExists_Flag : number;
    serviceAssocExists_Flag : number =0;
    Est_Flag : number=0;
    SegmentID : number;
    keys_Flag : number;
    terms_Flag : number;
    @Input() InitWO_Flag :number;
    @Input() payTerms_Flag : number;
    @Input() generalTerms_Flag : number;
    assocs : TenderAssocs[];
    assoc_Off : TenderAssocs[];
    assoc_On : TenderAssocs[];
    assoc_final :TenderAssocs[];
    offTenders : TenderDetails[];
    onTenders :TenderDetails[];
    finalTender :TenderDetails[];
    keys :KeyDeliverables[];
    offTender_Count : number;
    onTender_Count : number;
    key_button : number;
    pushToCust_Flag:number;
   
    terms:TermsAndConditions[];
    values=[];
    AssocName : string;
    quoteFormGroup : FormGroup;
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
    dialogRef_Assoc : MatDialogRef<AppAssociateSelectionNewComponent>;
    dialogRef_Tender : MatDialogRef<TenderDetailsComponent>;
    dialogRef_PayTerm :MatDialogRef<PaymentTermsComponent>;
    dialogRef_AddNew : MatDialogRef<AddNewServiceAssocComponent>;
    dialogRef_Terms :MatDialogRef<AppAddTermsConditionsComponent>;
    dialogRef_Key : MatDialogRef<AppAddKeyDeliverablesComponent>;
    dialogRef_TenderDetails : MatDialogRef<AppWorkTenderDetailsComponent>;
    dialogRef_TenderRate : MatDialogRef<AppTenderRateComponent>;
    dialogRef_Push : MatDialogRef<PushTenderToCustomerComponent>;
tenderKeys :TenderKeys[];
tenderTerms :TenderTerms[];
    Role_ID : number=0;
    workStatus : number=0;
    totals : TenderAssocs[];
    @Output() initFlagEvent=new EventEmitter<number>();
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
      
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private bwo : ProjectModuleBWOAppComponent,
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute,
        private snackBar : MatSnackBar,
        public projAppService: AppProjectModuleBWOService
        

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
      this.payTerms_Flag=0;
      this.assocExists_Flag;
      this.InitWO_Flag=0;
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
          this.finalizeAssocForm.controls['workID'].setValue(this.Work_ID);
   this.getOneWork();       
 this.getWorkLineItems();
 this.getServiceIDs(this.Work_ID);
 this.chkOfflineTenderExists();
 this.chkOnlineTenderExists();
 this.checkKeysExists();
 this.getKeys();
 this.checkTermsExists();
 this.getTerms();
 this.checkPaymentTermsExists();
 this.getPaymentTerms();
 this.getAllOfflineAssocs();
 this.getTenderTotals();
 this.getAllOfflineTenders();
 this.getAllOnlineAssocs();
 this.getAllOnlineTenders();
 this.getAllTenderKeys();
 this.getAllTenderTerms();
 this.chkFinishTenderExists();


    
    
    }
    getOneWork()
    {
        this.projAppService.biws_getOneWork(this.Work_ID).subscribe(result=>{
         
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.initFlagEvent.emit(this.InitWO_Flag);
            this.workStatus=result[0]['WorkStatus'];
            this.SegmentID=result[0]['Segment_ID'];
           
                });
              
    }
  

    getWorkLineItems()
    {
        
    this.projAppService.biws_getWorkLineItems(this.Work_ID).subscribe(result=>{console.log(result);
       this.items=result;
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
    chkOfflineTenderExists()
    {
      this.projAppService.biws_chkOffTenderExists(this.Work_ID).subscribe(result=>{console.log(result);
        this.offTender_Count=result;
        if(this.offTender_Count==0)
        {
          this.key_button=0;
        }
        else if(this.offTender_Count!=0)
        {
          this.key_button=1;
        }
      })     
    }
    chkOnlineTenderExists()
    {
      this.projAppService.biws_chkOnTenderExists(this.Work_ID).subscribe(result=>{console.log(result);
        this.onTender_Count=result;
        if(this.onTender_Count==0)
        {
          this.key_button=0;
        }
        else if(this.onTender_Count!=0)
        {
          this.key_button=1;
        }
      })
    }
    getAllOfflineTenders()
    {
      this.projAppService.biws_getAllOfflineTenders(this.Work_ID).subscribe(result=>{console.log(result);
        this.offTenders=result;
      })
    }
    getAllOnlineTenders()
    {
      this.projAppService.getAllOnlineTenders(this.Work_ID).subscribe(result=>{console.log(result);
        this.onTenders=result;
      })
    }
    getAllOfflineAssocs()
    {
      this.projAppService.biws_getAllOfflineAssocs(this.Work_ID).subscribe(result=>{console.log(result);
        this.assoc_Off=result;
         this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);
      })

    }
    getAllOnlineAssocs()
    {
      this.projAppService.getAllOnlineAssocs(this.Work_ID).subscribe(result=>{console.log(result);
        this.assoc_On=result;
         this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);
      })
    }
    getAllTenderKeys()
    {
      this.projAppService.getAllTenderKeys(this.Work_ID).subscribe(result=>{console.log(result);
        this.tenderKeys=result;

      })
    }
    getAllTenderTerms()
    {
      this.projAppService.getAllTenderTerms(this.Work_ID).subscribe(result=>{console.log(result);
        this.tenderTerms=result;

      })
    }
    
    
      addNewAssoc(type)
      {
        
        this.dialogRef_AddNew = this.dialog.open(AddNewServiceAssocComponent, {
          panelClass:'add-new-associate-dialog',
          data      : {
            typeid : type
           
          }
      });
      
      this.dialogRef_AddNew.afterClosed()
          .subscribe((response: FormGroup) => {
                    this.chkOfflineTenderExists();
                    this.chkOnlineTenderExists();
           if(!response)
           {
            
           }
          
             
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
    
     openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
    selectAssoc(type)// for online/offline assoc selection
    {
      
      if(this.keys_Flag!=0 && this.terms_Flag!=0 && this.payTerms_Flag!=0)
      {
        this.dialogRef_Assoc = this.dialog.open(AppAssociateSelectionNewComponent, {
          panelClass:'app-assoc-selection-new-dialog',
          data      : {
           workid : this.Work_ID,
           type : type,
           servid : this.Serv_ID
            
          }
      });
    
      this.dialogRef_Assoc.afterClosed()
      .subscribe((response: FormGroup) => {
        
       
                   this.getAllOfflineAssocs();
                   this.getAllOnlineAssocs();
                   this.getAllOnlineTenders();
                   this.getAllOfflineTenders();
          if ( !response )
          {
            
                         return;
          }
      });
      } 
      else{
       this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
         disableClose: false
     });
     
     this.confirmDialogRef.componentInstance.confirmMessage = 'Add Keys/ Terms & conditions /Payment Terms Before select Associate!!';
     
     this.confirmDialogRef.afterClosed().subscribe(result => {
         if ( result )
         {
             console.log(result);
             if(result==true)
             {
               return;
             }
           }
         this.confirmDialogRef = null;
     
     
     
     });
    }     
        
        
          
        
      
    }
    addInTenderKey(tid, type)
    {
      this.dialogRef_Key = this.dialog.open(AppAddKeyDeliverablesComponent, {
        panelClass:'app-add-key-deliverables-dialog',
        data      : {
          workid : this.Work_ID,
          typeid : type,
          tenderid :tid
        }
      });
      
      this.dialogRef_Key.afterClosed().subscribe((response: FormGroup) => {
        this.checkKeysExists();
        this.getAllOfflineAssocs();
      this.getAllOfflineTenders();
      this.getAllTenderKeys();
        
         if ( !response )
         {
             return;
         }
        });
    }
    addKeys(type)
    {
      this.dialogRef_Key = this.dialog.open(AppAddKeyDeliverablesComponent, {
        panelClass:'app-add-key-deliverables-dialog',
        data      : {
          workid : this.Work_ID,
          typeid : type,
          tenderid :0
        }
      });
      
      this.dialogRef_Key.afterClosed().subscribe((response: FormGroup) => {
        this.checkKeysExists();
        this.getKeys();
        
         if ( !response )
         {
          this.checkKeysExists();
          this.getKeys();
         }
        });
    }
    addInTenderTerms(tid,type)
    {
      this.dialogRef_Terms = this.dialog.open(AppAddTermsConditionsComponent, {
        panelClass:'app-add-terms-conditions-dialog',
        data      : {
          workid : this.Work_ID,
          typeid : type,
          segid : this.SegmentID,
          tenderid : tid
        }
      });
      
      this.dialogRef_Terms.afterClosed().subscribe((response: FormGroup) => {
       
        this.checkTermsExists();
       // this.getAllOfflineAssocs();
        this.getAllTenderTerms();
         
        
        
         if ( !response )
         {
          this.checkTermsExists();
          this.getTerms();
         
          
             return;
         }
        });
    
    }
    addTerms($type)
 {
  this.dialogRef_Terms = this.dialog.open(AppAddTermsConditionsComponent, {
    panelClass:'app-add-terms-conditions-dialog',
    data      : {
      workid : this.Work_ID,
      typeid : $type,
      segid : this.SegmentID,
      tenderid :0
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

checkKeysExists()
    {
      this.projAppService.biws_chkTenderKeysExists(this.Work_ID).subscribe(result=>{console.log(result);
        this.keys_Flag=result;
      })
    }
    checkTermsExists()
    {
      this.projAppService.biws_checkTermsExists(this.Work_ID).subscribe(result=>{console.log(result);
      this.terms_Flag=result;
    })
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
    delInTenderTerms(termid,tid)
    {
      this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });
    
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure, you want to remove this term?!!';
    
    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
            console.log(result);
            if(result==true)
            {
              this.projAppService.biws_delInTenderTerm(termid,tid).subscribe(result=>{console.log(result);
                if(result['Success']==true)
              {
                this.openSnackBar('Key Deleted !!','Ok');
                this.getAllOfflineAssocs();
                //this.getAllOfflineTenders();
                this.getAllTenderTerms();
          
              }})
            }
          }
        this.confirmDialogRef = null;
    
    
    
    });
      
    }
    delInTenderKeys(kid, tid)
    {
      this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });
    
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure, you want to remove this key?!!';
    
    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
            console.log(result);
            if(result==true)
            {
              this.projAppService.biws_delInTenderKeys(kid,tid).subscribe(result=>{console.log(result);
                if(result['Success']==true)
              {
                this.openSnackBar('Key Deleted !!','Ok');
                this.getAllOfflineAssocs();
                //this.getAllOfflineTenders();
                this.getAllTenderKeys();
          
              }})
            }
          }
        this.confirmDialogRef = null;
    
    
    
    });
      
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
      this.projAppService.biws_getKeyDeliverables(this.Work_ID).subscribe(result=>{
      this.keys=result;
      
    })
    }
    getTerms()
    {
     // debugger;
      this.projAppService.biws_getTerms(this.Work_ID).subscribe(result=>{console.log(result);
this.terms=result;

      });
    }
    checkPaymentTermsExists()
    {
      this.projectService.checkPaymentTermsExists(this.Work_ID).subscribe(result=>{
      this.payTerms_Flag=result;
      })
    }
    addPaymentTerms()
    {
      this.dialogRef_PayTerm = this.dialog.open(PaymentTermsComponent, {
        panelClass:'payment-terms-dialog',
        data      : {
          workid : this.Work_ID,
          typeid : 0,
          tenderid : 0
        }
    });
    
    this.dialogRef_PayTerm.afterClosed()
    .subscribe((response: FormGroup) => {
    
          this.checkPaymentTermsExists();
            this.getPaymentTerms();
              if ( !response )
              {
                this.checkPaymentTermsExists();
               this.getPaymentTerms();
              }
          
        
         
           
          });
          

    }
    editTenderPayTerm(tid)
    {
      this.dialogRef_PayTerm = this.dialog.open(PaymentTermsComponent, {
        panelClass:'payment-terms-dialog',
        data      : {
          workid : this.Work_ID,
          typeid :1,
          tenderid : tid
        }
    });
    
    this.dialogRef_PayTerm.afterClosed()
    .subscribe((response: FormGroup) => {
    
         this.getAllOfflineAssocs();
              if ( !response )
              {
                
              }
          
        
         
           
          });
    }
    getPaymentTerms()
    {
      this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{
      
        this.payTerms=result[0]['Value'];
      });
    }
    addQuoteDetails($meId,$itemID, $name, $unit, $qty, $tid)
      {
        this.dialogRef_TenderRate = this.dialog.open(AppTenderRateComponent, {
          panelClass:'app-tender-rate-dialog',
          data      : {
            workid : this.Work_ID,
            name: $name,
            unit : $unit,
            ME_ID : $meId,
            quantity : $qty,
            assoc: $tid,
            itemID : $itemID,
            
          }
      });
      
      this.dialogRef_TenderRate.afterClosed()
          .subscribe((response: FormGroup) => {
                     //this.getAllOfflineAssocs();
                     this.getAllOfflineTenders();
                     this.getTenderTotals();
           
           if(!response)
           {
           // this.getAllOfflineAssocs();
            this.getAllOfflineTenders();
           }
                       
            });
            
            
    
      }  
      addWorkDays(tid)
      {
        this.dialogRef_TenderDetails = this.dialog.open(AppWorkTenderDetailsComponent, {
          panelClass:'app-work-tender-details-dialog',
          data      : {
            workid : this.Work_ID,
           tenderid :tid,
           typeid :0 
          }
      });
      
      this.dialogRef_TenderDetails.afterClosed()
          .subscribe((response: FormGroup) => {
            
                     this.getAllOfflineAssocs();
                     //this.getAllOfflineTenders();
           
           if(!response)
           {
            this.getAllOfflineAssocs();
            //this.getAllOfflineTenders();
           }
                       
            });
            
      } 
      finishTender(tid)
      {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });
      
      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure, you want to finish this tender?';
      
      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          {
              console.log(result);
              if(result==true)
              {
                this.projAppService.biws_finishTender(tid).subscribe(result=>{console.log(result);
                  if(result['Success']==true)
                {
                  //this.openSnackBar('','Ok');
                  this.getAllOfflineAssocs();
                  //this.getAllOfflineTenders();
                  this.getAllTenderKeys();
            
                }})
              }
            }
          this.confirmDialogRef = null;
      
      
      
      });
      }
      chkFinishTenderExists()
      {
        this.projAppService.chkFinishTenderExists(this.Work_ID).subscribe(result=>{console.log(result);
        if(result==0)
      {
this.pushToCust_Flag==0;
      }
    else{
      this.pushToCust_Flag==1;
    }})
      }
      PushToCustomer()
      {
        this.dialogRef_Push = this.dialog.open(PushTenderToCustomerComponent, {
          panelClass:'push-tender-customer-dialog',
          data      : {
            workid : this.Work_ID,
           
          }
      });
      
      this.dialogRef_Push.afterClosed()
          .subscribe((response: FormGroup) => {
                    
           
           if(!response)
           {
           
           }
                       
            });
            
      }
      editTender(tid)
      {
        this.projAppService.editTender(tid).subscribe(result=>{console.log(result);
          if(result['Success']==true)
          {
            this.getAllOfflineAssocs();
            this.getAllOnlineAssocs();
            this.getAllOfflineTenders();
            this.getAllOnlineTenders();
          }
        })
      }
      deleteTender(tid)
      {
        this.projAppService.deleteTender(tid).subscribe(result=>{console.log(result);
          if(result['Success']==true)
          {
            this.getAllOfflineAssocs();
            this.getAllOnlineAssocs();
            this.getAllOfflineTenders();
            this.getAllOnlineTenders();
          }
        })
      }
      
      getTenderTotals()
{
  //debugger;
  this.projectService.getTenderTotals(this.Work_ID).subscribe(result=>{console.log(result);
    this.totals=result;
  })
   
    }
    }
    
    

