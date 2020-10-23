import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';

import { ProjectModuleService } from '../project-module/project-module.service';


import { CertificationService } from '../certification/certification.service';
import { UsersModuleComponent } from './users.component';
import { UsersListComponent } from './tabs/user-list/user-list.component';







const routes = [
    {
        path     : 'users',
        component: UsersModuleComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [
        UsersModuleComponent, UsersListComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        FuseSharedModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatTableModule, 
                 MatPaginatorModule,
       
    ],exports: [RouterModule],
    providers   : [
        ProjectModuleService, CertificationService
    ],
    entryComponents: [ 
        
    ],
   
})
export class UsersModule
{
}
