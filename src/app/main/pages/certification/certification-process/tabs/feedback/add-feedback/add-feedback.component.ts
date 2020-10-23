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
import { Locations } from 'app/main/pages/sales-module/locations';
@Component({
  selector: 'add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class AddFeedbackDialogComponent implements OnInit {
  addFeedbackForm : FormGroup; 
  

  constructor(public dialogRef: MatDialogRef<AddFeedbackDialogComponent>,public certfService:CertificationService,
    public projectService:ProjectModuleService, public snackBar : MatSnackBar,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.addFeedbackForm = new FormGroup(
        {
          custName:new FormControl(),
        WorkDetails:new FormControl(),
        rate: new FormControl(),
        unit: new FormControl(),
        orderValue:new FormControl(),
        custID : new FormControl(),
        typeID : new FormControl(),
        assocID : new FormControl(),
        Behaviour : new FormControl(),
        Knowledge : new FormControl(),
        Quality : new FormControl(),
        WorkLevel : new FormControl(),
        Time : new FormControl(),
        Payment : new FormControl(),
        Pricing : new FormControl(),
        Service : new FormControl()
          
        });

        this.addFeedbackForm= this._formBuilder.group({
          custName:['', Validators.required],
          custID : ['', Validators.required],
        rate :[''],
        orderValue :[''],

          typeID : [''],
          assocID : [''],
          WorkDetails :[''],
          Behaviour : ['', Validators.required],
          Knowledge : ['', Validators.required],
          Quality : ['', Validators.required],
          WorkLevel : ['', Validators.required],
          Time : ['', Validators.required],
          Payment : ['', Validators.required],
          Pricing : ['', Validators.required],
          Service : ['', Validators.required],
          

        
        });
    }

  ngOnInit() {
   
    
   this.addFeedbackForm.controls['custID'].setValue(this.data['custid']);
   this.addFeedbackForm.controls['typeID'].setValue(this.data['typeid']);
   this.addFeedbackForm.controls['assocID'].setValue(this.data['associd']);
   this.getProject();
  
     //this.PayID=this.data['payID'];
  }
  getProject()
  {
    this.certfService.getCustomer(this.data['custid']).subscribe(result=>{
    //console.log(result[0]);
    this.addFeedbackForm.controls['assocID'].setValue(result[0]['Assoc_ID']);
   
    this.addFeedbackForm.controls['WorkDetails'].setValue(result[0]["Work_Detail"]);
    this.addFeedbackForm.controls['WorkDetails'].disable();
    this.addFeedbackForm.controls['custName'].setValue(result[0]["Cust_Name"]);
    this.addFeedbackForm.controls['custName'].disable();
    this.addFeedbackForm.controls['orderValue'].setValue(result[0]["OrderValue"]);
    this.addFeedbackForm.controls['rate'].setValue(result[0]["Rate_Unit"]);
   
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
 
  }
  
  addFeedback($values)
  {
    this.certfService.addFeedback($values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Feedback Added Successfully!!!!','OK');
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
  
  
 
 


