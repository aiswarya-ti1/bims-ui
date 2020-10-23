import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';




import { CertificationModuleComponent } from './certification.component';
import { ProjectModuleService } from '../project-module/project-module.service';
import { AddAssociateDialogComponent } from './add-associate/add-associate.component';
import { CertifiedAssocListComponent } from './tabs/cert-assoc-list/cert-assoc-list.component';
import { CertificationService } from './certification.service';
import { CertificationProcessModule } from './certification-process/certification-process.module';
import { AboutAssociateComponent } from './certification-process/tabs/about-assoc/about-assoc.component';
import { AssocFeedbackComponent } from './certification-process/tabs/feedback/feedback.component';
import { QAVerificationComponent } from './certification-process/tabs/verification/verification.component';







const routes = [
    {
        path     : 'certification/:associd/:type',
        component: CertificationModuleComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [
        AddAssociateDialogComponent, CertificationModuleComponent,//CertifiedAssocListComponent,
        //BasicAssocDetailsComponent, AssocRegistrationComponent, 
        AboutAssociateComponent,AssocFeedbackComponent,  QAVerificationComponent
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
                 MatPaginatorModule, CertificationProcessModule
       
    ],exports: [RouterModule],
    providers   : [
        ProjectModuleService, CertificationService
    ],
    entryComponents: [AddAssociateDialogComponent
        
    ],
   
})
export class CertificationModule
{
}
