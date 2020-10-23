import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSnackBar } from '@angular/material';
import {Validators} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

import { SelectionModel } from '@angular/cdk/collections';
import { CertifyAssocLists } from 'app/main/pages/project-module-bwo/tabs/work-tender/assoc-selection/certifyAssocLists';
import { AppProjectModuleBWOService } from '../../../project-module-bwo-app.service';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';

@Component({
  selector: 'push-tender-customer',
  templateUrl: './push-tender-customer.component.html',
  styleUrls: ['./push-tender-customer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class PushTenderToCustomerComponent implements OnInit {

  detailsForm : FormGroup;
  ServiceID : number;
  TypeID : number;
  assocLists: TenderAssocs[];
  dataSource=new MatTableDataSource<TenderAssocs>(this.assocLists);;
  displayedColumns = ['select', 'name', 'days', 'rate'];
  selection = new SelectionModel<TenderAssocs>(true, []);
  assocExists : number;  

  constructor(public dialogRef: MatDialogRef<PushTenderToCustomerComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
  private formBuilder: FormBuilder,public projectService:ProjectModuleService, public projectAppService : AppProjectModuleBWOService,
  public snackBar :MatSnackBar) {
    this.detailsForm = new FormGroup(
      {
       
        workID : new FormControl(),
        itemlist : new FormControl(),
       
        
      });
      this.detailsForm = this.formBuilder.group({
        workID : ['', Validators.required],
        itemlist : ['', Validators.required],
        
       
      }); }

ngOnInit() {

  this.detailsForm.controls['workID'].setValue(this.data['workid']);
  this.getAllTenderList();
}


getAllTenderList()
{
   this.projectAppService.getAllTenderList(this.data['workid']).subscribe(result =>{
     
      this.dataSource= new MatTableDataSource(result);
     
  
  })
}
pushTenderToCust(values, data)
{
  //debugger;
  console.log(values);
  console.log(data);
  //console.log('Assoc Type '+this.TypeID);
  this.projectAppService.biws_pushTenderToCust(this.data['workid'], values).subscribe(result=>{console.log(result);
  if(result['Success']==true)
{
  this.dialogRef.close();
  this.openSnackBar('Tender Pushed to Customer!!','OK');
}})
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
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

}
