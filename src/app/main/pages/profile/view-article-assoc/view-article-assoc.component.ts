import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { ProfileService } from '../profile.service';
import { Articles } from '../tabs/timeline/articles';




@Component({
    selector     : 'view-article-assoc',
    templateUrl  : './view-article-assoc.component.html',
    styleUrls    : ['./view-article-assoc.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ViewArticleAssocComponent
{
    User:Array<User>;
    User_ID: number=0;
    Category : number=0;
    articles:Articles;


    /**
     * Constructor
     */
    constructor(private sessionSt: SessionStorageService, private profileService:ProfileService)
    {
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.Category=this.User['User_Category'];
            //alert(this.User_ID);
            }
    }
    
    
}
