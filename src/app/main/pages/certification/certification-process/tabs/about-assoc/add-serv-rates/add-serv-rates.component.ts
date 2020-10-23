import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { CertificationService } from 'app/main/pages/certification/certification.service';
@Component({
  selector: 'add-serv-rates',
  templateUrl: './add-serv-rates.component.html',
  styleUrls: ['./add-serv-rates.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class AddServiceRatesComponent implements OnInit {
  addRateForm : FormGroup; 

  constructor(public dialogRef: MatDialogRef<AddServiceRatesComponent>,public certfService:CertificationService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.addRateForm = new FormGroup(
        {
          rateID:new FormControl(),
          seg : new FormControl(),
          ser : new FormControl(),
          pattern : new FormControl(),
          rateL : new FormControl(),
          rateML : new FormControl()
                   
        });

        this.addRateForm= this._formBuilder.group({
          rateID:['', Validators.required],
          ser : ['', Validators.required],
          seg :['', Validators.required],
pattern :['', Validators.required],
rateL : [''],
rateML :['']

        
        });
    }

  ngOnInit() {
   
   this.addRateForm.controls['rateID'].setValue(this.data['rateID']);
  
     //this.PayID=this.data['payID'];
  }
  updateRates(values)
  {
console.log(values);

this.certfService.updateRates(values).subscribe(result=>{console.log(result);
  if(result['Success']==true)
  {
    alert('Success');
  }
  else{
    alert('Failed');
  }

})

  }
  
  
 
 

}
