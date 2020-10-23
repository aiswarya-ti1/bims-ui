import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatListOption, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form,FormControl, FormGroup} from '@angular/forms';

import { AbstractControl, FormArray, FormBuilder} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { KeyDeliverables } from './keyDeliverables';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material';




@Component({
  selector: 'app-add-key-deliverables',
  templateUrl: './add-key-deliverables.component.html',
  styleUrls: ['./add-key-deliverables.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddKeyDeliverablesComponent implements OnInit {

  list;
  firstFormGroup : FormGroup;
  secondFormGroup : FormGroup;
  //displayedColumns = ['Keys'];
  //dataSource;
  services:Services;
  Serv_ID:number;
  Work_ID : number;
  Type_ID : number;
  keys:KeyDeliverables[];
  dataSource;
displayedColumns = ['select','Keys'];
  selection = new SelectionModel<KeyDeliverables>(true, []);
  itemCount  : number;
  Amend_ID : number;


  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<AddKeyDeliverablesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) {

      this.firstFormGroup = new FormGroup(
        {
          itemlist : new FormControl(),
          
        });
        this.secondFormGroup = new FormGroup(
          {
            typeID : new FormControl(),
            servID : new FormControl(),
            workID : new FormControl(),
            keyName : new FormControl(),
            serName : new FormControl(),
            amendID : new FormControl()
            
          });
        this.firstFormGroup = this._formBuilder.group({
          itemlist :  [''],
         
        });
        this.secondFormGroup = this._formBuilder.group({
          typeID :[''],
          services :['', Validators.required],
          servID:[''],
          workID :[''],
          keyName : ['', Validators.required],
            serName :  [''],
            amendID : ['']
         
        });
     }

  ngOnInit() {

    this.Serv_ID=this.data['servid'];
    //alert(this.Serv_ID);
    this.Work_ID=this.data['workid'];
    this.Type_ID=this.data['typeid'];
    this.Amend_ID=this.data['amendid']
    this.getWorkServices(this.data['workid']);
    this.chkKeysExists();
   // this.secondFormGroup.controls['serName'].setValue(this.data['servName']);
    //this.secondFormGroup.controls['serName'].disable();
    this.secondFormGroup.controls['servID'].setValue(this.data['servid']);
    this.secondFormGroup.controls['workID'].setValue(this.data['workid']);
    this.secondFormGroup.controls['typeID'].setValue(this.data['typeid']);
    this.secondFormGroup.controls['amendID'].setValue(this.data['amendid']);
this.projectService.getKeys(this.data['workid']).subscribe(result=>{console.log(result);
this.keys=result;
//this.chkKeysExists();
this.dataSource= new MatTableDataSource(result);

})

  }
  chkKeysExists()
  {
this.projectService.chkKeyDeliExists(this.Work_ID).subscribe(result=>{console.log(result);
  this.itemCount=result;
})
  }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    //debugger;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
   // this.options.filter((option) => option.LineItem_Name.indexOf(filterValue));
   this.dataSource.filter= (filterValue);
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
  this.projectService.saveKeys(this.Work_ID,this.list, this.Type_ID, this.Amend_ID).subscribe(result=>{console.log(result);
  if(result["Success"]==true)
{
  this.openSnackBar('Key Deliverables added successfully!!', 'OK');

}});
}

else
{
  return;
}

  }

  saveCustKeys($values)
  {
    console.log($values);
    this.projectService.saveCustKeys($values).subscribe(result=>{console.log(result);
      if(result["Success"]==true)
      {
      this.openSnackBar('Key Deliverables added successfully!!', 'OK');
      
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getWorkServices($id)
{
this.projectService.getWorkServices($id).subscribe(result=>{console.log(result);
  this.services=result;
})
}
clear()
{
  this.secondFormGroup.controls['workID'].setValue(this.data['workid']);
  this.secondFormGroup.controls['keyName'].setValue('');
}
  

}
