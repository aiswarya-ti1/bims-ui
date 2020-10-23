import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { WorkScheduleDetails } from '../../workScheduleDetails';

@Component({
    selector     : 'view-work-schedule',
    templateUrl  : './view-work-schedule.component.html',
    styleUrls    : ['./view-work-schedule.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ViewWorkScheduleDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
   workID : number;
   workSched:WorkScheduleDetails[];
   viewID: number;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ViewWorkScheduleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder, private projectService :ProjectModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.contactForm = new FormGroup(
            {
               
            });
       
    }
    ngOnInit() {
        
this.workID=this.data['workid'];
this.viewID=this.data['viewid'];
        this.contactForm = this._formBuilder.group({
           
         
        });
        this.getWorkSchedule();
    }

    

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getWorkSchedule()
    {
      this.projectService.getViewWorkSchedule(this.workID, this.viewID).subscribe(result=>{
       
        this.workSched=result;
      });
    }

   
}
