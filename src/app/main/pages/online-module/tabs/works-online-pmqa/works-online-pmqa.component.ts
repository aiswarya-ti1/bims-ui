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

import { ViewCustDetailsComponent } from 'app/main/pages/sales-module/tabs/works-tab-sales/view-cust-details/view-cust-details.component';
import { AddOnlineWorkDialogComponent } from './add-online-work/add-online-work.component';

import { AppSiteAnalysisDetailsDialogComponent } from 'app/main/pages/project-module-bwo-app/tabs/app-site-analysis-details/app-site-analysis-details.component';
import { SiteAnalysisDatesDialogComponent } from 'app/main/pages/project-module-bwo-app/tabs/app-works-site-analysis/site-analysis-date/site-analysis-date.component';
import { AppProjectModuleBWOService } from 'app/main/pages/project-module-bwo-app/project-module-bwo-app.service';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
    selector     : 'works-online-pmqa',
    templateUrl  : './works-online-pmqa.component.html',
    styleUrls    : ['./works-online-pmqa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorksOnlinePMQAComponent implements OnInit
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
    displayedColumns_fullList =  ['WorkID','CustName','WorkDetail','Status','Action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild('filter') filter: ElementRef;
   dialogRef_Cust : MatDialogRef<ViewCustDetailsComponent>;
   dialogRef_Date : MatDialogRef<SiteAnalysisDatesDialogComponent>;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private salesService : SalesModuleService,
        private projService:ProjectModuleService,
        public projAppService:AppProjectModuleBWOService

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
      this.getAllList();

    }

    getAllList()
    {
        this.projAppService.biws_getOnlineWorks().subscribe(result=> {console.log(result);
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
       if($link<=6 || $link==13 || $link==10 || $link==12 || $link ==11 || $link==15)
   {
        this.router.navigate(['/project-bwo-app/'+$Wid]);
    }
    /*else if($link>=7 || $link!=13 || $link!=10|| $link!=12 || $link !=11)
    {
        this.router.navigate(['/project-management/'+$Wid]);
    }*/
  
    }
    scheduleSiteVisit(workID, typeID)
    {
        if(typeID==3 || typeID==4)
        {
            this.dialogRef_Date = this.dialog.open(SiteAnalysisDatesDialogComponent, {
                panelClass:'site-analysis-date-dialog',
                data      : {
                 workid : workID,
                 typeid : typeID
                  
                }
            });
          
            this.dialogRef_Date.afterClosed()
            .subscribe((response: FormGroup) => {
                this.getAllList();
                     
                        if ( !response )
                {
                    
                      }
                  });
        }
       /* this.dialogRef_Date = this.dialog.open(SiteAnalysisDatesDialogComponent, {
            panelClass:'site-analysis-date-dialog',
            data      : {
             workid : workID,
             typeid : typeID
              
            }
        });
      
        this.dialogRef_Date.afterClosed()
        .subscribe((response: FormGroup) => {
            this.getAllList();
                 
                    if ( !response )
            {
                
                  }
              });*/
    }
    
    


}
