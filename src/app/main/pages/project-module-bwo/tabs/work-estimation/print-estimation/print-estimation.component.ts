import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { LabEstimates } from '../../../labEstimate';
import { CustomerDetails } from '../../work-order-prepare/customerDetails';
import { Works } from '../../../works';
//import * as jspdf from 'jspdf';
//import html2canvas from 'html2canvas';


@Component({
    selector   : 'print-estimation',
    templateUrl: './print-estimation.component.html',
    styleUrls  : ['./print-estimation.component.scss']
})
export class PrintEstimationComponent
{
   
    custDetails : CustomerDetails[];
    Work_ID : number;
    Work_Type : string;
  items : LabEstimates[];
  works : Works[];
    constructor(public projectService: ProjectModuleService,  public router:Router,
      private _formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private dialog:MatDialog) { }
  
    ngOnInit() {
  
      this.activatedRoute.params.subscribe((params: Params) => {
        this.Work_ID=params['workid'];
      });
  this.getCustomerDetails(this.Work_ID);
     
     this.getOneWork();
     this.getWorkLineItems();
      
    }
    getWorkLineItems()
    {
        
    this.projectService.getWorkLineItems(this.Work_ID).subscribe(result=>{
       this.items=result;
    })
    }
    
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         this.works=result;
           this.Work_Type=result[0]['Work_Type'];
                })
    }
    
  getCustomerDetails($id)
  {
    this.projectService.getCustomerDetails($id).subscribe(result=>{
    this.custDetails=result;
  })
  }
  printDoc()
  {
window.print();
  }
  emailDoc()
  {
    //convert it as pdf
   // let doc=new jsPDF();

  }
  /*downloadDoc()
  {
    var data=document.getElementById('contentToPDF');

    html2canvas(data).then(canvas=>{
      var imgWidth=208;
      var pageHight=295;
      var imgHeight=canvas.height * imgWidth/canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL=canvas.toDataURL('image/png');
      let pdf=new jspdf('p','mm','a4');
      var position=0;
      pdf.addImage(contentDataURL,'PNG',0,position, imgWidth, imgHeight);
      pdf.save(this.Work_ID+'.pdf');
    })

  }*/
   
}
