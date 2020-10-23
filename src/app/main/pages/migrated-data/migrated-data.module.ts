import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, 
    MatSlideToggleModule, MatTableModule, MatPaginatorModule, MatRadioModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule} from '@angular/cdk/table';


import { FuseSidebarModule } from '@fuse/components';
import { MigratedDataModuleComponent } from './migrated-data.component';
import { OldWorkOrderListComponent } from './tabs/wo-old-list/wo-old-list.component';
import { WorkOrderOldComponent } from './tabs/wo-old-list/wo-old/wo-old.component';
import { ViewReMeasureDialogComponent } from './tabs/view-re-measure/view-re-measure.component';








const routes = [
    {
        path     : 'migrate',
        component: MigratedDataModuleComponent, 
       
      },
      {
          path :'wo-old/:wid',
          component : WorkOrderOldComponent
      }
    
        
];

@NgModule({
    declarations: [MigratedDataModuleComponent, OldWorkOrderListComponent,WorkOrderOldComponent
        
      
     
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
       CdkTableModule, MatPaginatorModule,FuseSidebarModule,MatRadioModule
    ],exports: [RouterModule, OldWorkOrderListComponent,WorkOrderOldComponent],
    providers   : [
        
    ],
    entryComponents: [
        
    ],
   
})
export class MigratedDataModule
{
}
