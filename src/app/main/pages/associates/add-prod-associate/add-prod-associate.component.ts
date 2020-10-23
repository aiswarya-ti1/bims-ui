import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Validators} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

import { CertificationService } from 'app/main/pages/certification/certification.service';
import { AssocDetails } from 'app/main/pages/certification/certification-process/AssocDetails';
import { Locations } from '../../sales-module/locations';
import { ProductGroups } from '../tabs/mat-assoc-list/productGroups';
import { ProductSegments } from '../tabs/mat-assoc-list/productSegments';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';

@Component({
    selector     : 'add-prod-associate',
    templateUrl  : './add-prod-associate.component.html',
    styleUrls    : ['./add-prod-associate.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddProductAssociateDialogComponent
{
    firstFormGroup : FormGroup;
    segment : ProductSegments[];
    segmentGroup:ProductSegments[];
    category : ProductGroups[];
    location :Locations[]; 
    Type_ID : number=0;
    Assoc_ID: number=0;
    details : AssocDetails[];
    type:string='';
    fname : string='';
    mname : string='';
    lname : string='';
    exp : number=0;
    addr1 : string='';
    addr2 : string='';
    loc : number=0;
    prLoc : number=0;
    c_name : string='';
    c_number : string='';
    a_number: string='';
    c_whats : string='';
  seg : number=0;
  ser : number=0;
  acNo : string='';
  quali :number=0;
  User_ID:number=0;
    User_Name : string;
    User:Array<User>;
  
  
    constructor(public dialogRef_AddNew: MatDialogRef<AddProductAssociateDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,public projectService:ProjectModuleService,public certfService:CertificationService, 
    private snackBar : MatSnackBar,private sessionSt: SessionStorageService  ) {
      
      this.firstFormGroup = new FormGroup(
        {
          user_ID : new FormControl(),
          Ref : new FormControl(),
          Type : new FormControl(),
          FirstName : new FormControl(),
          MidName : new FormControl(),
          LastName : new FormControl(),
          Years : new FormControl(),
          Address1 : new FormControl(),
          Address2 : new FormControl(),
          City : new FormControl(),
          Contact_Person : new FormControl(),
          Contact_Number : new FormControl(),
          Alt_Number : new FormControl(),
          Whatsapp_Number : new FormControl(),
          type_ID : new FormControl(),
          email : new FormControl(),
          services : new FormControl(),
          categories : new FormControl(),
          Territory : new FormControl(),
          accountNo : new FormControl(),
          assoc_ID : new FormControl(),
          Qualifi : new FormControl(),
  ProfQuali :new FormControl(),
  Keralite_Workers :new FormControl(),
  Non_Keralite_Workers:new FormControl(),
  Total_Workers:new FormControl(),
  Project_Nos : new FormControl(),
  Total_Value : new FormControl(),
  gst : new FormControl()
         
  
          
        });
        this.firstFormGroup = this.formBuilder.group({
          user_ID : [''],
          Ref : ['', Validators.required],
          Type : ['', Validators.required],
          FirstName : ['', Validators.required],
          MidName : [''],
          LastName : ['', Validators.required],
          Years : [''],
          Address1 : [''],
          Address2 : [''],
          City : [''],
          Contact_Person : [''],
          Contact_Number : [''],
          Whatsapp_Number : [''],
          Alt_Number :[''],
          services : [''],
          categories :[''],
          Territory :[''],
          accountNo :[''],
          type_ID:[''],
          assoc_ID :[''],
          Qualifi : [''],
          ProfQuali :[''],
          Keralite_Workers :[''],
          Non_Keralite_Workers:[''],
          Total_Workers:[''],
          Project_Nos : [''],
          Total_Value :[''],
          gst :[''],
          email :['']
  
         
        }); }
  
  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_ID=this.User['ID'];
  }
    this.Assoc_ID=this.data['associd'];
    this.firstFormGroup.controls['type_ID'].setValue(this.data['typeid']);
    this.firstFormGroup.controls['assoc_ID'].setValue(this.data['associd']);
    this.firstFormGroup.controls['user_ID'].setValue(this.User_ID);
    //alert(this.User_ID);
          
          this.Type_ID=this.data['typeid'];
    this.getSegments();
    this.getLocation();
    if(this.Type_ID==2)
    {
      
      this.getOneAssociate();
    }
   //alert(this.Type_ID);
  }
    
  addAssociate(values)
  {
    console.log(values);
    if(this.Type_ID==1)
    {
      
      this.projectService.addMaterialAssoc(values).subscribe(result=>{console.log(result);
    this.openSnackBar('Associate Added Successfully!!', 'OK');
      })
    }
    
    else if(this.Type_ID==2)
    {
      this.projectService.editMaterialAssoc(values).subscribe(result=>{console.log(result);
        this.openSnackBar('Details Updated Successfully!!', 'OK');
          })

    }
  }
  onServiceChange($event) {
    console.log($event);
    this.certfService.getProductGroup($event).subscribe(result=>{console.log(result);
      this.category=result;
    });
    //console.log('Seg Group'+this.segmentGroup);
  
  }
  getSegments()
  {
    
  this.certfService.getProductSegments().subscribe(result=>{
    this.segment=result;
    
   });
   
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getLocation()
  {
    this.projectService.getLocations().subscribe(result=>{
        this.location=result;
    });
  }
  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  getOneAssociate()
  {
    this.certfService.getOneAssociate(this.Assoc_ID, this.Type_ID).subscribe(result=>{console.log(result);
      this.details=result;
      this.firstFormGroup.controls['Type'].setValue(result[0]['Assoc_Type']);
      this.firstFormGroup.controls['Ref'].setValue(result[0]['Reference']);
      this.firstFormGroup.controls['FirstName'].setValue(result[0]['Assoc_FirstName']);
      this.firstFormGroup.controls['MidName'].setValue(result[0]['Assoc_MiddleName']);
      this.firstFormGroup.controls['LastName'].setValue(result[0]['Assoc_LastName']);
      this.firstFormGroup.controls['Years'].setValue(result[0]['Experiece']);
      this.firstFormGroup.controls['Address1'].setValue(result[0]['Address_line1']);
      this.firstFormGroup.controls['Address2'].setValue(result[0]['Address_line2']);
      this.firstFormGroup.controls['City'].setValue(result[0]['Address_town']);
      this.firstFormGroup.controls['Territory'].setValue(result[0]['Territory']);
      this.firstFormGroup.controls['Contact_Person'].setValue(result[0]['Contact_name']);
      this.firstFormGroup.controls['Contact_Number'].setValue(result[0]['Contact_phone']);
      this.firstFormGroup.controls['Whatsapp_Number'].setValue(result[0]['Contact_whatsapp']);
      this.firstFormGroup.controls['Qualifi'].setValue(result[0]['Qualification']);
      this.firstFormGroup.controls['ProfQuali'].setValue(result[0]['Prof_Qualification']);
      this.firstFormGroup.controls['Keralite_Workers'].setValue(result[0]['Keral_WKRS']);
      this.firstFormGroup.controls['Non_Keralite_Workers'].setValue(result[0]['NonKerala_WKRS']);
      this.firstFormGroup.controls['Total_Workers'].setValue(result[0]['Total_WRKS']);
      this.firstFormGroup.controls['Proj_Nos'].setValue(result[0]['No_Projects']);
      this.firstFormGroup.controls['Total_Value'].setValue(result[0]['Total_Amount']);
      this.firstFormGroup.controls['accountNo'].setValue(result[0]['Assoc_AccountNo']);
      this.firstFormGroup.controls['Alt_Number'].setValue(result[0]['Alt_phone']);
  
    })
  }
  
  }