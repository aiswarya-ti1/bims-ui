import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import {Validators} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { CertifyAssocLists } from '../assoc-selection/certifyAssocLists';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'assoc-selection-new',
  templateUrl: './assoc-selection-new.component.html',
  styleUrls: ['./assoc-selection-new.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class AssociateSelectionNewComponent implements OnInit {

  detailsForm : FormGroup;
  ServiceID : number;
  assocLists: CertifyAssocLists[];
  dataSource=new MatTableDataSource<CertifyAssocLists>(this.assocLists);;
  displayedColumns = ['select', 'name', 'location', 'rating'];
  selection = new SelectionModel<CertifyAssocLists>(true, []);

  constructor(public dialogRef: MatDialogRef<AssociateSelectionNewComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
  private formBuilder: FormBuilder,public projectService:ProjectModuleService) {
    this.detailsForm = new FormGroup(
      {
       
        workID : new FormControl(),
        itemlist : new FormControl(),
        segID : new FormControl(),
        servID : new FormControl(),
        ratevalue : new FormControl()
        
      });
      this.detailsForm = this.formBuilder.group({
        workID : ['', Validators.required],
        itemlist : ['', Validators.required],
        segID : [''],
        servID : [''],
        ratevalue : ['']
       
      }); }

ngOnInit() {

  this.detailsForm.controls['workID'].setValue(this.data['workid']);
    this.detailsForm.controls['servID'].setValue(this.data['servid']);
  this.ServiceID=this.data['servid'];
    this.getAssocList();


}

getAssocList()
{
   this.projectService.getCertifyAssocList(this.data['workid']).subscribe(result =>{
  this.dataSource= new MatTableDataSource(result);
  })
}
saveAssocList(values)
{
  //debugger;
  console.log(values);
  this.projectService.saveAssocList(this.data['workid'], values).subscribe(result=>{})
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
applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
this.dataSource.filter = filterValue;

}
}
