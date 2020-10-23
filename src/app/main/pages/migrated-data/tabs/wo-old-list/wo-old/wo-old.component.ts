import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { WorkScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/work-schedule/work-schedule.component';
import { PaymentScheduleComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/payment-schedule/payment-schedule.component';
import { AddKeyDeliverablesComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/add-key-deliverables.component';

import { AddTermsConditionsComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { EditItemDetailsComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/edit-item-details/edit-item-details.component';
import { AddLineItemsFormDialogComponent } from 'app/main/pages/project-module-bwo/tabs/work-estimation/add-line-items/add-line-items.component';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/termsAndCondition';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AddCustomerDialogComponent } from 'app/main/pages/sales-module/add-customer/add-customer.component';
import { AddLeadDialogComponent } from 'app/main/pages/sales-module/add-lead/add-lead.component';
import { AddWorkDialogComponent } from 'app/main/pages/project-module/add-work/add-work.component';
import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';
import { AssociateSelectionNewComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/assoc-selection-new/assoc-selection-new.component';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Category } from 'app/main/pages/project-module-bwo/category';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { TenderDetailsComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/tender-details/tender-details.component';
import { WOIsuueDateComponent } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/wo-issue-date/wo-issue-date.component';
import { ReMeasureDetailsComponent } from 'app/main/pages/project-module-awo/tabs/work-remeasure/remeasure-details/remeasure-details.component';
import { FinishWorkComponent } from 'app/main/pages/project-module-awo/tabs/work-completion/finish-work/finish-work.component';
import { Works } from 'app/main/pages/project-module-bwo/works';
import { AppProjectModuleBWOService } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.service';



@Component({
    selector     : 'wo-old',
    templateUrl  : './wo-old.component.html',
    styleUrls    : ['./wo-old.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WorkOrderOldComponent implements OnInit
{
    Work_ID : number;
    Status_ID : number;
    workSched_Flag : number;
paySched_Flag : number;
keys_Flag : number;
terms_Flag : number;
ReTotal : number;
    payTerms : string;
    dialogRef_WorkSch: MatDialogRef<WorkScheduleComponent>;
    dialogRef_Pay: MatDialogRef<PaymentScheduleComponent>;
    dialogRef_Key: MatDialogRef<AddKeyDeliverablesComponent>;
    dialogRef_Terms: MatDialogRef<AddTermsConditionsComponent>;
    dialogRef_Tender : MatDialogRef<TenderDetailsComponent>;
    dialogRef_Edit : MatDialogRef<EditItemDetailsComponent>;
    dialogRef_Scope : MatDialogRef<AddLineItemsFormDialogComponent>;
    confirmDialogRef : MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef_Cust : MatDialogRef<AddCustomerDialogComponent>;
    dialogRef_Lead : MatDialogRef<AddLeadDialogComponent>;
    dialogRef_Work : MatDialogRef<AddWorkDialogComponent>;
    dialogRef_AddNew : MatDialogRef<AddNewServiceAssocComponent>;
    dialogRef_Assoc :MatDialogRef<AssociateSelectionNewComponent>;
    dialogRef_Issue : MatDialogRef<WOIsuueDateComponent>;
    dialogRef_Re : MatDialogRef<ReMeasureDetailsComponent>;
    dialogRef_Compl : MatDialogRef<FinishWorkComponent>;
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
    User_ID: number=0;
    User_Name : string;
    User:Array<User>;
    segment:Segments;
    category : Category;
    assocs : TenderAssocs[];
    assoc_F : TenderAssocs[];
    assocs_T : TenderAssocs[];
    tenders : TenderDetails[];
    tenderFinal : TenderDetails[];
    quoteFormGroup : FormGroup;
    values=[];
    AssocName : string;
    Total : number;
    Scope_RFlag : number;
    reTTotal: number;
    works : Works[];
    newlist=[];
    totals : TenderAssocs[];

    assoc_Off : TenderAssocs[];
    offTenders : TenderDetails[];
    finish_tender : number;
    finalizeAssocForm : FormGroup;

 constructor(public projectService: ProjectModuleService,  public router:Router,private snackBar : MatSnackBar,
      private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog,
      private sessionSt: SessionStorageService, private projAppService : AppProjectModuleBWOService) { 
        if(this.sessionSt.retrieve('user')!=null)
        {
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            
            this.User_Name=this.User['User_Login'];
         }
         this.finalizeAssocForm=new FormGroup({
          workID : new FormControl(),
          selectedAssoc : new FormControl()});
          
      }

    ngOnInit(): void
    {
         this.activatedRoute.params.subscribe((params: Params) => {
           this.Work_ID=params['wid'];
           this.finalizeAssocForm.controls['workID'].setValue(this.Work_ID);
           if(this.Work_ID!=0)
           {
              this.getServiceList(this.Work_ID);
             this.getServiceIDs(this.Work_ID);
             this.getOneWork(this.Work_ID);
            
             this.getWorkLineItemsCount();
             this.getWorkLineItems();
             this.getSelectedAssocList();
             this.checkAssocSelected();
             
             this.getLabEstimate();
             this.chkFinishTenderExists();
             this.getAllOfflineAssocs();
             this.getAllOfflineTenders();
             this.getTenderedAssocs();
             this.getTenderTotals();
             this.getTenderAssoc(this.Work_ID);
             
this.getFinalTender(this.Work_ID);
this.checkWorkSchedExists();
       this.getWorkSchedule();
        this.checkPaySchedExists();
        this.getPaySchedule();
         this.checkKeysExists();
          this.getKeys(); 
this.checkTermsExists();
      this.getTerms(); 
      this.getTender();
      this.getReMeasureSummary();
      this.getReFlags();

           }
      
       
      });
     
    }
   
    getOneWork($id)
    {
        this.projectService.getOneWork($id).subscribe(result=>{
         
          this.works=result;
            this.Status_ID=result[0]['WorkStatus'];
            this.SegmentID=result[0]['Segment_ID'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
           
                },  error=>{console.log(error);
    
                  this.openSnackBar('Server Error. Please try again!!','OK');
                  });
                if(this.Status_ID==6)
                {
                  this.getTender();
                  this.getReMeasureSummary();
                  this.getReFlags();
                }
               
              
    }
    addCustomer()
    {
              this.dialogRef_Cust = this.dialog.open(AddCustomerDialogComponent, {
            panelClass:'add-customer-dialog',
            data      : {
              
            }
        });
      
        this.dialogRef_Cust.afterClosed()
        .subscribe((response: FormGroup) => {
            if ( !response )
            {
                return;
            }
        });
           
    
    }
    addLead()
    {
      
        this.dialogRef_Lead = this.dialog.open(AddLeadDialogComponent, {
            panelClass:'add-lead-dialog',
            data      : {
              typeid : 2,
              assignTo : this.User_Name,
                
              
            }
        });
      
        this.dialogRef_Lead.afterClosed()
        .subscribe((response: FormGroup) => {
            
            if ( !response )
            {
                return;
            }
        });
    
    }
    addWork()
    {
      this.dialogRef_Work = this.dialog.open(AddWorkDialogComponent, {
        panelClass:'add-work-dialog',
        data      : {
         leadid : 0,
         typeid :2
          
        }
    });
  
    this.dialogRef_Work.afterClosed()
    .subscribe(response => 
      { console.log('Response'+response.data);
      this.Work_ID=response.data;
      
      this.getOneWork(this.Work_ID);
              
        if ( !response )
        {
           
        
        return;
        }
    });
    }
    addAssociate()
    {
      this.dialogRef_AddNew = this.dialog.open(AddNewServiceAssocComponent, {
        panelClass:'add-new-associate-dialog',
        data      : {
          typeid : 1
         
        }
    });
    
    this.dialogRef_AddNew.afterClosed()
        .subscribe((response: FormGroup) => {
                 
         if(!response)
         {
          
         }
        
           
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
           this.getTenderTotals();
           this.getTenderedAssocs();
                     
            if ( !response )
            {
              this.checkAssocSelected();
              this.getSelectedAssocList();
              this.getAllOfflineTenders();
              this.getTenderTotals();
              this.getTenderedAssocs();
                           return;
            }
        });
      
    }
    
    addLineItems(type)
    {
      this.dialogRef_Scope = this.dialog.open(AddLineItemsFormDialogComponent, {
        panelClass:'add-line-items-dialog',
        data      : {
          workid : this.Work_ID,
          servid: this.Serv_ID,
          type : 0,
          new : 0
        }
    });
      this.dialogRef_Scope.afterClosed()
      .subscribe((response: FormGroup) => {
       this.getWorkLineItemsCount();
      this.getWorkLineItems();
        if ( !response )
        {
           this.getWorkLineItemsCount();
      this.getWorkLineItems();
            return;
        }
      });

 
    }
    addLineItemDetails($id)
    {
      this.dialogRef_Edit = this.dialog.open(EditItemDetailsComponent, {
        panelClass:'edit-item-details-dialog',
        data      : {
         workid : this.Work_ID,
                      leID : $id,
          
        }
    });
  
    this.dialogRef_Edit.afterClosed()
    .subscribe((response: FormGroup) => {
        this.getWorkLineItemsCount();
        this.getWorkLineItems();
       
        if ( !response )
        {
          this.getWorkLineItemsCount();
        this.getWorkLineItems();
            return;
        }
    });
    }
    getServiceIDs($id)
    {
    var ids=[];
    this.projectService.getServiceIDs($id).subscribe(result=>{console.log(result);
            for(var i=0;i<result.length;i++)
      {
        ids.push(result[i]["service_ID"]);
    }

      this.Serv_ID.push(ids);
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
    
    
    }
    getWorkLineItemsCount()
    {
        
    this.projectService.getWorkLineItemsCount(this.Work_ID).subscribe(result=>{
       this.Item_Count=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
    }
    getWorkLineItems()
    {
        
    this.projectService.getWorkLineItems(this.Work_ID).subscribe(result=>{
       this.items= result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
    }
    finishEst()
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish estimation?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                if(result==true)
                {
                    this.projectService.finishEstimate(this.Work_ID).subscribe(result=>{
                     
                           this.getOneWork(this.Work_ID);
                          
                       
                    },  error=>{console.log(error);
    
                      this.openSnackBar('Server Error. Please try again!!','OK');
                      });
                }
            }
            this.confirmDialogRef = null;
        });
        
    }

    //Tender
    getSelectedAssocList()
    {
      
      this.projectService.getSelectedAssocs(this.Work_ID).subscribe(result => {console.log(result);
      this.assocs=result;
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
    
    }
    checkAssocSelected()
    {
        this.projectService.checkAssocSelected(this.Work_ID).subscribe(result=>{
            this.assocExists_Flag=result;
                   },  error=>{console.log(error);
    
                    this.openSnackBar('Server Error. Please try again!!','OK');
                    })
    }
     onChange(event)
  {
    this.AssocName="";
      this.AssocName=event;
   
   this.projectService.getLinItemID(this.Work_ID).subscribe(result=>{console.log(result);
    this.values=result;
        this.projectService.addTenderLab(this.values, this.AssocName).subscribe(result1=>{console.log(result1);
    this.getLabEstimate();},  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
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
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
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
          
           
           if(!response)
           {
            this.getAllOfflineTenders();
                     this.getTenderTotals();
                     this.getTenderedAssocs();
            
           }
                       
            });
            
            
    
      }  
      initiateWO(values)
      {
        if(values['selectedAssoc']== null)
        {
         this.assocNotSelect();      
        }
         else
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
                this.projectService.initiateWO(values).subscribe(result=>{console.log(result);
                 this.getOneWork(this.Work_ID);
                 this.InitWO_Flag=1;
                 this.Scope_RFlag=0;

                  this.getFinalTender(this.Work_ID);
                  
                  },  error=>{console.log(error);
    
                    this.openSnackBar('Server Error. Please try again!!','OK');
                    });
              }
            }
          this.confirmDialogRef = null;
      

      
    });
  }
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
getFinalTender($id)
      {
        this.projectService.getFinalTender($id).subscribe(result=>{
        this.tenderFinal=result;
        this.Total=result[0]['TotalQuote'];
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          })

      }
getTenderAssoc($id)
      {
        this.projectService.getFinalTenderAssoc($id).subscribe(result=>{
        this.assoc_F=result;
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
      }

      checkWorkSchedExists()
      {
        this.projectService.chkWorkSchedExists(this.Work_ID).subscribe(result=>{
          this.workSched_Flag=result;
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          })
      }
      checkPaySchedExists()
      {
        this.projectService.chkPaySchedExists(this.Work_ID).subscribe(result=>{
          this.paySched_Flag=result;
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          })
      }
      checkKeysExists()
      {
        this.projectService.chkKeysExists(this.Work_ID).subscribe(result=>{
          this.keys_Flag=result;
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          })
      }
    checkTermsExists()
      {
        this.projectService.checkTermsExists(this.Work_ID).subscribe(result=>{
        this.terms_Flag=result;
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
      }
  workSchedule(type, id)
      {
        this.dialogRef_WorkSch = this.dialog.open(WorkScheduleComponent, {
          panelClass:'work-schedule-dialog',
          data      : {
           workid : this.Work_ID,
           typeid : type,
           workSchedID : id ,
           viewid:1
          
            
          }
      });
    
      this.dialogRef_WorkSch.afterClosed().subscribe((response: FormGroup) => {
        this.checkWorkSchedExists();
       this.getWorkSchedule();
        
         if ( !response )
         {
            this.checkWorkSchedExists();
       this.getWorkSchedule();
        
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
        
        
         if ( !response )
         {
          this.checkPaySchedExists();
          this.getPaySchedule();
          
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
            this.checkKeysExists();
            this.getKeys();
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
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          });
      }
      getPaySchedule()
      {
        this.projectService.getPaySchedule(this.Work_ID).subscribe(result=>{
          this.paySched=result;
          
       
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
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
    }},  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
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
  }},  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
      }
      getKeys()
      {
        this.projectService.getKeyDeliverables(this.Work_ID).subscribe(result=>{
        this.keys=result;
        
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
      }
      getTerms()
      {
       // debugger;
        this.projectService.getTermsCondition(this.Work_ID).subscribe(result=>{
  this.terms=result;
  
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          });
      }
      finishWO()
      {
        this.dialogRef_Issue = this.dialog.open(WOIsuueDateComponent, {
          panelClass:'wo-issue-date-dialog',
          data      : {
            workid : this.Work_ID
          }
        });
        
        this.dialogRef_Issue.afterClosed()
        .subscribe((response: FormGroup) => {
        this.getOneWork(this.Work_ID);
        
          if ( !response )
          {
            this.getOneWork(this.Work_ID);
              return;
          }
        });
  
        
      }
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }

      editQty($id,$item, $type)
      {
       
        if($type==1)
        {
          this.dialogRef_Re = this.dialog.open(ReMeasureDetailsComponent, {
            panelClass:'remeasure-details-dialog',
            data      : {
              workid : this.Work_ID,
              itemid : $item,
              typeid : $type,
              tid : $id
            }
        });
      
        this.dialogRef_Re.afterClosed()
            .subscribe(response => {
               console.log('Response'+response.data);
              this.ReTotal=response.data
              
              this.ngOnInit();
              
             
                if ( !response )
                {
                 
                  this.ngOnInit();
                    return;
                }
      
               
      
            });
           
        }
        else  if($type==2)
        {
          this.dialogRef_Re = this.dialog.open(ReMeasureDetailsComponent, {
            panelClass:'remeasure-details-dialog',
            data      : {
              workid : this.Work_ID,
              itemid : $item,
              typeid : $type,
              eid : $id
            }
        });
      
        this.dialogRef_Re.afterClosed()
            .subscribe((response: FormGroup) => {
              
              
             
                if ( !response )
                {
                    return;
                }
      
               
      
            });
           
        }
       
      }
     
    getReFlags()
        {
          this.projectService.getReFlag(this.Work_ID,0).subscribe(result=>{
            
            if(result.length==0)
            { 
                this.Scope_RFlag=0;
              
            }
            else
            {
              this.Scope_RFlag=1;
            }
          });
        }
    
    getReMeasureSummary()
    {
      this.projectService.getReMeasureSummary(this.Work_ID,0).subscribe(result=>{
        
        
          this.reTTotal=result['TotalAfterRe'];
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          });
      }
    
    getTender()
      {
        
        this.projectService.getFinalLabTenderDetails(this.Work_ID).subscribe(result=>{
         this.tenders=result;
         
        },  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          })
      }    
      
      finish()
      {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });
    
      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish?';
    
      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          {
              if(result==true)
              {
               
                this.projectService.finishReMeasure(this.Work_ID, 0).subscribe(result=>{console.log(result);
                  if(result["Success"]==true)
                  {
                    this.openSnackBar('Re-Measure Completed Successfully!!','OK');
                    
                  }
                  this.getReMeasureSummary();
                  this.getReFlags();
                  this.ngOnInit();
                },  error=>{console.log(error);
    
                  this.openSnackBar('Server Error. Please try again!!','OK');
                  })
              }
          }
          this.confirmDialogRef = null;
      });
     
    
    
      
    }   
    finishProject()
    {
      this.dialogRef_Compl = this.dialog.open(FinishWorkComponent, {
        panelClass:'finish-work-dialog',
        data      : {
          workid : this.Work_ID,
        }
    });
    
    this.dialogRef_Compl.afterClosed()
        .subscribe(response=> {
         console.log('Response'+response.data)
         if(response.data==8)
         {
          this.router.navigate(['print-work-order-6/'+this.Work_ID+'/'+1]);
         }
         
         if(!response)
         {
           this.getOneWork(this.Work_ID);
         
         }
        
          });
          
    }
    getServiceList($id)
    {
     
      this.projectService.getServiceList($id).subscribe(result=>{console.log(result.length);
        if(result.length==0)
        {
          this.newlist.push(result[0]["service_name"]);
          }
          else
          {
            for(var i=0;i<result.length;i++)
            {
              this.newlist.push(result[i]["service_name"]);
            }
          }
        
          console.log('Services'+this.newlist);  
        
    })
    
    
    } 
    getAllOfflineAssocs()
    {
      this.projAppService.biws_getAllOfflineAssocs(this.Work_ID).subscribe(result=>{console.log(result);
        this.assoc_Off=result;
         //this.Total=result[0]['TotalQuote'];
        //this.words=this.inWords(this.Total);
      })

    }


getAllOfflineTenders()
    {
      this.projAppService.biws_getAllOfflineTenders(this.Work_ID).subscribe(result=>{console.log(result);
        this.offTenders=result;
      })
    }
    getTenderTotals()
{
  //debugger;
  this.projectService.getTenderTotals(this.Work_ID).subscribe(result=>{console.log(result);
    this.totals=result;
  })
   
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
                //this.getReFlags();
                this.getAllOfflineAssocs();
                this.getLabEstimate();
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
  
   
      getTenderedAssocs()
      {
        this.projectService.getTenderedAssocs(this.Work_ID).subscribe(result=>{
          this.assocs_T=result;

        })
      }
}
