import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { EditPOComponent } from './edit-po/edit-po.component';
import { ItemDetailsViewComponent } from '../generate-pr-pma/item-detail-view/item-detail-view.component';

@Component({
    selector   : 'view-pr-bi',
    templateUrl: './view-pr-bi.component.html',
    styleUrls  : ['./view-pr-bi.component.scss'],
    animations : fuseAnimations
})
export class ViewPurchaseRequestBIComponent
{viewPRForm : FormGroup;
  dataSource;
  displayedColumns =['PR_ID','ItemName','Status', 'Action'];
  Work_ID : number=0;
  PRCount : number=0;
  dialogRef1;
  dialogRef2; 
  User:Array<User>;
User_Name: string='';

@ViewChild(MatPaginator) paginator: MatPaginator;
        @ViewChild('filter') filter: ElementRef;
        @ViewChild(MatSort) sort: MatSort;
  constructor(public projectService:ProjectModuleService,
    private dialog:MatDialog,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService, private activatedRoute: ActivatedRoute) { 
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
      this.User_Name=this.User['User_Login'];
    }
    this.activatedRoute.params.subscribe((params: Params) => {            
      this.Work_ID=params['workid'];
      });

   
        this.getPRCount(this.Work_ID);
    this.getPRDetails(this.Work_ID);
    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getPRCount(id)
  {
    this.projectService.getPRCount(id).subscribe(result=>{
      this.PRCount=result;
      
    })
  }

  getPRDetails(id)
  {
        this.projectService.getPRDetails(id).subscribe(result=>{
    this.dataSource=new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }
  itemDetailsView($id)
  {
    this.dialogRef1 = this.dialog.open(ItemDetailsViewComponent, {
      panelClass:'item-detail-view-dialog',
      data      : {      
           itemID: $id
      }
  });

  this.dialogRef1.afterClosed()
  .subscribe((response: FormGroup) => {
  });
  }
  editPR($id)
  {
    
      this.dialogRef2 = this.dialog.open(EditPOComponent, {
        panelClass:'edit-po-dialog',
        data      : {
          
       itemID :$id
  
        }
    });
  
    this.dialogRef2.afterClosed()
    .subscribe((response: FormGroup) => {
      
      this.getPRDetails(this.Work_ID);
         
    });
    }
  
   
}
