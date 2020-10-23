import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'remeasure-issue-date',
  templateUrl: './remeasure-issue-date.component.html',
  styleUrls: ['./remeasure-issue-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RemeasureIssueDateComponent implements OnInit {

  assocVisitForm : FormGroup;

  constructor(public dialogRef: MatDialogRef<RemeasureIssueDateComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any, private snackBar : MatSnackBar,
    private _formBuilder: FormBuilder) {

      this.assocVisitForm = new FormGroup(
        {
          woIssueDate : new FormControl(),
           workid :new FormControl(),
          today : new FormControl(),
          type : new FormControl()
        });

        this.assocVisitForm= this._formBuilder.group({
          woIssueDate :['', Validators.required],
          workid :[''],
          today :[''],
          type :['']
        });
     }

  ngOnInit() {

    this.assocVisitForm.controls["workid"].setValue(this.data['workid']);
    this.assocVisitForm.controls["type"].setValue(this.data['typeid']);
  }

  updateDetails($values)
  {
    this.projectService.updateRemeasureIssueDate($values).subscribe(result=>{
      if(result["Success"]==true)
      {
        this.openSnackBar('ReMeasure Issue Date Updated Successfully!!', 'OK');
        
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
