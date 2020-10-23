import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule,MatInputModule, MatDividerModule,MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatIconModule, MatTabsModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/pages/profile/tabs/photos-videos/photos-videos.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';


@NgModule({
  declarations: [],
  imports     : [
   // RouterModule.forChild(routes),

    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    FuseSharedModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
],
providers   : [
    ProfileService
],
entryComponents: [
    EditDetailsComponent
]
})
export class AboutModule { }
