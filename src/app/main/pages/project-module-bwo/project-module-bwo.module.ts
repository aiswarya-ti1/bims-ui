import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatListModule, MatStepperModule, MatRadioModule, MatTooltipModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { ProjectModuleBWOComponent } from './project-module-bwo.component';
import { ProjectModuleBWOService } from './project-module-bwo.service';
import { WorksSiteAnalysisComponent } from './tabs/works-site-analysis/works-site-analysis.component';
import { SiteAnalysisDetailsDialogComponent } from './tabs/site-analysis-details/site-analysis-details.component';
import { WorkEstimationComponent } from './tabs/work-estimation/work-estimation.component';
import { AddLineItemsFormDialogComponent } from './tabs/work-estimation/add-line-items/add-line-items.component';
import { EditItemDetailsComponent } from './tabs/work-estimation/edit-item-details/edit-item-details.component';
import { WorkTenderComponent } from './tabs/work-tender/work-tender.component';

import { AssocSelectionComponent } from './tabs/work-tender/assoc-selection/assoc-selection.component';
import { DesignUploadComponent } from './tabs/work-estimation/design-upload/design-upload.component';
import { TenderDetailsComponent } from './tabs/work-tender/tender-details/tender-details.component';
import { PaymentTermsComponent } from './tabs/work-tender/payment-terms/payment-terms.component';
import { WorkOrderPrepareComponent } from './tabs/work-order-prepare/work-order-prepare.component';
import { WorkScheduleComponent } from './tabs/work-order-prepare/work-schedule/work-schedule.component';
import { PaymentScheduleComponent } from './tabs/work-order-prepare/payment-schedule/payment-schedule.component';
import { AddKeyDeliverablesComponent } from './tabs/work-order-prepare/add-key-deliverables/add-key-deliverables.component';
import { AddTermsConditionsComponent } from './tabs/work-order-prepare/add-terms-conditions/add-terms-conditions.component';
import { WOIsuueDateComponent } from './tabs/work-order-prepare/wo-issue-date/wo-issue-date.component';
import { PrintWONew6Component } from './tabs/work-order-prepare/print-wo-new-6/print-wo-new-6.component';
import { PrintEstimationComponent } from './tabs/work-estimation/print-estimation/print-estimation.component';
import { PrintTenderComponent } from './tabs/work-tender/print-tender/print-tender.component';
import { AssociateSelectionNewComponent } from './tabs/work-tender/assoc-selection-new/assoc-selection-new.component';
import { AddNewServiceAssocComponent } from './tabs/work-tender/add-new-associate/add-new-associate.component';
import { AddMoreServicesDialogComponent } from './tabs/work-estimation/add-more-services/add-more-services.component';
import { ViewWorkScheduleDialogComponent } from './tabs/work-order-prepare/payment-schedule/view-work-schedule/view-work-schedule.component';
import { PrintAssocTenderComponent } from './tabs/work-tender/print-assoc-tender/print-assoc-tender.component';
import { SetPriorityItemsFormDialogComponent } from './tabs/work-estimation/set-priority-items/set-priority-items.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { ReferencesFormDialogComponent } from './tabs/work-estimation/references/references.component';
import { WorkLostFormDialogComponent } from './tabs/works-site-analysis/work-lost/work-lost.component';
import { CertificationService } from '../certification/certification.service';
import { ViewReMeasureDialogComponent } from '../migrated-data/tabs/view-re-measure/view-re-measure.component';
import { AuthGuard } from 'app/auth-guard.guard';
import { AddTemplatesFormDialogComponent } from './tabs/work-estimation/add-template/add-template.component';








const routes = [
    {
        path     : 'project-bwo/:workid',
        component: ProjectModuleBWOComponent, 
       // canActivate: [AuthGuard]
       
      },
      {
        path     : 'print-work-order-6/:workid/:retype',
        component: PrintWONew6Component ,
        
       // canActivate: [AuthGuard]
      },
      {
          path : 'print-estimate/:workid',
          component : PrintEstimationComponent,
          //canActivate: [AuthGuard]
      }
      ,
      {
          path : 'print-tender/:workid',
          component : PrintTenderComponent,
          //canActivate: [AuthGuard]
      },
      {
          path : 'print-assoc-tender/:tid/:wid',
          component : PrintAssocTenderComponent,
         // canActivate: [AuthGuard]
      }
    
        
];

@NgModule({
    declarations: [
      
     ProjectModuleBWOComponent,WorksSiteAnalysisComponent,SiteAnalysisDetailsDialogComponent, 
     WorkEstimationComponent,AddLineItemsFormDialogComponent,EditItemDetailsComponent,WorkTenderComponent,
     AssocSelectionComponent,DesignUploadComponent,TenderDetailsComponent,
     PaymentTermsComponent,WorkOrderPrepareComponent,WorkScheduleComponent,PaymentScheduleComponent, 
     AddKeyDeliverablesComponent, AddTermsConditionsComponent,PrintWONew6Component,
     PrintEstimationComponent,PrintTenderComponent, AssociateSelectionNewComponent, AddNewServiceAssocComponent,
     AddMoreServicesDialogComponent,ViewWorkScheduleDialogComponent,SetPriorityItemsFormDialogComponent,PrintAssocTenderComponent,
     ReferencesFormDialogComponent,WorkLostFormDialogComponent,ViewReMeasureDialogComponent, AddTemplatesFormDialogComponent
    
    
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
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatTableModule, MatRadioModule,
                CdkTableModule, MatPaginatorModule,MatSlideToggleModule, MatListModule,MatStepperModule,
       
    ],exports: [RouterModule],
    providers   : [
        ProjectModuleBWOService, CertificationService
    ],
    entryComponents: [SiteAnalysisDetailsDialogComponent,AddLineItemsFormDialogComponent,EditItemDetailsComponent,
        AssocSelectionComponent,DesignUploadComponent,TenderDetailsComponent,
        PaymentTermsComponent,WorkScheduleComponent,PaymentScheduleComponent,AddKeyDeliverablesComponent,
        AddTermsConditionsComponent,AssociateSelectionNewComponent,AddNewServiceAssocComponent,
        AddMoreServicesDialogComponent,ViewWorkScheduleDialogComponent,SetPriorityItemsFormDialogComponent,ReferencesFormDialogComponent,
        WorkLostFormDialogComponent,ViewReMeasureDialogComponent, AddTemplatesFormDialogComponent
    ],
   
})
export class ProjectBWOModule
{
}
