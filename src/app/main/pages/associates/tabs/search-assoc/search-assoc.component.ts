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
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Category } from 'app/main/pages/project-module-bwo/category';

@Component({
   
    selector     : 'search-assoc',
    templateUrl  : './search-assoc.component.html',
    styleUrls    : ['./search-assoc.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SearchAssocComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    dataSource_Report=new MatTableDataSource();;
    displayedColumns = ['workID', 'custName','Date'];
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
    segment:Segments;
    category : Category;
     
    
    
  
   
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
                    ser : new FormControl(),
                    seg:new FormControl(),
                
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
        this.getSegments();
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
        console.log('Services'+values['seg']);
        this.projectService.getAssocByService(values['seg']).subscribe(result=>{console.log(result);
            this.dataSource_Report=new MatTableDataSource(result);})
       
    }
    getSegments()
    {
      this.projectService.getSegments().subscribe(result=>{
        this.segment=result;
        
       });
    }
    onServiceChange($event)
    {
   //debugger;
      this.projectService.getCategory($event).subscribe(result=>{console.log(result);
       this.category=result;
     },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
    }
    
openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
    clearFilter()
    {
        this.openTable=0;
        this.filterForm.controls['seg'].reset();
        this.filterForm.controls['ser'].reset();
       


    }

}
   