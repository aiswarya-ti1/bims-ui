import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { LabEstimates } from '../../../labEstimate';


@Component({
    selector     : 'set-priority-items',
    templateUrl  : './set-priority-items.component.html',
    styleUrls    : ['./set-priority-items.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SetPriorityItemsFormDialogComponent
{
  
  displayedColumns = ['LineItems','Priority','Action'];
  Work_ID : number=0;
  items : LabEstimates;
  dataSource;
  SelectedItem : number=0;
  priorityFormGroup : FormGroup;
  priorities=[];
  count : number=0;
 
  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<SetPriorityItemsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar, 
    private _formBuilder: FormBuilder) { }
  ngOnInit() {
    this.Work_ID=this.data['workid'];
    this.getWorkLineItems();
   
    this.priorityFormGroup = new FormGroup(
      {
        leid : new FormControl(),
        index : new FormControl()
        });
        this.priorityFormGroup = this._formBuilder.group({
          leid : [''],
          index : ['', Validators.required]

        });
  
   
   
}

 getWorkLineItems()
    {
      
    this.projectService.getAllWorkLineItems(this.Work_ID).subscribe(result=>{console.log(result);
       this.items= result;
       this.count=result.length;
       console.log(this.count);
       this.getPriorities(this.count);
       this.dataSource= new MatTableDataSource(result);
    })
    }
    getPriorities(c) {
      
      for (let i = 1; i <= c; i++) {
        this.priorities.push(i)
      }
      console.log(this.priorities);
    }
    savePriority(index, leid)
    {
     
       console.log('Index '+index);
        console.log('Leid '+leid);
        //console.log('Item Id'+itemID);
        this.projectService.savePriority(index, leid, this.Work_ID).subscribe(result=>{console.log(result);
          this.priorityFormGroup.controls['index'].reset();
          this.getWorkLineItems();
        })
     
    
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
    changeItem(item)
    {
      console.log('Selected Item'+ item);
      this.SelectedItem=item;
    }
    editPriority()
    {
      this.projectService.editPriority(this.Work_ID).subscribe(result=>{console.log(result);
        this.priorityFormGroup.controls['index'].reset(); 
        this.getWorkLineItems();
      })
    }
   
}

  

  


