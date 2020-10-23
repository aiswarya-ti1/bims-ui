import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
@Component({
  selector: 'view-pay-summary',
  templateUrl: './view-pay-summary.component.html',
  styleUrls: ['./view-pay-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class ViewPaySummaryComponent implements OnInit {
  EstTotal : number;
  EstSubTotal : number;
  EstBal : number;
  ReEst:number=0;
  ReEstBal : number=0;
  RecAmt : number=0;
SplitTotal : number=0;
RecBal : number=0;
SplitBal : number=0;
  Work_ID : number;
  Amend_No : number;
  constructor(public dialogRef: MatDialogRef<ViewPaySummaryComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      
    }

  ngOnInit() {
   this.Work_ID=this.data['wid'];
   this.Amend_No=this.data['amendno'];
   //this.getReMeasureSummary();
      this.getSubtotals();
   
  }
  
  getSubtotals()
{
 // debugger;
  this.projectService.getAmendSubTotals(this.Work_ID, this.Amend_No).subscribe(result=>{console.log(result);
    this.EstTotal=result['Total'];
   // this.EstSubTotal=result['SubTotal'];
   // this.EstBal=result['Balance'];
   this.RecAmt=result['RecTotal'];
   this.SplitTotal=result['SplitTotal'];
   this.RecBal=result['BalanceRec'];
   this.SplitBal=result['BalanceSplit'];
   this.ReEst=result['TotalAfterRe'];
   this.ReEstBal=result['ReBal'];
      
  
    })
}
getReMeasureSummary()
{
  this.projectService.getReMeasureSummary(this.Work_ID,this.Amend_No).subscribe(result=>{console.log(result);
  this.ReEst=result['TotalAfterRe'];
  this.ReEstBal=this.ReEst-this.SplitTotal;
  console.log('ResEst Value'+this.ReEst)

},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
}


openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
