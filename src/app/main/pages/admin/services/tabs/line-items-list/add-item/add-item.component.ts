import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { Units } from 'app/main/pages/project-module-bwo/tabs/work-estimation/units';
@Component({
    selector     : 'add-item',
    templateUrl  : './add-item.component.html',
    styleUrls    : ['./add-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddItemsDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
    segment : Segments[];
    category : Services[];
    units :Units[];
     
  

    /**
     * Constructor
     *
     * @param {MatDialogRef<>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddItemsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private projService : ProjectModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.contactForm = new FormGroup(
            {
              segName:new FormControl(),
              service : new FormControl(),
              itemName : new FormControl(),
              desc : new FormControl(),
              unit : new FormControl()
               
            });
       
    }
    ngOnInit() {
        

        this.contactForm = this._formBuilder.group({
           
          segName: ['', Validators.required],
          service :['', Validators.required],
          itemName :['', Validators.required],
          desc :[''],
          unit :['', Validators.required]
       
        });
        this.getSegments();
        this.getUnits();

    }

    onServiceChange($event) {
      console.log($event);
      this.projService.getCategory($event.value).subscribe(result=>{console.log(result);
        this.category=result;
      },
      error=>{console.log(error);
        
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
    
    }
  getSegments()
  {
    this.projService.getSegments().subscribe(result=>{console.log(result);
      this.segment=result;},
      error=>{console.log(error);
        
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addItem($value)
      {
        this.projService.addItem($value).subscribe(results=>{console.log(results);
        if(results['Success']==true)
      {
        this.openSnackBar('New Line Item Added Successfully!!','Ok');
      }},
      error=>{console.log(error);
        
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
      }
getUnits()
{
  this.projService.getUnits().subscribe(result=>{console.log(result);
this.units=result;
  })
}

   
}
