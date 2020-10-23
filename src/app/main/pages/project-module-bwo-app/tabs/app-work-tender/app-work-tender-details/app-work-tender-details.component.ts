import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { fuseAnimations } from '@fuse/animations';

import { AppProjectBWOModule } from '../../../project-module-bwo-app.module';
import { AppProjectModuleBWOService } from '../../../project-module-bwo-app.service';
@Component({
  selector: 'app-work-tender-details',
  templateUrl: './app-work-tender-details.component.html',
  styleUrls: ['./app-work-tender-details.component.scss'],
  animations : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AppWorkTenderDetailsComponent implements OnInit {

  startWorkForm : FormGroup;
  workID : number=0;
  
  typeID ; number;

  constructor(public dialogRef: MatDialogRef<AppWorkTenderDetailsComponent>,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    public snackBar: MatSnackBar,private projAppService :AppProjectModuleBWOService,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) 
    { 

      this.startWorkForm=new FormGroup({
        rate : new FormControl(),
        schDate: new FormControl(),
        actDate: new FormControl(),
        TL_ID: new FormControl(),
        work_ID: new FormControl(),
        type_ID : new FormControl()
                
      });
      this.startWorkForm = this._formBuilder.group({
        
        rate  : [''],
        schDate : [''],
        actDate:  [''],
        TL_ID:   [''],
        work_ID:  [''],
        type_ID :  [''],
        
      });
      
    }

  ngOnInit() {  

    this.workID=this.data['workID'] ;
    this.startWorkForm.controls['work_ID'].setValue(this.data['workid']);
    this.startWorkForm.controls['TL_ID'].setValue(this.data['tenderid']);
    this.startWorkForm.controls['type_ID'].setValue(this.data['typeid']);
    this.typeID=this.data['typeid'];
    
  }
  
  saveWorkDays(values)
      {
        this.projAppService.saveWorkDays(values).subscribe(result=>{console.log(result);
        if(result['Success']==true)
      {
        this.dialogRef.close();
        this.openSnackBar('Work Days added successfully!!','Ok');
      }})
      }
  
openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

}
