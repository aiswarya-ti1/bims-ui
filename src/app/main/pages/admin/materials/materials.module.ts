import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MatTabsModule, MatButtonModule, MatDividerModule, MatIconModule, MatToolbarModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatFormFieldModule, MatExpansionModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';



import { MaterialModuleComponent } from './materials.component';
import { ProductGroupListComponent } from './tabs/prod-group-list/prod-group-list.component';
import { AddProductSegmentDialogComponent } from './tabs/prod-seg-list/add-prod-seg/add-prod-seg.component';
import { AddProductGroupDialogComponent } from './tabs/prod-group-list/add-prod-group/add-prod-group.component';
import { ProductSegmentListComponent } from './tabs/prod-seg-list/prod-seg-list.component';






const routes = [
  
  {
    path     : 'material',
    component: MaterialModuleComponent
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
  declarations: [MaterialModuleComponent,AddProductSegmentDialogComponent,AddProductGroupDialogComponent,ProductGroupListComponent, ProductSegmentListComponent]
,  entryComponents: [AddProductSegmentDialogComponent,AddProductGroupDialogComponent, ]
})
export class MaterialModule { }
