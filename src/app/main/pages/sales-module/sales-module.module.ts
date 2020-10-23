import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule} from '@angular/cdk/table';
import { SalesModuleComponent } from './sales-module.component';
import { WorksTabSalesComponent } from './tabs/works-tab-sales/works-tab-sales.component';
import { SalesModuleService } from './sales-module.service';
import { LeadsTabSalesComponent } from './tabs/leads-tab-sales/leads-tab-sales.component';
import { AddCustomerDialogComponent } from './add-customer/add-customer.component';
import { AddLeadDialogComponent } from './add-lead/add-lead.component';
import { UpdateLeadDialogComponent } from './update-lead/update-lead.component';
import { ViewCustDetailsComponent } from './tabs/works-tab-sales/view-cust-details/view-cust-details.component';
import { AuthGuard } from 'app/auth-guard.guard';





const routes = [
    {
        path     : 'sales',
        component: SalesModuleComponent, 
         //canActivate: [AuthGuard]
       
      },
    
        
];

@NgModule({
    declarations: [
      
     SalesModuleComponent, WorksTabSalesComponent, LeadsTabSalesComponent,AddCustomerDialogComponent,AddLeadDialogComponent,
     UpdateLeadDialogComponent,ViewCustDetailsComponent
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
       CdkTableModule, MatPaginatorModule
    ],exports: [RouterModule],
    providers   : [
        SalesModuleService, 
    ],
    entryComponents: [AddCustomerDialogComponent,AddLeadDialogComponent,UpdateLeadDialogComponent,ViewCustDetailsComponent
        
    ],
   
})
export class SalesModule
{
}
