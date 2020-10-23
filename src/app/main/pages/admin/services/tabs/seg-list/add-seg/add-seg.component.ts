import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
@Component({
    selector     : 'add-seg',
    templateUrl  : './add-seg.component.html',
    styleUrls    : ['./add-seg.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddSegmentDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
  

    /**
     * Constructor
     *
     * @param {MatDialogRef<>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddSegmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private projService : ProjectModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.contactForm = new FormGroup(
            {
              segName:new FormControl(),
               
            });
       
    }
    ngOnInit() {
        

        this.contactForm = this._formBuilder.group({
           
          segName: ['', Validators.required],
       
        });
    }

    

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addSegment($value)
      {
        this.projService.addNewSeg($value).subscribe(results=>{console.log(results);
        if(results['Success']==true)
      {
        this.openSnackBar('New Segment Added Successfully!!','Ok');
      }},      error=>{console.log(error);
        
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
      }


   
}
