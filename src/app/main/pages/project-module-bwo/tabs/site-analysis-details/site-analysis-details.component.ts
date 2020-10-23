import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Segments } from '../../segments';
import { Category } from '../../category';
import { ProjectModuleBWOComponent } from '../../project-module-bwo.component';
@Component({
    selector     : 'site-analysis-details',
    templateUrl  : './site-analysis-details.component.html',
    styleUrls    : ['./site-analysis-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:[ProjectModuleBWOComponent ],
})

export class SiteAnalysisDetailsDialogComponent
{
    action: string;
    analysisForm: FormGroup;
    dialogTitle: string;
    segment:Segments;
    category : Category;
    

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public dialogRef_Site: MatDialogRef<SiteAnalysisDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder, private projectService : ProjectModuleService,
        public snackBar: MatSnackBar, private bwo :ProjectModuleBWOComponent ,
    )
    {
        this.analysisForm = new FormGroup(
            {
              ser: new FormControl(),
              typeID : new FormControl(),
              work : new FormControl(),

              seg : new FormControl(),
              type : new FormControl(),
              duration : new FormControl(),
              analysisDate : new FormControl(),
              area : new FormControl(),
              comments : new FormControl(),
             
            });
       
    }
    ngOnInit() {
     
        this.analysisForm = this._formBuilder.group({
           
          ser:['', Validators.required],
          typeID :[1],
          work :['', Validators.required],

          seg : ['', Validators.required],
          type : ['', Validators.required],
          duration : [''],
          analysisDate : [''],
          area :[''],
          comments : [''],
          
        });
        this.analysisForm.controls['work'].setValue(this.data['workid']);
        this.getSegments();
    }

    
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getSegments()
  {
    this.projectService.getSegments().subscribe(result=>{
      this.segment=result;
      
     });
  }
  onServiceChange($event)
  {
 
    this.projectService.getCategory($event).subscribe(result=>{
     this.category=result;
   },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    }
        );
 
 
 }
 updateWork(values)
 {
   console.log(values);
   this.projectService.updateWork(values).subscribe(result=>{
          this.openSnackBar('Analysis Details Updated!!','OK');
     
     
    
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    }
        );
 }
  

   
}
