import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';

import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';

import { Params, ActivatedRoute } from '@angular/router';

import { CertificationService } from '../certification/certification.service';
import { AssocDetails } from '../certification/certification-process/AssocDetails';
import { AddAssociateDialogComponent } from '../certification/add-associate/add-associate.component';
@Component({
    selector     : 'users',
    templateUrl  : './users.component.html',
    styleUrls    : ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UsersModuleComponent
{
    User:Array<User>;
    User_ID: number=0;
    Category : number=0;
    Assoc_ID : number;
    Status_ID : number;
    details:AssocDetails[];
    

    /**
     * Constructor
     */
    constructor(
        private sessionSt: SessionStorageService, private dialog : MatDialog, private _fuseConfigService : FuseConfigService,
        private certService : CertificationService,  private activatedRoute: ActivatedRoute)
    {
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.Category=this.User['User_Category'];
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
       

          

    }
   
   
}
/*addWork()
{
    this.dialogRef = this.dialog.open(AddAssociateDialogComponent, {
        panelClass:'add-associate-dialog',
        data      : {
         
          
        }
    });
  
    this.dialogRef.afterClosed()
    .subscribe((response: FormGroup) => {
        if ( !response )
        {
            return;
        }
    });
}*/

