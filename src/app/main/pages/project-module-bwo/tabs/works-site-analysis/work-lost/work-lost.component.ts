import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';


@Component({
    selector     : 'work-lost',
    templateUrl  : './work-lost.component.html',
    styleUrls    : ['./work-lost.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class WorkLostFormDialogComponent
{
  workLostForm : FormGroup;

  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<WorkLostFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) { }
  ngOnInit() {
   
    this.workLostForm=new FormGroup({
      work_ID : new FormControl(),
      reason : new FormControl()
           
                
    });
    
    this.workLostForm = this._formBuilder.group({
      work_ID: ['', Validators.required],
      reason : ['', Validators.required]
    });

    
    
    this.workLostForm.controls['work_ID'].setValue(this.data['workid']);
   

}
addReason(values)
{
 this.projectService.workLost(values).subscribe(result=>{
                 
                      
                      
                   
                });

}
}

  

  


