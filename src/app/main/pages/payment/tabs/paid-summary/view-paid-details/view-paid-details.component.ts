import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { CustomerDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/customerDetails';
import { InitiatePayments } from 'app/main/pages/project-module-awo/tabs/payment-initiation/initiatePayments';


@Component({
  selector: 'view-paid-details',
  templateUrl: './view-paid-details.component.html',
  styleUrls: ['./view-paid-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class ViewPaidDetailsComponent implements OnInit {
  Pay_ID : number;
 payment :InitiatePayments[];
  
  constructor(public dialogRef: MatDialogRef<ViewPaidDetailsComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      
    }

  ngOnInit() {
   this.Pay_ID=this.data['payid'];
   this.getPayDetails(this.Pay_ID);
   

  }
  
  getPayDetails(id)
  {
this.projectService.getPayDetails(id).subscribe(result=>{console.log(result);
  this.payment=result;
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
