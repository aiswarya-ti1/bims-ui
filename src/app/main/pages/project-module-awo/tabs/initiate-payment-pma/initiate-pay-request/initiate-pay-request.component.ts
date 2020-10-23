import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'initiate-pay-request',
  templateUrl: './initiate-pay-request.component.html',
  styleUrls: ['./initiate-pay-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class InitiatePayRequestComponent implements OnInit {
  transactionForm : FormGroup; 
 Work_ID : number=0;
 typeID : number=0;
  User:Array<User>;
User_Name: string='';
  constructor(public dialogRef: MatDialogRef<InitiatePayRequestComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.transactionForm = new FormGroup(
        {
          typeID : new FormControl(),
          workID:new FormControl(),
          reqAmt:new FormControl(),
          reqDate:new FormControl(),
          payID : new FormControl()   ,
          comment : new FormControl()     
                    
        });

        this.transactionForm= this._formBuilder.group({
          workID:['', Validators.required],
          reqAmt:['', Validators.required],
          reqDate:['', Validators.required],
          typeID :['', Validators.required],
          payID :[''] ,
          comment :['']        
                  
          
        });
    }

  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_Name=this.User['User_Login'];
    }

   
   this.Work_ID=this.data['workId'];
   this.transactionForm.controls['workID'].setValue(this.data['workId']);
   this.transactionForm.controls['typeID'].setValue(this.data['typeID']);
   this.transactionForm.controls['payID'].setValue(this.data['payid']);
   this.getOneInitiatePay(this.data['payid']);
  }
  updateDetails($values)
  {
    console.log($values);
    this.projectService.initiatePayment($values).subscribe(result=>{
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  getOneInitiatePay($id)
  {
    this.projectService.getOneInitiatePay($id).subscribe(result=>{
      this.transactionForm.controls['reqAmt'].setValue(result[0]['ReqAmount']);
   this.transactionForm.controls['reqDate'].setValue(result[0]['ReqDate']);
   this.transactionForm.controls['comment'].setValue(result[0]['Comments']);
   
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  onChange(value)
  {
    console.log(value);
    this.projectService.checkPaymentExists(this.Work_ID).subscribe(result=>{console.log(result);
      if(result["Bal"]>value)
      {
alert('Enter amount less than '+result["Bal"]);
      }
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });

  }
  

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
