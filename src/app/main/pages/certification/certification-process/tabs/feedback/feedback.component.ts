import { Component, OnDestroy, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { CertificationService } from '../../../certification.service';
import { AssocDetails } from '../../AssocDetails';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';

import { SegmentRates } from '../../segmentRate';
import { Projects } from '../../projects';
import { AddFeedbackDialogComponent } from './add-feedback/add-feedback.component';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';





@Component({
    selector     : 'feedback',
    templateUrl  : './feedback.component.html',
    styleUrls    : ['./feedback.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers : [AssocFeedbackComponent]
})
export class AssocFeedbackComponent implements OnInit
{
      
  Assoc_ID : number=0;
  details : AssocDetails[];
  projects:Projects[];
  @Output() setAssocStatusFlag=new EventEmitter<number>();
  rateExists : number =0;
  projectExists:number =0;
  displayedColumns :['Segment','Service','Pattern','LRate','LMRate'];
  dataSource;
  assocs : SegmentRates[];
  Status_ID : number;
  dialogRef_Feedback :MatDialogRef<AddFeedbackDialogComponent>;
  confirmDialogRef : MatDialogRef<FuseConfirmDialogComponent>;
  ratingForm : FormGroup;
  


    constructor(
       
        private _formBuilder: FormBuilder, private certService : CertificationService,
        public snackBar: MatSnackBar,private activatedRoute: ActivatedRoute, private dialog : MatDialog
    )
    {
      this.ratingForm = new FormGroup(
        {
          ratevalue: new FormControl(),
          });
      
        
    }
    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
    
      this.Assoc_ID=params['associd'];
     
      
    });
    
this.getOneAssocDetails(this.Assoc_ID);
    this.getProjects();

}

getOneAssocDetails(id)
{
  this.certService.getOneAssociate(id,1).subscribe(result=>{console.log(result);
      this.details=result;
      this.Status_ID=result[0]['Assoc_Status'];
      this.setAssocStatusFlag.emit(this.Status_ID);

  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
  
}
    
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
 
 
    
    getProjects()
    {
      
      this.certService.getProjectDetails(this.Assoc_ID).subscribe(result=>{console.log(result);
      this.projects=result;
      this.ratingForm.controls['ratevalue'].setValue(result['Rating']);
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
    }
    addFeedback(cid)
    {
      this.dialogRef_Feedback = this.dialog.open(AddFeedbackDialogComponent, {
        panelClass:'add-feedback-dialog',
        data      : {
            associd : this.Assoc_ID,
            custid : cid,
            typeid :1
         
        }
    });
  
    this.dialogRef_Feedback.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getProjects();
            
        if ( !response )
        {
           this.getProjects();
    
        return;
        }
    });
    }
    
    viewRating(){
      //debugger;
      var elm=(<HTMLInputElement>document.getElementById('hdnRating'));
    var rating=elm.value;
      
      if(rating!=="undefined"){
        var r=Math.round((parseInt(rating)*2)/2);
        var outputMsg="";
      
        for (var i = r; i >= 1; i--){
        outputMsg+='<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;';
        }
        if(i==.5){
          outputMsg+='<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;';
        }
        for (let i = (5 - r); i >= 1; i--){
          outputMsg+='<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;';
        }
        document.getElementById('rating_star').innerHTML= outputMsg;
    }
    } 
  finishFeedback()
  {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish feedback?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                if(result==true)
                {
                  this.certService.changeFeedStatus(this.Assoc_ID).subscribe(results=>{console.log(results);
                  //code to run certf.ts getOneAssoc()
                  this.getOneAssocDetails(this.Assoc_ID);
                  },  error=>{console.log(error);
    
                    this.openSnackBar('Server Error. Please try again!!','OK');
                    });
                }
            }
            this.confirmDialogRef = null;
        });
   
  } 
}
