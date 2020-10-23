import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { MatDialogRef, MatDialog, MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { LaborInitPayTransactionComponent } from '../labour-pay-process/labor-init-pay-transaction/labor-init-pay-transaction.component';
import { MFeePercComponent } from '../labour-pay-process/m-fee-perc/m-fee-perc.component';
import { LaborPayTransactionComponent } from '../labour-pay-process/labor-pay-transaction/labor-pay-transaction.component';
import { InitiatePayments } from 'app/main/pages/project-module-awo/tabs/payment-initiation/initiatePayments';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ReceiptFilterComponent } from 'app/main/pages/receipt/tabs/rec-pay-schedule/receipt-filter/receipt-filter.component';
import { Works } from 'app/main/pages/project-module-bwo/works';
import { SalesCustomers } from 'app/main/pages/sales-module/salesCustomers';


@Component({
    selector     : 'labour-pay-new',
    templateUrl  : './labour-pay-new.component.html',
    styleUrls    : ['./labour-pay-new.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LaborPayNewComponent implements OnInit
{ 
  public show:boolean = false;
  User_Name:string;
  Role_ID:number=0;
  User:Array<User>;
  dialogRef;
  dataSource_List :MatTableDataSource<InitiatePayments>;
  displayedColumns1=['WorkID','CustName','AssocName','RecAmt','MFeePerc','MangmtFee','AssocPayable', 'PaidMFee','PaidAssocAmt', 'PaidDate','Status', 'Action'];
  displayedColumns2 :['ID','Pay'];
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
  payment : InitiatePayments[];
 
   fWork_ID: number= 0;
   fCust_ID: number=0;
   fAssoc_ID : number=0;
   Type_ID : number=0;
   fInit:number;
  fAuth : number;
  fApprove : number;
  fMfee : number;
  fAFee : number;
  fArr : any =[];
  WorkID:Works[];
  assocs:[];
  customers :SalesCustomers[];

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
           this.getAllInitiatePayDetails();
           this.getAllWorkID();
           this.getAllCustomers();
           this.getAllAssocs();
          
  }
  
  assocPay($id, $type)
  {
  this.dialogRef = this.dialog.open(LaborPayTransactionComponent, {
      panelClass:'labor-pay-transaction-dialog',
      data      : {
        payID : $id,
        type : $type
      }
    });
    
    this.dialogRef.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getAllInitiatePayDetails();
  
      if ( !response )
      {
          return;
      }
    });
  }

  applyFilter(filterValue: string) {
              filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource_List.filter = filterValue;
    }

    getAllInitiatePayDetails()
{
    this.projectService.getAllInitiatePayDetails().subscribe(result=>{ console.log(result);
          this.payment=result;
          //this.dataSource_List=result;
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
 
}
mFeePerc($id, $amt, $type)
{
  this.dialogRef = this.dialog.open(MFeePercComponent, {
    panelClass:'m-fee-perc-dialog',
    data      : {
      payID : $id,
      amount: $amt,
      type : $type
    
    }
  });
  
  this.dialogRef.afterClosed()
  .subscribe((response: FormGroup) => {
    this.getAllInitiatePayDetails();
    if ( !response )
    {
      this.getAllInitiatePayDetails();
        return;
    }
  });
}
approvePay($id)
{
this.projectService.approvePay($id).subscribe(result=>{
  this.getAllInitiatePayDetails();
},  error=>{console.log(error);
    
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
}

payTransaction($id, $type)
{
  this.dialogRef = this.dialog.open(LaborInitPayTransactionComponent, {
    panelClass:'labor-init-pay-transaction-dialog',
    data      : {
      payID : $id,
      typeID: $type
    
    }
  });
  
  this.dialogRef.afterClosed()
  .subscribe((response: FormGroup) => {
  this.getAllInitiatePayDetails();
    if ( !response )
    {
       this.getAllInitiatePayDetails();
        return;
    }
  });

}
addPaymentDetails(status, payID, amt, type)
{
  if(this.Role_ID!=10)
  {

  if(status==1)
  {
    this.mFeePerc(payID, amt, type);
  }
  else if(status==4)
  {
    if(this.Role_ID==1)
    {
      this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });
  
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to Approve Payment?';
  
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        if ( result ==true)
        {
          this.approvePay(payID);
        } 
      }
       
        this.confirmDialogRef = null;
    });

  }
  else
  {
  
      this.openSnackBar('Payment Not Approved!!','OK');
              
  }
}
  }
 
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
openFilter()
{
  
  /*this.dialogRef = this.dialog.open(ReceiptFilterComponent, {
    panelClass:'receipt-filter-dialog',
    data      : {
      typeID : '1'
     
    
    }
  });
  
  this.dialogRef.afterClosed()
  
  .subscribe((response: FormGroup) => {
     if(this.dialogRef.componentInstance.fWorkID=='' && this.dialogRef.componentInstance.fCustID=='' && this.dialogRef.componentInstance.fAssocID=='' 
     )
     {
       this.getAllInitiatePayDetails();
     }
   
   if(this.dialogRef.componentInstance.fWorkID=='')
   {
    this.fWork_ID= 0;
   }
   else
   {
    this.fWork_ID= this.dialogRef.componentInstance.fWorkID;
    this.fArr.push({'WorkID':this.fWork_ID});
    
   }
   if(this.dialogRef.componentInstance.fCustID=='')
   {
    this.fCust_ID= 0;
   }
   else
   {
    this.fCust_ID= this.dialogRef.componentInstance.fCustID;
    this.fArr.push({'CID':this.fCust_ID});
    
   }
   if(this.dialogRef.componentInstance.fAssocID=='' )
   {
     this.fAssoc_ID=0;
   }
   else
   {
     this.fAssoc_ID=this.dialogRef.componentInstance.fAssocID;
     this.fArr.push({'AID':this.fAssoc_ID});
   }
   if(this.dialogRef.componentInstance.fInit)
   {
     this.fInit=1;
     this.fArr.push({'Init':1});

   }else{
     this.fInit=0;
   }
   if(this.dialogRef.componentInstance.fAuth)
   {
     this.fAuth=1;
     this.fArr.push({'Auth':4});
   }
   else{
     this.fAuth=0;

   }
   if(this.dialogRef.componentInstance.fApprove)
   {
     this.fApprove=1;
     this.fArr.push({'App':2}); 
   }
   else{
     this.fApprove=0;
   }
   if(this.dialogRef.componentInstance.fMFee)
   {
     this.fMfee=1;
     this.fArr.push({'Mfee':3});
   }
   else
   {
     this.fMfee=0;
   }
   if(this.dialogRef.componentInstance.fAFee)
   {
this.fAFee=1;
this.fArr.push({'Afee':3});

   }
   else{
     this.fAFee=0;
   }
   this.Type_ID=this.dialogRef.componentInstance.fType;
   console.log('Array is '+this.fArr);
    //this.getAllReceipts();
    this.getFilteredPayments(this.fWork_ID,this.fCust_ID, this.Type_ID, this.fAssoc_ID, this.fInit, this.fAuth, this.fApprove,this.fMfee, this.fAFee);
    if ( !response )
    {
     // this.getAllReceipts();
        return;
    }
  });*/

  //for show/hide div
  this.show = !this.show;


}
getFilteredPayments(wid,cid,tid,aid, finit, fauth,fapprove, fmfee, fafee)
{
  this.projectService.getFilteredPayments(wid,cid,tid,aid,finit, fauth,fapprove, fmfee, fafee).subscribe(result=>{console.log(result);
  this.payment=result;},  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
}
 
getAllWorkID()
  {
    this.projectService.getAllWorkID().subscribe(result=>{console.log(result);
      this.WorkID=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
 /* private _filterWorkID(ID: number): Works[] {
   

    return ID.filter( Works=>{return Works.Work_ID.startsWith(ID)==true});
    
  }*/
  getAllCustomers()
  {
    this.projectService.getAllCustomers().subscribe(result=>{console.log(result);
    this.customers=result;
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
  }
  getAllAssocs()
  {
    this.projectService.getAllAssocs().subscribe(result=>{console.log(result);
      this.assocs=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
  

}

  
  

