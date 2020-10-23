import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule,MatCheckboxModule,
    MatIconModule,MatDatepickerModule, MatTabsModule, MatToolbarModule, MatExpansionModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { Injectable, Type } from '@angular/core';


import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/pages/profile/tabs/photos-videos/photos-videos.component';
import { EditDetailsComponent } from './tabs/about/edit-details/edit-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesComponent } from './tabs/services/services.component';
import { ArticleComponent } from './tabs/article/article.component';
import { TruncatePipe } from 'app/pipe';
import { ViewArticleComponent } from './tabs/view-article/view-article.component';
import { ViewArticle1Component } from './tabs/view-article1/view-article1.component';
import { ViewArticleAssocComponent } from './view-article-assoc/view-article-assoc.component';
import { EditableArticleViewComponent } from './view-article-assoc/tabs/editable-article-view/editable-article-view.component';















const routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        }},
        {
        path     : 'view-article1/:id',
        component: ViewArticle1Component,
    },
    {
        path     : 'view-article-assoc',
        component: ViewArticleAssocComponent,
    }
    
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent,
        EditDetailsComponent,
        ServicesComponent,
        ArticleComponent,TruncatePipe, ViewArticleComponent, ViewArticle1Component, ViewArticleAssocComponent, EditableArticleViewComponent
        
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
        MatFormFieldModule,MatExpansionModule, MatCheckboxModule
       
    ],
    providers   : [
        ProfileService
    ],
    entryComponents: [
        EditDetailsComponent, ArticleComponent
    ],
   
})
export class ProfileModule
{
}
