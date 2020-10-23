import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatListModule, MatStepperModule, MatRadioModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';


import { ProjectModuleAfterWOComponent } from './project-module-awo.component';
import { ProjectModuleService } from '../project-module/project-module.service';
import { WorkOrderComponent } from './tabs/work-order/work-order.component';
import { StartWorkComponent } from './start-work/start-work.component';
import { WorkAmendmentComponent } from './tabs/work-amendment/work-amendment.component';
import { WorkReMeasureComponent } from './tabs/work-remeasure/work-remeasure.component';
import { ReMeasureDetailsComponent } from './tabs/work-remeasure/remeasure-details/remeasure-details.component';
import { InitiatePayRequestComponent } from './tabs/payment-initiation/initiate-pay-request/initiate-pay-request.component';
import { InitiatePaymentComponent } from './tabs/initiate-payment-pma/initiate-payment-pma.component';
import { GeneratePRPMAComponent } from './tabs/generate-pr-pma/generate-pr-pma.component';
import { ItemDetailsViewComponent } from './tabs/generate-pr-pma/item-detail-view/item-detail-view.component';
import { GeneratePOBIComponent } from './tabs/generate-po-bi/generate-po-bi.component';
import { GoodsReceiptPMAComponent } from './tabs/goods-reciept-pma/goods-reciept-pma.component';
import { GoodsRecieveDateComponent } from './tabs/goods-reciept-pma/goods-recieve-date/goods-recieve-date.component';
import { ViewPurchaseRequestBIComponent } from './tabs/view-pr-bi/view-pr-bi.component';
import { AddNewSupplierComponent } from './tabs/view-pr-bi/addnew_supplier/addnew_supplier.component';
import { EditPOComponent } from './tabs/view-pr-bi/edit-po/edit-po.component';
import { WorkCompletionComponent } from './tabs/work-completion/work-completion.component';
import { FinishWorkComponent } from './tabs/work-completion/finish-work/finish-work.component';
import { PrintAmendmentComponent } from './tabs/work-amendment/print-amendment/print-amendment.component';
import { AmendIssueDateComponent } from './tabs/work-amendment/amend-issue-date/amend-issue-date.component';
import { ExtraPaymentDialog } from './tabs/pay-schedule-awo/extra-payment/extra-payment.component';
import { PrintWorkCompletionComponent } from './tabs/work-completion/print-work-compl/print-work-compl.component';
import { WorkDatesDialog } from './tabs/work-schedule-awo/work-dates/work-dates.component';
import { PaymentInitiationComponent } from './tabs/payment-initiation/payment-initiation.component';
import { WorkScheduleAWOComponent } from './tabs/work-schedule-awo/work-schedule-awo.component';
import { PayScheduleAWOComponent } from './tabs/pay-schedule-awo/pay-schedule-awo.component';
import { ViewAmendmentComponent } from './tabs/work-amendment/view-amendment/view-amendment.component';
import { RemeasureIssueDateComponent } from './tabs/work-remeasure/remeasure-issue-date/remeasure-issue-date.component';
import { PrintReMeasureNewComponent } from './tabs/work-remeasure/print-remeasure-new/print-remeasure-new.component';
import { PaySchedPrintComponent } from './tabs/pay-schedule-awo/pay-sched-print/pay-sched-print.component';
import { WorkAmendmentNewComponent } from './tabs/work-amendment-new/work-amendment-new.component';
import { EditAmendmentComponent } from './tabs/work-amendment-new/edit-amendment/edit-amendment.component';
import { ViewPaySummaryComponent } from './tabs/pay-schedule-awo/view-pay-summary/view-pay-summary.component';
import { WorkSummaryComponent } from './tabs/work-summary/work-summary.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AmendReasonComponent } from './tabs/work-amendment-new/amend-reason/amend-reason.component';
import { AuthGuard } from 'app/auth-guard.guard';







const routes = [
    {
        path     : 'project-management/:workid',
        component: ProjectModuleAfterWOComponent, 
       
       // canActivate: [AuthGuard]
      },
      {
        path     : 'print-amendment/:workid/:amendno',
        component: PrintAmendmentComponent, 
       // canActivate: [AuthGuard]
       
      },
      {
        path     : 'print-completion/:workid',
        component: PrintWorkCompletionComponent, 
       // canActivate: [AuthGuard]
       
      },
      {
          path : 'view-amendment/:workid/:amendno',
          component : ViewAmendmentComponent,
         // canActivate: [AuthGuard]
      },
      {
        path     : 'print-remeasure-new/:workid/:type',
        component: PrintReMeasureNewComponent, 
        //canActivate: [AuthGuard]
       
      },
      {
        path     : 'pay-sched-print/:workid/:type',
        component: PaySchedPrintComponent, 
        //canActivate: [AuthGuard]
       
      },
      {
        path :'edit-amendment/:workid/:no',
        component : EditAmendmentComponent,
        //canActivate: [AuthGuard]
      }
       
    
        
];

@NgModule({
    declarations: [ProjectModuleAfterWOComponent,WorkOrderComponent, StartWorkComponent,
        WorkAmendmentComponent,WorkReMeasureComponent,ReMeasureDetailsComponent,
        InitiatePaymentComponent,InitiatePayRequestComponent,GeneratePRPMAComponent,ItemDetailsViewComponent,GeneratePOBIComponent,
        GoodsReceiptPMAComponent,GoodsRecieveDateComponent,ViewPurchaseRequestBIComponent, AddNewSupplierComponent,EditPOComponent,
        WorkCompletionComponent,FinishWorkComponent,PrintAmendmentComponent,AmendIssueDateComponent, ExtraPaymentDialog,
        PrintWorkCompletionComponent, WorkDatesDialog, PaymentInitiationComponent, WorkScheduleAWOComponent, PayScheduleAWOComponent,
        ViewAmendmentComponent, RemeasureIssueDateComponent,PrintReMeasureNewComponent,PaySchedPrintComponent,
        WorkAmendmentNewComponent, EditAmendmentComponent, ViewPaySummaryComponent,WorkSummaryComponent,
        AmendReasonComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,FuseConfirmDialogModule,
        MatTabsModule,
        MatToolbarModule,
        FuseSharedModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatTableModule, MatRadioModule,
                CdkTableModule, MatPaginatorModule,MatSlideToggleModule, MatListModule,MatStepperModule,
       
    ],exports: [RouterModule],
    providers   : [
       ProjectModuleService
    ],
    entryComponents: [StartWorkComponent,ReMeasureDetailsComponent,InitiatePayRequestComponent,ItemDetailsViewComponent,
        GoodsRecieveDateComponent, AddNewSupplierComponent,EditPOComponent,FinishWorkComponent,AmendIssueDateComponent,ExtraPaymentDialog,
        WorkDatesDialog, InitiatePayRequestComponent  ,RemeasureIssueDateComponent , ViewPaySummaryComponent ,
        AmendReasonComponent                                                                                                           
        
    ],
   
})
export class ProjectAfterWOModule
{
}
