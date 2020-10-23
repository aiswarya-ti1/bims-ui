import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { Units } from 'app/main/pages/project-module-bwo/tabs/work-estimation/units';
import { fuseAnimations } from '@fuse/animations';

import { ProductSegments } from '../productSegments';
import { ProductGroups } from '../productGroups';
import { CertificationService } from 'app/main/pages/certification/certification.service';
@Component({
    selector     : 'new-assoc-segment',
    templateUrl  : './new-assoc-segment.component.html',
    styleUrls    : ['./new-assoc-segment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class AddNewAssocSegmentDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
    segment : ProductSegments[];
    category : ProductGroups[];
    units :Units[];
    dataSource;
    displayedColumns = ['Seg', 'Ser','action'];
    Assoc_ID : number;
openDivService : number=0;
segList : number;
     
  

    /**
     * Constructor
     *
     * @param {MatDialogRef<>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddNewAssocSegmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder, private certfService : CertificationService,
        public snackBar: MatSnackBar
    )
    {
        this.contactForm = new FormGroup(
            {
              assoc_ID : new FormControl(),
              services:new FormControl(),
              categories : new FormControl(),
            
               
            });
       
    }
    ngOnInit() {
        

      
      this.Assoc_ID=this.data['associd'];
        this.contactForm = this._formBuilder.group({
          assoc_ID :[''],
          services: ['', Validators.required],
          categories :['', Validators.required],
          
       
        });
        this.contactForm.controls['assoc_ID'].setValue(this.data['associd']);
        this.Assoc_ID=this.data['associd'];
        this.getSegments();
this.getAssocSegments(this.data['associd']);
       
       

    }
    openService()
  {
    this.openDivService=1;
  }
    onServiceChange($event) {
      console.log($event);
      this.certfService.getProductGroup($event).subscribe(result=>{console.log(result);
        this.category=result;
      });
    
    }
    getAssocSegments(id)
    {
      this.certfService.getMatAssocSegments(id).subscribe(result=>{console.log(result);
        if(result.length==0)
        {
this.segList==0;
        }
        else
        {
            this.segList==1;
            this.dataSource=result;
            
        }
        
      })
    }
    getSegments()
    {
      
    this.certfService.getProductSegments().subscribe(result=>{
      this.segment=result;
      
     });
     
    }
    remove(id)

{
this.certfService.removeSegmentGroup(id).subscribe(result=>{console.log(result);
if(result['Success']==true)
{
  this.openSnackBar('Segment Group removed successfully!!','Ok');
  this.getAssocSegments(this.Assoc_ID);
}})
}  
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
} 
addNewSegment(values)
{
  console.log(values);
  this.certfService.addNewSegment(values).subscribe(result=>{console.log(result);
  if(result['Success']==true)
{
  this.openDivService=0;
  this.openSnackBar('New Group added', 'Ok');
  this.getAssocSegments(this.Assoc_ID);
}})
}
}
