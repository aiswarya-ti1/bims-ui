import { Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';
import { User } from 'app/main/user';
import { menuPrivillage } from './menuPrivillage';


@Component({
    selector     : 'navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent
{
    // Private
    _variant: string;
    navigation: any;
    navigationServiceWatcher: Subscription;
    fusePerfectScrollbarUpdateTimeout;
    User_Name: string;
    User_ID: number;
    Role_ID: number;
    User: Array<User>;
    nav: any;
    permission: number = 0;
    perm:Array<menuPrivillage>;
    Priv_ID:number=0;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private navigationService: FuseNavigationService,
        private router: Router,
        private sessionSt: SessionStorageService,
    )
    {
        if(this.sessionSt.retrieve('user')!=null)
        {
            this.User=this.sessionSt.retrieve('user');
            this.User_ID=this.User['User_ID'];
        }
        if (this.sessionSt.retrieve('menuPerm1') != null) {
             //alert('menu')
             this.perm = this.sessionSt.retrieve('menuPerm')
           //  this.Priv_ID = this.perm['Priv_ID'];
            // debugger;
             this.navigation =this.getNavigationDetails();
             console.log(this.navigation);
              // Default layout
             // this.layout = 'vertical';
             this._variant = 'vertical-style-1';
             //this.User_ID = this.User['Role_ID'];
           // console.log(this.Priv_ID);
             
         }
        
         
     
             // console.log('navigation');
             // console.log(adminNav);
           
         
        // Set the private defaults
      
      
       
    }
    ngOnInit() {
       // alert('2');

      
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Variant
     */
    get variant(): string
    {
        return this._variant;
    }

    @Input()
    set variant(value: string)
    {
        // Remove the old class name
        this._renderer.removeClass(this._elementRef.nativeElement, this.variant);

        // Store the variant value
        this._variant = value;

        // Add the new class name
        this._renderer.addClass(this._elementRef.nativeElement, value);
    }

    getNavigationDetails() {
       // alert( this.sessionSt.retrieve('menuPerm'));
        var dash = Array();
        var navig = Array();
        var perm = [];
        
        perm = this.sessionSt.retrieve('menuPerm1');
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
        perm = this.sessionSt.retrieve('menuPerm1');
        perm.forEach(element => {
            if (element.Parent_ID == ID) {
                c++;
            }
        });
        return c;
    }

    GetChildren(ID, childCount) {
        var perm = [];
        perm = this.sessionSt.retrieve('menuPerm1');
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
        perm = this.sessionSt.retrieve('menuPerm1');
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
