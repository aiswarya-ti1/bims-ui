import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { Posts } from './tabs/timeline/posts';
import { ProfileDetails } from './tabs/about/profileDetails';
import { Activities } from './tabs/timeline/activities';
import { Services } from './tabs/services/services';
import { Articles } from './tabs/timeline/articles';
import { EditableArticleViewComponent } from './view-article-assoc/tabs/editable-article-view/editable-article-view.component';
import { Certifications } from './tabs/timeline/certifications';
import { Segments } from '../project-module-bwo/segments';





@Injectable()
export class ProfileService implements Resolve<any>
{
    headers:Headers=new Headers;
    options:any;
    
    
    private API_URL= "http://bims";
  
  
    timeline: any;
    about: any;
    photosVideos: any;

    timelineOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                //this.getTimeline(),
               // this.getAbout(),
               // this.getPhotosVideos()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get timeline
     */
    getTimeline(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-timeline')
                .subscribe((timeline: any) => {
                    this.timeline = timeline;
                    this.timelineOnChanged.next(this.timeline);
                    resolve(this.timeline);
                }, reject);
        });
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-about')
                .subscribe((about: any) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

    /**
     * Get photos & videos
     */
   /* getPhotosVideos(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-photos-videos')
                .subscribe((photosVideos: any) => {
                    this.photosVideos = photosVideos;
                    this.photosVideosOnChanged.next(this.photosVideos);
                    resolve(this.photosVideos);
                }, reject);
        });
    }*/
    postFile(selectedFile: File,id, message, flag){
        //const endpoint = 'assets/uploads';
        const formData: FormData = new FormData();
        formData.append('fileKey', selectedFile, selectedFile.name);
       
        formData.append('id',id);
        formData.append('message', message);
        formData.append('flag',flag);
        return this._httpClient.post(this.API_URL+'/profileUpload', formData,this.options);
      }
      getPostFiles(id)
      {
return this._httpClient.get<Posts[]>(this.API_URL+'/getPostFiles/'+id).map(response=>response["0"]);
      }

      getProfileDetails(id)
      {
          return this._httpClient.get<ProfileDetails[]>(this.API_URL+'/getProfileDetails/'+id).map(response=>response["0"]);
      }
      getAssocType(id)
      {
          return this._httpClient.get(this.API_URL+'/getAssociateType/'+id).map(response=>response["0"]);
      }
      editProfileDetails(values)
      {
          var data=JSON.stringify(values);
          return this._httpClient.post(this.API_URL+'/editProfileDetails', data, this.options);

      }
      getPhotosVideos(id)
      {
return this._httpClient.get<Posts[]>(this.API_URL+'/getPhotosVideos/'+id).map(response=>response["0"]);
      }
      deletePost(id)
      {
        
          return this._httpClient.get(this.API_URL+'/deletePost/'+id).map(response=>response["0"]);
      }
      getActivityDetails(id)
      {
          return this._httpClient.get<Activities[]>(this.API_URL+'/getActivityDetails/'+id).map(response=>response["0"]);
          
      }
      sharePost(id, user_ID)
      {
        return this._httpClient.get(this.API_URL+'/sharePost/'+id+'/'+user_ID).map(response=>response["0"]);
      }
      getCivilServices()
      {
          return this._httpClient.get<Services[]>(this.API_URL+'/getCivilServices').map(response=>response["0"]);
      }
      getSegments()
      {
          return this._httpClient.get<Segments[]>(this.API_URL+'/getSegments').map(response=>response["0"]);
      }
      saveServices(value, id)
      {
        //var data=JSON.stringify(value);
        return this._httpClient.post(this.API_URL+'/saveServices', {param1: value, param2:id},this.options);
      }
      postArticle(selectedFile: File,id,artID, title,post, flag)
      {
      
            //const endpoint = 'assets/uploads';
            const formData: FormData = new FormData();
            formData.append('fileKey', selectedFile, selectedFile.name);
           
            formData.append('id',id);
            formData.append('artID',artID);
          
            formData.append('title', title);
            formData.append('post',post);
            formData.append('flag',flag);
            return this._httpClient.post(this.API_URL+'/saveArticle', formData,this.options);
       
      }
      getArticleOnTimeline(id)
      {
        return this._httpClient.get<Articles[]>(this.API_URL+'/getArticleOnTimeline/'+id).map(response=>response["0"]);
      }

      viewArticle(id)
      {
        return this._httpClient.get<Articles[]>(this.API_URL+'/viewArticle/'+id).map(response=>response["0"]);
      }
      deleteArticle(id)
      {
        return this._httpClient.get(this.API_URL+'/deleteArticle/'+id).map(response=>response["0"]); 
      }
      getArticleByAssoc(id)
      {
        return this._httpClient.get<Articles[]>(this.API_URL+'/getArticleByAssoc/'+id).map(response=>response["0"]);
      }
      getArticleByArticleID(id)
      {
        return this._httpClient.get<Articles[]>(this.API_URL+'/viewArticle/'+id).map(response=>response["0"]); 
      }
      getCertificationDetails(id)
      {
          return this._httpClient.get<Certifications[]>(this.API_URL+'/getCertificationDetails/'+id).map(response=>response["0"]); 
      }
}
