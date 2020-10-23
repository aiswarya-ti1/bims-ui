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
import { PurchaseOders } from '../generate-pr-pma/purchaseOrders';
import { GoodsRecieveDateComponent } from './goods-recieve-date/goods-recieve-date.component';
@Component({
    selector   : 'goods-reciept-pma',
    templateUrl: './goods-reciept-pma.component.html',
    styleUrls  : ['./goods-reciept-pma.component.scss'],
    animations : fuseAnimations
})
export class GoodsReceiptPMAComponent
{
  createPOForm : FormGroup;
  createPOForm1 : FormGroup;
  dataSource;
  displayedColumns =['select','PR_ID','ItemName', 'Qty/Unit', 'PO_Date','assoc'];//'PR_Date',
  Work_ID : number=0;
  position : number;
  associate:Suppliers;
  id:number=0;
  dialogRef:any;
  dialogRef1:any;
  orders:PurchaseOders;
  selection = new SelectionModel<PurchaseRequests>(true, []);
  interests = []; 
  User:Array<User>;
User_Name: string='';

  constructor(public router:Router, private projectService:ProjectModuleService, private dialog:MatDialog,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService, private activatedRoute: ActivatedRoute) { 
      this.createPOForm = new FormGroup(
        {
          work : new FormControl(),
          i: new FormControl(),
          supplier : new FormControl(),
          PONo: new FormControl()  
        });
       

        this.createPOForm= this._formBuilder.group({
          work : [''],
          i :[''],
          supplier : [''],
          PONo :['', Validators.required]
        });
       
    }

  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_Name=this.User['User_Login'];
    }
    this.activatedRoute.params.subscribe((params: Params) => {
          this.Work_ID=params['workid'];
    });

   this.getWorkPOList();
  
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
  
  onCheckboxChange($event)
  {
       if($event.checked==true) {
      this.interests.push($event.source.value)
    } else {
      const i = this.interests.findIndex(x => x.value === $event.source.value);
     this.interests.splice(i);
    }
    
  }
  getWorkPOList()
  {
    this.projectService.getWorkPOList(this.Work_ID).subscribe(result=>{
      this.orders=result;
    })
  }
  onChange($event)
  {
   
    this.getPOItemList($event);
  }
  goodsReciept($values)
  {
    console.log(this.interests);
    this.dialogRef = this.dialog.open(GoodsRecieveDateComponent, {
      panelClass:'goods-recieve-date-dialog',
      data      : {
        
     
      itemID:this.interests,
      poID : $values
      }
  });

  this.dialogRef.afterClosed()
  .subscribe((response: FormGroup) => {
    
    this.getPOItemList($values);
       
  }); 

  }
  getPOItemList(id)
  {
  this.projectService.getPOItemList(id).subscribe(result=>{
    if(result.length==0)
    {

    }
    else{
  this.dataSource=result;
}
})
}
   
}
