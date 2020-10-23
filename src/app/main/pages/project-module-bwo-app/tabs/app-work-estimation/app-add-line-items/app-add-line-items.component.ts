import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';


import { Services } from 'app/main/pages/profile/tabs/services/services';

import { SelectionModel } from '@angular/cdk/collections';
import { LabLineItems } from 'app/main/pages/project-module-bwo/tabs/work-estimation/labLineItem';
import { Units } from 'app/main/pages/project-module-bwo/tabs/work-estimation/units';
import { SelectedItems } from 'app/main/pages/project-module-bwo/tabs/work-estimation/selectedItems';
import { AppProjectBWOModule } from '../../../project-module-bwo-app.module';
import { AppProjectModuleBWOService } from '../../../project-module-bwo-app.service';

@Component({
    selector     : 'app-add-line-items',
    templateUrl  : './app-add-line-items.component.html',
    styleUrls    : ['./app-add-line-items.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppAddLineItemsFormDialogComponent
{
    list;
  units:Units[];
  LineItem: FormControl = new FormControl();
  matEstimateForm : FormGroup;
  firstFormGroup : FormGroup;
  secondFormGroup : FormGroup;
  services:Services;
 addNewDis: boolean =false;
  selectedItem: SelectedItems[];
 options: LabLineItems[];
 optionSearch = this.options;
 selectedOptions;
 work_ID:number;
 Type_ID:number=0;
 serv_ID=[];
 dataSource;
 items=[];
 itemCount : number=0; 
  displayedColumns = ['select','LineItems'];
  selection = new SelectionModel<LabLineItems>(true, []);
  newFlag : number;

  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<AppAddLineItemsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,public projAppService:AppProjectModuleBWOService,
    private _formBuilder: FormBuilder) { }
  ngOnInit() {
   this.addNewDis=true;
    this.work_ID=this.data['workid'];
   this.getUnits();
   this.chkLineItemExists();
   this.getAllLineItems();
    this.firstFormGroup=new FormGroup({
      workID : new FormControl(),
      itemlist : new FormControl()
           
                
    });
    this.secondFormGroup=new FormGroup({
      servID : new FormControl(),
      custItemName : new FormControl(),
      unit : new FormControl(),
      workID : new FormControl(),
      typeID :new FormControl(),
      desc : new FormControl(),
      

           
                
    });
    this.matEstimateForm = this._formBuilder.group({
      custItemName: ['', Validators.required],
      unit : ['', Validators.required]
    });

    this.firstFormGroup = this._formBuilder.group({
      servID :[''],
      itemlist: [''],
     
    });

    this.secondFormGroup = this._formBuilder.group({
      typeID :[''],
      services :[''],
      servID :[''],
      workID :[''],
      newFlag :[''],
    
      custItemName: ['', Validators.required],
      unit : ['', Validators.required],
      desc :['']
    });
    this.getWorkServices(this.data['workid']);
    this.secondFormGroup.controls['workID'].setValue(this.data['workid']);
    this.secondFormGroup.controls['typeID'].setValue(this.data['type']);
    this.secondFormGroup.controls['newFlag'].setValue(this.data['new']);
    this.Type_ID=this.data['type'];
    this.newFlag=this.data['new'];

}
getUnits()
{
    this.projectService.getUnits().subscribe(result=>{
        this.units=result;})
}
chkLineItemExists()
{
  this.projectService.chkLineItemsExists(this.work_ID).subscribe(result=>{
    this.itemCount=result;
  })
}
getAllLineItems()
{
    this.projAppService.biws_getAllLineItems(this.data['workid']).subscribe(result=>{console.log(result);
              this.dataSource=new MatTableDataSource(result);
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      }
          );
}

collectdata(values)
{
for (let i in values)
{
  
this.items["ItemName"].push(values[i]);
  
}
}

onSelectedOptionsChange(event)
{
  this.optionSearch = event;
}


applyFilter(filterValue: string) {
  
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
 this.dataSource.filter=filterValue;
}
getItems()
{
  
}
onSelection(e, v) {
  
  for(let a of v) {
   
    this.list=v;
  }
}
saveLineItem(values)
{
  this.projAppService.biws_addLineItemLab(this.work_ID,values, this.Type_ID,this.newFlag).subscribe(result=>{console.log(result);
  if(result["Success"]==true)
{
  this.openSnackBar('Line Items added successfully!!', 'OK');
  this.dialogRef.close();

}},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  }
      );

}
updateLineItem(data)
{
 
}
addNewLineItem()
{

}
saveCustLineItem(values)
{
  this.addNewDis=false;
  this.projectService.saveCustLabItems(values).subscribe(result=>{
  
      if(result["Success"]==true)
    {
      this.openSnackBar('Line Items added successfully!!', 'OK');
    
    }
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    }
        )

}
clear()
{
  this.secondFormGroup.controls["custItemName"].setValue(" ");
  this.secondFormGroup.controls["unit"].setValue(" ");
  this.secondFormGroup.controls["desc"].setValue(" ");

}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
getWorkServices($id)
{
this.projectService.getWorkServices($id).subscribe(result=>{
  this.services=result;
},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  }
      )
}
}

  

  


