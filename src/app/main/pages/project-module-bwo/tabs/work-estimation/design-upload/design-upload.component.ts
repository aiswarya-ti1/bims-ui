import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import {FormBuilder} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';

@Component({
  selector: 'app-design-upload',
  templateUrl: './design-upload.component.html',
  styleUrls: ['./design-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignUploadComponent implements OnInit {
  selectedFile:File = null;
  work_ID : number=0;
  constructor(public projectService:ProjectModuleService,public dialogRef: MatDialogRef<DesignUploadComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.work_ID=this.data['workid'];
  }

  handleFileInput(files: FileList) {
    this.selectedFile = files.item(0);
    console.log(this.selectedFile);
    
}
uploadFileToActivity() {
 
   this.projectService.postFile(this.selectedFile, this.work_ID,this.data['workid']).subscribe(data => {
     this.openSnackBar('Documents uploaded', "OK");
      
    },  error=>{console.log(error);
    
      this.openSnackBar('Server Error. Please try again!!','OK');
      }
         );
    
     
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
  
}
