import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { ProfileDetails } from './profileDetails';


@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy
{
    about: any;
    dialogRef: any;
    User:Array<User>;
    User_ID: number=0;
    details:ProfileDetails[];
    Category :string='';
    AssocType:string='';
    




    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private _matDialog: MatDialog,  private sessionSt: SessionStorageService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        
            if(this.sessionSt.retrieve('user')!=null)
            {
                this.User=this.sessionSt.retrieve('user')
                this.User_ID=this.User['User_ID'];
                this.Category =this.User['User_Category'];
               // alert(this.Category);
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
        this.getProfileDetails();
        this.getAssocType();
        
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
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
    editDetails($id)
    {
        this.dialogRef = this._matDialog.open(EditDetailsComponent, {
            panelClass: 'app-edit-details-dialog',
            data      : {
                id: $id,
                type:this.AssocType,
                user_ID:this.User_ID
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    this.getProfileDetails();
                }

                
            });
    }

    getProfileDetails()
    {
        
        this._profileService.getProfileDetails(this.User_ID).subscribe(result=>{console.log(result);
            this.details=result;
        })
    }
    getAssocType()
    {
        //alert(this.User_ID);
        this._profileService.getAssocType(this.User_ID).subscribe(result=>{console.log(result);
            this.AssocType=result[0];
            console.log(this.AssocType);
        });
    }
}
