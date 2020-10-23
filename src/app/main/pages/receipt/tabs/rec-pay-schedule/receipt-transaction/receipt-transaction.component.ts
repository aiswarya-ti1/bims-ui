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
  selector: 'receipt-transaction',
  templateUrl: './receipt-transaction.component.html',
  styleUrls: ['./receipt-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class ReceiptTransactionComponent implements OnInit {
  transactionForm : FormGroup; 

  constructor(public dialogRef: MatDialogRef<ReceiptTransactionComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService, public snackBar: MatSnackBar) { 
      this.transactionForm = new FormGroup(
        {
          payID:new FormControl(),
          transID : new FormControl()
                   
        });

        this.transactionForm= this._formBuilder.group({
          payID:['', Validators.required],
          transID :['', Validators.required]
        
        });
    }

  ngOnInit() {
   
   this.transactionForm.controls['payID'].setValue(this.data['payID']);
  
     //this.PayID=this.data['payID'];
  }
  
  updateTransaction(values)
  {
    this.projectService.updateReceivedPayment(values).subscribe(result=>{console.log(result);
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
