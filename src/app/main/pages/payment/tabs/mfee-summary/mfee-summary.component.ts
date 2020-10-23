import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { MatDialogRef, MatDialog, MatPaginator, MatSort, MatSnackBar, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { LaborInitPayTransactionComponent } from '../labour-pay-process/labor-init-pay-transaction/labor-init-pay-transaction.component';
import { MFeePercComponent } from '../labour-pay-process/m-fee-perc/m-fee-perc.component';
import { LaborPayTransactionComponent } from '../labour-pay-process/labor-pay-transaction/labor-pay-transaction.component';
import { InitiatePayments } from 'app/main/pages/project-module-awo/tabs/payment-initiation/initiatePayments';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ReceiptFilterComponent } from 'app/main/pages/receipt/tabs/rec-pay-schedule/receipt-filter/receipt-filter.component';
import { Works } from 'app/main/pages/project-module-bwo/works';
import { SalesCustomers } from 'app/main/pages/sales-module/salesCustomers';
import { DatePipe } from '@angular/common';


@Component({
    selector     : 'mfee-summary',
    templateUrl  : './mfee-summary.component.html',
    styleUrls    : ['./mfee-summary.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    
})
export class MFeeSummaryComponent implements OnInit
{ 
  public show:boolean = false;
  User_Name:string;
  Role_ID:number=0;
  User:Array<User>;
  dialogRef;
  dataSource_List :MatTableDataSource<InitiatePayments>;
  displayedColumns1=['WorkID','CustName','AssocName','Mfee','Status'];
 
  payment : InitiatePayments[];
 
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
      this.getAllMFeeDetails();
      this.getAllCustomers();
         
          
  }
  
 

  applyFilter(filterValue: string) {
              filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource_List.filter = filterValue;
    }

    getAllMFeeDetails()
    {
      this.projectService.getAllMFeeDetails().subscribe(result=>{console.log(result);
      this.payment=result;
      //this.dataSource_List=new MatTableDataSource(result);
     // this.dataSource_List=new MatTableDataSource(result);
          //  this.dataSource_List.paginator=this.paginator;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
    }
    getAllCustomers()
  {
    this.projectService.getAllCustomers().subscribe(result=>{console.log(result);
    this.customers=result;
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>)
  {
    console.log(event.value);
  }
  getAllAssocs()
  {
    this.projectService.getAllAssocs().subscribe(result=>{console.log(result);
      this.assocs=result;
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
  }
 
openFilter()
{
  this.show = !this.show;
}


openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

  
  

