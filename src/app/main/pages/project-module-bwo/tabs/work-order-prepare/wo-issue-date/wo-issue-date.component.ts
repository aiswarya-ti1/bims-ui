import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { ProjectModuleBWOAppComponent } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.component';
import { ProjectModuleBWOComponent } from '../../../project-module-bwo.component';
import { AppProjectModuleBWOService } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.service';

@Component({
  selector: 'wo-issue-date',
  templateUrl: './wo-issue-date.component.html',
  styleUrls: ['./wo-issue-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WOIsuueDateComponent implements OnInit {

  assocVisitForm : FormGroup;
  type_ID : number;

  constructor(public dialogRef: MatDialogRef<WOIsuueDateComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,
    public projAppService : AppProjectModuleBWOService,
    private _formBuilder: FormBuilder) {

      this.assocVisitForm = new FormGroup(
        {
          woIssueDate : new FormControl(),
          workid :new FormControl(),
          today : new FormControl()
        });

        this.assocVisitForm= this._formBuilder.group({
          woIssueDate :['', Validators.required],
          workid :[''],
          today :['']
        });
     }

  ngOnInit() {

    this.assocVisitForm.controls["workid"].setValue(this.data['workid']);
    this.type_ID=this.data['typeid'];
  }

  updateDetails($values)
  {
    
    this.projectService.updateWOIssueDate($values).subscribe(result=>{
      if(result["Success"]==true)
      {
        if(this.type_ID==0)
        {
          this.projectService.finishWO(this.data['workid']).subscribe(result=>{
          })
        }
        else if(this.type_ID==1)
        {
          this.projAppService.biws_finishWO(this.data['workid']).subscribe(result=>{
          })
        }
        
      }
    })
  }

}
