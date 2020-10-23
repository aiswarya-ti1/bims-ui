import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'amend-issue-date',
  templateUrl: './amend-issue-date.component.html',
  styleUrls: ['./amend-issue-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AmendIssueDateComponent implements OnInit {

  assocVisitForm : FormGroup;

  constructor(public dialogRef: MatDialogRef<AmendIssueDateComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any, private snackBar : MatSnackBar,
    private _formBuilder: FormBuilder) {

      this.assocVisitForm = new FormGroup(
        {
          woIssueDate : new FormControl(),
           workid :new FormControl(),
          today : new FormControl(),
          amendno : new FormControl()
        });

        this.assocVisitForm= this._formBuilder.group({
          woIssueDate :['', Validators.required],
          workid :[''],
          today :[''],
          amendno :['']
        });
     }

  ngOnInit() {

    this.assocVisitForm.controls["workid"].setValue(this.data['workid']);
    this.assocVisitForm.controls["amendno"].setValue(this.data['amendno']);
  }

  updateDetails($values)
  {
    
    this.projectService.updateAmendIssueDate($values).subscribe(result=>{
      if(result["Success"]==true)
      {
        this.openSnackBar('Amendment Issue Date updated successfully!!', 'Ok');
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
