import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatListOption, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form,FormControl, FormGroup} from '@angular/forms';
import { AbstractControl, FormArray, FormBuilder} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { TermsAndConditions } from './termsAndCondition';
import { Pipe, PipeTransform } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';



@Component({
  selector: 'app-add-terms-conditions',
  templateUrl: './add-terms-conditions.component.html',
  styleUrls: ['./add-terms-conditions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTermsConditionsComponent implements OnInit {
  list;
  firstFormGroup : FormGroup;
  secondFormGroup : FormGroup;
  //displayedColumns = ['Keys'];
  //dataSource;
  Serv_ID:number;
  Work_ID : number;
  Type_ID : number;
  Terms:TermsAndConditions[];
  AmendID : number;
  


  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<AddTermsConditionsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) { this.firstFormGroup = new FormGroup(
      {
        itemlist : new FormControl(),
        typeID : new FormControl(),
        workID : new FormControl()
        
      });
      this.secondFormGroup = new FormGroup(
        {
          typeID : new FormControl(),
          workID : new FormControl(),
          termName : new FormControl(),
          serName : new FormControl(),
          amendID : new FormControl(),
          segID : new FormControl(),
          //comment : new FormControl()
          
        });
      this.firstFormGroup = this._formBuilder.group({
        itemlist :  [''],
        typeID : [''],
        workID : ['']
       
      });
      this.secondFormGroup = this._formBuilder.group({
        typeID :[''],
        workID :[''],
        termName : ['', Validators.required],
          serName :  [''],
          segID :[''],
          amendID:['']
         // comment :['']
       
      });
   }

ngOnInit() {

  this.Serv_ID=this.data['servid'];
  this.Work_ID=this.data['workid'];
  this.Type_ID=this.data['typeid'];
  this.AmendID=this.data['amendid'];
  //this.secondFormGroup.controls['serName'].setValue(this.data['servName']);
this.secondFormGroup.controls['typeID'].setValue(this.data['typeid']);
this.firstFormGroup.controls['workID'].setValue(this.data['workid']);
this.secondFormGroup.controls['amendID'].setValue(this.data['amendid']);
this.secondFormGroup.controls['segID'].setValue(this.data['segid']);
this.secondFormGroup.controls['workID'].setValue(this.data['workid']);
//alert(this.data['segid']);
  this.projectService.getTerms().subscribe(result=>{console.log(result);
  this.Terms=result;});
}


onSelection(e, v) {
  console.log("Selection list");
  for(let a of v) {
    console.log(a.value);
    this.list=v;
  }
}
saveKeys()
{
  console.log(this.Work_ID);
console.log(this.list);
if(this.list.length!=0)
{
this.projectService.saveTerms(this.Work_ID,this.list, this.Type_ID, this.AmendID).subscribe(result=>{console.log(result);
if(result["Success"]==true)
{
this.openSnackBar('Terms & Conditions added successfully!!', 'OK');

}});
}

else
{
return;
}

}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
clear()
{
  this.secondFormGroup.controls['typeID'].setValue(this.data['typeid']);
  this.secondFormGroup.controls['workID'].setValue(this.data['workid']);
  this.secondFormGroup.controls['segID'].setValue(this.data['segid']);
 this.secondFormGroup.controls['termName'].setValue('');
 
}
saveCustTerms($values)
{
  console.log($values);
  this.projectService.saveCustTerms($values).subscribe(result=>{console.log(result);
    if(result["Success"]==true)
{
this.openSnackBar('Terms & Conditions added successfully!!', 'OK');

}
  })
}

}
