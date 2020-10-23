import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'work-dates',
  templateUrl: './work-dates.component.html',
  styleUrls: ['./work-dates.component.scss'],
  animations : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class WorkDatesDialog implements OnInit {

  startWorkForm : FormGroup;
  workID : number=0;
  

  constructor(public dialogRef: MatDialogRef<WorkDatesDialog>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router, public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) 
    { 

      this.startWorkForm=new FormGroup({
        schd_ID : new FormControl(),
           work_ID : new FormControl(),
           ActualStart : new FormControl(),
           ActualClose : new FormControl()
                
      });
      this.startWorkForm = this._formBuilder.group({
        
        schd_ID : ['', Validators.required],
        work_ID :[''],
        ActualStart : ['', Validators.required],
        ActualClose : ['']

      });
      
    }

  ngOnInit() {  
    this.startWorkForm.controls['schd_ID'].setValue(this.data['sche_id']);
    this.chkStartDateExists(this.data['sche_id']);
    
  }
  saveWorkDate($values)
  {
   
    this.projectService.saveWorkDate($values).subscribe(result=>{
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }
  chkStartDateExists(id)
  {
    this.projectService.chkStartDateExists(id).subscribe(result=>{console.log(result);
      this.startWorkForm.controls['ActualStart'].setValue(result[0]);
    })

  }
 

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
  

}
