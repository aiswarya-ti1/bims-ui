import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { Locations } from '../../sales-module/locations';
import { Leads } from '../../sales-module/lead';
import { ProjectModuleService } from '../../project-module/project-module.service';

@Component({
    selector     : 'add-associate',
    templateUrl  : './add-associate.component.html',
    styleUrls    : ['./add-associate.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddAssociateDialogComponent
{
  
    workForm: FormGroup;
   
    

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddAssociateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private projectService : ProjectModuleService,
       
        public snackBar: MatSnackBar
    )
    {
        this.workForm = new FormGroup(
            {
              typeID: new FormControl(),
        
              lead : new FormControl(),

              category : new FormControl(),
              workDetails : new FormControl(),
              workSpec : new FormControl(),
              workcomments : new FormControl(),
              lead_ID : new FormControl(),
              lead_Name : new FormControl()
              
            });
       
    }
    ngOnInit() {
        this.workForm = this._formBuilder.group({
           
          typeID: [1],
        
          lead : [''],

          category :  ['', Validators.required],
          workDetails :  ['', Validators.required],
          workSpec :  ['', Validators.required],
          workcomments : [''],
          lead_ID : [''],
          lead_Name : ['']

        });
        
    }
   
  
}
