import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModuleComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { SegmentListComponent } from './tabs/seg-list/seg-list.component';
import { MatTabsModule, MatButtonModule, MatDividerModule, MatIconModule, MatToolbarModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatFormFieldModule, MatExpansionModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { AddSegmentDialogComponent } from './tabs/seg-list/add-seg/add-seg.component';
import { ServiceListComponent } from './tabs/serv-list/serv-list.component';
import { AddServicesDialogComponent } from './tabs/serv-list/add-serv/add-serv.component';
import { LineItemsListComponent } from './tabs/line-items-list/line-items-list.component';
import { AddItemsDialogComponent } from './tabs/line-items-list/add-item/add-item.component';
import { AssociateListComponent } from './tabs/assoc-list/assoc-list.component';





const routes = [
  
  {
    path     : 'admin',
    component: AdminModuleComponent
},

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,MatTabsModule,
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
                 MatPaginatorModule,MatAutocompleteModule
    
  ],
  declarations: [AdminModuleComponent, SegmentListComponent, AddSegmentDialogComponent, ServiceListComponent,AddServicesDialogComponent, LineItemsListComponent,
    AddItemsDialogComponent, AssociateListComponent],
  entryComponents: [AddSegmentDialogComponent,AddServicesDialogComponent, AddItemsDialogComponent, ]
})
export class AdminModule { }
