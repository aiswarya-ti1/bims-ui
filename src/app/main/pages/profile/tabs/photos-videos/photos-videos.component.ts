import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Posts } from '../timeline/posts';



@Component({
    selector     : 'profile-photos-videos',
    templateUrl  : './photos-videos.component.html',
    styleUrls    : ['./photos-videos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfilePhotosVideosComponent implements OnInit, OnDestroy
{
    photosVideos: any;
    posts:Posts;
    User_ID:number=0;
    User:Array<User>;

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
        private _formBuilder: FormBuilder
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
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
        this.getPhotosVideos();
        this._profileService.photosVideosOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(photosVideos => {
                this.photosVideos = photosVideos;
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
    getPhotosVideos()
    {
        this._profileService.getPhotosVideos(this.User_ID).subscribe(result=>{console.log(result);
            this.posts=result;
        });
    }
}
