import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';


@Component({
    selector     : 'amendment-details',
    templateUrl  : './amendment-details.component.html',
    styleUrls    : ['./amendment-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    
})
export class AmendmentDetailsComponent implements OnInit, OnDestroy
{
    
    
    constructor(
        
        private router:Router,
        private _matDialog:MatDialog, private sanitizer:DomSanitizer, private projectService : ProjectModuleService

    )
    {
        
       
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
        
               
            
    }
     

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all 
        }
      
}
