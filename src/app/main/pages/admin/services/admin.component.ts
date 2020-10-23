import { Component, ViewEncapsulation } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';

import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
@Component({
    selector     : 'admin',
    templateUrl  : './admin.component.html',
    styleUrls    : ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AdminModuleComponent
{
    User:Array<User>;
    User_ID: number=0;
    User_Name : string;
    

    /**
     * Constructor
     */
    constructor(private sessionSt: SessionStorageService,private dialog:MatDialog,
        private _fuseConfigService:FuseConfigService)
    {
        if(this.sessionSt.retrieve('user')!=null)
        {
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
           
            this.User_Name=this.User['User_Login']
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
