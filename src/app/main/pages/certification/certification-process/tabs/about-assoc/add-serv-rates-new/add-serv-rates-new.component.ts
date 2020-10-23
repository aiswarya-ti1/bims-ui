import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { CertificationService } from 'app/main/pages/certification/certification.service';

@Component({
  selector: 'add-serv-rates-new',
  templateUrl: './add-serv-rates-new.component.html',
  styleUrls: ['./add-serv-rates-new.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})export class AddServiceRatesNewComponent implements OnInit {
  addRateForm : FormGroup; 

  constructor(public dialogRef: MatDialogRef<AddServiceRatesNewComponent>,public certfService:CertificationService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,public snackBar:MatSnackBar,
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
          rateID:[''],
          ser : [''],
          seg :[''],
pattern :['', Validators.required],
rateL : [''],
rateML :['']

        
        });
    }

  ngOnInit() {
   
   this.addRateForm.controls['rateID'].setValue(this.data['rateid']);
  
     //this.PayID=this.data['payID'];
  }
  onChange(event)
  {
    //alert(event);
    if(event=='Labour Only')
    {
      this.addRateForm.controls['rateML'].disable();
    }
    else if(event=='Material + Labour')
    {
      this.addRateForm.controls['rateL'].disable();
    }
  }
  updateRates(values)
  {
console.log(values);

this.certfService.updateRates(values).subscribe(result=>{console.log(result);
  if(result['Success']==true)
  {
    this.openSnackBar('Rates Added Successfully!!','OK');
  }
  else{
    this.openSnackBar('Something went wrong!!', 'OK');
  }

},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  })

  }
    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
  
 
 

}
