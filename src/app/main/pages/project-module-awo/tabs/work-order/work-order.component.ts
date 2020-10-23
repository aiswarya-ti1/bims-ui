import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/termsAndCondition';
import { Works } from 'app/main/pages/project-module-bwo/works';
@Component({
    selector     : 'work-order',
    templateUrl  : './work-order.component.html',
    styleUrls    : ['./work-order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkOrderComponent implements OnInit
{
  works :Works[];
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    finalizeAssocForm : FormGroup;
    Work_ID : number=0;
    payTerms : string;    
    Item_Count : number=0;
    type_ID : number=0;
    items:LabEstimates[];
    items1:LabEstimates[];
    items2:LabEstimates[];
    items3:LabEstimates[];
    Serv_ID =[];
    assocExists_Flag : number=0;
    Est_Flag : number=0;
    InitWO_Flag :number=0;
    payTerms_Flag : number =0;
    paySched_Flag : number =0;
    workSched_Flag : number =0;
    woSignUp_Flag : number=0;
    keys_Flag:number=0;
    terms_Flag : number=0;
    assocs : TenderAssocs[];
    assoc_F : TenderAssocs[];
    assocs_T : TenderAssocs[];
    tenders : TenderDetails[];
    tenderFinal : TenderDetails[];
    amend1Exists : number=0;   
    amend2Exists : number=0;   
    amend3Exists : number=0;   
    values=[];
    AssocName : string;
    quoteFormGroup : FormGroup;
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
   // a_words1 : string;
   // a_words2 : string;
   // a_words3 : string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
    paySched:PaymentScheduleDetails[];
    workSched:WorkScheduleDetails[];
    SegmentID : number=0;
    keys : KeyDeliverables[];
    terms : TermsAndConditions[];
    A_Flag : number=0;
    //AmdTotal3 : Float32Array;
   // AmdTotal2 : Float32Array;
   // AmdTotal1 : Float32Array;

    
    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute,

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
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
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
          this.finalizeAssocForm.controls['workID'].setValue(this.Work_ID);
   this.getOneWork();       
  // this.getAmended1LineItems(this.Work_ID);
  // this.getAmended2LineItems(this.Work_ID);
  // this.getAmended3LineItems(this.Work_ID);
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
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         this.works=result;
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.SegmentID=result[0]['Segment_ID'];
            this.woSignUp_Flag=result[0]['WOSignUp_Flag'];
            this.A_Flag=result[0]['Amend_Flag'];

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
           console.log('no tender found')
           
          }
          if(resp1.length>0){
              console.log('tender exists')
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
   /* getAmended1LineItems($id)
  {
    this.projectService.getAmended1LineItems($id).subscribe(result=>{ console.log(result);
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
      });
   
  }
  getAmended2LineItems($id)
  {
    this.projectService.getAmended2LineItems($id).subscribe(result=>{console.log(result);
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
      });
   
  }
  getAmended3LineItems($id)
  {
    this.projectService.getAmended3LineItems($id).subscribe(result=>{console.log(result);
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
      });
   
  }
  
  getTotalAmend1Items()
  {
    
    this.projectService.getTotalAmend1Items(this.Work_ID, 1).subscribe(result=>{console.log(result);
     
     this.AmdTotal1=result;
     this.a_words1=this.inWords(this.AmdTotal1);
    });

  }
  getTotalAmend2Items()
  {
    
    this.projectService.getTotalAmend2Items(this.Work_ID, 2).subscribe(result=>{console.log(result);
     
     this.AmdTotal2=result;
     this.a_words2=this.inWords(this.AmdTotal2);     
     
    });

  }
  getTotalAmend3Items()
  {
    
    this.projectService.getTotalAmend3Items(this.Work_ID, 3).subscribe(result=>{console.log(result);
   
     this.AmdTotal3=result;
     this.a_words3=this.inWords(this.AmdTotal3);
     
    });

  }*/
   
    getPaymentTerms()
    {
      this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{console.log(result);
        this.payTerms=result[0]['Value'];
     
    })
    }
    checkWorkSchedExists()
    {
      this.projectService.chkWorkSchedExists(this.Work_ID).subscribe(result=>{console.log(result);
        this.workSched_Flag=result;
      })
    }
    checkPaySchedExists()
    {
      this.projectService.chkPaySchedExists(this.Work_ID).subscribe(result=>{console.log(result);
        this.paySched_Flag=result;
      })
    }
    checkKeysExists()
    {
      this.projectService.chkKeysExists(this.Work_ID).subscribe(result=>{console.log(result);
        this.keys_Flag=result;
      })
    }
    checkTermsExists()
    {
      this.projectService.checkTermsExists(this.Work_ID).subscribe(result=>{console.log(result);
      this.terms_Flag=result;
    })
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
     
      });
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
    downloadDesign()
       {
     this.projectService.downloadDesign(this.Work_ID).subscribe(
      
         (res) => {console.log(res[0]);
           /*var binaryData = [];
     binaryData.push(res);
              const a = document.createElement('a');
               a.href = window.URL.createObjectURL(new Blob(binaryData, {type: 'image/*,application/pdf'}))
               a.download = res[1];
               document.body.appendChild(a);
               a.click();
               window.open(a.href);*/
               //var fileURL = URL.createObjectURL(res);
               window.open(res[0]);
              
         });
      
     
         
     }
     printWO()
    {
      this.router.navigate(['print-work-order-6/'+this.Work_ID+'/'+0]);
    }
    
    
  }
    
    

