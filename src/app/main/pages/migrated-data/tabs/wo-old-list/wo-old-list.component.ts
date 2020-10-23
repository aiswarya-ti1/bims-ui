import { Component,  OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Works } from 'app/main/pages/project-module-bwo/works';


@Component({
    selector     : 'wo-old-list',
    templateUrl  : './wo-old-list.component.html',
    styleUrls    : ['./wo-old-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OldWorkOrderListComponent implements OnInit
{
    User:Array<User>;
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
    works:Works[];
    dataSource_fullList=new MatTableDataSource();
    displayedColumns_fullList =  ['WorkID','CustName','WorkDetail','Status'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer,
        private projService : ProjectModuleService,
        private dialog : MatDialog,
        public snackBar: MatSnackBar

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
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
       this.getAllMigrateWorks();

    }
    addOldWO()
    {
        this.router.navigate(['/wo-old/'+'0']);
    }
    getAllMigrateWorks()
    {
        this.projService.getAllMigrateData().subscribe(result=>{console.log(result);
            this.works=result;
            this.dataSource_fullList=new MatTableDataSource(result);
        },  error=>{console.log(error);
    
            this.openSnackBar('Server Error. Please try again!!','OK');
            })
    }
    updateWork($id, $status, $reType)
    {
        if($status==8)
        {
            this.router.navigate(['print-work-order-6/'+$id+'/'+$reType]);
        }
        else{
            this.router.navigate(['/wo-old/'+$id]);
        }
        
    }


    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }

   
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
    this.dataSource_fullList.filter = filterValue;
    
  }
    
    
}
