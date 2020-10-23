import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
@Component({
    selector     : 'add-serv',
    templateUrl  : './add-serv.component.html',
    styleUrls    : ['./add-serv.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddServicesDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
    segments : Segments[];
  

    /**
     * Constructor
     *
     * @param {MatDialogRef<>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddServicesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private projService : ProjectModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.contactForm = new FormGroup(
            {
              segName:new FormControl(),
              service : new FormControl()
               
            });
       
    }
    ngOnInit() {
        

        this.contactForm = this._formBuilder.group({
           
          segName: ['', Validators.required],
          service :['', Validators.required]
       
        });
        this.getSegments();

    }

    
 getSegments()
    {
      this.projService.getSegments().subscribe(result=>{console.log(result);
        this.segments=result;});
    }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addService($value)
      {
        this.projService.addService($value).subscribe(results=>{console.log(results);
        if(results['Success']==true)
      {
        this.openSnackBar('New Service Added Successfully!!','Ok');
      }},  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
      }


   
}
