import { Component, ViewEncapsulation } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { User } from 'app/main/user';
import { ProjectModuleService } from '../project-module/project-module.service';
import { ActivatedRoute, Params } from '@angular/router';
import { SerWorks } from '../sales-module/serWorks';
import { StartWorkComponent } from './start-work/start-work.component';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector     : 'project-module-awo',
    templateUrl  : './project-module-awo.component.html',
    styleUrls    : ['./project-module-awo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectModuleAfterWOComponent
{
    User:Array<User>;
    User_ID: number=0;
    Category : number=0;
    dialogRef_start : MatDialogRef<StartWorkComponent>;
    Work_ID : number=0;
    works :SerWorks ;
    Site_Flag: number=0;
    Est_Flag : number=0;
    InitWO_Flag : number=0;
    Work_Status : number=0;
    work_type : string;
    Role_ID : number=0;
    CustName :string


    /**
     * Constructor
     */
    constructor(private sessionSt: SessionStorageService, private dialog : MatDialog, private _fuseConfigService:FuseConfigService,
        private projectService : ProjectModuleService,  private activatedRoute: ActivatedRoute)
    {
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.Category=this.User['User_Category'];
            this.Role_ID=this.User['Role_ID'];
    }
    this._fuseConfigService.config = {
        layout: {
            navbar   : {
                hidden: false
            },
            toolbar  : {
                hidden: false
            },
            footer   : {
                hidden: true
            },
            sidepanel: {
                hidden: false
            }
        }
    };
}
ngOnInit(): void
    {
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
          
        
  this.getOneWork();  

    }

getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
           this.works=result;
            this.Site_Flag=result[0]['SiteAnalysis_Flag'];
          
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.Work_Status=result[0]['WorkStatus'];
            this.work_type=result[0]['Work_Type'];
            this.CustName=result[0]['Cust_FirstName'] +' '+ result[0]['Cust_LastName'];
                })
    }
    startWork()
    {
        this.dialogRef_start = this.dialog.open(StartWorkComponent, {
            panelClass:'start-work-dialog',
            data      : {
              
           
            workID: this.Work_ID
      
            }
        });
      
        this.dialogRef_start.afterClosed()
        .subscribe((response: FormGroup) => {
         this.getOneWork();
             
        }); 
    }
    


}
