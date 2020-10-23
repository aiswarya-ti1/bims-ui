import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatInputModule, MatTooltipModule, MatSnackBarModule, MatProgressBarModule, MatTableModule, MatRadioModule, MatToolbarModule, MatDatepickerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { SalesModule } from './main/pages/sales-module/sales-module.module';
import { ProjectModule } from './main/pages/project-module/project-module.module';
import { ProjectBWOModule } from './main/pages/project-module-bwo/project-module-bwo.module';
import { ProjectAfterWOModule } from './main/pages/project-module-awo/project-module-awo.module';
import { PaymentModule } from './main/pages/payment/payment.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReceiptModule } from './main/pages/receipt/receipt.module';
import { CertificationModule } from './main/pages/certification/certification.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportsModule } from './main/pages/reports/reports.module';
import { MigratedDataModuleComponent } from './main/pages/migrated-data/migrated-data.component';
import { MigratedDataModule } from './main/pages/migrated-data/migrated-data.module';

//import { StorageServiceModule} from 'angular-webstorage-service';
import { AssociateModule } from './main/pages/associates/associates.module';
import { AdminModule } from './main/pages/admin/services/admin.module';
import { MaterialModule } from './main/pages/admin/materials/materials.module';
import { OnlineModule } from './main/pages/online-module/online-module.module';
import { AppProjectBWOModule } from './main/pages/project-module-bwo-app/project-module-bwo-app.module';
import { WOIsuueDateComponent } from './main/pages/project-module-bwo/tabs/work-order-prepare/wo-issue-date/wo-issue-date.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//import { TokenInterceptorService } from './token-interceptor.service';
import { UsersModule } from './main/pages/users/users.module';
import { GlobalConstants } from './main/pages/project-module-bwo/globalConstants';






const appRoutes: Routes = [
    {
        path        : 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path      : 'auth/register',
        redirectTo: 'pages/auth/register'
    },
    {
        path      : 'auth/register-next',
        redirectTo: 'pages/auth/register-next'
    },
    {
        path      : 'auth/login-2',
        redirectTo: 'pages/auth/login-2'
    },
    {
        path      : 'admin/dashboard',
        redirectTo: 'pages/admin/dashboard'
    },
    {
        path      : 'admin/associate-type-list',
        redirectTo: 'pages/admin/associate-type-list'
    },
    
    {
        path      : '**',
        redirectTo: 'pages/auth/login-2'
    }
];

@NgModule({
    declarations: [
        AppComponent, WOIsuueDateComponent
    ],
    imports     : [
       
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes,{ useHash: true }),
        

        TranslateModule.forRoot(),
        NgxWebstorageModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,MatSnackBarModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatInputModule,MatTooltipModule,MatProgressBarModule,MatTableModule,MatRadioModule,ReactiveFormsModule,
MatToolbarModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,DragDropModule,MatDatepickerModule,

        // App modules
        LayoutModule,
               SalesModule,ProjectModule,ProjectBWOModule,ProjectAfterWOModule,PaymentModule,ReceiptModule , CertificationModule, ReportsModule,
               MigratedDataModule, AdminModule, AssociateModule, MaterialModule, OnlineModule,
               AppProjectBWOModule, UsersModule
    ],
    providers: [GlobalConstants,{provide: LocationStrategy, useClass: HashLocationStrategy},
       /* {
            provide : HTTP_INTERCEPTORS,
            useClass : TokenInterceptorService,
            multi:true
        
          }*/],
    entryComponents:[WOIsuueDateComponent],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
