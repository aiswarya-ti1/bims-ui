import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { SalesModuleService } from 'app/main/pages/sales-module/sales-module.service';
import { AddWorkDialogComponent } from '../../add-work/add-work.component';
@Component({
    selector     : 'leads-tab-pmqa',
    templateUrl  : './leads-tab-pmqa.component.html',
    styleUrls    : ['./leads-tab-pmqa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LeadsTabPMQAComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    dataSource_myList =new MatTableDataSource();
    dataSource_fullList=new MatTableDataSource();;
    displayedColumns_myList = ['CustName', 'Location', 'Status'];
    displayedColumns_fullList = ['CustName', 'Location', 'Status'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder, private dialog : MatDialog,
        private router:Router,public snackBar: MatSnackBar,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer,
        private salesService : SalesModuleService

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
         
        }

        
        this.tableFormGroup=new FormGroup({
            listOpt : new FormControl(),
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
       
        this.getMyLeads();
        this.getAllLeads();

    }

    getMyLeads()
    {
        this.salesService.getMyLeads(this.User_Name).subscribe(result=> {
            this.dataSource_myList=result;
            this.dataSource_myList.paginator=this.paginator;
            
          },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            });  
    }
    getAllLeads()
    {
        this.salesService.getAllLeads().subscribe(result=> {
             this.dataSource_fullList=new MatTableDataSource(result);
            this.dataSource_fullList.paginator=this.paginator;
          },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            });
    }
    onOptChange($event)
    {
       this.List_Opt=$event;

    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
    this.dataSource_fullList.filter = filterValue;
    
     
  }
  addWork($id)
  {
      console.log($id);
    this.dialogRef = this.dialog.open(AddWorkDialogComponent, {
        panelClass:'add-work-dialog',
        data      : {
         
          leadid : $id
        }
    });
  
    this.dialogRef.afterClosed()
    .subscribe((response: FormGroup) => {
              this.getAllLeads();
        if ( !response )
        {
           
        this.getAllLeads();
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
