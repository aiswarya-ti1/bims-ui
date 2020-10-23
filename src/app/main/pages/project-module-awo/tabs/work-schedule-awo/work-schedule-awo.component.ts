import { Component,OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';

import { WorkDatesDialog } from '../work-schedule-awo/work-dates/work-dates.component';



@Component({
    selector     : 'work-schedule-awo',
    templateUrl  : './work-schedule-awo.component.html',
    styleUrls    : ['./work-schedule-awo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkScheduleAWOComponent implements OnInit
{  dataSource1;
   
  work_ID : number=0;
  User:Array<User>;
  User_Name: string='';
  Role_ID : number=0;
  
  displayedColumns1 = ['Stage','ExpStart','Duration', 'ExpClose', 'ActualStart', 'ActualClose', 'Action'];
  
  workDetails:WorkScheduleDetails;
  
  tableFormGroup : FormGroup;
  dialogRef_Work :MatDialogRef<WorkDatesDialog>;
  details : WorkScheduleDetails;
  chkAmd1SchedExists:number;
  chkAmd2SchedExists:number;
  chkAmd3SchedExists:number;
  schedCount : number;
  A1Exists: number;
  A2Exists: number;
  A3Exists: number;
  
  
  

  constructor(public projectService:ProjectModuleService,  public snackBar: MatSnackBar,
    public router:Router, private dialog : MatDialog,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService,private activatedRoute: ActivatedRoute,) 
    { 
      
     

      this.tableFormGroup=new FormGroup({
           
        workID : new FormControl()  ,
        ActualStart : new FormControl(),
        ActualClose : new FormControl(),
        SchedID : new FormControl(),
        ActualPayDate : new FormControl(),
        ActualAmount : new FormControl()
      }); 
    }

  ngOnInit() {  
      if(this.sessionSt.retrieve('user')!=null){
          this.User=this.sessionSt.retrieve('user')
          this.User_Name=this.User['User_Login'];
          this.Role_ID=this.User['Role_ID'];
        }
   
      this.activatedRoute.params.subscribe((params: Params) => {
          
    this.work_ID=params['workid'];
   
    this.tableFormGroup.controls['workID'].setValue(params['workid']);
    });
    
      this.getWorkSchedule();
      this.chkAmendExists();
    
     
           
    

  }
  chkAmendExists()
  {
    this.projectService.chkAmendSchedExists(this.work_ID, 1).subscribe(result=>{
      this.schedCount=result[0];
if(this.schedCount==0)
{
  this.A1Exists=0;
}
else{
  this.A1Exists=1;
}
    });
    this.projectService.chkAmendSchedExists(this.work_ID, 2).subscribe(result=>{
      this.schedCount=result[0];
if(this.schedCount==0)
{
  this.A2Exists=0;
}
else{
  this.A2Exists=1;
}
    });
    this.projectService.chkAmendSchedExists(this.work_ID, 3).subscribe(result=>{
      this.schedCount=result[0];
if(this.schedCount==0)
{
  this.A3Exists=0;
}
else{
  this.A3Exists=1;
}
    })
  }
  
  getWorkSchedule()
  {
this.projectService.getWorkSchedule(this.work_ID).subscribe(result=>{
this.details=result;
},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  }
      )
  }
  
    
  addDate(id)
  {
    this.dialogRef_Work = this.dialog.open(WorkDatesDialog, {
      panelClass:'work-dates-dialog',
      data      : {
     sche_id : id,
        
      } 
  });

  this.dialogRef_Work.afterClosed()
  .subscribe((response: FormGroup) => {
      
    this.getWorkSchedule();
      if ( !response )
      {
        this.getWorkSchedule();
          return;
      }
  });

  }
 


openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}





