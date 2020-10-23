import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { Units } from 'app/main/pages/project-module-bwo/tabs/work-estimation/units';
import { fuseAnimations } from '@fuse/animations';
import { TenderDetails } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderDetails';
@Component({
    selector     : 'view-re-measure',
    templateUrl  : './view-re-measure.component.html',
    styleUrls    : ['./view-re-measure.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class ViewReMeasureDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
    tenders : TenderDetails[];
   Work_ID : number;
   Scope_RFlag :  number;
   Total : number;
   reTTotal : number;

  

    /**
     * Constructor
     *
     * @param {MatDialogRef<>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ViewReMeasureDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder, private projectService : ProjectModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.contactForm = new FormGroup(
            {
             
            
               
            });
       
    }
    ngOnInit() {
        

      
      this.Work_ID=this.data['workid'];
      this.getReFlags();
      this.getTender();
      this.getFinalTender();
      this.getReMeasureSummary();
        
       

    }
    getReFlags()
    {
      this.projectService.getReFlag(this.Work_ID,0).subscribe(result=>{
        
        if(result.length==0)
        { 
            this.Scope_RFlag=0;
          
        }
        else{
          this.Scope_RFlag=1;
        }
      });
}
getTender()
  {
    
    this.projectService.getFinalLabTenderDetails(this.Work_ID).subscribe(result=>{
     this.tenders=result;
     
    })
  }
  
   
  getFinalTender()
      {
        this.projectService.getFinalTender(this.Work_ID).subscribe(result=>{
                this.Total=result[0]['TotalQuote'];
                });
}
getReMeasureSummary()
{
  this.projectService.getReMeasureSummary(this.Work_ID,0).subscribe(result=>{
    
   
      this.reTTotal=result['TotalAfterRe'];
    });
}
}
