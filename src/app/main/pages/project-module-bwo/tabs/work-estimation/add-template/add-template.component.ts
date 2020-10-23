import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { LabLineItems } from '../labLineItem';
import { Units } from '../units';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { SelectedItems } from '../selectedItems';
import { SelectionModel } from '@angular/cdk/collections';
import { SalesModuleService } from 'app/main/pages/sales-module/sales-module.service';
import { LabEstimates } from '../../../labEstimate';
import { GlobalConstants } from '../../../globalConstants';

@Component({
    selector     : 'add-template',
    templateUrl  : './add-template.component.html',
    styleUrls    : ['./add-template.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddTemplatesFormDialogComponent
{
  loading: boolean=false;
  displayedColumns = ['ID','Cust'];
  dataSource ;
  clickFlag : number=0;
  priorityFormGroup : FormGroup;
  items : LabEstimates[];
  Item_Count : number=0;
  Item_Exists:number=0;
  Work_ID:number;
  T_Work_ID : number;

  constructor(public projectService:ProjectModuleService, public salesService : SalesModuleService, public dialogRef: MatDialogRef<AddTemplatesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,private g :GlobalConstants,
    private _formBuilder: FormBuilder) { }
  ngOnInit() {
    this.Work_ID=this.data['workid'];
    this.priorityFormGroup = new FormGroup(
      {
       
        });
this.getAllWorks();
   
}
getAllWorks()
{
  this.salesService.getAllList().subscribe(result=>{console.log(result);
    this.dataSource= new MatTableDataSource(result);
  })
}
back()
{
  this.clickFlag=0;
}
getWorkLineItemsCount()
    {
        
   
    }
getTemplate(id)
{
  console.log('Work_ID',id);
  this.clickFlag=1;
  this.T_Work_ID=id;
  this.projectService.getWorkLineItems(id).subscribe(result=>{console.log(result);
    if(result.length==0)
    {
      this.Item_Count=0;
    }
    else{
      this.Item_Count=1;
    }
    this.items=result;
  });
}
addTemplate(id)
{
  this.loading=true;
  this.projectService.getWorkLineItemsCount(this.Work_ID).subscribe(result=>{console.log(result);
    this.Item_Exists=result;
    if(this.Item_Exists!=0)
    {
      this.loading=false;
      alert('Remove existing items to add template!!');
      this.dialogRef.close();
    }
    else{
      this.projectService.addTemplateEst(this.Work_ID,this.T_Work_ID).subscribe(result=>{console.log(result);
      if(result['Success']==true)
    {
      this.loading=false;
      this.g.Tempate_Work_ID=id;
      this.dialogRef.close();
      alert('Template added successfully!!');
      

    }})
    }
 })
}
}

  

  


