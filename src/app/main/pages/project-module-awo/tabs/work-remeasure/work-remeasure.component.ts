import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { ReMeasureDetailsComponent } from './remeasure-details/remeasure-details.component';
import { RemeasureIssueDateComponent } from './remeasure-issue-date/remeasure-issue-date.component';

@Component({
    selector     : 'work-remeasure',
    templateUrl  : './work-remeasure.component.html',
    styleUrls    : ['./work-remeasure.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkReMeasureComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
       Work_ID : number=0;
  
    items:LabEstimates[];
    Serv_ID =[];
    assocExists_Flag : number=0;
    Est_Flag : number=0;
    InitWO_Flag :number=0;
    
    values=[];
    AssocName : string;
    
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
    AmdTotal : number=0;
    A_Flag : number=0;
    Re_Flag : number=0;
    tenders : TenderDetails[];
    amendExists : number=0;
    amendmentFormGroup : FormGroup;
    dialogRef;
    reGrandTotal : number=0;
    reTTotal : number=0;
    reA1Total : number=0;
  reA2Total : number=0;
    reA3Total : number=0;
    reA4Total : number=0;
    reA5Total : number=0;
    reA6Total : number=0;
    reA7Total : number=0;
    reA8Total : number=0;
    reA9Total : number=0;
    reA10Total : number=0;
    TID: number;
    items1:LabEstimates[];
    items2:LabEstimates[];
    items3:LabEstimates[];
    items4:LabEstimates[];
    items5:LabEstimates[];
    items6:LabEstimates[];
    items7:LabEstimates[];
    items8:LabEstimates[];
    items9:LabEstimates[];
    items10:LabEstimates[];
amend1Exists : number=0;   
    amend2Exists : number=0;   
    amend3Exists : number=0;   
    amend4Exists : number=0;   
    amend5Exists : number=0;   
    amend6Exists : number=0;   
    amend7Exists : number=0;   
    amend8Exists : number=0;   
    amend9Exists : number=0;  
    amend10Exists : number=0;  

 AmdTotal3 : number;
    AmdTotal2 : number;
    AmdTotal1 : number;
    AmdTotal4 : number;
    AmdTotal5 : number;
    AmdTotal6 : number;
    AmdTotal7 : number;
    AmdTotal8 : number;
    AmdTotal9 : number;
    AmdTotal10 : number;

    AmdReTotal1: number;
    AmdReTotal2 : number;
    AmdReTotal3 : number;
    AmdReTotal4 : number;
    AmdReTotal5 : number;
    AmdReTotal6 : number;
    AmdReTotal7 : number;
    AmdReTotal8 : number;
    AmdReTotal9 : number;
    AmdReTotal10 : number;

    dialogRef_IssueDate : MatDialogRef<RemeasureIssueDateComponent>;
    Issue_Date : Date;
    Scope_RFlag : number;
    A1_RFlag : number;
    A2_RFlag : number;
    A3_RFlag : number;
    A4_RFlag : number;
    A5_RFlag : number;
    A6_RFlag : number;
    A7_RFlag : number;
    A8_RFlag : number;
    A9_RFlag : number;
    A10_RFlag : number;


    finish_Flag : number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer, private snackBar :MatSnackBar,
        
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
          work_ID : new FormControl()
        })
       
       }
      
       
    ngOnInit(): void
    {
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
            this.amendmentFormGroup.controls['work_ID'].setValue(params['workid'])
           
            
          });
         
   this.getOneWork();       
 
 this.getServiceIDs(this.Work_ID);
 //this.getAmendLineItems(this.Work_ID);
 this.getTender(this.Work_ID);
 this.getReFlags(0);
 this.getReFlags(1);
 this.getReFlags(2);
 this.getReFlags(3);
 this.getReFlags(4);
 this.getReFlags(5);
 this.getReFlags(6);
 this.getReFlags(7);
 this.getReFlags(8);
 this.getReFlags(9);
 this.getReFlags(10);

