import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { MatDialog } from '@angular/material';
import { ArticleComponent } from '../article/article.component';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';

import { Pipe, PipeTransform } from '@angular/core';
import { Articles } from '../timeline/articles';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
    selector   : 'view-article1',
    templateUrl: './view-article1.component.html',
    styleUrls  : ['./view-article1.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ViewArticle1Component
{
    articles:Articles;
    timeline: any;
    selectedFile:File = null;
    User_ID:number=0;
    //User:Array<User>;
    messageForm : FormGroup;
    User:Array<User>;
   
    API_URL="http://bims/";
    $fileTypeFlag;
    certfDiv :boolean=true;
    Category:number=0;
    dialogRef : any;
    articleID:number=0;

    

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
      
        private profileService: ProfileService,
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private _matDialog:MatDialog,
        private activatedRoute: ActivatedRoute

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.Category=this.User['User_Category'];
        }
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        //alert(this.User_ID);
        this.certfDiv=true;
       
       
      
        this.messageForm = this._formBuilder.group({
            message           : ['', Validators.required],
          
        });

        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
                this.timeline = timeline;
            });
            if(this.Category==5)
            {
                this.certfDiv=false;
            }

            this.activatedRoute.params.subscribe((params: Params) => {
    
                //this.cust_ID= params['custid'];
                
               // this.lead_ID = params['leadid'];
                this.articleID=params['id'];
                //alert(this.Work_ID);
               
              });
              this.getArticleOnTimeline(this.articleID);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    
      getArticleOnTimeline(id)
      {
        console.log(this.articleID);
this._profileService.viewArticle(id).subscribe(result=>{console.log(result);
    this.articles=result;
    //alert(this.articles);
})
      }
      
      
}


