import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators, Form,FormControl} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Locations } from 'app/main/pages/sales-module/locations';
@Component({
  selector: 'addnew_supplier',
  templateUrl: './addnew_supplier.component.html',
  styleUrls: ['./addnew_supplier.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class AddNewSupplierComponent implements OnInit {
  User_ID:number;
  User:Array<User>;
  registrationForm: FormGroup;
  isOptional: boolean = false;
  firstFormGroupErrors:any;
  secondFormGroupErrors:any;
  secondFormGroup:FormGroup;
  firstFormGroup:FormGroup;
  secondForm:Form;
  customerFormGroup:FormGroup;
  customerFormGroupErrors:any;
  tableFormGroup:FormGroup;
  rateFormGroup:FormGroup;
  rateFormGroupErrors:any;
  
  location:Locations[];
  dis:boolean=false;
    finish:boolean=false;
  disabledValue:boolean = false;
  disabledProject:boolean = true;
  loc:boolean=false;
  catDis:boolean=false;
  segDis:boolean=false;
  locDis:boolean=false;
  qualifiDis:boolean=false;
  typeDis:boolean=false;
  branchDis:boolean=false;
  hiddenProject:boolean=true;
  Assoc_ID:number;
  assocID:number;
  butDis:boolean=true;
  nxtDisable:boolean=true;
  addDisable:boolean=false;
  firstForm:boolean=false;
  labour:boolean=false;
  material:boolean=false;
  message:boolean=true;
  table1:boolean=false;
  RateNxt:boolean=true;
  constructor( private fuseConfig: FuseConfigService,private sessionSt: SessionStorageService, 
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddNewSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private _formBuilder: FormBuilder,  public dialog: MatDialog, private projectService:ProjectModuleService) 
    { 
      if(this.sessionSt.retrieve('user')!=null){
        this.User=this.sessionSt.retrieve('user')
        this.User_ID=this.User['User_ID'];
        
      }
      this.firstFormGroup = new FormGroup(
        {
               Branch: new FormControl(),
        FirstName : new FormControl(),
        MidName : new FormControl(),
        LastName   : new FormControl(),
        Type: new FormControl(),
        Qualifi: new FormControl(),
        ProfQuali: new FormControl(),
        Address1: new FormControl(),
        Address2: new FormControl(),
        Years: new FormControl(),
        City: new FormControl(),
        Contact_Person: new FormControl(),
        Contact_Number: new FormControl(),
        Whatsapp_Number: new FormControl(),
        services: new FormControl(),
        categories: new FormControl(),
        Keralite_Workers: new FormControl(),
        Non_Keralite_Workers: new FormControl(),
        Total_Workers: new FormControl(),
        Project_Nos: new FormControl(),
        Bill_Pattern: new FormControl(),
        Territory: new FormControl(),
        Total_Value: new FormControl(),
        Plans:new FormControl(),
        StdRate:new FormControl(),
        Unit:new FormControl(),
        Service:new FormControl(),
        willing:new FormControl('', []),
        billing:new FormControl('', []),
        Quality:new FormControl(),
        Radius : new FormControl(),
        Source : new FormControl(),

        
        meta  :
            this._formBuilder.group({
                location: new FormControl(),
                notes   : new FormControl()
            })
    });
         
    
    this.firstFormGroupErrors = {
      assoc_ID : {},
     Branch : {},
      FirstName :  {},
       
        LastName   :  {},
        Type:  {},
        Qualifi:  {},
       
        Address1:  {},
       
        Years:  {},
        Source :{},
       
        Contact_Person:  {},
        Contact_Number:  {},
        City: {},
        services:  {},
       
        Keralite_Workers:  {},
        Non_Keralite_Workers: {},
        
        Project_Nos:  {},
        categories:{},
        willing : {},
        Total_Value:  {},
        Radius : {},
      
  };
  
  }

  ngOnInit() 
  {
   
  }
  
  addSupplier($values)
  {
    
this.projectService.addSupplier($values).subscribe(result=>{
})
  }
}




