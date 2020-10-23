import { Component,  OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Works } from 'app/main/pages/project-module-bwo/works';
import { Segments } from 'app/main/pages/project-module-bwo/segments';
import { AddSegmentDialogComponent } from './add-seg/add-seg.component';


@Component({
    selector     : 'seg-list',
    templateUrl  : './seg-list.component.html',
    styleUrls    : ['./seg-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SegmentListComponent implements OnInit
{
    User:Array<User>;
    User_ID:number=0;
    User_Name : string;
    segment : Segments[];
    dialogRef_Seg : MatDialogRef<AddSegmentDialogComponent>;
    dataSource_seg=new MatTableDataSource();
    displayedColumns_Seg =  ['SegID','segName'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer,
        private projService : ProjectModuleService,
        private dialog : MatDialog, public snackBar: MatSnackBar

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
      this.getSegments();

    }
    getSegments()
    {
this.projService.getSegments().subscribe(result=>{

    this.segment=result;
    this.dataSource_seg=result;
},
error=>{console.log(error);
  
this.openSnackBar('Server Error. Please try again!!','OK');
}
    );
    }
    addSegment()
    {
        this.dialogRef_Seg = this.dialog.open(AddSegmentDialogComponent, {
            panelClass:'add-segment-dialog',
            data      : {
             
              
            }
        });
      
        this.dialogRef_Seg.afterClosed()
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
