import { Component,OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { InitiatePayRequestComponent } from '../payment-initiation/initiate-pay-request/initiate-pay-request.component';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { InitiatePayments } from '../payment-initiation/initiatePayments';

@Component({
    selector   : 'initiate-payment-pma',
    templateUrl: './initiate-payment-pma.component.html',
    styleUrls  : ['./initiate-payment-pma.component.scss'],
    animations : fuseAnimations
})
export class InitiatePaymentComponent
{viewPRForm : FormGroup;
  dataSource;
  displayedColumns =['ReqAmt', 'ReqDate','Status','Comment','Action'];
  Work_ID : number=0;
  PRCount : number=0;
  dialogRef1;
  dialogRef2; 
payments : InitiatePayments;
  User:Array<User>;
User_Name: string='';
payCountFlag : number=0;


@ViewChild(MatPaginator) paginator: MatPaginator;
        @ViewChild('filter') filter: ElementRef;
        @ViewChild(MatSort) sort: MatSort;
  constructor(public projectService:ProjectModuleService,public snackBar: MatSnackBar,
    private dialog:MatDialog,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService, private activatedRoute: ActivatedRoute) { 
      this.viewPRForm = new FormGroup(
        {
          work : new FormControl(),     
        });

        this.viewPRForm= this._formBuilder.group({
          work : [''],
        });
    }

  ngOnInit() {
    if(this.sessionSt.retrieve('user')!=null){
      this.User=this.sessionSt.retrieve('user')
      this.User_Name=this.User['User_Login'];
    }
    this.activatedRoute.params.subscribe((params: Params) => {
            
      this.Work_ID=params['workid'];
      });

   
        this.getInitiatePayDetails();
    
    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getInitiatePayDetails()
  {
    this.projectService.getInitiatePayDetails(this.Work_ID).subscribe(result=>{
      if(result.length==0)
      {
        this.payCountFlag=0;
      }
      else{
        this.payCountFlag=1;
        this.payments=result;
      }
     // this.dataSource=new MatTableDataSource(result);
     
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  

  
  initiatePay(type)
  {
    
      this.dialogRef1 = this.dialog.open(InitiatePayRequestComponent, {
        panelClass:'initiate-pay-request-dialog',
        data      : {
          
       workId : this.Work_ID,
  typeID : type
        }
    });
  
    this.dialogRef1.afterClosed()
    .subscribe((response: FormGroup) => {
      
   this.getInitiatePayDetails();
         
    });
    }
    editPay(id, type)
    {
      this.dialogRef2 = this.dialog.open(InitiatePayRequestComponent, {
        panelClass:'initiate-pay-request-dialog',
        data      : {
          
       workId : this.Work_ID,
  typeID : type,
  payid : id
        }
    });
  
    this.dialogRef2.afterClosed()
    .subscribe((response: FormGroup) => {
      
      this.getInitiatePayDetails();
         
    });
    }
    

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      } 
   
}
