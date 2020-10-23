import { Component,  OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Works } from 'app/main/pages/project-module-bwo/works';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Services } from '@angular/core/src/view';
import { AddProductGroupDialogComponent } from './add-prod-group/add-prod-group.component';
import { ProductSegments } from 'app/main/pages/associates/tabs/mat-assoc-list/productSegments';
import { ProductGroups } from 'app/main/pages/associates/tabs/mat-assoc-list/productGroups';




@Component({
    selector     : 'prod-group-list',
    templateUrl  : './prod-group-list.component.html',
    styleUrls    : ['./prod-group-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProductGroupListComponent implements OnInit
{
    User:Array<User>;
    User_ID:number=0;
    User_Name : string;
    segments : ProductSegments[];
    dialogRef_Serv : MatDialogRef<AddProductGroupDialogComponent>;
    groups : ProductGroups[];
    
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer,
        private projService : ProjectModuleService,
        private dialog : MatDialog

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
         
        }

        
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.getProductSegments();
      this.getProdGroups();

    }
    getProductSegments()
    {
      this.projService.getProductSegments().subscribe(result=>{console.log(result);
        this.segments=result;});
    }
  
  
    getProdGroups()
    {
      this.projService.getProdGroups().subscribe(result=>{console.log(result);
      this.groups=result;});
     
    }
    addService()
    {
        this.dialogRef_Serv = this.dialog.open(AddProductGroupDialogComponent, {
            panelClass:'add-prod-group-dialog',
            data      : {
             
              
            }
        });
      
        this.dialogRef_Serv.afterClosed()
        .subscribe((response: FormGroup) => {
            this.getProductSegments();
            this.getProdGroups();
            if ( !response )
            {
                return;
            }
        });
    }
    


   
  
    
}
