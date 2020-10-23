import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from '../../project-module/project-module.service';
@Component({
  selector: 'start-work',
  templateUrl: './start-work.component.html',
  styleUrls: ['./start-work.component.scss'],
  animations : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class StartWorkComponent implements OnInit {

  startWorkForm : FormGroup;
  workID : number=0;
  

  constructor(public dialogRef: MatDialogRef<StartWorkComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) 
    { 

      this.startWorkForm=new FormGroup({
           startDate : new FormControl(),
           work_ID : new FormControl()
                
      });
      this.startWorkForm = this._formBuilder.group({
        
        startDate : ['', Validators.required],
        work_ID :['', Validators.required]
      });
      
    }

  ngOnInit() {  

    this.workID=this.data['workID'] ;
    this.startWorkForm.controls['work_ID'].setValue(this.data['workID']);
    
  }
  startWork($values)
  {
   
    this.projectService.workStart($values).subscribe(result=>{
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }
  
  
openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

}
