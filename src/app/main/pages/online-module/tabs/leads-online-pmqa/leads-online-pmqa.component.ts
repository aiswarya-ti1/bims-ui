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

import { AddOnlineWorkDialogComponent } from '../works-online-pmqa/add-online-work/add-online-work.component';
import { AppProjectModuleBWOService } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.service';
@Component({
    selector     : 'leads-online-pmqa',
    templateUrl  : './leads-online-pmqa.component.html',
    styleUrls    : ['./leads-online-pmqa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LeadsOnlinePMQAComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    Work_ID : number=0;
    
    dataSource_fullList=new MatTableDataSource();;
    displayedColumns_fullList = ['CustName','Work', 'Location', 'Status'];
   
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder, private dialog : MatDialog,
        private router:Router,public snackBar: MatSnackBar,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer,
        private salesService : SalesModuleService,
        private projAppServie:AppProjectModuleBWOService

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
       
        
        this.getAllLeads();

    }

    getAllLeads()
    {
      this.projAppServie.biws_AllLeads().subscribe(result=>{console.log(result);
        this.dataSource_fullList=new MatTableDataSource(result);
      })
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
    this.dialogRef = this.dialog.open(AddOnlineWorkDialogComponent, {
        panelClass:'add-online-work-dialog',
        data      : {
         
          leadid : $id
        }
    });
  
    this.dialogRef.afterClosed()
    .subscribe(response => { console.log(response);
      this.Work_ID=response.data;

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
