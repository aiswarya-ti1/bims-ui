import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import {Observable} from 'rxjs';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'edit-item-details',
  templateUrl: './edit-item-details.component.html',
  styleUrls: ['./edit-item-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  //providers:[WorkEstimationComponent]
})
export class EditItemDetailsComponent implements OnInit {
  detailsForm : FormGroup;
  firstFormGroup : FormGroup;
   filteredOptions: Observable<string[]>;
  options = [];
  Material: FormControl = new FormControl();
  prodList;
  dataSource;
  displayedColumns = ['WorkID', 'Rate'];
  openTable : number;
  Item_ID : number;

  constructor(public dialogRef: MatDialogRef<EditItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,public projectService:ProjectModuleService) { 

      this.detailsForm = new FormGroup(
        {
          LE_ID : new FormControl(),
          work_ID : new FormControl(),
          itemName : new FormControl(),
          qty : new FormControl(),
          rate : new FormControl(),
          cmnts : new FormControl(),
          unit : new FormControl(),
          flag: new FormControl(),
          number : new FormControl(),
          days : new FormControl()
          
        });
        this.firstFormGroup = new FormGroup(
          {
            itemlist : new FormControl(),
            
            
          });

        this.detailsForm = this.formBuilder.group({
          LE_ID :  [''],
          work_ID :  [''],
          itemName :  [''],
          qty : [''],
          rate :  [''],
          cmnts :  [''],
          unit : [''],
          flag :[''],
          days :[''],
          number : ['']
          
        });
     }
    

  ngOnInit() {

       this.detailsForm.controls['LE_ID'].setValue(this.data['leID']);
    this.detailsForm.controls['work_ID'].setValue(this.data['workid']);
    
    this.getLineItemRates(this.data['itemid']);
  this.projectService.getLineItemName(this.data['leID']).subscribe(result => {    
  
 if(result[0]["updateFlag"]==1)
 {
  
  this.detailsForm.controls['itemName'].disable();
  this.detailsForm.controls['itemName'].setValue(result[0]["LineItem_Name"]);
  this.detailsForm.controls['unit'].disable();
  this.detailsForm.controls['unit'].setValue(result[0]["Unit_Code"]);
    this.detailsForm.controls['qty'].setValue(result[0]["Quantity"]);
    this.detailsForm.controls['rate'].setValue(result[0]["Rate"]);
    this.detailsForm.controls['number'].setValue(result[0]["LabourNo"]);
    this.detailsForm.controls['days'].setValue(result[0]["WorkDays"]);
    this.detailsForm.controls['cmnts'].setValue(result[0]["Comments"]);
    this.detailsForm.controls['flag'].setValue(result[0]["updateFlag"]);
 }
 else
 {
  this.detailsForm.controls['itemName'].disable();
  this.detailsForm.controls['itemName'].setValue(result[0]["LineItem_Name"]);
  this.detailsForm.controls['unit'].disable();
  this.detailsForm.controls['unit'].setValue(result[0]["Unit_Code"]);
  this.detailsForm.controls['flag'].setValue(result[0]["updateFlag"]);
  this.detailsForm.controls['qty'].setValue(0);
  this.detailsForm.controls['rate'].setValue(0);
  this.detailsForm.controls['number'].setValue(0);
  this.detailsForm.controls['days'].setValue(0);
  this.detailsForm.controls['cmnts'].setValue(" ");
 }
 
  });

  }
  removeLineItem()
    {
this.projectService.removeLabItem(this.data['leID']).subscribe(result=>{
  
},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  }
     )
    }
    saveDetails(values)
    {
    this.projectService.saveLabourDetails(values).subscribe(result=>{
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        }
           )
    }

    
onSelection(e, v) {
    for(let a of v) {
    
    this.prodList=v;
  }
}



openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  } 

  getLineItemRates(id)
  {
    console.log('LineItemId'+id);
    this.projectService.getLineItemRate(id).subscribe(result=>{console.log(result);
      this.dataSource= result;
    })
  }
  viewRates()
  {
    this.openTable=1;
  }
  closeTable()
  {
    this.openTable=0;
  }

}
