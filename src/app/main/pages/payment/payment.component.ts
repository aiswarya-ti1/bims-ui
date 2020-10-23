import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ProjectModuleService } from '../project-module/project-module.service';
import { ActivatedRoute } from '@angular/router';
import { Works } from '../project-module-bwo/works';
import { FuseConfigService } from '@fuse/services/config.service';
@Component({
    selector     : 'payment',
    templateUrl  : './payment.component.html',
    styleUrls    : ['./payment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PaymentComponent
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
       
}
