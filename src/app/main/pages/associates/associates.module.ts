import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule,MatTooltipModule, MatTabsModule, MatToolbarModule, MatExpansionModule, MatTableModule, MatPaginatorModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';

import { ProjectModuleService } from '../project-module/project-module.service';


import { AssociatesModuleComponent } from './associates.component';
import { CertificationService } from '../certification/certification.service';
import { MaterialAssocListComponent } from './tabs/mat-assoc-list/mat-assoc-list.component';
import { CertifiedAssocListComponent } from '../certification/tabs/cert-assoc-list/cert-assoc-list.component';
import { ServiceAssocListComponent } from './tabs/serv-assoc-list/serv-assoc-list.component';
import { AddAssociateDialogComponent } from '../certification/add-associate/add-associate.component';
import { AddProductAssociateDialogComponent } from './add-prod-associate/add-prod-associate.component';
import { AddNewAssocSegmentDialogComponent } from './tabs/mat-assoc-list/new-assoc-segment/new-assoc-segment.component';
import { AddNewAssocServiceDialogComponent } from '../admin/services/tabs/assoc-list/new-assoc-service/new-assoc-service.component';
import { SearchAssocComponent } from './tabs/search-assoc/search-assoc.component';








const routes = [
    {
        path     : 'associates',
        component: AssociatesModuleComponent, 
       
      },
    
        
];

@NgModule({
    declarations: [
        AssociatesModuleComponent, MaterialAssocListComponent,ServiceAssocListComponent,
        AddProductAssociateDialogComponent,AddNewAssocSegmentDialogComponent,
        AddNewAssocServiceDialogComponent, SearchAssocComponent
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
        MatSelectModule,MatTooltipModule,
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule, MatTableModule, 
                 MatPaginatorModule,
       
    ],exports: [RouterModule],
    providers   : [
        ProjectModuleService, CertificationService
    ],
    entryComponents: [ AddProductAssociateDialogComponent, AddNewAssocSegmentDialogComponent,AddNewAssocServiceDialogComponent
        
    ],
   
})
export class AssociateModule
{
}
