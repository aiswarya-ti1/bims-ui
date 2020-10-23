import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { InitiatePayments } from 'app/main/pages/project-module-awo/tabs/payment-initiation/initiatePayments';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Payments } from 'app/main/pages/project-module-awo/tabs/pay-schedule-awo/payments';
import { ReceivedPayments } from 'app/main/pages/project-module-awo/tabs/work-summary/recievedPayments';
import { PaymentFilterPipe } from 'app/main/pages/payment/tabs/labour-pay-new/payment-filter.pipe';
import { ReceiptTransactionComponent } from './receipt-transaction/receipt-transaction.component';
import { ReceiptFilterComponent } from './receipt-filter/receipt-filter.component';



@Component({
    selector     : 'rec-pay-schedule',
    templateUrl  : './rec-pay-schedule.component.html',
    styleUrls    : ['./rec-pay-schedule.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ReceivedPaySchComponent
{ 
  User_Name:string;
  Role_ID:number=0;
  User:Array<User>;
  dialogRef;
  dataSource_List=new MatTableDataSource();
  displayedColumns1=['WorkID','CustName','AssocName','RecAmt','MFeePerc','MangmtFee','AssocPayable', 'PaidMFee','PaidAssocAmt', 'PaidDate','Status', 'Action'];
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
  payment : ReceivedPayments[];
  fWork_ID :number;
  fCust_ID : number;
  TypeID : number;
  

  //filteredPayments :InitiatePayments[];
  /*private _searchTerm :string;

  get searchTerm() : string
  {
    return this._searchTerm;
  }

  set searchTerm(value :string)
  {
    this._searchTerm=value;
    this.filteredPayments=this.filterPayments(value);
  }

  filterPayments(searchString :string)
  {
    return this.payment.filter(payments=>payments.Assoc_FirstName.toLowerCase().indexOf(searchString.toLowerCase())!== -1);
  }
*/


  @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild('filter') filter: ElementRef;
      @ViewChild(MatSort) sort: MatSort;

  constructor(private projectService:ProjectModuleService, 
    private sessionSt:SessionStorageService, private dialog:MatDialog,
    private snackBar : MatSnackBar)
  {
      
  }
  ngOnInit() 
  {
      if(this.sessionSt.retrieve('user')!=null){
        this.User=this.sessionSt.retrieve('user')
        this.User_Name=this.User['User_Login'];
        this.Role_ID=this.User['Role_ID'];
       
  
      }
      this.getAllReceipts();
          
  }
  getAllReceipts()
  {
    this.projectService.getAllReciepts().subscribe(result=>{console.log(result);
      this.payment=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  getFilteredReceipts(wid, cid, tid)
  {
this.projectService.getFilteredReceipts(wid,cid, tid).subscribe(result=>{console.log(result);
  this.payment=result;
},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
  }
  payTransaction($id)
  {
    if(this.Role_ID!=10)
    {
      
    this.dialogRef = this.dialog.open(ReceiptTransactionComponent, {
      panelClass:'receipt-transaction-dialog',
      data      : {
        payID : $id,
       
      
      }
    });
    
    this.dialogRef.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getAllReceipts();
      if ( !response )
      {
        this.getAllReceipts();
          return;
      }
    });
  }
   
  }
  openFilter()
  {
    this.dialogRef = this.dialog.open(ReceiptFilterComponent, {
      panelClass:'receipt-filter-dialog',
      data      : {
        typeID : '2'
       
      
      }
    });
    
    this.dialogRef.afterClosed()
    .subscribe((response: FormGroup) => {
       if(this.dialogRef.componentInstance.fWorkID=='' && this.dialogRef.componentInstance.fCustID=='')
       {
         this.getAllReceipts();
       }
     
     if(this.dialogRef.componentInstance.fWorkID=='')
     {
      this.fWork_ID= 0;
     }
     else
     {
      this.fWork_ID= this.dialogRef.componentInstance.fWorkID;
      
     }
     if(this.dialogRef.componentInstance.fCustID=='')
     {
      this.fCust_ID= 0;
     }
     else
     {
      this.fCust_ID= this.dialogRef.componentInstance.fCustID;
      
     }
     
     this.TypeID=this.dialogRef.componentInstance.fType;
      //this.getAllReceipts();
      this.getFilteredReceipts(this.fWork_ID,this.fCust_ID, this.TypeID);
      if ( !response )
      {
       // this.getAllReceipts();
          return;
      }
    });
  }
  

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}