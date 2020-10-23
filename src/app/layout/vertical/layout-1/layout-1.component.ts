import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';
import { User } from 'app/main/user';
import { menuPrivillage } from 'app/layout/components/navbar/menuPrivillage';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';



@Component({
    selector     : 'vertical-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;
   
    fusePerfectScrollbarUpdateTimeout;
    User_Name: string;
    User_ID: number;
    Role_ID: number;
    User: Array<User>;
    nav: any;
    permission: number = 0;
    perm:Array<menuPrivillage>;
    Priv_ID:number=0;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService, private navigationService: FuseNavigationService,
        private router: Router,
        private sessionSt: SessionStorageService,
    )
    {

        if(this.sessionSt.retrieve('user')!=null)
        {
            this.User=this.sessionSt.retrieve('user');
            this.User_ID=this.User['User_ID'];
        }
         if (this.sessionSt.retrieve('menuPerm') != null) {
            //alert('layout')
             this.perm = this.sessionSt.retrieve('menuPerm')
             this.Priv_ID = this.perm['Priv_ID'];
            
             //this.navigation =this.getNavigationDetails();
             //console.log(this.navigation);
              
             
         }
         else {
             //this.router.url === 'auth/login';   
             this.router.navigate(['auth/login']);
         }
         

        // Set the defaults
        

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
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
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

    getNavigationDetails() {
        // alert( this.sessionSt.retrieve('menuPerm'));
         var dash = Array();
         var navig = Array();
         var perm = [];
         
         perm = this.sessionSt.retrieve('menuPerm');
         perm.forEach(element => {
             var dash = Array();
 
             var childCount = 0;
 
             childCount = this.CheckParentOrNot(element.Priv_ID);
 
             if (childCount !== 0) {
                 var ch = Array();
                 ch = this.GetChildren(element.Priv_ID, childCount);
                 if (ch.length !== 0) {
                     //dash.push(ch);
                     if(dash.length==0){
                         dash=ch;
                     }
                     else{
                         dash.push(ch);
                     }
                 }
             }
             if (element.Parent_ID == 0) {
                 var parent = {};
                 parent = this.GetParent(element.Priv_ID, dash);
                 if (parent['id'] !== undefined) {
                     navig.push(parent);
                 }
             }
         });
         const DynamicNavigation = [
             {
                 'id': 'applications',
                 'title': 'Applications',
                 'translate': 'NAV.APPLICATIONS',
                 'type': 'group',
                 'icon': 'apps',
                 'children': navig
             }
         ];
         return DynamicNavigation;
     }
     CheckParentOrNot(ID) {
         var perm = [];
         var c = 0;
         perm = this.sessionSt.retrieve('menuPerm');
         perm.forEach(element => {
             if (element.Parent_ID == ID) {
                 c++;
             }
         });
         return c;
     }
 
     GetChildren(ID, childCount) {
         var perm = [];
         perm = this.sessionSt.retrieve('menuPerm');
         var child = Array();
         perm.forEach(element => {
             var c = {};
             if (element.Parent_ID == ID) {
                 if (element.Menu_ID != null) {
                     c['id'] = element.Menu_ID;
                 }
                 if (element.Menu_Title != null) {
                     c['title'] = element.Menu_Title;
                 }
                 if (element.Menu_Translate != null) {
                     c['translate'] = element.Menu_Translate;
                 }
                 if (element.Menu_Type != null) {
                     c['type'] = element.Menu_Type;
                 }
                 if (element.Menu_Icon != null) {
                     c['icon'] = element.Menu_Icon;
                 }
                 if (element.Menu_Url != null) {
                     c['url'] = element.Menu_Url;
                 }
             }
             if (c['id'] !== undefined) {
                 child.push(c);
             }
         });
         return child;
     }
 
     GetParent(ID, c) {
         var perm = [];
         perm = this.sessionSt.retrieve('menuPerm');
         var child = {};
         perm.forEach(element => {
             if (element.Priv_ID == ID) {
                 if (element.Menu_ID != null) {
                     child['id'] = element.Menu_ID;
                 }
                 if (element.Menu_Title != null) {
                     child['title'] = element.Menu_Title;
                 }
                 if (element.Menu_Translate != null) {
                     child['translate'] = element.Menu_Translate;
                 }
                 if (element.Menu_Type != null) {
                     child['type'] = element.Menu_Type;
                 }
                 if (element.Menu_Icon != null) {
                     child['icon'] = element.Menu_Icon;
                 }
                 if (element.Menu_Url != null) {
                     child['url'] = element.Menu_Url;
                 }
                 if (c != null) {
                     child['children'] = c;
                 }
 
             }
         });
         return child;
     }
}
