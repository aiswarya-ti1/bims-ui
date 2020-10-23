import { Component, OnDestroy, OnInit, ViewEncapsulation , Output, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { CertificationService } from '../../../certification.service';
import { AssocDetails } from '../../AssocDetails';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog, MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';

import { SegmentRates } from '../../segmentRate';
import { Projects } from '../../projects';
import { QAFeedbackDialogComponent } from './qa-feedback/qa-feedback.component';
import { DocumentUploadDialogComponent } from './doc-upload/doc-upload.component';
import { Documents } from './documents';






@Component({
    selector     : 'verification',
    templateUrl  : './verification.component.html',
    styleUrls    : ['./verification.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers : [QAVerificationComponent]
})
export class QAVerificationComponent implements OnInit
{
  @Output() setAssocStatusFlag=new EventEmitter<number>();    
  Assoc_ID : number=0;
  details : AssocDetails[];
  projects:Projects[];
  commentForm : FormGroup;
  rateExists : number =0;
  projectExists:number =0;
  displayedColumns :['Segment','Service','Pattern','LRate','LMRate'];
  dataSource;
  assocs : SegmentRates[];
  Status_ID : number=0;;
  QACount : number=0;
  assocDocNo : number;
  dialogRef_Feedback :MatDialogRef<QAFeedbackDialogComponent>;
  dialogRef_Doc : MatDialogRef<DocumentUploadDialogComponent>;
  docs : Documents[];
  name : string;


    constructor(
       
        private _formBuilder: FormBuilder, private certService : CertificationService,
        public snackBar: MatSnackBar,private activatedRoute: ActivatedRoute, private dialog : MatDialog
    )
    {
      this.commentForm = new FormGroup(
        {
          assocID:new FormControl(),
          Action: new FormControl(),
          comment : new FormControl()
        });

      this.commentForm= this._formBuilder.group({
        assocID:['', Validators.required],
        Action :['', Validators.required],
        comment :['']
      });  
    }
    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
    
      this.Assoc_ID=params['associd'];
     
      
    });
    this.commentForm.controls['assocID'].setValue(this.Assoc_ID);
    this.getOneAssocDetails(this.Assoc_ID);
    this.getProjects();
    this.chkQACount();
    this.chkAssocDocExists(this.Assoc_ID);
    this.getAssocDocs(this.Assoc_ID);

}

getOneAssocDetails(id)
{
  this.certService.getOneAssociate(id,1).subscribe(result=>{console.log(result);
      this.details=result;
      this.Status_ID=result[0]['Assoc_Status'];
      this.setAssocStatusFlag.emit(this.Status_ID);
      this.name=result[0]['Assoc_FirstName']+' '+result[0]['Assoc_MiddleName']+' '+result[0]['Assoc_LastName']

  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
  
}
    
docDownload(type)
{
  this.certService.docDownload(type, this.Assoc_ID).subscribe(
    
      
    (res) => {console.log(res[0]);
           
      window.open(res[0]);
     
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
      this.projects=result;},  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
    }
    chkQACount()
    {
      this.certService.checkQACount(this.Assoc_ID).subscribe(result=>{
        console.log('count:',result);
        if(result>=2 )
        {
this.QACount=1;
        }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
    }
    radioChange($event)
  {
    
console.log($event);
if($event=='VerifiedWC')
{
this.commentForm.controls['comment'].enable();
}
else
{
  this.commentForm.controls['comment'].disable();
}

  }
  finishSurvey(value)
  {
    this.certService.changeStatus(value).subscribe(results=>{console.log(results);
    this.getOneAssocDetails(this.Assoc_ID);},  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }
   
    addFeedback(cid)
    {
      this.dialogRef_Feedback = this.dialog.open(QAFeedbackDialogComponent, {
        panelClass:'qa-feedback-dialog',
        data      : {
            associd : this.Assoc_ID,
            custid : cid,
            typeid :1
         
        }
    });
  
    this.dialogRef_Feedback.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getProjects();
      this.chkQACount();      
        if ( !response )
        {
           this.getProjects();
           this.chkQACount();
    
        return;
        }
    });
    }
    chkAssocDocExists(id)
    {
this.certService.chkAssocDocExists(id).subscribe(result=>{console.log(result);

  this.assocDocNo=result;
  
});
    }
    getAssocDocs(id)
    {
      this.certService.getAssocDocs(id).subscribe(result=>{console.log(result);
        this.docs=result;
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
    }
    uploadDocs()
    {
      this.dialogRef_Doc = this.dialog.open(DocumentUploadDialogComponent, {
        panelClass:'doc-upload-dialog',
        data      : {
            associd : this.Assoc_ID,
            
         
        }
    });
  
    this.dialogRef_Doc.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getProjects();
      this.chkAssocDocExists(this.Assoc_ID);
      this.getAssocDocs(this.Assoc_ID);
            
        if ( !response )
        {
           this.getProjects();
           this.chkAssocDocExists(this.Assoc_ID);
           this.getAssocDocs(this.Assoc_ID);
    
        return;
        }
    });
    }
    certify()
    {
      this.certService.changeCertifyStatus(this.Assoc_ID).subscribe(result=>{console.log(result);
      this.getOneAssocDetails(this.Assoc_ID);},  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
    }
    
}
