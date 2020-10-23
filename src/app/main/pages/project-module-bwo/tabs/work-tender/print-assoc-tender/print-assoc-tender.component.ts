import { Component, Type } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { TenderDetails } from '../../work-tender/tenderDetails';
import { TenderAssocs } from '../../work-tender/tenderAssocs';
import { CustomerDetails } from '../../work-order-prepare/customerDetails';
import { TermsAndConditions } from '../../work-order-prepare/add-terms-conditions/termsAndCondition';


@Component({
    selector   : 'print-assoc-tender',
    templateUrl: './print-assoc-tender.component.html',
    styleUrls  : ['./print-assoc-tender.component.scss']
})
export class PrintAssocTenderComponent
{
    tenders:TenderDetails[];
    finalAssoc : TenderAssocs[];
    payTerms :string;
    
    custDetails : CustomerDetails[];
    Work_ID : number;
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    TID : number;
    Issue_Date :Date;
    Work_Type : string;
    terms : TermsAndConditions;
    generalTerms_Flag : number=0;
    FinalQuote:number;
  
    constructor(public projectService: ProjectModuleService,  public router:Router,
      private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }
  
    ngOnInit() {
  
      this.activatedRoute.params.subscribe((params: Params) => {     
       
        this.Work_ID=params['wid']; 
        this.TID=params['tid']             ;
        
      });
     // debugger;
      console.log('Work ID '+this.Work_ID);
      console.log('TID '+this.TID);
  this.getCustomerDetails(this.Work_ID);
      this.getTenderAssoc(this.Work_ID);
      this.getTenderTotal(this.TID);
    
        this.getAssocTender(this.TID);
      
      
     this.getOneWork();
     this.getPaymentTerms();
     this.getTenderTerms();
      
    }
  
    
   
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
           this.Work_Type=result[0]['Work_Type'];
                })
    }
    getAssocTender(id)
    {
      this.projectService.getAssocTender(id).subscribe(result=>{console.log(result);
        this.tenders=result;
      })
    }
    getTenderTotal(id)
    {
      this.projectService.getTenderTotal(id).subscribe(result=>{console.log(result);
      this.FinalQuote=result;
    this.words=this.inWords(this.FinalQuote);
  })
    }
    
getFinalTender($id)
      {
        this.projectService.getFinalTender($id).subscribe(result=>{
        this.tenders=result;
        this.Total=result[0]['TotalQuote'];
        this.words=this.inWords(this.Total);})

      }
      getTenderAssoc($id)
      {
        this.projectService.getFinalTenderAssoc($id).subscribe(result=>{
        this.finalAssoc=result;
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
      getPaymentTerms()
      {
        this.projectService.getPaymentTerms(this.Work_ID).subscribe(result=>{
      
          this.payTerms=result[0]['Value'];
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
 
 
   
}
