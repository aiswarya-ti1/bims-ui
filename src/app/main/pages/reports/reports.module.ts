import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule} from '@angular/cdk/table';
import { ReportsModuleComponent } from './reports.component';

import { AllReportComponent } from './tabs/all-report/all-report.component';

import { FuseSidebarModule } from '@fuse/components';







const routes = [
    {
        path     : 'reports',
        component: ReportsModuleComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [ReportsModuleComponent, AllReportComponent
      
     
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
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatSlideToggleModule, MatTableModule,
       CdkTableModule, MatPaginatorModule,FuseSidebarModule
    ],exports: [RouterModule, AllReportComponent],
    providers   : [
        
    ],
    entryComponents: [
        
    ],
   
})
export class ReportsModule
{
}
