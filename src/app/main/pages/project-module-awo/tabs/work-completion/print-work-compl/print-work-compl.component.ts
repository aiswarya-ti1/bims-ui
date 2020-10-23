import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { CustomerDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/customerDetails';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
import { Works } from 'app/main/pages/project-module-bwo/works';
@Component({
    selector   : 'print-work-compl',
    templateUrl: './print-work-compl.component.html',
    styleUrls  : ['./print-work-compl.component.scss']
})
export class PrintWorkCompletionComponent
{
    tenders:TenderDetails[];
    custDetails : CustomerDetails[];
    Work_ID : number;
    works:Works[];
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    Total :number;
    words: string;
    Closure_Date :Date;
    Work_Type : string;
    WorkDetail: string;
    workTotal : number;
    reTotal : number;
  
    constructor(public projectService: ProjectModuleService,  public router:Router,
      private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }
  
    ngOnInit() {
  
      this.activatedRoute.params.subscribe((params: Params) => {
              this.Work_ID=params['workid'];

      });
  this.getCustomerDetails(this.Work_ID);      
      this.getAllTotal(this.Work_ID);
     this.getOneWork();
      
    }
  

    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
           this.Work_Type=result[0]['Work_Type'];
           this.WorkDetail=result[0]['WorkDetail'];
           this.Closure_Date=result[0]['ActualClosureDate'];
                })
    }
    
getAllTotal(id)
{
this.projectService.getAllTotals(id).subscribe(result=>{console.log(result);
  this.workTotal=result['TotalWorkAmt'];
  this.reTotal=result['GrandTotal'];
})
}
     
      

  getCustomerDetails($id)
  {
    this.projectService.getCustomerDetails($id).subscribe(result=>{
    this.custDetails=result;
  })
  }
  
   
}
