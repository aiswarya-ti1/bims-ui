import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectModuleService } from '../project-module.service';
import { Locations } from '../../sales-module/locations';
import { Leads } from '../../sales-module/lead';
import { SalesModuleService } from '../../sales-module/sales-module.service';
import { Category } from '../../project-module-bwo/category';
import { Segments } from '../../project-module-bwo/segments';
@Component({
    selector     : 'add-work',
    templateUrl  : './add-work.component.html',
    styleUrls    : ['./add-work.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddWorkDialogComponent
{
    action: string;
    workForm: FormGroup;
    dialogTitle: string;
    location:Locations;
    leads : Leads;
    loading: boolean=false;
    Lead_ID : number;
    custName : string;
    segment:Segments;
    category : Category;
    typeID : number;
    

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddWorkDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private projectService : ProjectModuleService,
        private salesService : SalesModuleService,
        public snackBar: MatSnackBar
    )
    {
        this.workForm = new FormGroup(
            {
              typeID: new FormControl(),
              type : new FormControl(),
        
              lead : new FormControl(),

              category : new FormControl(),
              workDetails : new FormControl(),
              workSpec : new FormControl(),
              workcomments : new FormControl(),
              lead_ID : new FormControl(),
              lead_Name : new FormControl(),
              workNo : new FormControl(),
              analysisDate : new FormControl(),
              worktype : new FormControl(),
              seg : new FormControl(),
              ser : new FormControl()
            });
       
    }
    ngOnInit() {
        this.workForm = this._formBuilder.group({
           
          typeID: [1],
          type :[''],
          lead : [''],

          category :  ['', Validators.required],
          workDetails :  ['', Validators.required],
          workSpec :  ['', Validators.required],
          workcomments : [''],
          lead_ID : [''],
          lead_Name : [''],
          workNo :[''],
           analysisDate : [''],
              worktype :[''],
              seg : [''],
              ser : [''],

        });
        this.Lead_ID=this._data['leadid'];
        
        if(this.Lead_ID!=0)
        {
this.getOneLead(this._data['leadid']);
        }
        this.workForm.controls['typeID'].setValue(1);
        this.workForm.controls['type'].setValue(this._data['typeid']);
        this.typeID=this._data['typeid'];
        this.getLeads();
        this.getSegments();
    }
    getOneLead(id)
    {
      this.projectService.getOneLead(id).subscribe(result=>{console.log(result);
this.custName=result[0]['Cust_FirstName']+' ' +result[0]['Cust_LastName'];
        this.workForm.controls['lead_ID'].setValue(this._data['leadid']);
        this.workForm.controls['lead_Name'].setValue(this.custName);
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
    }

  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

getLocations()
{ 
    this.salesService.getLocations().subscribe(result=>{
      
      this.location=result;
    });     
}

onChange(value)
  {

   
  }
  addWork(values)
  {
    this.loading=true;
    console.log(values);
    this.projectService.addWork(values).subscribe(results=>{console.log(results);
     /* if(results["Success"]==true){
        this.matDialogRef.close({data:results['Work_ID']});
        this.openSnackBar('New Work Added!!','OK');
        //alert(results['Work_ID']);
       
        this.loading=false;
      
     
     
    }
    else{
      this.openSnackBar('Please try again!!','OK');
      this.matDialogRef.close();
    }*/
    //this.matDialogRef.close({data:results['Work_ID']});
    if(results==null)
    {
      this.matDialogRef.close();
      
    }
    else
    {
      this.matDialogRef.close({data:results['Work_ID']});
    }
    
    this.openSnackBar('New Work Added!!','OK');
    //alert(results['Work_ID']);
   
    this.loading=false;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
    

  }
  getLeads()
  {
    this.projectService.getLeads().subscribe(result=>{
            this.leads=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
   getSegments()
    {
      this.projectService.getSegments().subscribe(result=>{
        this.segment=result;
        
       });
    }
    onServiceChange($event)
    {
   
      this.projectService.getCategory($event).subscribe(result=>{console.log(result);
       this.category=result;
     },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
    }

   
}
