import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { LabLineItems } from '../labLineItem';
import { Units } from '../units';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { SelectedItems } from '../selectedItems';
import { SelectionModel } from '@angular/cdk/collections';
import { Segments } from '../../../segments';
import { CertifyAssocLists } from '../../work-tender/assoc-selection/certifyAssocLists';

@Component({
    selector     : 'references',
    templateUrl  : './references.component.html',
    styleUrls    : ['./references.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ReferencesFormDialogComponent
{
  segments : Segments[];
  services :Services[];
  assocs:[];
  secondFormGroup : FormGroup;
  thirdFormGroup : FormGroup;
  Segment=[];
  Service=[];
  category=[];
    displayedColumns =['Name','Contact'];
  assocLists: CertifyAssocLists[];
  dataSource=new MatTableDataSource<CertifyAssocLists>(this.assocLists);;
    

  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<ReferencesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) {

      this.secondFormGroup = new FormGroup(
        {
          assoc: new FormControl(),
        });
        this.thirdFormGroup =new FormGroup(
          {
            segm : new FormControl(),
            serv : new FormControl()
          }
        )
     }
  ngOnInit() {
    this.getSegments();
    this.getCivilServices();
    this.getAssocList();
   

}

getSegments()
{
  this.projectService.getSegments().subscribe(result=>{console.log(result);
    this.segments=result;});
}


getCivilServices()
{
  this.projectService.getCivilServices().subscribe(result=>{console.log(result);
  this.services=result;});
 
}
getAssocList()
  {
   
    this.projectService.getAssocList().subscribe(result =>{
    this.assocs= result;
    })
  }
  onChange(event)
  {
    //debugger;
    console.log('assoc Selected'+event);
    this.projectService.getAssocServices(event).subscribe(result=>{console.log(result);
      console.log(result['Segments']);
      this.Segment=result['Segments'];
      this.Service=result['Services'];
      
    })
  }
  
  onSegChange($event)
  {
 
    this.projectService.getCategory($event).subscribe(result=>{console.log(result); 
     this.category=result;
   });
 
 
 }
 onServiceChange($event)
 {
  this.projectService.getServiceAssocs($event).subscribe(result =>{console.log(result);
    this.dataSource= new MatTableDataSource(result);
    })
 }
}

  

  


