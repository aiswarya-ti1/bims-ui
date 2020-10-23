import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, 
    MatPaginatorModule, MatAutocompleteModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import { ProjectModuleService } from '../project-module/project-module.service';
import { ReceiptComponent } from './receipt.component';
import { ReceivedPaySchComponent } from './tabs/rec-pay-schedule/rec-pay-schedule.component';
import { PaymentModule } from '../payment/payment.module';
import { ReceiptTransactionComponent } from './tabs/rec-pay-schedule/receipt-transaction/receipt-transaction.component';
import { ReceiptFilterComponent } from './tabs/rec-pay-schedule/receipt-filter/receipt-filter.component';









const routes = [
    {
        path     : 'receipt',
        component: ReceiptComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [ ReceiptComponent,ReceivedPaySchComponent,ReceiptTransactionComponent,ReceiptFilterComponent
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
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatTableModule, PaymentModule,MatAutocompleteModule,
                CdkTableModule, MatPaginatorModule, 
       
    ],exports: [RouterModule],
    providers   : [
        ProjectModuleService
    ],
    entryComponents: [ReceiptTransactionComponent,ReceiptFilterComponent
        
    ],
   
})
export class ReceiptModule
{
}
