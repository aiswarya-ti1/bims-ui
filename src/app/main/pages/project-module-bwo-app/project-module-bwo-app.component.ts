import { Component, ViewEncapsulation} from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { User } from 'app/main/user';
import { ProjectModuleService } from '../project-module/project-module.service';
import { ActivatedRoute, Params } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { Works } from '../project-module-bwo/works';
import { AppProjectModuleBWOService } from './project-module-bwo-app.service';

@Component({
    selector     : 'project-module-bwo-app',
    templateUrl  : './project-module-bwo-app.component.html',
    styleUrls    : ['./project-module-bwo-app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectModuleBWOAppComponent
{  
    
    User:Array<User>;
    User_ID: number=0;
    Category : number=0;
    dialogRef;
    Work_ID : number=0;
    works :Works ;
    Site_Flag: number=0;
    Est_Flag : number=0;
    InitWO_Flag : number=0;
    Role_ID : number=0;
    CustName : string;


    /**
     * Constructor
     */
    constructor(private sessionSt: SessionStorageService, private dialog : MatDialog, private _fuseConfigService : FuseConfigService,
        private projectService : ProjectModuleService,  private activatedRoute: ActivatedRoute, public projAppService:AppProjectModuleBWOService)
    {
        
        
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
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.Category=this.User['User_Category'];
            this.Role_ID=this.User['Role_ID'];
    }
}
ngOnInit(): void
    {
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
  this.getOneWork(this.Work_ID);  

    }

getOneWork($id)
    {
        this.projAppService.biws_getOneWork($id).subscribe(result=>{
          this.works=result;          
            this.Site_Flag=result[0]['SiteAnalysis_Flag'];
            this.Est_Flag=result[0]['Est_Flag'];
            this.InitWO_Flag=result[0]['InitWO_Flag'];
            this.CustName=result[0]['Cust_FirstName'] +' '+ result[0]['Cust_LastName'];
            return result;
                })
    }
    setSiteFlag($event)
    {
        this.Site_Flag=$event;
    }
    setInitFlag($event)
    {
        this.InitWO_Flag=$event;
    }


}
