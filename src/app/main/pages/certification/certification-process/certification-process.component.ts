import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';

import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';

import { AssocDetails } from './AssocDetails';
import { CertificationService } from '../certification.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    selector     : 'certification-process',
    templateUrl  : './certification-process.component.html',
    styleUrls    : ['./certification-process.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CertificationProcessComponent
{  
    
    User:Array<User>;
    User_ID: number=0;
    Assoc_ID : number=0;
    details:AssocDetails[];
   


    /**
     * Constructor
     */
    constructor(private sessionSt: SessionStorageService, private dialog : MatDialog, private _fuseConfigService : FuseConfigService)
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
        
    }
}
}

