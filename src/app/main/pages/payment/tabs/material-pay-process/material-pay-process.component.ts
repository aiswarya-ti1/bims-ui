import { Component, ElementRef, OnInit, ViewChild,OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort,MatSortable,MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { LaborPayTransactionComponent } from '../labour-pay-process/labor-pay-transaction/labor-pay-transaction.component';
import { MaterialPayTransactionComponent } from './material-pay-transaction/material-pay-transaction.component';
import { MFeePercComponent } from '../labour-pay-process/m-fee-perc/m-fee-perc.component';
import { PaymentSupplierDetails } from '../../paymentSupplierDetails';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
@Component({
    selector   : 'material-pay-process',
    templateUrl: './material-pay-process.component.html',
    styleUrls  : ['./material-pay-process.component.scss'],
    animations : fuseAnimations
})
export class MaterialPayProcessComponent
{
    tableForm:FormGroup;
    dataSource;
    displayedColumns=['WorkID','CustName','AssocName','billNo','RecAmt','MFeePer','MangmtFee','AssocPayable','PaidAmt', 'PaidDate', 'Status', 'Action'];
    User_Name:string;
    User:Array<User>;
    payments:PaymentSupplierDetails;
    dialogRef;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private projectService:ProjectModuleService, private sessionSt:SessionStorageService, private dialog:MatDialog)
    {
        
    }
    ngOnInit() 
    {
        if(this.sessionSt.retrieve('user')!=null){
          this.User=this.sessionSt.retrieve('user')
          this.User_Name=this.User['User_Login'];
    
        }
       this.getAllSupplPayDetails();
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
      }
      supplierPay($id, $type)
    {
    this.dialogRef = this.dialog.open(MaterialPayTransactionComponent, {
        panelClass:'material-pay-transaction-dialog',
        data      : {
          payID : $id,
          type : $type
        }
      });
      
      this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
       this.getAllSupplPayDetails();
        if ( !response )
        {
            return;
        }
      });
    }
    getAllSupplPayDetails()
    {
      this.projectService.getAllSupplPayDetails().subscribe(result=>{
        this.dataSource=result;
      })
    }
    mFeePerc($id, $amount, $type)
    {
     
  
    this.dialogRef = this.dialog.open(MFeePercComponent, {
      panelClass:'m-fee-perc-dialog',
      data      : {
        payID : $id,
        amount : $amount,
        type : $type
        
      
      }
    });
    
    this.dialogRef.afterClosed()
    .subscribe((response: FormGroup) => {
    this.getAllSupplPayDetails();
      if ( !response )
      {
          return;
      }
    });
  

    }
    approveSuppPay($id)
    {
      this.projectService.approveSuppPayment($id).subscribe(result=>{
                this.getAllSupplPayDetails();
      })
    }
 
    
}