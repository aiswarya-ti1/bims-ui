import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'extra-payment',
  templateUrl: './extra-payment.component.html',
  styleUrls: ['./extra-payment.component.scss'],
  animations : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ExtraPaymentDialog implements OnInit {

  startWorkForm : FormGroup;
  workID : number=0;
  

  constructor(public dialogRef: MatDialogRef<ExtraPaymentDialog>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) 
    { 

      this.startWorkForm=new FormGroup({
        recAmt : new FormControl(),
           work_ID : new FormControl(),
           pay_ID : new FormControl(),
           payDate : new FormControl()
                
      });
      this.startWorkForm = this._formBuilder.group({
        
        recAmt : ['', Validators.required],
        work_ID :[''],
        pay_ID : [''],
        payDate : ['', Validators.required]

      });
      
    }

  ngOnInit() {  
    this.startWorkForm.controls['pay_ID'].setValue(this.data['payid']);
    
  }
  saveExtraPayment($values)
  {
   
    this.projectService.saveExtraPayment($values).subscribe(result=>{
      
    });
  }
  
  
  

}
