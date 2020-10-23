import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { SalesModuleService } from '../sales-module.service';
import { Locations } from '../locations';
@Component({
    selector     : 'add-customer',
    templateUrl  : './add-customer.component.html',
    styleUrls    : ['./add-customer.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddCustomerDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
    location:Locations;
    loading: boolean=false;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddCustomerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private salesService : SalesModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.contactForm = new FormGroup(
            {
                Type:new FormControl(),
                FirstName : new FormControl(),
                MidName : new FormControl(),
                LastName : new FormControl(),
                contact : new FormControl(),
                pin : new FormControl(),
                addr1 : new FormControl(),
                addr2 : new FormControl(),
                loc : new FormControl(),
                occupation : new FormControl(),
                email : new FormControl(),
                whatsapp : new FormControl(),
                mark : new FormControl()
            });
       
    }
    ngOnInit() {
        this.getLocation();

        this.contactForm = this._formBuilder.group({
           
          Type: ['', Validators.required],
        FirstName : ['', Validators.required],
    MidName : [''],
    LastName : [''],
    contact : ['', Validators.required],
    whatsapp : [''],
    mark : [''],
    addr1 : [''],
    addr2 : [''],
    loc : ['', Validators.required],
    occupation : [''],
    pin:[''],
    
    email : [''],
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
    this.loading=true;
    this.salesService.addCustomer($value).subscribe(resp=>{
    if(resp["Success"]==true)
  {
    this.loading=false;
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

   
}
