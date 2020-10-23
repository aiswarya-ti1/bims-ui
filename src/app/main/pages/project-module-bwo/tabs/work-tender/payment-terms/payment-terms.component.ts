import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Validators} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { AppProjectModuleBWOService } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.service';

@Component({
  selector: 'app-payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentTermsComponent implements OnInit {
  
  termsForm : FormGroup;
  typeID : number;
  tenderID : number;

  constructor(public dialogRef: MatDialogRef<PaymentTermsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,public projectService:ProjectModuleService, public projAppService :AppProjectModuleBWOService) {
      this.termsForm = new FormGroup(
        {
         
          work_ID : new FormControl(),
          type_ID : new FormControl(),
          tender_ID : new FormControl(),
          comment : new FormControl()
          
        });
        this.termsForm = this.formBuilder.group({
          work_ID : ['', Validators.required],
         
          type_ID :[''],
tender_ID :[''],
          comment : ['']
        });
      }

  ngOnInit() {
    this.termsForm.controls["work_ID"].setValue(this.data['workid']);
    this.termsForm.controls["type_ID"].setValue(this.data['typeid']);
    this.termsForm.controls["tender_ID"].setValue(this.data['tenderid']);


    this.typeID=this.data['typeid'];
    this.tenderID=this.data['tenderid'];
    if(this.typeID==1)
    {
      this.projAppService.biws_getTenderPayTerm(this.tenderID).subscribe(result=>{console.log(result);
        this.termsForm.controls["comment"].setValue(result);
      });
    }
  }


  addPaymentTerms($value)
  {
    console.log($value);
    this.projectService.addPaymentTerms($value).subscribe(result=>{console.log(result);
    })
  }

}
