import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
@Component({
  selector: 'labor-init-pay-transaction',
  templateUrl: './labor-init-pay-transaction.component.html',
  styleUrls: ['./labor-init-pay-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class LaborInitPayTransactionComponent implements OnInit {
  transactionForm : FormGroup;
 PayID : number=0;
 Type:number=0;
  User:Array<User>;
User_Name: string='';
payments:PaymentScheduleDetails;
  constructor(public dialogRef: MatDialogRef<LaborInitPayTransactionComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService,public snackBar: MatSnackBar) { 
      this.transactionForm = new FormGroup(
        {
          payID:new FormControl(),
          type:new FormControl(),
          workID:new FormControl(),
          assocName:new FormControl(),
          accountNo:new FormControl(),
          paidAmt:new FormControl(),
          paidDate:new FormControl(),
          tranType:new FormControl(),
          tranID:new FormControl(),
          comments: new FormControl(),
          typeID : new FormControl()          
        });

        this.transactionForm= this._formBuilder.group({
          payID:[''],
          type:[''],
          workID:[''],
          assocName:[''],
          accountNo:[''],
          paidAmt:['', Validators.required],
          paidDate:['', Validators.required],
          tranType:['', Validators.required],
          tranID:['', Validators.required],
          comments:['', Validators.required],
          typeID :['']      
          
        });
    }

  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_Name=this.User['User_Login'];
    }  
   this.PayID=this.data['payID'];
   this.Type=this.data['typeID'];
      if(this.Type==1)
   {
    this.transactionForm.controls['type'].setValue("Management Fee");
   }
   else if(this.Type==2)
   {
    this.transactionForm.controls['type'].setValue("Contractor Payment");
   }
    
   this.getOneContractorInitPayDetails(); 

  }
  getOneContractorInitPayDetails()
  {
    
    this.projectService.getOneContractorInitPayDetails(this.PayID).subscribe(result=>{
      this.payments=result;
      this.transactionForm.controls['payID'].setValue(result[0]['InitPay_ID']);
      this.transactionForm.controls['workID'].setValue(result[0]['Work_ID']);
      this.transactionForm.controls['assocName'].setValue(result[0]['Assoc_FirstName'] +" "+result[0]['Assoc_MiddleName']+" "+result[0]['Assoc_LastName']);
      this.transactionForm.controls['accountNo'].setValue(result[0]['Assoc_AccountNo']);
      this.transactionForm.controls['typeID'].setValue(this.Type);

    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  updateInitDetails($values)
  {
   
    this.projectService.updateContractorInitPaymentDetails($values).subscribe(result=>{
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
