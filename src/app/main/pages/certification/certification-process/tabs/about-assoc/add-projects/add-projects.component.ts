import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { CertificationService } from 'app/main/pages/certification/certification.service';
import { Locations } from 'app/main/pages/sales-module/locations';
@Component({
  selector: 'add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class AddProjectsComponent implements OnInit {
  addProjectForm : FormGroup; 
  location : Locations[];

  constructor(public dialogRef: MatDialogRef<AddProjectsComponent>,public certfService:CertificationService,
    public projectService:ProjectModuleService, public snackBar : MatSnackBar,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.addProjectForm = new FormGroup(
        {
          custID:new FormControl(),
          custName : new FormControl(),
          Contact : new FormControl(),
          Location : new FormControl(),
          typeID : new FormControl(),
          assocID : new FormControl(),
          WorkDetails : new FormControl(),
          Addr2 : new FormControl(),
          Addr1 : new FormControl()
          
        });

        this.addProjectForm= this._formBuilder.group({
          custID:['', Validators.required],
          custName : ['', Validators.required],
          Contact :['', Validators.required],
          Location :['', Validators.required],
          typeID : [''],
          assocID : [''],
          WorkDetails :[''],
          Addr1 : [''],
          Addr2 : ['']

        
        });
    }

  ngOnInit() {
   
    this.getLocation();
   this.addProjectForm.controls['custID'].setValue(this.data['custid']);
   this.addProjectForm.controls['typeID'].setValue(this.data['typeid']);
   this.addProjectForm.controls['assocID'].setValue(this.data['associd']);
   if(this.data['typeid']==2)
   {
this.getOneCustomerDetails(this.data['custid']);
   }
  
     //this.PayID=this.data['payID'];
  }
  getLocation(){
    this.projectService.getLocations().subscribe(result=>{
      this.location=result;
    })
  }
  getOneCustomerDetails(id)
  {
    this.certfService.getCustomerqa(id).subscribe(result=>{console.log(result);
      
      this.addProjectForm.controls['custName'].setValue(result[0]['Cust_Name']);
      this.addProjectForm.controls['Contact'].setValue(result[0]['Contact_No']);
      this.addProjectForm.controls['Location'].setValue(result[0]['Address_town']);
      this.addProjectForm.controls['WorkDetails'].setValue(result[0]['Work_Detail']);
      this.addProjectForm.controls['Addr1'].setValue(result[0]['Address_line1']);
      this.addProjectForm.controls['Addr2'].setValue(result[0]['Address_line2']);
    

    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addProjects($values)
  {
    this.certfService.addProjectDetails($values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Project Added!!','OK');
      }
      else{
        this.openSnackBar('Something went wrong!!', 'OK');
      }
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  
  }
  
  
 
 


