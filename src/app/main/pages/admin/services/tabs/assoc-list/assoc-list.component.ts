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


import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { Associates } from 'app/main/pages/certification/tabs/cert-assoc-list/associates';
import { AddNewAssocServiceDialogComponent } from './new-assoc-service/new-assoc-service.component';
import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';

@Component({
   
    selector     : 'assoc-list',
    templateUrl  : './assoc-list.component.html',
    styleUrls    : ['./assoc-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AssociateListComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    dataSource=new MatTableDataSource();;
    displayedColumns = ['name', 'loc','contact','status'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
     @ViewChild(MatSort) sort: MatSort;
     contactForm : FormGroup;
     openTable : number=0;
     segment : Segments[];
    category : Services[];
    dialogRef_Service : MatDialogRef<AddNewAssocServiceDialogComponent>;
    assocs : Associates[];
    
     
    
    
  
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer, private snackBar : MatSnackBar,
       
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
                  assoc : new FormControl()
                
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
      this.getAssocList();

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
      this.segment=result;},
      error=>{console.log(error);
        
    this.openSnackBar('Server Error. Please try again!!','OK');
    });
  }
  getAssocList()
  {
  this.projectService.getAssocList().subscribe(result=>{console.log(result);
    this.assocs=result;
},
error=>{console.log(error);
  
this.openSnackBar('Server Error. Please try again!!','OK');
})
  }
  searchItems(values)
  {
    console.log(values);
    this.openTable=1;
    this.projectService.getFilteredAssocs(values).subscribe(result=>{console.log(result);
    this.dataSource=result[0];},
    error=>{console.log(error);
      
  this.openSnackBar('Server Error. Please try again!!','OK');
  })
  }
  clearFilter()
  {
    this.openTable=0;
    this.contactForm.controls['segName'].reset();
    this.contactForm.controls['service'].reset();
    this.contactForm.controls['assoc'].reset();
  }
  /*changeService(aid, sid)
  {
    //if(sid==1 || sid==5)
    //{
      this.dialogRef_Service = this.dialog.open(AddNewAssocServiceDialogComponent, {
        panelClass:'new-assoc-service-dialog',
        data      : {
         associd : aid
          
        }
    });
  
    this.dialogRef_Service.afterClosed()
    .subscribe((response: FormGroup) => {
        this.getSegments();
        
        if ( !response )
        {
            return;
        }
    });
   /* }
    else
    {
      this.openSnackBar("Can't Edit- Associate on verification stage!!", "OK");
    }

  }*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
    
}
