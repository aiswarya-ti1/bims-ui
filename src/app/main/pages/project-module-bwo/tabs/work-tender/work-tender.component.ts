import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog,  MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleBWOComponent } from '../../project-module-bwo.component';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { LabEstimates } from '../../labEstimate';
import { TenderAssocs } from './tenderAssocs';
import { TenderDetails } from './tenderDetails';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { AssociateSelectionNewComponent } from './assoc-selection-new/assoc-selection-new.component';
import { AddNewServiceAssocComponent } from './add-new-associate/add-new-associate.component';
import { TermsAndConditions } from '../work-order-prepare/add-terms-conditions/termsAndCondition';
import { AddTermsConditionsComponent } from '../work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { AppProjectModuleBWOService } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.service';


@Component({
    selector     : 'work-tender',
    templateUrl  : './work-tender.component.html',
    styleUrls    : ['./work-tender.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers:[ProjectModuleBWOComponent]
})
export class WorkTenderComponent implements OnInit
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
    @Input() InitWO_Flag :number;
    @Input() payTerms_Flag : number;
    @Input() generalTerms_Flag : number;
    finish_tender : number;
    assocs : TenderAssocs[];
    assoc_F : TenderAssocs[];
    assocs_T : TenderAssocs[];
    assoc_Off : TenderAssocs[];
    totals: TenderAssocs[];
    offTenders : TenderDetails[];
    tenders : TenderDetails[];
    tenderFinal : TenderDetails[];
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
    dialogRef_Assoc : MatDialogRef<AssociateSelectionNewComponent>;
    dialogRef_Tender : MatDialogRef<TenderDetailsComponent>;
    dialogRef_PayTerm :MatDialogRef<PaymentTermsComponent>;
    dialogRef_AddNew : MatDialogRef<AddNewServiceAssocComponent>;
    dialogRef_Terms :MatDialogRef<AddTermsConditionsComponent>;
    Role_ID : number=0;
    workStatus : number=0;
    @Output() initFlagEvent=new EventEmitter<number>();
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
      
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private bwo : ProjectModuleBWOComponent,
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute,
        private snackBar : MatSnackBar,
        private projAppService : AppProjectModuleBWOService
        

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
 this.getSelectedAssocList();
 this.checkAssocSelected();
 this.getAssocDetails(this.AssocName);
 this.getTenderedAssocs();
 this.getFinalTender(this.Work_ID);
 this.getTenderAssoc(this.Work_ID);
 this.checkPaymentTermsExists();
 this.getTenderTerms();
 this.chkFinishTenderExists(); 
 
 this.getAllOfflineAssocs();
 this.getAllOfflineTenders();
 this.getTenderTotals(); 

      this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{console.log(result);
      
        this.payTerms=result[0]['Value'];
      });
    
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.initFlagEvent.emit(this.InitWO_Flag);
            this.workStatus=result[0]['WorkStatus'];
           
                });
              
    }
    getAllOfflineAssocs()
    {
      this.projAppService.biws_getAllOfflineAssocs(this.Work_ID).subscribe(result=>{console.log(result);
        this.assoc_Off=result;
         this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);
      })

    }


