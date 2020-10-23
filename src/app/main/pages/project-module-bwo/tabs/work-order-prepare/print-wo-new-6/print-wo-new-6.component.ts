import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { TenderDetails } from '../../work-tender/tenderDetails';
import { WorkScheduleDetails } from '../workScheduleDetails';
import { KeyDeliverables } from '../add-key-deliverables/keyDeliverables';
import { TenderAssocs } from '../../work-tender/tenderAssocs';
import { finalAssocDetails } from '../finalAssocDetails';
import { TermsAndConditions } from '../termsAndCondition';
import { PaymentScheduleDetails } from '../paymentScheduleDetails';
import { CustomerDetails } from '../customerDetails';
import { ViewReMeasureDialogComponent } from 'app/main/pages/migrated-data/tabs/view-re-measure/view-re-measure.component';
import * as XLSX from 'xlsx';


@Component({
    selector   : 'print-wo-new-6',
    templateUrl: './print-wo-new-6.component.html',
    styleUrls  : ['./print-wo-new-6.component.scss']
})
export class PrintWONew6Component
{
  fileName_pay= 'PaySchedule.xlsx';
  fileName_work= 'WorkSchedule.xlsx';
  fileName_tender= 'WorkTender.xlsx';
  fileName_Key= 'Keys.xlsx';
  fileName_Term= 'Terms.xlsx';
    tenders:TenderDetails[];
    finalAssoc : TenderAssocs[];
    keys : KeyDeliverables[];
    terms: TermsAndConditions[];
    works : WorkScheduleDetails[];
    payments : PaymentScheduleDetails[];
    custDetails : CustomerDetails[];
    Work_ID : number;
    Assoc_ID : number;
    ReType : number=0;
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    Issue_Date :Date;
    Work_Type : string;
    
    dialogRef : MatDialogRef<ViewReMeasureDialogComponent>;
    constructor(public projectService: ProjectModuleService,  public router:Router,
      private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }
  
    ngOnInit() {
  
      this.activatedRoute.params.subscribe((params: Params) => {
      
        //this.cust_ID= params['custid'];
        
       // this.lead_ID = params['leadid'];
        this.Work_ID=params['workid'];
        this.ReType=params['retype'];
        //alert(this.Work_ID);
       
        
      });
  this.getCustomerDetails(this.Work_ID);
      this.getTenderAssoc(this.Work_ID);
      this.getFinalTender(this.Work_ID);
      this.getKeys();
      this.getTerms();
      this.getWorkSchedule();
      this.getPaySchedule();
     this.getIssueDate(this.Work_ID);
     this.getOneWork();
      
    }
  
    /*getTender($id)
  {
    //debugger;
    this.projectService.getFinalLabTenderDetails($id).subscribe(result=>{console.log(result);
      this.tenders=result;
      this.Total=result[0]['TotalQuote'];
      this.words=this.inWords(this.Total);
      console.log(this.words);
    });
  }
  
  getTenderAssocDetails($id)
  {
    //debugger;
    //alert('Tender Detaisl ok');
    this.projectService.getAssocDetailsWO($id).subscribe(response=>{console.log(response);
      this.finalAssoc=response;
  //alert(response[0]['Assoc_FirstName']);
   });
  }
  getKeyDeliverables($id)
   {
     this.dashService.getKeyDeliverables($id).subscribe(result=>{console.log(result);
     
  this.keys=result;
  });
   }
  
   getTerms($id)
   {
   this.tenderService.getTermsCondition($id).subscribe(result=>{console.log(result);
   this.terms=result;
  
  })
  }
  getWorkSchedule($id)
  {
    this.dashService.getWorkSchedule($id).subscribe(result=>{console.log(result);
     this.works=result; 
  });
  
  }
  getPaySchedule($id)
  {
    this.dashService.getPaySchedule($id).subscribe(result=>{console.log(result);
      this.payments=result;
  });
  
  }
  getCustomerDetails($id)
  {
    this.tenderService.getCustomerDetails($id).subscribe(result=>{console.log(result);
    this.custDetails=result;
  })
  }
  printWO()
  {
    window.print();
  }
  getIssueDate(id)
  {
    this.tenderService.getIssueDate(id).subscribe(result=>{console.log(result);
      this.Issue_Date=result;
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
    }*/
    getWorkSchedule()
    {
      this.projectService.getWorkSchedule(this.Work_ID).subscribe(result=>{console.log(result);
        this.works=result; 
      });
    }
    getPaySchedule()
    {
      this.projectService.getPaySchedule(this.Work_ID).subscribe(result=>{console.log(result);
        this.payments=result;
     
      });
    }
    getKeys()
    {
      this.projectService.getKeyDeliverables(this.Work_ID).subscribe(result=>{console.log(result);
      this.keys=result;
      
    })
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{console.log(result);
         
           this.Work_Type=result[0]['Work_Type'];
                })
    }
    getTerms()
    {
     // debugger;
      this.projectService.getTermsCondition(this.Work_ID).subscribe(result=>{console.log(result);
this.terms=result;

      });
    }
getFinalTender($id)
      {
        this.projectService.getFinalTender($id).subscribe(result=>{console.log(result);
        this.tenders=result;
        this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);})

      }
      getTenderAssoc($id)
      {
        this.projectService.getFinalTenderAssoc($id).subscribe(result=>{console.log(result);
        this.finalAssoc=result;
        this.Assoc_ID=result[0]['Assoc_ID'];
       // alert(this.Assoc_ID);
      })
      }
getAssocDetails($id)
      {
        this.projectService.getAssocTenderDetails($id).subscribe(result=>{console.log(result);
        });
      }
      getTenderedAssocs()
      {
        this.projectService.getTenderedAssocs(this.Work_ID).subscribe(result=>{console.log(result);
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
    this.projectService.getCustomerDetails($id).subscribe(result=>{console.log(result);
    this.custDetails=result;
  })
  }
  getIssueDate(id)
  {
    this.projectService.getIssueDate(id).subscribe(result=>{console.log(result);
      this.Issue_Date=result;
    })
  }
  printDoc()
  {
window.print();
  }
  viewReMeasure()
  {
    
      this.dialogRef = this.dialog.open(ViewReMeasureDialogComponent, {
        panelClass:'view-re-measure-dialog',
        data      : {
          workid : this.Work_ID
        }
      });
      
      this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
      this.getOneWork();
      
        if ( !response )
        {
          this.getOneWork();
            return;
        }
      });

      
    
  }
  exportWorkSched()
  {
    let element = document.getElementById('work-sch-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName_work);
  }
  exportPaySched()
  {
    let element = document.getElementById('pay-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName_pay);
  }
  exportTender()
  {
    let element = document.getElementById('tender-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName_tender);
  }
  exportTerms()
  {
    let element = document.getElementById('term-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName_Term);
  }
  exportKeys()
  {
    let element = document.getElementById('key-table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName_Key);
  }
   
}
