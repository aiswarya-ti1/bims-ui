import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { SalesModuleService } from 'app/main/pages/sales-module/sales-module.service';
import { AddWorkDialogComponent } from '../../add-work/add-work.component';
import { ViewCustDetailsComponent } from 'app/main/pages/sales-module/tabs/works-tab-sales/view-cust-details/view-cust-details.component';
import { ProjectModuleService } from '../../project-module.service';
import { TenderAssocs } from 'app/main/pages/project-module-bwo/tabs/work-tender/tenderAssocs';

@Component({
    selector     : 'works-tab-pmqa',
    templateUrl  : './works-tab-pmqa.component.html',
    styleUrls    : ['./works-tab-pmqa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorksTabPMQAComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    List_Opt : number=0;
    title :string="My Works";
    User:Array<User>;
    messageForm : FormGroup;
    tableFormGroup : FormGroup;
    dialogRef : any;
       dataSource_fullList=new MatTableDataSource();
    displayedColumns_fullList =  ['WorkID','CustName','WorkDetail','Status'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild('filter') filter: ElementRef;
   dialogRef_Cust : MatDialogRef<ViewCustDetailsComponent>;
   assocs :TenderAssocs[];
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private salesService : SalesModuleService,
        private projService :ProjectModuleService

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['ID'];
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
      
        this.getAllList();

    }

    getAllList()
    {
        this.salesService.getAllList().subscribe(result=> {console.log(result);
             this.dataSource_fullList= new MatTableDataSource(result);
            this.dataSource_fullList.paginator=this.paginator;
          });  
    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
    this.dataSource_fullList.filter = filterValue;
    
  }
    
  updateWork($link, $Wid)
  {
   console.log($link);
       if($link<=6 || $link==13 || $link==10 || $link==12 || $link ==11) 
   {
        this.router.navigate(['/project-bwo/'+$Wid]);
    }
    else if($link>=7 || $link!=13 || $link!=10|| $link!=12 || $link !=11)
    {
        this.router.navigate(['/project-management/'+$Wid]);
    }
  
    }
    addWork()
{
    this.dialogRef = this.dialog.open(AddWorkDialogComponent, {
        panelClass:'add-work-dialog',
        data      : {
         leadid : 0,
         typeid :1
          
        }
    });
  
    this.dialogRef.afterClosed()
    .subscribe((response: FormGroup) => {
              this.getAllList();
        if ( !response )
        {
           
        this.getAllList();
        return;
        }
    });
}
viewCustDetails(id)
    {
        this.dialogRef_Cust = this.dialog.open(ViewCustDetailsComponent, {
            panelClass:'view-pay-summary-dialog',
            width: '250px',height :'175px',
            data      : {
           cid : id
          
              
            } 
        });
      
        this.dialogRef_Cust.afterClosed()
        .subscribe((response: FormGroup) => {
            this.getAllList();
         
            if ( !response )
            {
             
                return;
            }
        });
    }
}
