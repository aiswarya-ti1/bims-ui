import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import {Validators} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

import { SelectionModel } from '@angular/cdk/collections';
import { CertifyAssocLists } from 'app/main/pages/project-module-bwo/tabs/work-tender/assoc-selection/certifyAssocLists';
import { AppProjectModuleBWOService } from '../../../project-module-bwo-app.service';

@Component({
  selector: 'app-assoc-selection-new',
  templateUrl: './app-assoc-selection-new.component.html',
  styleUrls: ['./app-assoc-selection-new.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class AppAssociateSelectionNewComponent implements OnInit {

  detailsForm : FormGroup;
  ServiceID : number;
  TypeID : number;
  assocLists: CertifyAssocLists[];
  dataSource=new MatTableDataSource<CertifyAssocLists>(this.assocLists);;
  displayedColumns = ['select', 'name', 'location', 'rating'];
  selection = new SelectionModel<CertifyAssocLists>(true, []);
  assocExists : number;  

  constructor(public dialogRef: MatDialogRef<AppAssociateSelectionNewComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
  private formBuilder: FormBuilder,public projectService:ProjectModuleService, public projectAppService : AppProjectModuleBWOService) {
    this.detailsForm = new FormGroup(
      {
       
        workID : new FormControl(),
        itemlist : new FormControl(),
        segID : new FormControl(),
        servID : new FormControl(),
        ratevalue : new FormControl(),
        typeID : new FormControl()
        
      });
      this.detailsForm = this.formBuilder.group({
        workID : ['', Validators.required],
        itemlist : ['', Validators.required],
        segID : [''],
        servID : [''],
        ratevalue : [''],
        typeID :['']
       
      }); }

ngOnInit() {

  this.detailsForm.controls['workID'].setValue(this.data['workid']);
    this.detailsForm.controls['servID'].setValue(this.data['servid']);
    this.detailsForm.controls['typeID'].setValue(this.data['type']);
  this.ServiceID=this.data['servid'];
  this.TypeID=this.data['type'];
  if(this.TypeID==0)
  {
    this.getAssocList();
  }
  else if(this.TypeID==1)
  {
this.getOnlineAssocs();
  }

  
    
  


}
getOnlineAssocs()
{
this.projectAppService.biws_getOnlineAssocs().subscribe(result=>{console.log(result);
  if(result.length==0)
     {
       this.assocExists=0;
     }
     else
     {
      this.assocExists=1;
      this.dataSource=new MatTableDataSource(result);
     }
 
})
}

getAssocList()
{
   this.projectService.getCertifyAssocList(this.data['workid']).subscribe(result =>{
     if(result.length==0)
     {
      this.assocExists=0;
     }
     else{
      this.assocExists=1;
      this.dataSource= new MatTableDataSource(result);
     }
  
  })
}
saveAssocList(values, data)
{
  //debugger;
  console.log(values);
  console.log(data);
  console.log('Assoc Type '+this.TypeID);
  this.projectAppService.biws_saveAssocList(this.data['workid'], values, this.TypeID).subscribe(result=>{console.log(result);
  if(result['Success']==true)
{
  this.dialogRef.close();
}
  })
}
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}
viewRating(rating){
  console.log(rating);
  var r=Math.round((parseInt(rating)*2)/2);
  var outputMsg="";

  for (var i = r; i >= 1; i--){
  outputMsg+='<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;';
  }
  if(i==.5){
    outputMsg+='<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;';
  }
  for (let i = (5 - r); i >= 1; i--){
    outputMsg+='<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;';
  }
  return outputMsg;
}  
}