// this.getTotalAmendItems();
this.getGrandTotal();
//this.getReMeasureSummary(this.Work_ID,0);
this.getFinalTender(this.Work_ID);
this.getAmended1LineItems(this.Work_ID);
this.getAmended2LineItems(this.Work_ID);
this.getAmended3LineItems(this.Work_ID);
this.getAmended4LineItems(this.Work_ID);
this.getAmended5LineItems(this.Work_ID);
this.getAmended6LineItems(this.Work_ID);
this.getAmended7LineItems(this.Work_ID);
this.getAmended8LineItems(this.Work_ID);
this.getAmended9LineItems(this.Work_ID);
this.getAmended10LineItems(this.Work_ID);
this.getReMeasureSummary(0);
this.getReMeasureSummary(1);
this.getReMeasureSummary(2);
this.getReMeasureSummary(3);
this.getReMeasureSummary(4);
this.getReMeasureSummary(5);
this.getReMeasureSummary(6);
this.getReMeasureSummary(7);
this.getReMeasureSummary(8);
this.getReMeasureSummary(9);
this.getReMeasureSummary(10);
 
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.SegmentID=result[0]['Segment_ID'];
            
            this.A_Flag=result[0]['Amend_Flag'];
            //this.Re_Flag=result[0]['Re_Flag'];
            
                })
    }
    
    getReFlags(no)
    {
      this.projectService.getReFlag(this.Work_ID,no).subscribe(result=>{
        
        if(result.length==0)
        { if(no==0)
          {
            this.Scope_RFlag=0;
          }
          else if(no==1)
          {
            this.A1_RFlag=0;
          }
          else if(no==2)
          {
            this.A2_RFlag=0;
          }
          else if(no==3)
          {
            this.A3_RFlag=0;
          }
          else if(no==4)
          {
            this.A4_RFlag=0;
          }
          else if(no==5)
          {
            this.A5_RFlag=0;
          }
          else if(no==6)
          {
            this.A6_RFlag=0;
          }
          else if(no==7)
          {
            this.A7_RFlag=0;
          }
          else if(no==8)
          {
            this.A8_RFlag=0;
          }
          else if(no==9)
          {
            this.A9_RFlag=0;
          }
          else if(no==10)
          {
            this.A10_RFlag=0;
          }
        }
        else 
        {
          if(no==0)
          {
            this.Scope_RFlag=1;
          }
          else if(no==1)
          {
            this.A1_RFlag=1;
         
          }
          else if(no==2)
          {
            this.A2_RFlag=1;
          }
          else if(no==3)
          {
            this.A3_RFlag=1;
          }
          else if(no==4)
          {
            this.A4_RFlag=1;
          }
          else if(no==5)
          {
            this.A5_RFlag=1;
          }
          else if(no==6)
          {
            this.A6_RFlag=1;
          }
          else if(no==7)
          {
            this.A7_RFlag=1;
          }
          else if(no==8)
          {
            this.A8_RFlag=1;
          }
          else if(no==9)
          {
            this.A9_RFlag=1;
          }
          else if(no==10)
          {
            this.A10_RFlag=1;
          }
        }
        });
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
    getFinalTender($id)
      {
        this.projectService.getFinalTender($id).subscribe(result=>{
                this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);
      this.TID=result[0]['WorkTender_ID'];
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
      }
      getAmended1LineItems($id)
  {
    this.projectService.getAmended1LineItems($id).subscribe(result=>{ 
      this.items1=result;
      if(result.length==0)
      {
       
       this.amend1Exists=0;
      }
      else
      {
       this.amend1Exists=1;
  
    this.getTotalAmend1Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended2LineItems($id)
  {
    this.projectService.getAmended2LineItems($id).subscribe(result=>{
      this.items2=result;
      if(result.length==0)
      {
       
       this.amend2Exists=0;
      }
      else
      {
       this.amend2Exists=1;
  
    this.getTotalAmend2Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended3LineItems($id)
  {
    this.projectService.getAmendedLineItems($id,3).subscribe(result=>{
      this.items3=result;
      if(result.length==0)
      {
       
       this.amend3Exists=0;
      }
      else
      {
       this.amend3Exists=1;
  
    this.getTotalAmend3Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended4LineItems($id)
  {
    this.projectService.getAmendedLineItems($id, 4).subscribe(result=>{
      this.items4=result;
      if(result.length==0)
      {
       
       this.amend4Exists=0;
      }
      else
      {
       this.amend4Exists=1;
  
    this.getTotalAmend4Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  
  getAmended5LineItems($id)
  {
    this.projectService.getAmendedLineItems($id,5).subscribe(result=>{
      this.items5=result;
      if(result.length==0)
      {
       
       this.amend5Exists=0;
      }
      else
      {
       this.amend5Exists=1;
  
    this.getTotalAmend5Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended6LineItems($id)
  {
    this.projectService.getAmendedLineItems($id,6).subscribe(result=>{
      this.items6=result;
      if(result.length==0)
      {
       
       this.amend6Exists=0;
      }
      else
      {
       this.amend6Exists=1;
  
    this.getTotalAmend6Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended7LineItems($id)
  {
    this.projectService.getAmendedLineItems($id,4).subscribe(result=>{
      this.items7=result;
      if(result.length==0)
      {
       
       this.amend7Exists=0;
      }
      else
      {
       this.amend7Exists=1;
  
    this.getTotalAmend7Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended8LineItems($id)
  {
    this.projectService.getAmendedLineItems($id,8).subscribe(result=>{
      this.items8=result;
      if(result.length==0)
      {
       
       this.amend8Exists=0;
      }
      else
      {
       this.amend8Exists=1;
  
    this.getTotalAmend8Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended9LineItems($id)
  {
    this.projectService.getAmendedLineItems($id,9).subscribe(result=>{
      this.items9=result;
      if(result.length==0)
      {
       
       this.amend9Exists=0;
      }
      else
      {
       this.amend9Exists=1;
  
    this.getTotalAmend9Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getAmended10LineItems($id)
  {
    this.projectService.getAmendedLineItems($id,10).subscribe(result=>{
      this.items10=result;
      if(result.length==0)
      {
       
       this.amend10Exists=0;
      }
      else
      {
       this.amend10Exists=1;
  
    this.getTotalAmend10Items();
      }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
   
  }
  getTotalAmend1Items()
  {
    
    this.projectService.getTotalAmend1Items(this.Work_ID, 1).subscribe(result=>{
     
     this.AmdTotal1=result;
    });

  }
  getReTotalAmend1Items()
  {
    
    this.projectService.getReTotalAmend1Items(this.Work_ID, 1).subscribe(result=>{
     
     this.AmdReTotal1=result;
    });

  }
  getTotalAmend2Items()
  {
    
    this.projectService.getTotalAmend2Items(this.Work_ID, 2).subscribe(result=>{
     
     this.AmdTotal2=result; 
     
    });

  }
  getReTotalAmend2Items()
  {
    
    this.projectService.getReTotalAmend2Items(this.Work_ID, 2).subscribe(result=>{
     
     this.AmdReTotal2=result; 
     
    });

  }
  getTotalAmend3Items()
  {
    
    this.projectService.getTotalAmend3Items(this.Work_ID, 3).subscribe(result=>{
   
     this.AmdTotal3=result;
    });

  }
  getReTotalAmend3Items()
  {
    
    this.projectService.getReTotalAmend3Items(this.Work_ID, 3).subscribe(result=>{
   
     this.AmdReTotal3=result;
    });

  }
  getTotalAmend4Items()
  {
    
    this.projectService.getTotalAmendedItems(this.Work_ID, 4).subscribe(result=>{
   
     this.AmdTotal4=result;
    });

  }
  getReTotalAmend4Items()
  {
    
    this.projectService.getReTotalAmendItems(this.Work_ID, 4).subscribe(result=>{
   
     this.AmdReTotal4=result;
    });

  }
  getTotalAmend5Items()
  {
    
    this.projectService.getTotalAmendedItems(this.Work_ID, 5).subscribe(result=>{
   
     this.AmdTotal5=result;
    });

  }
  getReTotalAmend5Items()
  {
    
    this.projectService.getReTotalAmendItems(this.Work_ID, 5).subscribe(result=>{
   
     this.AmdReTotal5=result;
    });

  }
  getTotalAmend6Items()
  {
    
    this.projectService.getTotalAmendedItems(this.Work_ID, 6).subscribe(result=>{
   
     this.AmdTotal6=result;
    });

  }
  getReTotalAmend6Items()
  {
    
    this.projectService.getReTotalAmendItems(this.Work_ID, 6).subscribe(result=>{
   
     this.AmdReTotal6=result;
    });

  }
  getTotalAmend7Items()
  {
    
    this.projectService.getTotalAmendedItems(this.Work_ID, 7).subscribe(result=>{
   
     this.AmdTotal7=result;
    });

  }
  getReTotalAmend7Items()
  {
    
    this.projectService.getReTotalAmendItems(this.Work_ID, 7).subscribe(result=>{
   
     this.AmdReTotal7=result;
    });

  }
  getTotalAmend8Items()
  {
    
    this.projectService.getTotalAmendedItems(this.Work_ID, 8).subscribe(result=>{
   
     this.AmdTotal8=result;
    });

  }
  getReTotalAmend8Items()
  {
    
    this.projectService.getReTotalAmendItems(this.Work_ID, 8).subscribe(result=>{
   
     this.AmdReTotal8=result;
    });

  }
  getTotalAmend9Items()
  {
    
    this.projectService.getTotalAmendedItems(this.Work_ID, 9).subscribe(result=>{
   
     this.AmdTotal9=result;
    });

  }
  getTotalAmend10Items()
  {
    
    this.projectService.getTotalAmendedItems(this.Work_ID, 10).subscribe(result=>{
   
     this.AmdTotal10=result;
    });

  }
  getReTotalAmend9Items()
  {
    
    this.projectService.getReTotalAmendItems(this.Work_ID, 9).subscribe(result=>{
   
     this.AmdReTotal9=result;
    });

  }
  getReTotalAmend10Items()
  {
    
    this.projectService.getReTotalAmendItems(this.Work_ID, 10).subscribe(result=>{
   
     this.AmdReTotal10=result;
    });

  }

  getGrandTotal()
  {
     this.projectService.getGrandTotal(this.Work_ID).subscribe(result=>{
      this.GrandTotal=result[0];
    })
  }
  getTender($id)
  {
    
    this.projectService.getFinalLabTenderDetails($id).subscribe(result=>{
     this.tenders=result;
     
    })
  }
 
  
  getReMeasuredTenderDetails()
  {
    this.projectService.getReMeasuredTenderDetails(this.Work_ID).subscribe(result=>{
    })
  }
  getReMeasuredAmendDetails()
  {
    this.projectService.getReMeasuredAmendDetails(this.Work_ID).subscribe(result=>{
    })
  }
  editQty($id,$item, $type)
  {
   
    if($type==1)
    {
      this.dialogRef = this.dialog.open(ReMeasureDetailsComponent, {
        panelClass:'remeasure-details-dialog',
        data      : {
          workid : this.Work_ID,
          itemid : $item,
          typeid : $type,
          tid : $id
        }
    });
  
    this.dialogRef.afterClosed()
        .subscribe((response: FormGroup) => {
          this.getReMeasuredTenderDetails();
          this.getReMeasuredAmendDetails();
          this.ngOnInit();
         
            if ( !response )
            {
              this.getReMeasuredTenderDetails();
              this.getReMeasuredAmendDetails();
              this.ngOnInit();
                return;
            }
  
           
  
        });
       
    }
    else  if($type==2)
    {
      this.dialogRef = this.dialog.open(ReMeasureDetailsComponent, {
        panelClass:'remeasure-details-dialog',
        data      : {
          workid : this.Work_ID,
          itemid : $item,
          typeid : $type,
          eid : $id
        }
    });
  
    this.dialogRef.afterClosed()
        .subscribe((response: FormGroup) => {
          this.getReMeasuredTenderDetails();
          this.getReMeasuredAmendDetails();
         
            if ( !response )
            {
                return;
            }
  
           
  
        });
       
    }
   
  }
 
 chkReMeasureIssueDateExists(no)
    {
      this.projectService.chkRemeasureIssueDateExists(this.Work_ID,no).subscribe(result=>{
        if(result[0]['IssueDate']==null)
        {
          this.addRemeasureIssueDate(no);
        }
        else
        {
          this.router.navigate(['/print-remeasure-new/'+this.Work_ID+'/'+no]);
        }
      })
    }
    addRemeasureIssueDate(type)
    {

      this.dialogRef_IssueDate = this.dialog.open(RemeasureIssueDateComponent, {
        panelClass:'amend-issue-date-dialog',
        data      : {
         workid : this.Work_ID,
         typeid : type
        
          
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
    
  finish(no)
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
           
            this.projectService.finishReMeasure(this.Work_ID, no).subscribe(result=>{console.log(result);
              if(result["Success"]==true)
              {
                this.openSnackBar('Re-Measure Completed Successfully!!','OK');
                
              }
              this.getReMeasureSummary(no);
              this.getReFlags(no);
            })
          }
      }
      this.confirmDialogRef = null;
  });
 


  
}
printRemeasure(no)
{
  this.chkReMeasureIssueDateExists(no);
  
}
getReMeasureSummary(no)
{
  this.projectService.getReMeasureSummary(this.Work_ID,no).subscribe(result=>{
    
    if(no==0)
    {
      this.reTTotal=result['TotalAfterRe'];
    }
    else if(no==1)
    {
      this.AmdReTotal1=result['TotalAfterRe'];
    }
    else if(no==2)
    {
      this.AmdReTotal2=result['TotalAfterRe'];
    }
    
    else if(no==3)
    {
      this.AmdReTotal3=result['TotalAfterRe'];
    }
    else if(no==4)
    {
      this.AmdReTotal4=result['TotalAfterRe'];
    }
    else if(no==5)
    {
      this.AmdReTotal5=result['TotalAfterRe'];
    }
    else if(no==6)
    {
      this.AmdReTotal6=result['TotalAfterRe'];
    }
    else if(no==7)
    {
      this.AmdReTotal7=result['TotalAfterRe'];
    }
    else if(no==8)
    {
      this.AmdReTotal8=result['TotalAfterRe'];
    }
    else if(no==9)
    {
      this.AmdReTotal9=result['TotalAfterRe'];
    }
    else if(no==10)
    {
      this.AmdReTotal10=result['TotalAfterRe'];
    }

  })
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
   
  }
    
    