getAllOfflineTenders()
    {
      this.projAppService.biws_getAllOfflineTenders(this.Work_ID).subscribe(result=>{console.log(result);
        this.offTenders=result;
      })
    }

    getWorkLineItems()
    {
        
    this.projectService.getWorkLineItems(this.Work_ID).subscribe(result=>{
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
    selectAssoc()
    {
      //this.checkServiceAssocExists();
      
      
        this.dialogRef_Assoc = this.dialog.open(AssociateSelectionNewComponent, {
            panelClass:'assoc-selection-new-dialog',
            data      : {
             workid : this.Work_ID,
             type : this.type_ID,
             servid : this.Serv_ID
              
            }
        });
      
        this.dialogRef_Assoc.afterClosed()
        .subscribe((response: FormGroup) => {
          
           this.checkAssocSelected();
           this.getSelectedAssocList();
           this.getAllOfflineAssocs();
           this.getAllOfflineTenders();
                     
            if ( !response )
            {
              this.checkAssocSelected();
              this.getSelectedAssocList();
                           return;
            }
        });
      
    }
    getSelectedAssocList()
    {
      
      this.projectService.getSelectedAssocs(this.Work_ID).subscribe(result => {
      this.assocs=result;
      });
    
    }
    checkAssocSelected()
    {
        this.projectService.checkAssocSelected(this.Work_ID).subscribe(result=>{
            this.assocExists_Flag=result;
                   })
    }
     onChange(event)
  {
    this.AssocName="";
      this.AssocName=event;
   
   this.projectService.getLinItemID(this.Work_ID).subscribe(result=>{console.log(result);
    this.values=result;
        this.projectService.addTenderLab(this.values, this.AssocName).subscribe(result1=>{
    this.getLabEstimate();});
  /*  this.projectService.addTenderLabNew(this.Work_ID).subscribe(result1=>{console.log(result1);
      this.getLabEstimate();
    })*/

  });

  }
 
  getLabEstimate()
  {
    
        this.projectService.getallLabTender(this.AssocName).subscribe(resp1=>{console.log(resp1);
          this.tenders=resp1;
          if(resp1.length==0)
          {
          
          }
          if(resp1.length>0){
                           this.tenders=resp1;
          
          }
        });
      
        
      }
      addQuoteDetails($meId,$itemID, $name, $unit, $qty, $tid)
      {
        this.dialogRef_Tender = this.dialog.open(TenderDetailsComponent, {
          panelClass:'tender-details-dialog',
          data      : {
            workid : this.Work_ID,
            name: $name,
            unit : $unit,
            ME_ID : $meId,
            quantity : $qty,
            assoc: $tid,
            itemID : $itemID
          }
      });
      
      this.dialogRef_Tender.afterClosed()
          .subscribe((response: FormGroup) => {
                     
                     this.getAllOfflineTenders();
                     this.getTenderTotals();
                     this.getTenderedAssocs();
                     //this.getAllOfflineAssocs();
                     
           
           if(!response)
           {
            this.getAllOfflineTenders();
              this.getTenderTotals();
            this.getTenderedAssocs();
           // this.getAllOfflineAssocs();
           }
                       
            });
            
            
    
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
                    this.getLabEstimate();
           this.getTenderedAssocs();
           if(!response)
           {
            this.getLabEstimate();
            this.getTenderedAssocs();
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
      assocNotSelect()
      {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Select an associate before Initiate!!';

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
   
      initiateWO(values)
      {
        //debugger;
        console.log("Tender selection values "+values['selectedAssoc']);
        if(values['selectedAssoc']== null)
        {
         this.assocNotSelect();      
        }
         else
         {
        this.checkPaymentTermsExists();
        if(this.payTerms_Flag!=0)
        {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish tendering?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          {
              console.log(result);
              if(result==true)
              {
                this.projectService.initiateWO(values).subscribe(result=>{
                  this.getOneWork();
                  this.getFinalTender(this.Work_ID);
                  this.bwo.ngOnInit();
                  });
              }
            }
          this.confirmDialogRef = null;
      

      
    });
  }
  else{
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
  });

  this.confirmDialogRef.componentInstance.confirmMessage = 'Please add payment terms before initiate work order'

  this.confirmDialogRef.afterClosed().subscribe(result => {
      
      this.confirmDialogRef = null;
  

  
});
  }

  }
  }
      getFinalTender($id)
      {
        this.projectService.getFinalTender($id).subscribe(result=>{
        this.tenderFinal=result;
        this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);
      })

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
        }
    });
    
    this.dialogRef_PayTerm.afterClosed()
    .subscribe((response: FormGroup) => {
    
          this.checkPaymentTermsExists();
            this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{console.log(result);
              this.payTerms=result[0]['Value'];})
              if ( !response )
              {
                this.checkPaymentTermsExists();
                this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{
                  this.payTerms=result[0]['Value'];})
              }
          
        
         
           
          });
          

    }
    downloadDesign()
       {
     this.projectService.downloadDesign(this.Work_ID).subscribe(
      
         (res) => {console.log(res[0]);
                         window.open(res[0]);
              
         });
      
     
         
     }
     printTender()
     {
       
        this.router.navigate(['print-tender/'+this.Work_ID]);
       
         
     }
     printAssocTender(tid)
     {
       console.log('TenderID '+tid);
        this.router.navigate(['print-assoc-tender/'+tid+'/'+this.Work_ID]);
       
         
     }
     reEstimate()
     {
      this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to Re Estimate?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
            
            if(result==true)
            { this.loading=true;
              this.projectService.reEstimate(this.Work_ID).subscribe(result=>{
                this.loading=false;
                this.getOneWork();
                               this.bwo.ngOnInit();
                });
            }
        }
        this.confirmDialogRef = null;
    });
      
        
     
     }
     getTenderTerms()
     {
       this.projectService.getTenderTerms(this.Work_ID).subscribe(result=>{console.log(result);
        this.terms=result;
      if(result.length==0)
    {
      this.generalTerms_Flag==0;
    }
  else{
    this.generalTerms_Flag==1;
  }})
  console.log(this.generalTerms_Flag);
     }
     addGeneralTerms()
     {
      this.dialogRef_Terms = this.dialog.open(AddTermsConditionsComponent, {
        panelClass:'add-terms-conditions-dialog',
        data      : {
          workid : this.Work_ID,
          typeid : 2,
          segid : 8
        }
      });
      
      this.dialogRef_Terms.afterClosed().subscribe((response: FormGroup) => {
       
       this.getTenderTerms();
        
         if ( !response )
         {
          this.getTenderTerms();
             return;
         }
        });
     }
     openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
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
                  this.finish_tender=1;
                  this.getAllOfflineAssocs();
                  
                  this.getTenderedAssocs(); 
                  //this.getAllOfflineTenders();
                  
            
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
this.finish_tender=0;
      }
    else{
      this.finish_tender=1;
      
    }})
      }
getTenderTotals()
{
  //debugger;
  this.projectService.getTenderTotals(this.Work_ID).subscribe(result=>{console.log(result);
    this.totals=result;
  })
   
    }
  }
    
    

