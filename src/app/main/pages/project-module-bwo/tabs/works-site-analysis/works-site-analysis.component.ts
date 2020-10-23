import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleBWOComponent } from '../../project-module-bwo.component';
import { Works } from '../../works';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { SiteAnalysisDetailsDialogComponent } from '../site-analysis-details/site-analysis-details.component';
import { ReferencesFormDialogComponent } from '../work-estimation/references/references.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { WorkLostFormDialogComponent } from './work-lost/work-lost.component';
@Component({
    providers:[ProjectModuleBWOComponent ],
    selector     : 'works-site-analysis',
    templateUrl  : './works-site-analysis.component.html',
    styleUrls    : ['./works-site-analysis.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorksSiteAnalysisComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    works :Works;
    newlist=[];
    dialogRef_Site: MatDialogRef<SiteAnalysisDetailsDialogComponent>;
    dialogRef_Ref : MatDialogRef<ReferencesFormDialogComponent>;
    confirmDialogRef : MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef_WorkLost : MatDialogRef<WorkLostFormDialogComponent>;
    Site_Flag : number=0;
    @Output() siteFlagEvent=new EventEmitter<number>();
    Role_ID : number=0;    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    reason : string='';
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private projectBWOService : ProjectModuleBWOComponent,
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute, private bwo1 : ProjectModuleBWOComponent

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
          
        
  this.getOneWork();  
  this.getServiceList(this.Work_ID);
  this.getWorkLostReason();

    }
    getOneWork()
    {
       
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
           this.works=result;
           this.Site_Flag=result[0]['SiteAnalysis_Flag'];
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
    
})
//console.log(this.newlist);

} 

editDetails()
{
    this.dialogRef_Site = this.dialog.open(SiteAnalysisDetailsDialogComponent, {
        panelClass:'site-analysis-details-dialog',
        data      : {
         workid : this.Work_ID
          
        }
    });
  
    this.dialogRef_Site.afterClosed()
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
viewRef()
{
    this.dialogRef_Ref = this.dialog.open(ReferencesFormDialogComponent, {
        panelClass:'references-dialog',
        data      : {
         workid : this.Work_ID,
        
          
        }
    });
  
    this.dialogRef_Ref.afterClosed()
    .subscribe((response: FormGroup) => {
     
       
       
        if ( !response )
        {
            return;
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
              
                this.dialogRef_Ref.afterClosed()
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
    
sendMail()
{
    this.projectService.sendMail(1).subscribe(result=>{console.log(result);
        
    })
}
    
}
