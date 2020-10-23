import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { Register2Service } from 'app/main/pages/authentication/register-2/register-2.service';
import { empty } from 'rxjs';
import { ProfileService } from '../../profile.service';
import { ProfileDetails } from '../about/profileDetails';
import { Articles } from '../timeline/articles';
import { Locations } from 'app/main/pages/sales-module/locations';




@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  articleForm : FormGroup;
    User:Array<User>;
    User_ID: number=0;
    Article_ID:number=0;
articles:Articles;
    selectedFile:File = null;
    $fileTypeFlag;
   

    constructor(
        public matDialogRef: MatDialogRef<ArticleComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _profileService: ProfileService, private registerService: Register2Service,
        private _formBuilder: FormBuilder, private sessionSt: SessionStorageService)
       { 
        
          if(this.sessionSt.retrieve('user')!=null){
              this.User=this.sessionSt.retrieve('user')
              this.User_ID=this.User['User_ID'];
              alert(this.User_ID);
          }
       }

  ngOnInit() {
  

    this.articleForm = this._formBuilder.group({
      ArticleID :[''],
      userID :[''],
      title :[''],
      post:[''],
     // image:['']


     
      
    });
    this.Article_ID=this._data['article_ID'];
    //alert('Article ID'+ this.Article_ID);
    this.articleForm.controls['ArticleID'].setValue(this.Article_ID);
    this.getArticleByArtilceID();

  }
  handleFileInput(files: FileList, $value) {
    this.selectedFile = files.item(0);
    console.log(this.selectedFile);
    this.$fileTypeFlag=$value;
    
}
  uploadFileToActivity(values) {
  console.log(values["title"]);
  console.log(values["post"]);
   // alert(this.User_ID);
    //debugger;
    var data=JSON.stringify(values);
    console.log(data);
     this._profileService.postArticle(this.selectedFile, this.User_ID,this.Article_ID, values["title"],values["post"],this.$fileTypeFlag).subscribe(data => {
      console.log(data);
     //this.getMessageAttach();
      
      // this.openSnackBar('Documents uploaded', "OK");
        
      });
      
       
  }

  getArticleByArtilceID()
  {
    this._profileService.getArticleByArticleID(this.Article_ID).subscribe(result=>{console.log(result);
      this.articles=result;
this.articleForm.controls['title'].setValue(result[0]['Article_Title']);
this.articleForm.controls['post'].setValue(result[0]['Article_Post']);

    })
  }

  
  

  

}
