import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';

import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
AppSiteAnalysisDetailsDialogComponent

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ProjectModuleBWOAppComponent } from '../../project-module-bwo-app.component';
import { Works } from 'app/main/pages/project-module-bwo/works';
import { AppSiteAnalysisDetailsDialogComponent } from '../app-site-analysis-details/app-site-analysis-details.component';
import { WorkLostFormDialogComponent } from 'app/main/pages/project-module-bwo/tabs/works-site-analysis/work-lost/work-lost.component';
import { SiteAnalysisDatesDialogComponent } from './site-analysis-date/site-analysis-date.component';
import { AppProjectModuleBWOService } from '../../project-module-bwo-app.service';
@Component({
    providers:[ProjectModuleBWOAppComponent ],
    selector     : 'app-works-site-analysis',
    templateUrl  : './app-works-site-analysis.component.html',
    styleUrls    : ['./app-works-site-analysis.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AppWorksSiteAnalysisComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    works :Works;
    newlist=[];
    dialogRef_Site: MatDialogRef<AppSiteAnalysisDetailsDialogComponent>;
    dialogRef_Date: MatDialogRef<SiteAnalysisDatesDialogComponent>;
    confirmDialogRef : MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef_WorkLost : MatDialogRef<WorkLostFormDialogComponent>;
    Site_Flag : number=0;
    @Output() siteFlagEvent=new EventEmitter<number>();
    Role_ID : number=0;    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    reason : string='';
    Work_Status : number;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private projectBWOService : ProjectModuleBWOAppComponent,
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute, public projAppService:AppProjectModuleBWOService

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
            this.Role_ID=this.User['Role_ID'];
        
        }

        
        this.siteAnalysisFormGroup=new FormGroup({
         
        
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
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
          
          this.getServiceList(this.Work_ID);      
  this.getOneWork();  
 
  this.getWorkLostReason();

    }
    getOneWork()
    {
       
        this.projAppService.biws_getOneWork(this.Work_ID).subscribe(result=>{
           this.works=result;
           this.Site_Flag=result[0]['SiteAnalysis_Flag'];
           this.Work_Status=result[0]['WorkStatus'];
           this.siteFlagEvent.emit(this.Site_Flag);
           
                })
    }
    getServiceList($id)
{
  
  this.projectService.getServiceList($id).subscribe(result=>{
   for(var i=0;i<result.length;i++)
  {
    this.newlist.push(result[i]["service_name"]);
  }
  console.log('Services'+this.newlist);  
})


} 

editDetails()
{
    this.dialogRef_Site = this.dialog.open(AppSiteAnalysisDetailsDialogComponent, {
        panelClass:'app-site-analysis-details-dialog',
        data      : {
         workid : this.Work_ID
          
        }
    });
  
    this.dialogRef_Site.afterClosed()
    .subscribe((response: FormGroup) => {
        this.Site_Flag=1;
              this.getOneWork();
        this.getServiceList(this.Work_ID);
                if ( !response )
        {
            this.getOneWork();
            this.getServiceList(this.Work_ID);
              }
          });
}

workLost()
{
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure the work is lost ?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
            if(result==true)
            {
                this.dialogRef_WorkLost = this.dialog.open(WorkLostFormDialogComponent, {
                    panelClass:'work-lost-dialog',
                    data      : {
                     workid : this.Work_ID,
                    
                      
                    }
                });
              
                this.dialogRef_WorkLost.afterClosed()
                .subscribe((response: FormGroup) => {
                 
                   
                   
                    if ( !response )
                    {
                        return;
                    }
                });
               
            }
        }
        this.confirmDialogRef = null;
    });
} 
getWorkLostReason()
{
    this.projectService.getWorkLostReason(this.Work_ID).subscribe(result=>{console.log(result);
        this.reason=result;
    })
} 
siteVisit(type)
{
    this.dialogRef_Date = this.dialog.open(SiteAnalysisDatesDialogComponent, {
        panelClass:'site-analysis-date-dialog',
        data      : {
         workid : this.Work_ID,
         typeid : type
          
        }
    });
  
    this.dialogRef_Date.afterClosed()
    .subscribe((response: FormGroup) => {
              this.getOneWork();
        this.getServiceList(this.Work_ID);
                if ( !response )
        {
            this.getOneWork();
            this.getServiceList(this.Work_ID);
              }
          });
} 
sendMail(type)
{
    this.projectService.sendMail(type).subscribe(result=>{console.log(result);
    })
}  

    
}
