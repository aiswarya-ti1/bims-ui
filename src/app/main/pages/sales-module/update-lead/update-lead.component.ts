import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { SalesModuleService } from '../sales-module.service';
import { Locations } from '../locations';
import { SalesCustomers } from '../salesCustomers';
import { Sources } from '../source';

@Component({
    selector     : 'update-lead',
    templateUrl  : './update-lead.component.html',
    styleUrls    : ['./update-lead.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UpdateLeadDialogComponent
{
    action: string;
    updateLeadForm: FormGroup;
    dialogTitle: string;
    location:Locations;
    customers : SalesCustomers;
    source:Sources;

    constructor(
        public matDialogRef: MatDialogRef<UpdateLeadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private salesService : SalesModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.updateLeadForm = new FormGroup(
            {
              
              comments : new FormControl(),
              lead_ID : new FormControl(),
              changeStatus : new FormControl()
              
              
            });
       
    }
    ngOnInit() {
      this.updateLeadForm.controls['lead_ID'].setValue(this._data['leadid']);
      
        this.updateLeadForm = this._formBuilder.group({
           
        
          lead_ID : [this._data['leadid']],
          comments : [''],
          changeStatus :['']

        });
    }

    
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

  updateLead(values)
  {
   
    console.log(values);
    this.salesService.updateLead(values).subscribe(results=>{
      if(results["Success"]==true){
      this.openSnackBar('Lead Updated Successfully!!','OK');
     
     
    }
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      }
            );
  }

   
}
