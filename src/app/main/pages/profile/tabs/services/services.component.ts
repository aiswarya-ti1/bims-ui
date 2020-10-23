import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Register2Service } from 'app/main/pages/authentication/register-2/register-2.service';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Router } from '@angular/router';
import { Services } from './services';
import { Segments } from 'app/main/pages/project-module-bwo/segments';









@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ServicesComponent implements OnInit {
  
  services:Services;
  segments:Segments;
  step = 0;
  civil : FormGroup;
  electrical : FormGroup;
  plumbing : FormGroup;
  interior : FormGroup;
  roofing : FormGroup;
  painting : FormGroup;
  paving : FormGroup;
  flooring : FormGroup;
  others: FormGroup;
  Fabrication : FormGroup;
  carpentry : FormGroup;
  User_ID:number=0;
    User:Array<User>;

    idString:string='';
   interests = [];

    API_URL="http://bims/";

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
 

  constructor( private sessionSt: SessionStorageService,
    private _formBuilder: FormBuilder, private profileServices:ProfileService,
    private router:Router) { 


      if(this.sessionSt.retrieve('user')!=null){
        this.User=this.sessionSt.retrieve('user')
        this.User_ID=this.User['User_ID'];
    }
    }

  ngOnInit() {
    this.getSegments();
    this.getCivilServices();
    this.civil = this._formBuilder.group({
      selectAll           : [''],
     /* c2           : [''],
      c3           : [''],
      c4           : [''],
      c5           : [''],
      c6           : [''],
      c7           : [''],
      c8           : [''],
      c9           : [''],
      c10           : [''],
      c11           : [''],
      c12           : [''],
      c13          : [''],
      c14           : [''],
      c15           : [''],
      c16           : [''],
      c17           : [''],*/

  });

  this.electrical = this._formBuilder.group({
    e1           : [''],
  
});
this.plumbing = this._formBuilder.group({
  p1           : [''],

});
this.interior = this._formBuilder.group({
  i1           : [''],
  i2          : [''],
  i3           : [''],
  i4           : [''],

});
this.roofing = this._formBuilder.group({
  r1           : [''],
  r2           : [''],
  r3           : [''],
  r4           : [''],

});
this.painting = this._formBuilder.group({
  pt1           : [''],

});
this.paving = this._formBuilder.group({
  pv1           : [''],
  pv2           : [''],
  pv3           : [''],

});

this.flooring = this._formBuilder.group({
  f1           : [''],
  f2           : [''],
 f3           : [''],
 f4           : [''],

});
this.paving = this._formBuilder.group({
  pv1           : [''],
  pv2           : [''],
  pv3           : [''],

});
this.others = this._formBuilder.group({
  o1           : [''],
  o2           : [''],
  o3           : [''],
  o4           : [''],
  o5           : [''],
  o6           : [''],
  o7           : [''],
  o8           : [''],
  o9           : [''],
  o10           : [''],
  o11           : [''],
  o12           : [''],
  o13           : [''],
  o14           : [''],


});
this.Fabrication = this._formBuilder.group({
  fa1           : [''],
  fa2           : [''],
  fa3           : [''],
  fa4           : [''],
  fa5           : [''],
});
this.carpentry = this._formBuilder.group({
  cp1           : [''],
  cp2           : [''],
  cp3           : [''],
  cp4           : [''],

});



  }
  getSegments()
  {
    this.profileServices.getSegments().subscribe(result=>{console.log(result);
      this.segments=result;});
  }


  getCivilServices()
  {
    this.profileServices.getCivilServices().subscribe(result=>{console.log(result);
    this.services=result;});
   
  }
  saveCivil()
  {
    console.log(this.interests);
    this.profileServices.saveServices(this.interests, this.User_ID).subscribe(result=>{console.log(result);
      if(result["Success"]==true)
      {
        this.router.navigate['/profile'];
      }
    })

    
  }
  
  onCheckboxChange($event) {
   // debugger
    console.log($event.source.value);
    console.log($event);
    
  
    if($event.checked==true) {
      this.interests.push($event.source.value)
    } else {
      const i = this.interests.findIndex(x => x.value === $event.source.value);
     this.interests.splice(i);
    }

   
    
  }
  
}



