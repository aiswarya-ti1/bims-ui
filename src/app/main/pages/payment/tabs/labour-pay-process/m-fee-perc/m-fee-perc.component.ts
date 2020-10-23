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
  selector: 'm-fee-perc',
  templateUrl: './m-fee-perc.component.html',
  styleUrls: ['./m-fee-perc.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class MFeePercComponent implements OnInit {
  transactionForm : FormGroup; 
 PayID : number=0; 
  User:Array<User>;
User_Name: string='';
Amount :number=0;
Mfee : number=0;
AssocPay :number=0;
  constructor(public dialogRef: MatDialogRef<MFeePercComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService, public snackBar: MatSnackBar) { 
      this.transactionForm = new FormGroup(
        {
          payID:new FormControl(),
          perc : new FormControl(),
          amount : new FormControl(),
          type : new FormControl()           
        });

        this.transactionForm= this._formBuilder.group({
          payID:['', Validators.required],
          perc :['', Validators.required],
          amount :['', Validators.required],
          type : ['', Validators.required]
        });
    }

  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_Name=this.User['User_Login'];
    }

   this.transactionForm.controls['payID'].setValue(this.data['payID']);
   this.transactionForm.controls['amount'].setValue(this.data['amount']);
   this.Amount=this.data['amount'];
   this.transactionForm.controls['type'].setValue(this.data['type']);
     this.PayID=this.data['payID'];
  }
  
  updateMFee($values)
  {
    this.projectService.updateMFee($values).subscribe(result=>{
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      }
         )
  }
  onChange(value:number)
  {
    console.log("Change "+value);
    this.Mfee=this.Amount*value/100;
    this.AssocPay=this.Amount-this.Mfee;

  }
 

  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    } 

}
