import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { ProjectModuleBWOComponent } from 'app/main/pages/project-module-bwo/project-module-bwo.component';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Category } from 'app/main/pages/project-module-bwo/category';
import { type } from 'os';
import { AppProjectModuleBWOService } from '../../../project-module-bwo-app.service';
import { AppWorksSiteAnalysisComponent } from '../app-works-site-analysis.component';


@Component({
    selector     : 'site-analysis-date',
    templateUrl  : './site-analysis-date.component.html',
    styleUrls    : ['./site-analysis-date.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:[ProjectModuleBWOComponent ],
})

export class SiteAnalysisDatesDialogComponent
{
    action: string;
    analysisForm: FormGroup;
    type : number=0;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public dialogRef_Site: MatDialogRef<SiteAnalysisDatesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder, private projectService : ProjectModuleService,
        public snackBar: MatSnackBar, private bwo :ProjectModuleBWOComponent ,
        public projAppService: AppProjectModuleBWOService,
       
    )
    {
        this.analysisForm = new FormGroup(
            {
              work : new FormControl(),
              typeID : new FormControl(),
              expAnalysisDate: new FormControl(),
              actualAnalysisDate : new FormControl(),
              expAssocVisitDate : new FormControl(),
              actualAssocVisitDate : new FormControl()
             
            });
       
    }
    ngOnInit() {
     
        this.analysisForm = this._formBuilder.group({
          work : [''],
          typeID : [''],
         expAnalysisDate:[''],
         actualAnalysisDate :[''],
         expAssocVisitDate :[''],
         actualAssocVisitDate :['']
         
          
        });
        this.analysisForm.controls['work'].setValue(this.data['workid']);
        this.analysisForm.controls['typeID'].setValue(this.data['typeid']);
        this.type=this.data['typeid'];
        
    }

    
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
 updateWork(values)
 {
   console.log(values);
   this.projAppService.biws_updateSiteAnalysisDate(values).subscribe(result=>{
     console.log(result);
     
     if(result['Success']==true)
     {
       this.dialogRef_Site.close();
      this.openSnackBar('Site visit Date Updated!!','OK');
      
     }
          
     
     
    
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    }
        );
 }
  

   
}
