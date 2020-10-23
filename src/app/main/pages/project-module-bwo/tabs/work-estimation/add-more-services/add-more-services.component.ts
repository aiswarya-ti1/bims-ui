import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { LabLineItems } from '../labLineItem';
import { Units } from '../units';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { SelectedItems } from '../selectedItems';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector     : 'add-more-services',
    templateUrl  : './add-more-services.component.html',
    styleUrls    : ['./add-more-services.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddMoreServicesDialogComponent
{
    list; 
  firstFormGroup : FormGroup;  
  services:Services;
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
 Seg_ID : number=0;
  displayedColumns = ['select','LineItems'];
  selection = new SelectionModel<LabLineItems>(true, []);

  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<AddMoreServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) { }
  ngOnInit() {
  
    this.work_ID=this.data['workid'];
    this.Seg_ID=this.data['segid'];
    this.getServices();
 
    this.firstFormGroup=new FormGroup({
      workID : new FormControl(),
      itemlist : new FormControl()
           
                
    });
    

    this.firstFormGroup = this._formBuilder.group({
      servID :[''],
      itemlist: [''],
     
    });

   

}
applyFilter(filterValue: string) {
  
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
 this.dataSource.filter=filterValue;
}

getServices()
{

 this.projectService.getCategory(this.Seg_ID).subscribe(result=>{
   console.log(result);
 this.dataSource=result;
});
}
saveExtraServices(values)
{
  console.log(values);
  this.projectService.saveExtraServices(this.work_ID,values).subscribe(result=>{console.log(result);
    
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    }
        )
}


openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

  

  


