import { Component,  OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SalesModuleService } from '../../sales-module.service';
import {MatPaginator} from '@angular/material/paginator';
import { UpdateLeadDialogComponent } from '../../update-lead/update-lead.component';
import { AddLeadDialogComponent } from '../../add-lead/add-lead.component';

@Component({
    selector     : 'leads-tab-sales',
    templateUrl  : './leads-tab-sales.component.html',
    styleUrls    : ['./leads-tab-sales.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LeadsTabSalesComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    dataSource_fullList=new MatTableDataSource();;
    displayedColumns_fullList = ['CustName', 'Location', 'Status', 'Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer,
        private salesService : SalesModuleService,
        private dialog : MatDialog,  public snackBar: MatSnackBar

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['ID'];
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
       
       
        this.getAllLeads();

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
    addLead()
    {
        this.dialogRef = this.dialog.open(AddLeadDialogComponent, {
            panelClass:'add-lead-dialog',
            data      : {
                assignTo : this.User_Name,
                typeid : 1
              
            }
        });
      
        this.dialogRef.afterClosed()
        .subscribe((response: FormGroup) => {
            this.getAllLeads();
            if ( !response )
            {
                return;
            }
        });
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
    this.dataSource_fullList.filter = filterValue;
    
     
  }
  onClickLead($ID)
  {
console.log($ID);
this.dialogRef = this.dialog.open(UpdateLeadDialogComponent, {
    panelClass:'update-lead-dialog',
    data      : {
        leadid : $ID
      
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
  


  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }   
}
