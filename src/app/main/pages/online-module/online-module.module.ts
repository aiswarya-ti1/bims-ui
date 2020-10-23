import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';


import { CdkTableModule } from '@angular/cdk/table';


import { LeadsOnlinePMQAComponent } from './tabs/leads-online-pmqa/leads-online-pmqa.component';
import { WorksOnlinePMQAComponent } from './tabs/works-online-pmqa/works-online-pmqa.component';
import { AddOnlineWorkDialogComponent } from './tabs/works-online-pmqa/add-online-work/add-online-work.component';
import { OnlineModuleComponent } from './online-module.component';
import { ProjectModuleComponent } from '../project-module/project-module.component';
import { ProjectModuleService } from '../project-module/project-module.service';
import { AddWorkDialogComponent } from '../project-module/add-work/add-work.component';






const routes = [
    {
        path     : 'online',
        component: OnlineModuleComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [
      
  LeadsOnlinePMQAComponent, WorksOnlinePMQAComponent,
     AddOnlineWorkDialogComponent, OnlineModuleComponent
     
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
                CdkTableModule, MatPaginatorModule
       
    ],exports: [RouterModule,],
    providers   : [
        ProjectModuleService
    ],
    entryComponents: [AddOnlineWorkDialogComponent
        
    ],
   
})
export class OnlineModule
{
}
