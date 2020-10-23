import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import { ProjectModuleService } from '../project-module/project-module.service';
import { PaymentComponent } from './payment.component';
import { LaborPayTransactionComponent } from './tabs/labour-pay-process/labor-pay-transaction/labor-pay-transaction.component';
import { LaborPayProcessComponent } from './tabs/labour-pay-process/labour-pay-process.component';
import { MFeePercComponent } from './tabs/labour-pay-process/m-fee-perc/m-fee-perc.component';
import { LaborInitPayTransactionComponent } from './tabs/labour-pay-process/labor-init-pay-transaction/labor-init-pay-transaction.component';
import { MaterialPayProcessComponent } from './tabs/material-pay-process/material-pay-process.component';
import { MaterialPayTransactionComponent } from './tabs/material-pay-process/material-pay-transaction/material-pay-transaction.component';
import { LaborPayNewComponent } from './tabs/labour-pay-new/labour-pay-new.component';
import { PaymentFilterPipe } from './tabs/labour-pay-new/payment-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MFeeSummaryComponent } from './tabs/mfee-summary/mfee-summary.component';
import { PaidSummaryComponent } from './tabs/paid-summary/paid-summary.component';
import { ViewPaidDetailsComponent } from './tabs/paid-summary/view-paid-details/view-paid-details.component';
import { MFeeFilterPipe } from './tabs/mfee-summary/mfee-filter.pipe';







const routes = [
    {
        path     : 'payment',
        component: PaymentComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [
      PaymentComponent,LaborPayTransactionComponent,LaborPayProcessComponent,MFeePercComponent,LaborInitPayTransactionComponent,
      MaterialPayProcessComponent,MaterialPayTransactionComponent,LaborPayNewComponent, PaymentFilterPipe, MFeeSummaryComponent,
      PaidSummaryComponent,ViewPaidDetailsComponent, MFeeFilterPipe
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
                CdkTableModule, MatPaginatorModule,MatTooltipModule,
                CommonModule,
    ],exports: [RouterModule, PaymentFilterPipe, MFeeFilterPipe],
    providers   : [
        ProjectModuleService
    ],
    entryComponents: [LaborPayTransactionComponent,MFeePercComponent,LaborInitPayTransactionComponent,
        MaterialPayTransactionComponent, ViewPaidDetailsComponent
        
    ],
   
})
export class PaymentModule
{
}
