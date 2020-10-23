import { Component, OnInit, ViewEncapsulation, ViewChild, NgZone, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog,MatDialogRef, MatSnackBar, MatSort } from '@angular/material';

import {MatPaginator} from '@angular/material/paginator';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { InitiatePayRequestComponent } from './initiate-pay-request/initiate-pay-request.component';
import { InitiatePayments } from './initiatePayments';


@Component({
    selector     : 'payment-initiation',
    templateUrl  : './payment-initiation.component.html',
    styleUrls    : ['./payment-initiation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PaymentInitiationComponent implements OnInit
{
    
    viewPRForm : FormGroup;
  dataSource;
  displayedColumns =['ReqAmt', 'ReqDate','Status','Comment','Action'];
  Work_ID : number=0;
  PRCount : number=0;
  dialogRef1;
  dialogRef2; 
payments : InitiatePayments;
  User:Array<User>;
User_Name: string='';
InitAmount : number;
PaidAmount : number;
BalAmount : number;

@ViewChild(MatPaginator) paginator: MatPaginator;
        @ViewChild('filter') filter: ElementRef;
        @ViewChild(MatSort) sort: MatSort;
  constructor(public projectService:ProjectModuleService,
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
        this.getPayAmounts();
    
    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getInitiatePayDetails()
  {
    this.projectService.getInitiatePayDetails(this.Work_ID).subscribe(result=>{
     
     this.payments=result;
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
   this.getPayAmounts();
         
    });
    }
    editPay(id, type, status)
    {
        
        if(status==1)
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
        else
        {
            return;
        }
      
    }
    getPayAmounts()
    {
      
      this.projectService.getPayAmounts(this.Work_ID).subscribe(result=>{
        this.InitAmount=result['Init'];
        this.PaidAmount =result['Paid'];
        this.BalAmount=result['Balance'];
      })
    }
    
   
}
