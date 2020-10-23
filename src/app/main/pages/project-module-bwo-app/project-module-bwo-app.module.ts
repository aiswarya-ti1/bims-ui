import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatListModule, MatStepperModule, MatRadioModule, MatTooltipModule, MatMenuModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { ProjectModuleBWOAppComponent } from './project-module-bwo-app.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AppSiteAnalysisDetailsDialogComponent } from './tabs/app-site-analysis-details/app-site-analysis-details.component';
import { AppWorksSiteAnalysisComponent } from './tabs/app-works-site-analysis/app-works-site-analysis.component';
import { SiteAnalysisDatesDialogComponent } from './tabs/app-works-site-analysis/site-analysis-date/site-analysis-date.component';
import { AppWorkEstimationComponent } from './tabs/app-work-estimation/app-work-estimation.component';
import { AppWorkTenderComponent } from './tabs/app-work-tender/app-work-tender.component';
import { AppAddLineItemsFormDialogComponent } from './tabs/app-work-estimation/app-add-line-items/app-add-line-items.component';
import { AppAssociateSelectionNewComponent } from './tabs/app-work-tender/app-assoc-selection-new/app-assoc-selection-new.component';
import { AppAddKeyDeliverablesComponent } from './tabs/app-work-tender/app-add-key-deliverables/app-add-key-deliverables.component';
import { AppAddTermsConditionsComponent } from './tabs/app-work-tender/app-add-terms-conditions/app-add-terms-conditions.component';
import { AppProjectModuleBWOService } from './project-module-bwo-app.service';
import { AppWorkTenderDetailsComponent } from './tabs/app-work-tender/app-work-tender-details/app-work-tender-details.component';
import { AppTenderRateComponent } from './tabs/app-work-tender/app-tender-rate/app-tender-rate.component';
import { PushTenderToCustomerComponent } from './tabs/app-work-tender/push-tender-customer/push-tender-customer.component';
import { WorkOrderPrepareComponent } from '../project-module-bwo/tabs/work-order-prepare/work-order-prepare.component';
import { AppWorkOrderPrepareComponent } from './tabs/app-work-order-prepare/app-work-order-prepare.component';
import { AuthGuard } from 'app/auth-guard.guard';






const routes = [
    {
        path     : 'project-bwo-app/:workid',
        component: ProjectModuleBWOAppComponent, 
       // canActivate: [AuthGuard]
       
      },
     
    
        
];

@NgModule({
    declarations: [ProjectModuleBWOAppComponent, AppSiteAnalysisDetailsDialogComponent, AppWorksSiteAnalysisComponent,
        SiteAnalysisDatesDialogComponent,AppWorkEstimationComponent, AppWorkTenderComponent, AppAddLineItemsFormDialogComponent,
        AppAssociateSelectionNewComponent, AppAddKeyDeliverablesComponent,AppAddTermsConditionsComponent,
        AppWorkTenderDetailsComponent,AppTenderRateComponent,PushTenderToCustomerComponent, 
        AppWorkOrderPrepareComponent
      
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
        MatDatepickerModule,MatTooltipModule,
        MatSelectModule,FuseConfirmDialogModule,
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatTableModule, MatRadioModule,MatMenuModule,
                CdkTableModule, MatPaginatorModule,MatSlideToggleModule, MatListModule,MatStepperModule,
       
    ],exports: [RouterModule],
    providers   : [AppProjectModuleBWOService    
       
    ],
    entryComponents: [AppSiteAnalysisDetailsDialogComponent,SiteAnalysisDatesDialogComponent, AppAddLineItemsFormDialogComponent,
        AppAssociateSelectionNewComponent, AppAddKeyDeliverablesComponent,AppAddTermsConditionsComponent,
        AppWorkTenderDetailsComponent,AppTenderRateComponent,PushTenderToCustomerComponent
    ],
   
})
export class AppProjectBWOModule
{
}
