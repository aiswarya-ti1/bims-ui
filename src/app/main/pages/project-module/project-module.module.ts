import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';


import { ProjectModuleComponent } from './project-module.component';

import { ProjectModuleService } from './project-module.service';
import { CdkTableModule } from '@angular/cdk/table';
import { LeadsTabPMQAComponent } from './tabs/leads-tab-pmqa/leads-tab-pmqa.component';
import { WorksTabPMQAComponent } from './tabs/works-tab-pmqa/works-tab-pmqa.component';
import { AddWorkDialogComponent } from './add-work/add-work.component';







const routes = [
    {
        path     : 'project',
        component: ProjectModuleComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [
      
     ProjectModuleComponent, LeadsTabPMQAComponent,WorksTabPMQAComponent,AddWorkDialogComponent, 
     
     
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
       
    ],exports: [RouterModule],
    providers   : [
        ProjectModuleService
    ],
    entryComponents: [AddWorkDialogComponent,
        
    ],
   
})
export class ProjectModule
{
}
