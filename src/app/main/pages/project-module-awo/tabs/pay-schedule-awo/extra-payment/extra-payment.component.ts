import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Validators, Form} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { RecPayDates } from '../recPayDate';


@Component({
  selector: 'extra-payment',
  templateUrl: './extra-payment.component.html',
  styleUrls: ['./extra-payment.component.scss'],
  animations : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ExtraPaymentDialog implements OnInit {

  startWorkForm : FormGroup;
  workID : number=0;
  Type_ID : number=0;
  RecAmounts :RecPayDates[];
  balFlag : number=0;
  balAmount : number=0;
  

  constructor(public dialogRef: MatDialogRef<ExtraPaymentDialog>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    public snackBar : MatSnackBar,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) 
    { 

      this.startWorkForm=new FormGroup({
        recAmt : new FormControl(),
           work_ID : new FormControl(),
           pay_ID : new FormControl(),
           payDate : new FormControl(),
           type : new FormControl(),
           type_ID : new FormControl(),
           Comment : new FormControl(),
           recipts : new FormControl()
                
      });
      this.startWorkForm = this._formBuilder.group({
        
        recAmt : ['', Validators.required],
        work_ID :[''],
        pay_ID : [''],
        payDate : ['', Validators.required],
        type :['', Validators.required],
        type_ID : [''],
        Comment :[''],
        recipts :['']

      });
      
    }

  ngOnInit() {  

   // this.workID=this.data['workID'] ;
    //this.startWorkForm.controls['work_ID'].setValue(this.data['workID']);
    this.startWorkForm.controls['pay_ID'].setValue(this.data['payid']);
    this.startWorkForm.controls['type_ID'].setValue(this.data['typeid']);
    this.startWorkForm.controls['work_ID'].setValue(this.data['workid']);
    this.Type_ID=this.data['typeid'];
    this.workID=this.data['workid'];
    this.getAllReceipts();
    
  }
  getAllReceipts()
  {
    this.projectService.getRecAmountByDate(this.workID).subscribe(result=>{console.log(result);
      this.RecAmounts=result;
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
  }
  saveExtraPayment($values)
  {
   
    this.projectService.saveExtraPayment($values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Receipt added successfully!!', 'OK');
      }
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
  }
  onChange(value)
  {
   
    
    this.getBalanceReceipt(value);
    this.getReciptDetails(value);

  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getBalanceReceipt(id)
  {
    this.projectService.getBalReceipt(id).subscribe(result=>{console.log(result);
      this.balAmount=result;
    })
  }
  getReciptDetails(id)
  {
    this.projectService.getReciptDetails(id).subscribe(result=>{console.log(result);
      this.startWorkForm.controls['type'].setValue(result[0]['Type']);
      this.startWorkForm.controls['payDate'].setValue(result[0]['Rec_Date']);
      
    })
  }
  

}
