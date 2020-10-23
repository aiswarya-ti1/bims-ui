import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
@Component({
  selector: 'finish-work',
  templateUrl: './finish-work.component.html',
  styleUrls: ['./finish-work.component.scss'],
  animations : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class FinishWorkComponent implements OnInit {

  startWorkForm : FormGroup;
  workID : number=0;

  constructor(public dialogRef: MatDialogRef<FinishWorkComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) 
    { 
      this.startWorkForm=new FormGroup({
           startDate : new FormControl(),
           work_ID : new FormControl()
                
      });
      this.startWorkForm = this._formBuilder.group({
        
        startDate : ['', Validators.required],
        work_ID :['']
      });
      
    }

  ngOnInit() {  

    this.workID=this.data['workid'] ;
    this.startWorkForm.controls['work_ID'].setValue(this.data['workid']);
    
  }
  FinishWork($values)
  {
        this.projectService.FinishWork($values).subscribe(result=>{console.log(result);
          if(result["Success"]==true){
            this.dialogRef.close({data:'8'});
           alert("Project Completed");
          
        }
        else{
         
          this.dialogRef.close();
        }
         
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
