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
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { AddItemsDialogComponent } from './add-item/add-item.component';

@Component({
   
    selector     : 'line-items-list',
    templateUrl  : './line-items-list.component.html',
    styleUrls    : ['./line-items-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LineItemsListComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    dataSource=new MatTableDataSource();;
    displayedColumns = ['name', 'seg','service'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
     @ViewChild(MatSort) sort: MatSort;
     contactForm : FormGroup;
     openTable : number=0;
     category : Services[];
     segment : Segments[];
     dialogRef : MatDialogRef<AddItemsDialogComponent>;
    
    
     
    
    
  
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,public snackBar: MatSnackBar,
       
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
            
        
        }

        
        this.siteAnalysisFormGroup=new FormGroup({
         
        
            });
            this.contactForm = new FormGroup(
                {
                    segName : new FormControl(),
                  service:new FormControl(),
                
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
   
    onServiceChange($event) {
        console.log($event);
        this.projectService.getCategory($event.value).subscribe(result=>{console.log(result);
          this.category=result;
        },
        error=>{console.log(error);
          
      this.openSnackBar('Server Error. Please try again!!','OK');
      });
      
      }
    getSegments()
    {
      this.projectService.getSegments().subscribe(result=>{console.log(result);
        this.segment=result;});
    }
    searchItems(values)
    {
        console.log(values['service']);
        this.openTable=1;
        this.projectService.getItemsByServ(values['service']).subscribe(result=>{console.log(result);
            this.dataSource=result;
        },
        error=>{console.log(error);
          
      this.openSnackBar('Server Error. Please try again!!','OK');
      })
    }
    clearFilter()
    {
        this.openTable=0;
        this.contactForm.controls['segName'].reset();
        this.contactForm.controls['service'].reset();
       


    }
    addNewItem()
    {
        this.dialogRef = this.dialog.open(AddItemsDialogComponent, {
            panelClass:'add-item-dialog',
            data      : {
             
              
            }
        });
      
        this.dialogRef.afterClosed()
        .subscribe((response: FormGroup) => {
            this.getSegments();
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
