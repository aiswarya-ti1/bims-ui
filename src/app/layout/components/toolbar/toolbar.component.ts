import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';

import { User } from 'app/main/user';
import { menuPrivillage } from '../navbar/menuPrivillage';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';




@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    User_Name: string;
    Role_ID:number;
  
    UserID:number;
    
    User:Array<User>;

   
    
    permission: number = 0;
    perm:Array<menuPrivillage>;
    Priv_ID:number=0;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private sessionSt:SessionStorageService,
        private router : Router
    )
    {
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_Name=this.User['User_Name'];
        }
       if (this.sessionSt.retrieve('menuPerm') != null) {
             //alert('menu')
             this.perm = this.sessionSt.retrieve('menuPerm')
             this.Priv_ID = this.perm['Priv_ID'];
            // debugger;
            // this.navigation =this.getNavigationDetails();
            // console.log(this.navigation);
              // Default layout
             // this.layout = 'vertical';
            // this._variant = 'vertical-style-1';
             //this.User_ID = this.User['Role_ID'];
           // console.log(this.Priv_ID);
             
         }
         
         
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'tr',
                title: 'Turkish',
                flag : 'tr'
            }
        ];

       this.navigation = navigation;

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
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }
    logout()
    {
      //debugger
      this.sessionSt.clear();
       this.router.navigate(['**']);
        
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
