import { Component,OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { PurchaseRequests } from '../purchaserequest';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'item-detail-view',
  templateUrl: './item-detail-view.component.html',
  styleUrls: ['./item-detail-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class ItemDetailsViewComponent implements OnInit {
  viewPRForm : FormGroup;
  User:Array<User>;
Item_ID : number=0;
items:PurchaseRequests;

  constructor(public dialogRef: MatDialogRef<ItemDetailsViewComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.viewPRForm = new FormGroup(
        {
          work : new FormControl(),
        });

        this.viewPRForm= this._formBuilder.group({
          work : [''],
        });
    }

  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
     
    }

    this.Item_ID=this.data['itemID'];
    console.log(this.Item_ID);
   
    this.getItemDetails(this.data['itemID']);
    
  }
  


  getItemDetails(id)
  {
    console.log(id);
    this.projectService.getItemDetails(id).subscribe(result=>{
      
    this.items=result;
    })
  }

   
}
