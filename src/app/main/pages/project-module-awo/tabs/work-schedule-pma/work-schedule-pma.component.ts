import { Component,OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';

import { WorkDatesDialog } from '../work-schedule-awo/work-dates/work-dates.component';
@Component({
    selector   : 'work-schedule-pma',
    templateUrl: './work-schedule-pma.component.html',
    styleUrls  : ['./work-schedule-pma.component.scss'],
    animations : fuseAnimations
})
export class WorkSchedulePMAComponent
{
    dataSource1;
   
    work_ID : number=0;
    User:Array<User>;
    User_Name: string='';
    Role_ID : number=0;
    
    displayedColumns1 = ['Stage','ExpStart','Duration', 'ExpClose', 'ActualStart', 'ActualClose', 'Action'];
    
    workDetails:WorkScheduleDetails;
    
    tableFormGroup : FormGroup;
    dialogRef_Work :MatDialogRef<WorkDatesDialog>;
    details : WorkScheduleDetails;
    
  
    constructor(public projectService:ProjectModuleService,
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
            //  alert(this.User_Name);
          }
     
        this.activatedRoute.params.subscribe((params: Params) => {
            
      this.work_ID=params['workid'];
     
      this.tableFormGroup.controls['workID'].setValue(params['workid']);
      });
      
        this.getWorkSchedule();
      
       
             
      
  
    }
    
    getWorkSchedule()
    {
  this.projectService.getWorkSchedule(this.work_ID).subscribe(result=>{
  this.details=result;
  })
    }
   
    addDate(id)
    {
      this.dialogRef_Work = this.dialog.open(WorkDatesDialog, {
        panelClass:'extra-payment-dialog',
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
   
    
  
  }
  
  
  
  

