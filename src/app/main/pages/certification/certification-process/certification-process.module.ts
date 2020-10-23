import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRadioModule, MatSlideToggleModule, MatListModule, MatStepperModule, MatButtonToggleModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';


import { CertificationProcessComponent } from './certification-process.component';

import { AboutAssociateComponent } from './tabs/about-assoc/about-assoc.component';
import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { CertificationService } from '../certification.service';
import { CertifiedAssocListComponent } from '../tabs/cert-assoc-list/cert-assoc-list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddProjectsComponent } from './tabs/about-assoc/add-projects/add-projects.component';
import { AddFeedbackDialogComponent } from './tabs/feedback/add-feedback/add-feedback.component';
import { QAFeedbackDialogComponent } from './tabs/verification/qa-feedback/qa-feedback.component';
import { AddServiceRatesNewComponent } from './tabs/about-assoc/add-serv-rates-new/add-serv-rates-new.component';
import { DocumentUploadDialogComponent } from './tabs/verification/doc-upload/doc-upload.component';





const routes = [
    {
        path     : 'certif-process',
        component: CertificationProcessComponent, 
       
      },
      
        
];

@NgModule({
    declarations: [
       // BasicAssocDetailsComponent,
        CertificationProcessComponent, CertifiedAssocListComponent, AddServiceRatesNewComponent,AddProjectsComponent,
        AddFeedbackDialogComponent, QAFeedbackDialogComponent, DocumentUploadDialogComponent
        //AssocRegistrationComponent, AboutAssociateComponent
   
    
    
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        MatInputModule,
        MatDatepickerModule,MatTooltipModule,BrowserModule,
        MatSelectModule,
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatTableModule, MatRadioModule,ReactiveFormsModule,
                CdkTableModule, MatPaginatorModule,MatSlideToggleModule, MatListModule,MatStepperModule,MatRadioModule,MatButtonToggleModule,
       
    ],exports: [RouterModule],
    providers   : [CertificationService
        
    ],
    entryComponents: [AddServiceRatesNewComponent, AddProjectsComponent, AddFeedbackDialogComponent, 
        QAFeedbackDialogComponent,DocumentUploadDialogComponent
    ],
   
})
export class CertificationProcessModule
{
}
