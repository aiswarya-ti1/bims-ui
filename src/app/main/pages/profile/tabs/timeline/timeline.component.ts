import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Register2Service } from 'app/main/pages/authentication/register-2/register-2.service';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Posts } from './posts';
import { Activities } from './activities';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ArticleComponent } from '../article/article.component';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
import { Articles } from './articles';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Certifications } from './certifications';











@Component({
    selector     : 'profile-timeline',
    templateUrl  : './timeline.component.html',
    styleUrls    : ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileTimelineComponent implements OnInit, OnDestroy
{
    articles:Articles;
    timeline: any;
    selectedFile:File = null;
    User_ID:number=0;
    User:Array<User>;
    messageForm : FormGroup;
    posts: Posts;
    activities:Activities;
    API_URL="http://bims/";
    $fileTypeFlag;
    certfDiv :boolean=true;
    Category:number=0;
    dialogRef : any;
    hiddenDiv : boolean=false;
    statusDiv : boolean=false;
    certifications:Certifications;
    

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private registerService : Register2Service,
        private profileService: ProfileService,
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer

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
        //alert(this.Category);
        
                if(this.Category==5)
                {
                this.hiddenDiv=true;
                this.statusDiv=false;
                }
                else
                {
                    this.hiddenDiv=false; 
                    this.statusDiv=true;
                }
            
        //this.certfDiv=true;
        //this.articleDiv=true;
        this.getMessageAttach();
        this.getActivityDetails();
        this.getArticleOnTimeline();
        this.messageForm = this._formBuilder.group({
            message           : ['', Validators.required],
          
        });

        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
                this.timeline = timeline;
            });
            
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
    handleFileInput(files: FileList, $value) {
        this.selectedFile = files.item(0);
        console.log(this.selectedFile);
        this.$fileTypeFlag=$value;
        
    }
    uploadFileToActivity(message) {
        console.log(message['message']);
        //alert(this.User_ID);
        //debugger;
        var data=JSON.stringify(message['message']);
         this.profileService.postFile(this.selectedFile, this.User_ID, data,this.$fileTypeFlag).subscribe(data => {
          console.log(data);
         this.getMessageAttach();
          
          // this.openSnackBar('Documents uploaded', "OK");
            
          });
          
           
      }

      getMessageAttach()
      {
         // debugger;
         this.profileService.getPostFiles(this.User_ID).subscribe(result=>{console.log(result); 
        this.posts=result;
           })
      }
      deleteArticle($id)
      {
        this._profileService.deleteArticle($id).subscribe(result=>{console.log(result);
            this.getArticleOnTimeline();
         });
      }
      deletePost($id)
      {
          console.log($id);
          this._profileService.deletePost($id).subscribe(result=>{console.log(result);
           this.getMessageAttach();
        });
      }
      sharePost($id)
      {
          console.log($id);
          this._profileService.sharePost($id, this.User_ID).subscribe(result=>{console.log(result);
            this.getMessageAttach();
            this.getActivityDetails();
         });

      }
      getActivityDetails()
      {
          this._profileService.getActivityDetails(this.User_ID).subscribe(result=>{console.log(result);
            this.activities=result;
        })
      }
      getArticleOnTimeline()
      {
         
this._profileService.getArticleOnTimeline(this.User_ID).subscribe(result=>{console.log(result);
    this.articles=result;
    //alert(this.articles);
})
      }
      createArticle()
      {
       // this.router.navigate(['forum/create-article/'+this.User_ID]);
       this.dialogRef = this._matDialog.open(ArticleComponent, {
        panelClass: 'article-dialog',
        data      : {
           
            user_ID:this.User_ID
        }
    });

    this.dialogRef.afterClosed()
        .subscribe((response: FormGroup) => {
            if ( !response )
            {
this.getArticleOnTimeline();
            }
            this.getArticleOnTimeline();
            
        });

      }

      getEmbedUrl(file)
      {
          return this.sanitizer.bypassSecurityTrustResourceUrl('http://bims/resources/assets/uploads/ProfileAttachments/'+file+'?ecver=2')
      }
      getCertificationDetails()
      {
          this.profileService.getCertificationDetails(this.User_ID).subscribe(result=>{console.log(result);
            this.certifications=result;
        })
      }
      
}
