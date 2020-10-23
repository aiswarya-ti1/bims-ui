import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { ViewWorkScheduleDialogComponent } from '../payment-schedule/view-work-schedule/view-work-schedule.component';
@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkScheduleComponent implements OnInit {

  workForm : FormGroup;
  TypeID : number=0;
  SchedID : number=0;
  dialogRef_View : MatDialogRef<ViewWorkScheduleDialogComponent>;
  View_ID :  number;
  Amend_ID : number;


  constructor(public matDialogRef: MatDialogRef<WorkScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,private dialog : MatDialog,
    private formBuilder: FormBuilder,public projectService:ProjectModuleService) {
      this.workForm = new FormGroup(
        {
          type_ID : new FormControl(),
          work_ID : new FormControl(),
          workStage : new FormControl(),
          startDate : new FormControl(),
          duration : new FormControl(),
          comment : new FormControl(),
          endDate : new FormControl(),
          sched_ID : new FormControl(),
          amend_ID : new FormControl(),
          
        });
        this.workForm = this.formBuilder.group({
          type_ID :[''],
          work_ID :[''],
          workStage :  ['', Validators.required],
          startDate :['', Validators.required],
          duration :['', Validators.required],
          comment : [''],
          endDate :[''],
          sched_ID :[''],
          amend_ID : [''],
          

        });
     }

  ngOnInit() {
    this.workForm.controls["work_ID"].setValue(this.data['workid']);
    this.workForm.controls["type_ID"].setValue(this.data['typeid']);
    this.workForm.controls["sched_ID"].setValue(this.data['workSchedID']);
    this.workForm.controls["amend_ID"].setValue(this.data['amendid']);
    this.TypeID=this.data['typeid'];
    this.SchedID=this.data['workSchedID'];
    this.View_ID=this.data['viewid'];
    this.Amend_ID=this.data ['amendid'];
    if(this.SchedID!==0)
    {
      this.getOneWorkSchedDetails(this.SchedID);
    }
  }
  getOneWorkSchedDetails(id)
  {
    this.projectService.getOneWorkSchedDetails(id).subscribe(result=>{
      this.workForm.controls["workStage"].setValue(result[0]['Work_Stage']);
      this.workForm.controls["startDate"].setValue(result[0]['Start_Date']);
      this.workForm.controls["duration"].setValue(result[0]['Duration']);
      this.workForm.controls["comment"].setValue(result[0]['Remarks']);
      this.workForm.controls["endDate"].setValue(result[0]['End_Date']);
    })
  }
  saveDetails($values)
  {
    console.log($values);
    this.projectService.saveWorkSchedule($values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Work Schedule Added Successfully!!', 'OK');
      }
      else{
        this.openSnackBar('Something went wrong!!', 'OK');
      }

    })
  }
  editWorkSchDetails($values)
  {
    this.projectService.editWorkSchDetails($values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Work Schedule updated!!', 'OK');
      }
      else{
        this.openSnackBar('Something went wrong!!', 'OK');
      }

    })
  }
  deleteWorkSch($values)
  {
    this.projectService.deleteWorkSch($values).subscribe(result=>{
      if(result['Success']==true)
      {
        this.openSnackBar('Work Schedule Deleted!!', 'OK');
      }
      else{
        this.openSnackBar('Something went wrong!!', 'OK');
      }

    })
  }
  clear()
  {
    this.workForm.controls['workStage'].reset();
    this.workForm.controls['startDate'].reset();
    this.workForm.controls['endDate'].reset();
     this.workForm.controls['duration'].reset();
     this.workForm.controls['comment'].reset();
     this.workForm.controls["work_ID"].setValue(this.data['workid']);
  }
  assign()
  {
    this.workForm.controls["work_ID"].setValue(this.data['workid']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  viewSched()
  {
    this.dialogRef_View = this.dialog.open(ViewWorkScheduleDialogComponent, {
      panelClass:'view-work-schedule-dialog',
      data      : {
        workid : this.data['workid'],
        viewid : this.View_ID
       
      }
    });
    
    this.dialogRef_View.afterClosed().subscribe((response: FormGroup) => {
     
          
       if ( !response )
       {
       
           return;
       }
      });

  }
  onSearchChange(value, startDate, form)
  {
    (value);
    console.log('Start Date'+startDate);
    console.log('Date' + form)
    //this.projectService.getEnd;
   this.projectService.getEndDate(value,startDate).subscribe(result=>{console.log(result);
  this.workForm.controls['endDate'].setValue(result[0]);
})
  }

}
