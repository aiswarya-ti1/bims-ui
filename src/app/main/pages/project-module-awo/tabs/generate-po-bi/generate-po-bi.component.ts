import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';

import { SelectionModel } from '@angular/cdk/collections';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { PurchaseRequests } from '../generate-pr-pma/purchaserequest';
import { Suppliers } from '../generate-pr-pma/suppliers';
import { AddNewSupplierComponent } from '../view-pr-bi/addnew_supplier/addnew_supplier.component';
import { EditPOComponent } from '../view-pr-bi/edit-po/edit-po.component';




@Component({
    selector   : 'generate-po-bi',
    templateUrl: './generate-po-bi.component.html',
    styleUrls  : ['./generate-po-bi.component.scss'],
    animations : fuseAnimations
})
export class GeneratePOBIComponent
{
  createPOForm : FormGroup;
  createPOForm1 : FormGroup;
  dialogRef1;
  dialogRef;
  dataSource;
  displayedColumns =['select','PR_ID','ItemName', 'Qty', 'CustName'];//'PR_Date',
  Work_ID : number=0;
  position : number;
  associate:Suppliers;
  id:number=0;
  

  selection = new SelectionModel<PurchaseRequests>(true, []);
  interests = [];
  

  User:Array<User>;
User_Name: string='';

  constructor(public projectService:ProjectModuleService, private dialog:MatDialog,
    public router:Router,private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.createPOForm = new FormGroup(
        {
          work : new FormControl(),
          i: new FormControl(),
          supplier : new FormControl(),
         


          
        });
       

        this.createPOForm= this._formBuilder.group({
          work : [''],
          i :[''],
          supplier : [''],
          
          
        });
       
    }

  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_Name=this.User['User_Login'];
    }
    this.activatedRoute.params.subscribe((params: Params) => {
            
     
   
      this.id=params['workid'];

    this.Work_ID=params['workid'];
   
    this.createPOForm.controls['work'].setValue(params['workid']);
    });
    this.getOnePRDetailsForPO(this.Work_ID);
    this.getSuppliers();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(pr?: PurchaseRequests): string {
    if (!pr) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(pr) ? 'deselect' : 'select'} pr ${pr.PR_ID + 1}`;
  }
  getOnePRDetailsForPO(id)
  {
    
    this.projectService.getOnePRDetailsForPO(id).subscribe(result=>{console.log(result);
    this.dataSource=result;
    })
  }
  onCheckboxChange($event)
  {
    console.log($event.source.value);
    if($event.checked==true) {
      this.interests.push($event.source.value)
    } else {
      const i = this.interests.findIndex(x => x.value === $event.source.value);
     this.interests.splice(i);
    }
    
  }
  getSuppliers()
  {
this.projectService.getSuppliers().subscribe(result=>{console.log(result);
this.associate=result;
})
  }
  addNewSuppler()
  {
    this.dialogRef = this.dialog.open(AddNewSupplierComponent, {
      panelClass:'addnew_supplier-dialog',
      data      : {
        
     

      }
  });

  this.dialogRef.afterClosed()
  .subscribe((response: FormGroup) => {
    
    this.getSuppliers();
       
  });
  }
  savePO($values)
  {
    console.log($values);
    console.log('checkbox values'+this.interests);
    this.projectService .savePO($values, this.interests).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.dialogRef.close();
      }
    })
  }
  editPO($id)
  {
    this.dialogRef1 = this.dialog.open(EditPOComponent, {
      panelClass:'edit-po-dialog',
      data      : {
        
     itemID :$id

      }
  });

  this.dialogRef.afterClosed()
  .subscribe((response: FormGroup) => {
    
    this.getOnePRDetailsForPO(this.Work_ID);
       
  });
  }
   
}
