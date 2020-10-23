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
import { AddProductAssociateDialogComponent } from '../../add-prod-associate/add-prod-associate.component';
import { AddNewAssocSegmentDialogComponent } from './new-assoc-segment/new-assoc-segment.component';

@Component({
    selector     : 'mat-assoc-list',
    templateUrl  : './mat-assoc-list.component.html',
    styleUrls    : ['./mat-assoc-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MaterialAssocListComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    dataSource= new MatTableDataSource();
    dialogRef_AddNew : MatDialogRef<AddProductAssociateDialogComponent>;
    dialogRef_Seg : MatDialogRef<AddNewAssocSegmentDialogComponent>;
    displayedColumns = ['Assoc_Name', 'Loc_Name','Status'];
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
       this.getAssociates();
        

    }
    getAssociates()
    {
        this.certfService.getMatAssociates().subscribe(result=>{console.log(result);
            if(!result){return;}
            this.dataSource= new MatTableDataSource(result);
            //this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
        },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            });
    }
    

    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    
     
  }
  addAssociate(type)
  {
      
    this.dialogRef_AddNew = this.dialog.open(AddProductAssociateDialogComponent, {
        panelClass:'add-prod-associate-dialog',
        data      : {
            typeid : type
         
        }
    });
  
    this.dialogRef_AddNew.afterClosed()
    .subscribe((response: FormGroup) => {
        this.getAssociates();
            
        if ( !response )
        {
           
            this.getAssociates();
        return;
        }
    });

  }
 
  

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getProductSegments()
  {
      this.certfService.getProductSegments().subscribe(result=>{console.log(result);
        
    })
  }
  changeSeg(id)
  {
    this.dialogRef_Seg = this.dialog.open(AddNewAssocSegmentDialogComponent, {
        panelClass:'new-assoc-service-dialog',
        data      : {
           associd : id
         
        }
    });
  
    this.dialogRef_AddNew.afterClosed()
    .subscribe((response: FormGroup) => {
        this.getAssociates();
            
        if ( !response )
        {
           
            this.getAssociates();
        return;
        }
    });
  }
}
