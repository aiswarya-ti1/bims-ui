import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'amend-reason',
  templateUrl: './amend-reason.component.html',
  styleUrls: ['./amend-reason.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AmendReasonComponent implements OnInit {

  reasonForm : FormGroup;
  reasons =[];

  constructor(public dialogRef: MatDialogRef<AmendReasonComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any, private snackBar : MatSnackBar,
    private _formBuilder: FormBuilder) {

      this.reasonForm = new FormGroup(
        {
          workid : new FormControl(),
         reason : new FormControl(),
           comment :new FormControl(),
          
        });

        this.reasonForm= this._formBuilder.group({
          workid :['', Validators.required],
          reason :['', Validators.required],
          comment :[''],
          
        });
     }

  ngOnInit() {

    this.reasonForm.controls["workid"].setValue(this.data['workid']);
    this.getAmendReasons();
    
  }

  saveReason($values)
  {
    
    this.projectService.updateAmendReason($values).subscribe(result=>{
      if(result["Success"]==true)
      {
        this.openSnackBar('Data updated successfully!!', 'Ok');
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
  getAmendReasons()
  {
    this.projectService.getAmendReasons().subscribe(result=>{console.log(result);
      this.reasons=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }

}
