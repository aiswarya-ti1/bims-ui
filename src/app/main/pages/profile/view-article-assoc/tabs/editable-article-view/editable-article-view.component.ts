import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileService } from '../../../profile.service';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { Articles } from '../../../tabs/timeline/articles';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ArticleComponent } from '../../../tabs/article/article.component';
import { FormGroup } from '@angular/forms';





@Component({
    selector     : 'editable-article-view',
    templateUrl  : './editable-article-view.component.html',
    styleUrls    : ['./editable-article-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EditableArticleViewComponent
{
   dialogRef:any;
    User:Array<User>;
    User_ID: number=0;
    Category : number=0;
    articles:Articles;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,private sessionSt: SessionStorageService, private _matDialog:MatDialog
    )
    {
        
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.Category=this.User['User_Category'];
        }
    
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    this.getArticleByAssoc();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        
    }
    getArticleByAssoc()
    {
this._profileService.getArticleByAssoc(this.User_ID).subscribe(result=>{console.log(result);
    this.articles=result;
    
            })
    }
    editArticle(id)
    {
        this.dialogRef = this._matDialog.open(ArticleComponent, {
            panelClass: 'article-dialog',
            data      : {
               
                user_ID:this.User_ID,
                article_ID: id
            }
        });
    
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
   this.getArticleByAssoc();
                
            
    
                 }});
    }

}
