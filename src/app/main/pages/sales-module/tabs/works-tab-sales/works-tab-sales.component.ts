import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SalesModuleService } from '../../sales-module.service';
import {MatPaginator} from '@angular/material/paginator';
import { ViewCustDetailsComponent } from './view-cust-details/view-cust-details.component';

@Component({
    selector     : 'works-tab-sales',
    templateUrl  : './works-tab-sales.component.html',
    styleUrls    : ['./works-tab-sales.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorksTabSalesComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
   
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    dataSource_fullList=new MatTableDataSource();;
    displayedColumns_fullList =  ['WorkID','CustName','WorkDetail','Status'];
    dialogRef_Cust :  MatDialogRef<ViewCustDetailsComponent>;
   
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private salesService : SalesModuleService, public snackBar: MatSnackBar


    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
                 }

        
        this.tableFormGroup=new FormGroup({
            search : new FormControl()
        
            });
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        
        this.getAllList();

    }
     applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
    this.dataSource_fullList.filter = filterValue;
    

     
  }

    getAllList()
    {
        this.salesService.getAllList().subscribe(result=> {
            this.dataSource_fullList=new MatTableDataSource(result);
            this.dataSource_fullList.paginator=this.paginator;
          },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            });  
    }
    viewCustDetails(id)
    {
        this.dialogRef_Cust = this.dialog.open(ViewCustDetailsComponent, {
            panelClass:'view-pay-summary-dialog',
            width: '250px',height :'175px',
            data      : {
           cid : id
          
              
            } 
        });
      
        this.dialogRef_Cust.afterClosed()
        .subscribe((response: FormGroup) => {
            this.getAllList();
         
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
    

   
  

