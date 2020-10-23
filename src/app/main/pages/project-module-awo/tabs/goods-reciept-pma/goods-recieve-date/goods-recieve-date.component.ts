import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
@Component({
  selector: 'goods-recieve-date',
  templateUrl: './goods-recieve-date.component.html',
  styleUrls: ['./goods-recieve-date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsRecieveDateComponent implements OnInit {

  assocVisitForm : FormGroup;

  constructor(public dialogRef: MatDialogRef<GoodsRecieveDateComponent>,private projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,
    private _formBuilder: FormBuilder) {

      this.assocVisitForm = new FormGroup(
        {
          goodsDate : new FormControl(),
         // assocComments : new FormControl(),
         itemid :new FormControl(),
         billNo : new FormControl(),
         billAmt: new FormControl(),
         poid : new FormControl()
        });

        this.assocVisitForm= this._formBuilder.group({
          goodsDate :['', Validators.required],
         // assocComments : ['', Validators.required],
         itemid :[''],
         billNo :['', Validators.required],
         billAmt :['', Validators.required],
         poid :['']
        });
     }

  ngOnInit() {

    this.assocVisitForm.controls["itemid"].setValue(this.data['itemID']);
    this.assocVisitForm.controls["poid"].setValue(this.data['poID']);
      }

  updateDetails($values)
  {
    console.log($values);
    this.projectService.updateGoodsDate($values).subscribe(result=>{
    })
  }

}
