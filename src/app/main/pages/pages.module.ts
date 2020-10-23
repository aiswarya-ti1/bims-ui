import { NgModule } from '@angular/core';
import { Login2Module } from 'app/main/pages/authentication/login-2/login-2.module';
import { CommonModule } from '@angular/common';
import { SalesModule } from './sales-module/sales-module.module';
import { ProjectModule } from './project-module/project-module.module';
import { ProjectAfterWOModule } from './project-module-awo/project-module-awo.module';
import { PaymentModule } from './payment/payment.module';
import { ReceiptModule } from './receipt/receipt.module';
import { SalesDashboardComponent } from './dashboards/sales-dash/sales-dash.component';
import { SalesDashboardModule } from './dashboards/sales-dash/sales-dash.module';
import { ReportsModule } from './reports/reports.module';
import { MigratedDataModule } from './migrated-data/migrated-data.module';

import { AppProjectBWOModule } from './project-module-bwo-app/project-module-bwo-app.module';
import { OnlineModule } from './online-module/online-module.module';
import { AdminModule } from './admin/services/admin.module';
import { UsersModule } from './users/users.module';
//import { CertificationModule } from './certification/certification.module';




@NgModule({
    imports: [
              CommonModule,
                Login2Module,
        SalesModule,ProjectModule,ProjectAfterWOModule,PaymentModule, ReceiptModule, SalesDashboardModule,ReportsModule,
        MigratedDataModule, AdminModule, AppProjectBWOModule, OnlineModule,AppProjectBWOModule, UsersModule
       //CertificationModule
        
      
    ],
   
})
export class PagesModule
{

}
