import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { Leads } from 'app/main/pages/sales-module/lead';
import { SalesModuleService } from 'app/main/pages/sales-module/sales-module.service';
import { Category } from 'app/main/pages/project-module-bwo/category';
import { Segments } from 'app/main/pages/project-module-bwo/segments';

import { Locations } from 'app/main/pages/sales-module/locations';
import { AppProjectModuleBWOService } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.service';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
@Component({
    selector     : 'add-online-work',
    templateUrl  : './add-online-work.component.html',
    styleUrls    : ['./add-online-work.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddOnlineWorkDialogComponent
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
    Work_ID : number=0;
    

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AddOnlineWorkDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private projectService : ProjectModuleService,
        private salesService : SalesModuleService,
        public snackBar: MatSnackBar,
        private projAppService:AppProjectModuleBWOService
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
              
              expAnalysisDate : new FormControl(),
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
        
          expAnalysisDate : [''],
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
      this.projAppService.biws_getOneLead(id).subscribe(result=>{console.log(result);
this.custName=result[0]['Cust_FirstName'];
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
  chkSiteAnalysis(id)
  {
    
this.projAppService.biws_chkSiteAnalysis(id).subscribe(result=>{console.log(result);
  if(result['Site_Analysis_Date']!=null  && result[0]['ActualSite_Analysis_Date']==null)
  {
    this.changeCustStatus(this.Lead_ID,1);

  }
  else if(result[0]['ActualSite_Analysis_Date']!=null && result[0]['Site_Analysis_Date'!=null ])
  {
    this.changeCustStatus(this.Lead_ID,2);
    }

});
  }
  changeCustStatus(leadid, type)
  {
    this.projAppService.changeCustStatus(leadid,type ).subscribe(result=>{console.log(result);
    })
  }
  addWork(values)
  {
    
    this.loading=true;
    console.log(values);
    this.projAppService.biws_addWork(values).subscribe(results=>{console.log(results);
      if(results["Success"]==true){
      

        this.openSnackBar('New Work Added!!','OK');
       
       
        this.loading=false;
      
     
     
    }
    else{
      this.openSnackBar('Please try again!!','OK');
      this.matDialogRef.close();
    }
      
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
