import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import {Observable} from 'rxjs';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
@Component({
  selector: 'remeasure-details',
  templateUrl: './remeasure-details.component.html',
  styleUrls: ['./remeasure-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReMeasureDetailsComponent implements OnInit {
  detailsForm : FormGroup;
  firstFormGroup : FormGroup;
  
  filteredOptions: Observable<string[]>;
  options = [];
  Material: FormControl = new FormControl();
  prodList;
  Type_ID : number;
  Work_ID : number;
  constructor(public dialogRef: MatDialogRef<ReMeasureDetailsComponent>, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,public projectService:ProjectModuleService) { 

      this.detailsForm = new FormGroup(
        {
          rate_Flag : new FormControl(),
          chkRate : new FormControl(),
          LE_ID : new FormControl(),
          work_ID : new FormControl(),
          itemName : new FormControl(),
          qty : new FormControl(),
          rate : new FormControl(),
          cmnts : new FormControl(),
          unit : new FormControl(),
          flag: new FormControl(),
          number : new FormControl(),
          days : new FormControl(),
          T_ID : new FormControl(),
          item_ID :new FormControl()

          
        });
        this.firstFormGroup = new FormGroup(
          {
            itemlist : new FormControl(),
            type_ID : new FormControl()
            
            
          });

        this.detailsForm = this.formBuilder.group({
          rate_Flag : [''],
          chkRate :[''],
          LE_ID :  [''],
          work_ID :  [''],
          itemName :  [''],
          qty : [''],
          rate :  [''],
          cmnts :  [''],
          unit : [''],
          flag :[''],
          days :[''],
          number : [''],
          T_ID :[''],
          item_ID :[''],
          type_ID :['']

          
        });
     }
    

  ngOnInit() {
    this.detailsForm.controls['LE_ID'].setValue(this.data['eid']);
    this.detailsForm.controls['T_ID'].setValue(this.data['tid']);
    this.detailsForm.controls['item_ID'].setValue(this.data['itemid']);
    this.detailsForm.controls['work_ID'].setValue(this.data['workid']);
    this.detailsForm.controls['type_ID'].setValue(this.data['typeid']);
    this.Type_ID=this.data['typeid'];
    this.Work_ID=this.data['workid'];
        if(this.Type_ID==1)
    {
      this.getTenderItemDetails();
    }
    
else if(this.Type_ID==2)
{
 
 this.getLineItemName();
   
}

  }
  enableRate(event)
  {
    console.log(event);
    if(event.checked==true)
    {
      this.detailsForm.controls['rate'].enable();
      
      this.detailsForm.controls['cmnts'].enable();
      this.detailsForm.controls['rate_Flag'].setValue(1);
    }
    if(event.checked==false)
    {
      this.detailsForm.controls['rate'].disable();
      this.detailsForm.controls['cmnts'].disable();
      this.detailsForm.controls['rate_Flag'].setValue(0);
    }
    
  }
    saveDetails(values)
    {
          this.projectService.saveReMeasureDetails(values).subscribe(result=>{console.log(result);
          if(result['Success']==true)
        {
          this.dialogRef.close({data:result['Total']});
        }})
    }
    getLineItemName()
    {
      this.projectService.getLineItemName(this.data['eid']).subscribe(result=>{
        this.detailsForm.controls['itemName'].disable();
        this.detailsForm.controls['itemName'].setValue(result[0]["LineItem_Name"]);
        this.detailsForm.controls['unit'].disable();
        this.detailsForm.controls['unit'].setValue(result[0]["Unit_Code"]);
          this.detailsForm.controls['qty'].setValue(result[0]["Quantity"]);
          this.detailsForm.controls['rate'].disable();
          this.detailsForm.controls['rate'].setValue(result[0]["Rate"]);
          this.detailsForm.controls['number'].setValue(result[0]["LabourNo"]);
          this.detailsForm.controls['days'].setValue(result[0]["WorkDays"]);
          //this.detailsForm.controls['cmnts'].setValue(result[0]["Comments"]);
          this.detailsForm.controls['flag'].setValue(result[0]["updateFlag"]);
       
       
        }),  error=>{console.log(error);
    
          this.openSnackBar('Server Error. Please try again!!','OK');
          };
    }
    getTenderItemDetails()
    {
      this.projectService.getTenderItemDetails(this.data['tid']).subscribe(result=>{
        this.detailsForm.controls['itemName'].disable();
        this.detailsForm.controls['itemName'].setValue(result[0]["LineItem_Name"]);
        this.detailsForm.controls['unit'].disable();
        this.detailsForm.controls['unit'].setValue(result[0]["Unit_Code"]);
          this.detailsForm.controls['qty'].setValue(result[0]["Quantity"]);
          this.detailsForm.controls['rate'].disable();
          this.detailsForm.controls['rate'].setValue(result[0]["Rate"]);
          this.detailsForm.controls['number'].setValue(result[0]["LabourNo"]);
          this.detailsForm.controls['days'].setValue(result[0]["WorkDays"]);
          this.detailsForm.controls['cmnts'].setValue(result[0]["Comments"]);
          this.detailsForm.controls['flag'].setValue(result[0]["updateFlag"]);
      }),  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        }
    }

   

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      } 
  

}
