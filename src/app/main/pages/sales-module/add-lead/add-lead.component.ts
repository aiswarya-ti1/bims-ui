import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { SalesModuleService } from '../sales-module.service';
import { Locations } from '../locations';
import { SalesCustomers } from '../salesCustomers';
import { Sources } from '../source';

@Component({
    selector     : 'add-lead',
    templateUrl  : './add-lead.component.html',
    styleUrls    : ['./add-lead.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddLeadDialogComponent
{
  loading: boolean=false;
    action: string;
    leadForm: FormGroup;
    dialogTitle: string;
    location:Locations;
    customers : SalesCustomers;
    source:Sources;
    

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddLeadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private salesService : SalesModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.leadForm = new FormGroup(
            {
              custName: new FormControl(),
        
              contact : new FormControl(),

              address : new FormControl(),
              loc : new FormControl(),
              email : new FormControl(),
              source : new FormControl(),
              projDetails : new FormControl(),
              projSpec : new FormControl(),
              comments : new FormControl(),
              sAddr1 : new FormControl(),
              sAddr2 : new FormControl(),
              sloc : new FormControl(),
              mark : new FormControl(),
              pin : new FormControl(),
              lead_ID : new FormControl(),
              today : new FormControl(),
              maxDate : new FormControl(),
              typeFlag : new FormControl(),
              assignTo : new FormControl(),
              type : new FormControl()
              
            });
       
    }
    ngOnInit() {
            this.leadForm.controls['typeFlag'].setValue(1);
      this.leadForm.controls['assignTo'].setValue(this._data['assignTo']);
      this.leadForm.controls['type'].setValue(this._data['typeid']);
        this.getLocation();
        this.getAllCutomers();
        this.getSource();
        this.leadForm.controls['address'].disabled;
        this.leadForm.controls['loc'].disabled;
        this.leadForm.controls['contact'].disabled;
        this.leadForm.controls['email'].disabled;

        this.leadForm = this._formBuilder.group({
           
          custName:['', Validators.required],
          type : [''],
        
          contact :[{value   :'', disabled: true}, Validators.required],

          address : [{value   :'', disabled: true}, Validators.required],
          loc : [{value   :'', disabled: true}, Validators.required],
          email : [{value   :'', disabled: true}],
          source : ['', Validators.required],
          projDetails :['', Validators.required],
          projSpec : ['', Validators.required],
          comments : [''],
          sAddr1 : ['', Validators.required],
          sAddr2 : ['', Validators.required],
          sloc : ['', Validators.required],
          mark : [''],
          pin : [''],
          lead_ID : [''],
              today : [''],
              maxDate : [''],
              typeFlag : ['1'],
              assignTo :[this._data['assignTo']]
        });
    }

    getLocation()
    {
        this.salesService.getLocations().subscribe(result=>{
      
            this.location=result;
          });
    }
    addCustomer($value)
  {
   
    this.salesService.addCustomer($value).subscribe(resp=>{
    if(resp["Success"]==true)
  {
    this.openSnackBar('New customer added!!','OK');
  }
if(resp["Success"]==false)
{
  
  this.openSnackBar('Customer already exists!!','OK');
}},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getAllCutomers()
  {
    this.salesService.getAllCustomers().subscribe(resp=>{
      this.customers=resp;});
  }
 
getSource()
{

    this.salesService.getSource().subscribe(result=>{
      
      this.source=result;
     
    });
      
}
getLocations()
{
 
    this.salesService.getLocations().subscribe(result=>{
      
      this.location=result;
    });
     
}
getOneCustomer(value)
{
  this.salesService.getOneCustomer(value).subscribe(result=>{
     this.leadForm.controls['address'].setValue(result[0]["Address_line1"]+','+result[0]["Address_line2"]);
    this.leadForm.controls['loc'].setValue(result[0]["Loc_Name"]);
    this.leadForm.controls['contact'].setValue(result[0]["Contact_phone"]);
    this.leadForm.controls['email'].setValue(result[0]["Address_email"]);

    
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
}
onChange(value)
  {
    this.getOneCustomer(value);
  }
  addLead(values)
  {
    this.loading=true;
    this.salesService.addLead(values).subscribe(results=>{
      if(results["Success"]==true){
        this.loading=false;
      this.openSnackBar('New Lead Added!!','OK');
     
     
    }
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }

   
}
