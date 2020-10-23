import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , FormArray} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { PurchaseRequests } from '../../generate-pr-pma/purchaserequest';
import { Units } from 'app/main/pages/project-module-bwo/tabs/work-estimation/units';
@Component({
  selector: 'edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations  
})
export class EditPOComponent implements OnInit {
  PRForm : FormGroup;
  User:Array<User>;
User_Name: string='';
units:Units;
id : number=0;
items:PurchaseRequests;
  constructor(public dialogRef: MatDialogRef<EditPOComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.PRForm = new FormGroup(
        {
          item_ID : new FormControl(),
          item1 : new FormControl(),
          qty1 : new FormControl(),
          unitID1 : new FormControl(),
          brand : new FormControl(),
          size : new FormControl(),
          spec : new FormControl(),
          deliLoc : new FormControl(),
          remarks : new FormControl(),
          rate : new FormControl(),
          unitID : new FormControl()
         
        });

      
    }

  ngOnInit() {
    this.PRForm= this._formBuilder.group({
      item_ID:[''],
      item1 : [''],
      qty1 :  [''],
      unitID1 :  [''],
      brand :[''],
      size :[''],
      spec :[''],
      deliLoc :[''],
      remarks : [''],
      rate :[''],
      unitID :['']      
    });
    this.id=this.data['itemID'];
    this.PRForm.controls['item_ID'].setValue(this.data['itemID']);
    this.getItemDetails(this.id);   
    this.getUnits();
      }
  getUnits()
  {
    this.projectService.getUnits().subscribe(result=>{
    this.units=result;
  })
  }
 
  savePR($values)
  {
    console.log($values);
   
    this.projectService.editPRItemDetails($values).subscribe(result=>{
      if(result['Success']==true)

      alert('Item Details Updated Successfully!!');
    })
  }
  deletePR(id)
  {
    console.log(id);
    this.projectService.deletePR(id).subscribe(result=>{
    if(result['Success']==true)
  {
alert("Item Deleted From PR!!");
  }});
  }
  reset()
  {
   this.PRForm.controls['item1'].setValue(''); 
   this.PRForm.controls['qty1'].setValue('');
   this.PRForm.controls['unitID1'].reset();
   this.PRForm.controls['brand'].reset();
   this.PRForm.controls['spec'].reset();
   this.PRForm.controls['size'].reset();
   this.PRForm.controls['deliLoc'].reset();
   this.PRForm.controls['remarks'].reset();
   this.PRForm.controls['rate'].reset();
   
  }
  
  getItemDetails(id)
  {
    console.log(id);
    this.projectService.getItemDetails(id).subscribe(result=>{
    this.items=result;
    this.PRForm.controls['item1'].setValue(result[0]["Item_Name"]);
    this.PRForm.controls['qty1'].setValue(result[0]["Quantity"]);
    this.PRForm.controls['unitID1'].setValue(result[0]["Unit_Code"]);
    this.PRForm.controls['rate'].setValue(result[0]["Rate"]);
    this.PRForm.controls['spec'].setValue(result[0]["ItemSpec"]);
    this.PRForm.controls['size'].setValue(result[0]["Size"]);
    this.PRForm.controls['remarks'].setValue(result[0]["Remarks"]);
    this.PRForm.controls['brand'].setValue(result[0]["Brand"]);
    this.PRForm.controls['deliLoc'].setValue(result[0]["Delivery_Loc"]);
    this.PRForm.controls['unitID'].setValue(result[0]["Unit_ID"]);
    })
  }
 
  
}
