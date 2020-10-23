import { Component,OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , FormArray} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Units } from 'app/main/pages/project-module-bwo/tabs/work-estimation/units';
import { ItemDetailsViewComponent } from './item-detail-view/item-detail-view.component';
import { EditPOComponent } from '../view-pr-bi/edit-po/edit-po.component';
@Component({
    selector   : 'generate-pr-pma',
    templateUrl: './generate-pr-pma.component.html',
    styleUrls  : ['./generate-pr-pma.component.scss'],
    animations : fuseAnimations
})
export class GeneratePRPMAComponent
{
  viewPRForm : FormGroup;
  dataSource;
  displayedColumns =['PR_ID','ItemName','Status', 'Action'];
  Work_ID : number=0;
  PRCount : number=0;
  dialogRef1;
  dialogRef2;

@ViewChild(MatPaginator) paginator: MatPaginator;
        @ViewChild('filter') filter: ElementRef;
        @ViewChild(MatSort) sort: MatSort;

  PRForm : FormGroup;
  User:Array<User>;
User_Name: string='';
units:Units;
id : number=0;
//viewPR :boolean=true;
gprDis : boolean=true;
items:string[]; 

  constructor(public projectService:ProjectModuleService, private dialog:MatDialog,
    public router:Router,private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.PRForm = new FormGroup(
        {
          work_ID : new FormControl(),
          item1 : new FormControl(),
          qty1 : new FormControl(),
          unitID1 : new FormControl(),
          brand : new FormControl(),
          size : new FormControl(),
          spec : new FormControl(),
          delivDate :new FormControl()             

          
        });

      
    }

  ngOnInit() {
   
this.items=[];
this.gprDis=true;    
    this.PRForm= this._formBuilder.group({
      work_ID:[''],
      item1 : [''],
      qty1 :  [''],
      unitID1 :  [''],
      brand :[''],
      size :[''],
      spec :[''],
      delivDate :['']      
    });
    this.viewPRForm = new FormGroup(
      {
        work : new FormControl(),      
      });

      this.viewPRForm= this._formBuilder.group({
        work : [''],       
      });
  
    this.activatedRoute.params.subscribe((params: Params) => {          
     
   
      this.id=params['workid'];
      this.PRForm.controls['work_ID'].setValue(params['workid']);
    });

   
    this.getUnits();
    this.getPRCount(this.id);
    this.getPRDetails(this.id);
    

  }
  getUnits()
  {
    this.projectService.getUnits().subscribe(result=>{console.log(result);
    this.units=result;
  })
  }
  viewPurchaseRequest()
  {
    
  }
 
  savePR($values)
  {
    this.gprDis=false;
    console.log($values);
    this.items.push($values);
  
  }
  reset()
  {
   this.PRForm.controls['item1'].setValue(''); 
   this.PRForm.controls['qty1'].setValue('');
   this.PRForm.controls['unitID1'].reset();
   this.PRForm.controls['brand'].reset();
   this.PRForm.controls['spec'].reset();
   this.PRForm.controls['size'].reset();
   


  }
  generatePR()
  {
    console.log(this.items);
    this.projectService.savePRItemDetails(this.items).subscribe(result=>{
      
      if(result["Success"]==true)
      {
        alert("Success");
      }
      else{
        alert('Something went wrong!!. Try again');
      }
       })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getPRCount(id)
  {
    console.log(id);
    this.projectService.getPRCount(id).subscribe(result=>{
      this.PRCount=result;
      
    })
  }

  getPRDetails(id)
  {
    console.log(id);
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
      
      this.getPRDetails(this.id);
         
    });
    }
  
   
}
