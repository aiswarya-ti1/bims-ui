import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';
import { finalAssocDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/finalAssocDetails';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/termsAndCondition';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { CustomerDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/customerDetails';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';


@Component({
    selector   : 'print-amendment',
    templateUrl: './print-amendment.component.html',
    styleUrls  : ['./print-amendment.component.scss']
})
export class PrintAmendmentComponent
{
    tenders:TenderDetails[];
    finalAssoc : TenderAssocs[];
    keys : KeyDeliverables[];
    terms: TermsAndConditions[];
    works : WorkScheduleDetails[];
    payments : PaymentScheduleDetails[];
    custDetails : CustomerDetails[];
    items:LabEstimates[];
    Work_ID : number;
    Assoc_ID : number=0;
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    Issue_Date :Date;
    Work_Type : string;
    AmdTotal : number;
    AmendNo : number=0;
    terms_exists: number;
    keys_exists : number;
  
    constructor(public projectService: ProjectModuleService,  public router:Router,public snackBar: MatSnackBar,
      private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }
  
    ngOnInit() {
  
      this.activatedRoute.params.subscribe((params: Params) => {
        this.Work_ID=params['workid'];
        this.AmendNo=params['amendno'];
      });
  this.getCustomerDetails(this.Work_ID);
      this.getTenderAssoc(this.Work_ID);
     
    this.getAmendLineItems(this.Work_ID, this.AmendNo);
      this.getAmendKeys();
      this.getAmendTerms();
      this.getAmendWorkSchedule();
      this.getAmendPaySchedule();
     this.getAmendIssueDate(this.Work_ID, this.AmendNo);
     this.getOneWork();
      
    }
  
   
    getAmendLineItems($id, $no)
  {
    this.projectService.getAmendedLineItems($id, $no).subscribe(result=>{
      this.items=result;
    this.getTotalAmendItems();
  
    
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
  }
  getTotalAmendItems()
  {
    this.projectService.getTotalAmendItems(this.Work_ID, this.AmendNo).subscribe(result=>{
     this.AmdTotal=result;
     this.words=this.inWords(this.AmdTotal);
    });

  }
  getAmendWorkSchedule()
    {
      this.projectService.getAmendedWorkSchedule(this.Work_ID, this.AmendNo).subscribe(result=>{
        this.works=result; 
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
    }
    getAmendPaySchedule()
    {
      this.projectService.getAmendedPaySchedule(this.Work_ID, this.AmendNo).subscribe(result=>{
        this.payments=result;
     
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
    }
    getAmendKeys()
    {
      this.projectService.getAmendedKeyDeliverables(this.Work_ID, this.AmendNo).subscribe(result=>{
      this.keys=result;
      
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
    }
    getAmendTerms()
    {
     // debugger;
      this.projectService.getAmendedTerms(this.Work_ID, this.AmendNo).subscribe(result=>{
this.terms=result;


      });
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
           this.Work_Type=result[0]['Work_Type'];
                })
    }
    
getFinalTender($id)
      {
        this.projectService.getFinalTender($id).subscribe(result=>{
        this.tenders=result;
        this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);},  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          })

      }
      getTenderAssoc($id)
      {
        this.projectService.getFinalTenderAssoc($id).subscribe(result=>{
        this.finalAssoc=result;
        this.Assoc_ID=result[0]['Assoc_ID'];
        //alert(this.Assoc_ID);
      })
      }
getAssocDetails($id)
      {
        this.projectService.getAssocTenderDetails($id).subscribe(result=>{
        });
      }
      getTenderedAssocs()
      {
        this.projectService.getTenderedAssocs(this.Work_ID).subscribe(result=>{
          this.finalAssoc=result;
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
  getCustomerDetails($id)
  {
    this.projectService.getCustomerDetails($id).subscribe(result=>{
    this.custDetails=result;
  })
  }
  getAmendIssueDate(id, no)
  {
    
    this.projectService.getAmendIssueDate(id, no).subscribe(result=>{  
      this.Issue_Date=result;
    })
  }
  printDoc()
  {
window.print();
  }
  

  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    } 
   
}
