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


@Component({
  selector: 'view-cust-details',
  templateUrl: './view-cust-details.component.html',
  styleUrls: ['./view-cust-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class ViewCustDetailsComponent implements OnInit {
  Cust_ID : number;
  customer : CustomerDetails[];
  
  constructor(public dialogRef: MatDialogRef<ViewCustDetailsComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router, 
    public snackBar: MatSnackBar,
  
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      
    }

  ngOnInit() {
   this.Cust_ID=this.data['cid'];
   this.getCustDetails(this.Cust_ID);
   

  }
  
  getCustDetails(id)
  {
this.projectService.getCustomer(id).subscribe(result=>{console.log(result);
  this.customer=result;
},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
  }

 
  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }}
