import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { SalesCustomers } from 'app/main/pages/sales-module/salesCustomers';
import { Associates } from 'app/main/pages/certification/tabs/cert-assoc-list/associates';
import { InitiatePayments } from 'app/main/pages/project-module-awo/tabs/payment-initiation/initiatePayments';

@Component({
   
    selector     : 'all-report',
    templateUrl  : './all-report.component.html',
    styleUrls    : ['./all-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AllReportComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    dataSource_Report=new MatTableDataSource();;
    displayedColumns = ['workID', 'custName','Date','Debit','Credit'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
     @ViewChild(MatSort) sort: MatSort;
     filterForm : FormGroup;
     openTable : number=0;
     customers :SalesCustomers[];
     assocs :Associates[];
     payments :InitiatePayments[];
    Total_Credit: number;
    Total_Debit : number;
    Balance : number;
     
    
    
  
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
       
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute,public snackBar: MatSnackBar


    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
            
        
        }

        
        this.siteAnalysisFormGroup=new FormGroup({
         
        
            });
            this.filterForm = new FormGroup(
                {
                    workID : new FormControl(),
                  custName:new FormControl(),
                assocName:new FormControl(),
                startDate : new FormControl(),
                endDate :new FormControl()
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
        this.getAllAssocs();
        this.getAllCustomers();

    }
    getAllCustomers()
    {
        this.projectService.getAllCustomers().subscribe(result=>{
            this.customers=result;
        },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            }
                  )
    }
    getAllAssocs(){
        this.projectService.getAllAssocs().subscribe(result=>{
            this.assocs=result;
        },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            }
                  )
    }
    generateReport(values)
    {
        this.openTable=1;
        console.log(values);
        this.projectService.generateReport(values).subscribe(result=>{
          //  this.payments=result[0];
            this.dataSource_Report=new MatTableDataSource(result[0]);
            this.dataSource_Report.sort = this.sort;
            
            this.Total_Credit=result['RecSum'];
            this.Total_Debit=result['PaySum'];
            this.Balance=result['Balance'];
            
            
        },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            }
                  )
    }
    
openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
    clearFilter()
    {
        this.openTable=0;
        this.filterForm.controls['workID'].reset();
        this.filterForm.controls['custName'].reset();
        this.filterForm.controls['assocName'].reset();
        this.filterForm.controls['startDate'].reset();
        this.filterForm.controls['endDate'].reset();


    }
}
   