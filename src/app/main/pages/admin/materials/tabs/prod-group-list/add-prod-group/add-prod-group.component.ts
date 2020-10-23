import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { ProductSegments } from 'app/main/pages/associates/tabs/mat-assoc-list/productSegments';
@Component({
    selector     : 'add-prod-group',
    templateUrl  : './add-prod-group.component.html',
    styleUrls    : ['./add-prod-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddProductGroupDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
    segments : ProductSegments[];
  

    /**
     * Constructor
     *
     * @param {MatDialogRef<>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddProductGroupDialogComponent>,
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
      this.projService.getProductSegments().subscribe(result=>{console.log(result);
        this.segments=result;});
    }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addService($value)
      {
        this.projService.addProdGroup($value).subscribe(results=>{console.log(results);
        if(results['Success']==true)
      {
        this.openSnackBar('New Service Added Successfully!!','Ok');
      }},  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
      }


   
}
