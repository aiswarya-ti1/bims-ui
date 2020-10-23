import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { Units } from 'app/main/pages/project-module-bwo/tabs/work-estimation/units';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
@Component({
    selector     : 'new-assoc-service',
    templateUrl  : './new-assoc-service.component.html',
    styleUrls    : ['./new-assoc-service.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class AddNewAssocServiceDialogComponent
{
    action: string;
    contactForm: FormGroup;
    dialogTitle: string;
    segment : Segments[];
    category : Services[];
    units :Units[];
    dataSource;
    displayedColumns = ['Seg', 'Ser','action'];
    Assoc_ID : number;
openDivService : number=0;

User_ID:number=0;
User_Name : string;
User:Array<User>;
     
  

    /**
     * Constructor
     *
     * @param {MatDialogRef<>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddNewAssocServiceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder, private projService : ProjectModuleService,
        public snackBar: MatSnackBar,private sessionSt: SessionStorageService
    )
    {
      if(this.sessionSt.retrieve('user')!=null){
        this.User=this.sessionSt.retrieve('user')
        this.User_ID=this.User['ID'];
    }
        this.contactForm = new FormGroup(
            {
              user_ID : new FormControl(),
              assoc_ID : new FormControl(),
              segName:new FormControl(),
              service : new FormControl(),
            
               
            });
       
    }
    ngOnInit() {
        

      
      this.Assoc_ID=this.data['associd'];
        this.contactForm = this._formBuilder.group({
          assoc_ID :[''],
          segName: ['', Validators.required],
          service :['', Validators.required],
          user_ID :['']
          
       
        });
        this.contactForm.controls['assoc_ID'].setValue(this.data['associd']);
        this.contactForm.controls['user_ID'].setValue(this.User_ID);
        this.getSegments();
        this.getAssocServices(this.Assoc_ID);
       

    }
  getAssocServices(id)
  {
    this.projService.getAssoServices(id).subscribe(result=>{console.log(result);
    this.dataSource=result[0];
  },
  error=>{console.log(error);
    
this.openSnackBar('Server Error. Please try again!!','OK');
})
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
  openService()
  {
    this.openDivService=1;
  }
  addNewService($value)
      {
        this.openDivService=0;
        this.projService.addNewService($value).subscribe(results=>{console.log(results);
        if(results['Success']==true)
      {
        this.getAssocServices(this.Assoc_ID);
        this.openSnackBar('New Service Added Successfully!!','Ok');
      }},
      error=>{console.log(error);
        
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
      }

      remove($rateid)
      {
        console.log($rateid);
        this.projService.deleteRate($rateid).subscribe(result=>{console.log(result);
        if(result['Success']==true)
      {
        this.getAssocServices(this.Assoc_ID);
        this.openSnackBar('Service Removed!!','Ok');
      }
    else{
      this.openSnackBar('Something went wrong!!','Ok');
    }},
    error=>{console.log(error);
      
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
      }
     
   
}
