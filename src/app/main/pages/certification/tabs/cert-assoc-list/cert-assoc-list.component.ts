import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { SalesModuleService } from 'app/main/pages/sales-module/sales-module.service';
import { AddAssociateDialogComponent } from '../../add-associate/add-associate.component';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { CertificationService } from '../../certification.service';
import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';

@Component({
    selector     : 'cert-assoc-list',
    templateUrl  : './cert-assoc-list.component.html',
    styleUrls    : ['./cert-assoc-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CertifiedAssocListComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    dataSource;
    dialogRef_AddNew : MatDialogRef<AddNewServiceAssocComponent>;
   
    displayedColumns = ['Assoc_Name', 'Loc_Name','Status'];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
     @Input('type') Type_ID : number;
   
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
        this.getAssociates(this.Type_ID);
        
       
        

    }
    getAssociates(type)
    {
        this.certfService.getAssociate(type).subscribe(result=>{console.log(result);
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
      
    this.dialogRef_AddNew = this.dialog.open(AddNewServiceAssocComponent, {
        panelClass:'add-new-associate-dialog',
        data      : {
            typeid : type
         
        }
    });
  
    this.dialogRef_AddNew.afterClosed()
    .subscribe((response: FormGroup) => {
        this.getAssociates(this.Type_ID);
            
        if ( !response )
        {
           
            this.getAssociates(this.Type_ID);
        return;
        }
    });

  }
  viewDetails(id)
  {
    this.router.navigate(['/certification/'+id+'/'+this.Type_ID]);
  }
  

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
    
}
