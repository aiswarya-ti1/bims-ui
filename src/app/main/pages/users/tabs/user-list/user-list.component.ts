import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { SalesModuleService } from 'app/main/pages/sales-module/sales-module.service';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';
import { CertificationService } from 'app/main/pages/certification/certification.service';
import { AddAssociateDialogComponent } from 'app/main/pages/certification/add-associate/add-associate.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


@Component({
    selector     : 'user-list',
    templateUrl  : './user-list.component.html',
    styleUrls    : ['./user-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UsersListComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    dataSource= new MatTableDataSource();
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
   
    displayedColumns = ['User_Name', 'Login','Status','Action'];
    segList : number;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder, private dialog : MatDialog,
        private router:Router,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer,
        private certfService : CertificationService,public snackBar: MatSnackBar

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
       
        this.getUserList();

    }
    
    
getUserList()
{
    this.certfService.getUsersList().subscribe(result=>{console.log(result);
    this.dataSource=new MatTableDataSource(result);})
}
activate(id, type)
{
    if(type==1)
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
    
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to deactivate this user?';
    
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                if(result==true)
                {
                    this.certfService.changeActiveStatus(id, 1).subscribe(result=>{console.log(result);
                        this.getUserList();})
                }
            }
            this.confirmDialogRef = null;
        });
    }
    else if(type==2)
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
    
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to activate this user?';
    
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                if(result==true)
                {
                    this.certfService.changeActiveStatus(id, 2).subscribe(result=>{console.log(result);
                        this.getUserList();})
                }
            }
            this.confirmDialogRef = null;
        });
    }
    
 
}
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    
     
  }
  
}
