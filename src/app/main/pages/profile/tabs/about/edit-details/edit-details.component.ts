import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { ProfileService } from '../../../profile.service';
import { ProfileDetails } from '../profileDetails';
import { Register2Service } from 'app/main/pages/authentication/register-2/register-2.service';
import { empty } from 'rxjs';
import { Locations } from 'app/main/pages/sales-module/locations';



@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditDetailsComponent implements OnInit {

  editProfile: FormGroup;
  editSecondProfile: FormGroup;
  editThirdProfile: FormGroup;
    dialogTitle: string;
    first : boolean=true;
    second : boolean=true;
    third : boolean=true;
    four:boolean=true;
    User:Array<User>;
    User_ID: number=0;
    details:ProfileDetails;
    FirstName : string;
    LastName : string;
    Gender:string;
    Birthday:Date;
    Descr:string;
    Email:string;
    Loc : number;
    location : Locations;
    Assoc_Type:string;



    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<EditDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _profileService: ProfileService, private registerService: Register2Service,
        private _formBuilder: FormBuilder, private sessionSt: SessionStorageService)
       { 
        
          if(this.sessionSt.retrieve('user')!=null){
              this.User=this.sessionSt.retrieve('user')
              this.User_ID=this.User['User_ID'];
          }
       }

  ngOnInit() {
   this.getProfileDetails();
   //this.getlocations();

this.first=true;
this.second=true;
this.third=true;
this.four=true;

//this.Assoc_Type=this._data['type'];



if(this._data['id']==1)
{
  this.first=false;
}
else if(this._data['id']==2)
{
  this.second=false;
}
if(this._data['id']==3)
{
  this.third=false;
}
if(this._data['id']==4)
{
  this.four=false;
}


    this.editProfile = this._formBuilder.group({
      userID :[''],
      name           : ['', Validators.required],
      lastName           : ['', Validators.required],
      gender           : ['', Validators.required],
      birthday           : ['', Validators.required],
      email           : ['', Validators.required],
      location           : ['', Validators.required],
      descr           : ['', Validators.required],
      orgName :[''],
      grade: [''],
      license :[''],
      gst:[''],
   
      occupation           : ['', Validators.required],
      skills           : ['', Validators.required],
      exp           : ['', Validators.required],
      jobs           : ['', Validators.required],
     
  
      addr1           : ['', Validators.required],
      addr2           : ['', Validators.required],
      city           : ['', Validators.required],
      contact           : ['', Validators.required],
      //email           : ['', Validators.required],
      website           : ['', Validators.required],
      projects :[''],
      editID :[''],
      stdRate:[''],

      total: [''],
      keralaWrks : [''],
      nonKeralaWrks :[''],
      territory :[''],
      radius :['']



     
      
    });
  }

  getProfileDetails()
  {
      this._profileService.getProfileDetails(this.User_ID).subscribe(result=>{console.log(result);
          this.details=result;
         // this.Gender=result[0]['Gender'];
         // this.Birthday=result[0]['Birthday'];
          this.Descr=result[0]['Descr'];
          this.Email=result[0]['Address_email'];
          this.FirstName=result[0]['Assoc_FirstName'];
          this.LastName=result[0]['Assoc_LastName'];
          this.Loc=result[0]['Loc_Name'];
         // this.editProfile.controls['name'].setValue(result[0]['Assoc_FirstName']);
          //this.editProfile.controls['lastName'].setValue(result[0]['Assoc_LastName']);
          this.editProfile.controls['userID'].setValue(this._data['user_ID']);
          this.editProfile.controls['editID'].setValue(this._data['id']);
          this.editProfile.controls['grade'].setValue(result[0]['Grade']);
          this.editProfile.controls['birthday'].setValue(result[0]['Birthday']);
          this.editProfile.controls['license'].setValue(result[0]['License']);
          this.editProfile.controls['descr'].setValue(result[0]['Descr']);
          this.editProfile.controls['orgName'].setValue(result[0]['OrganizationName']);
          this.editProfile.controls['gst'].setValue(result[0]['GST']);
          this.editProfile.controls['exp'].setValue(result[0]['Experiece']);
          this.editProfile.controls['stdRate'].setValue(result[0]['StdRate']);
          this.editProfile.controls['projects'].setValue(result[0]['No_Projects']);
          this.editProfile.controls['addr1'].setValue(result[0]['Address_line1']);
          this.editProfile.controls['addr2'].setValue(result[0]['Address_line2']);
          this.editProfile.controls['city'].setValue(result[0]['Loc_Name']);
          //this.editProfile.controls['jobs'].setValue(result[0]['Assoc_LastName']);
          this.editProfile.controls['contact'].setValue(result[0]['Contact_phone']);
          this.editProfile.controls['email'].setValue(result[0]['Address_email']);
          this.editProfile.controls['website'].setValue(result[0]['Address_url']);



      })
  }
  getlocations()
  {
   this.registerService.getLocations().subscribe(result=>{
       //console.log(result);
       this.location=result;
     });
  }

  editProfileDetail($value)
  {
    console.log($value);
    this._profileService.editProfileDetails($value).subscribe(result=>{
      console.log(result);
      
    });
  }


}
