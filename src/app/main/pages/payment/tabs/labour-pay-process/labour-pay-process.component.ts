import { Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar} from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { MatDialog } from '@angular/material';
import { LaborPayTransactionComponent } from './labor-pay-transaction/labor-pay-transaction.component';
import { FormGroup } from '@angular/forms';
import { MFeePercComponent } from './m-fee-perc/m-fee-perc.component';
import { LaborInitPayTransactionComponent } from './labor-init-pay-transaction/labor-init-pay-transaction.component';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
    selector   : 'labour-pay-process',
    templateUrl: './labour-pay-process.component.html',
    styleUrls  : ['./labour-pay-process.component.scss'],
    animations : fuseAnimations
})
export class LaborPayProcessComponent
{
    User_Name:string;
    Role_ID:number=0;
    User:Array<User>;
    dialogRef;
    dataSource1;
    displayedColumns1=['WorkID','CustName','AssocName','RecAmt','MFeePerc','MangmtFee','AssocPayable', 'PaidMFee','PaidAssocAmt', 'PaidDate','Status', 'Action'];
    

    @ViewChild(MatPaginator) paginator: MatPaginator;
        @ViewChild('filter') filter: ElementRef;
        @ViewChild(MatSort) sort: MatSort;

    constructor(private projectService:ProjectModuleService, 
      private sessionSt:SessionStorageService, private dialog:MatDialog, public snackBar: MatSnackBar)
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
    
        if ( !response )
        {
            return;
        }
      });
    }

    applyFilter(filterValue: string) {
                filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource1.filter = filterValue;
      }

      getAllInitiatePayDetails()
  {
    this.projectService.getAllInitiatePayDetails().subscribe(result=>{
            this.dataSource1=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      }
              
      )
   
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
  }
          
  )
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
