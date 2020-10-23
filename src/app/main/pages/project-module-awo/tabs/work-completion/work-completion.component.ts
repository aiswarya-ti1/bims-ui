import { Component, OnInit, ViewEncapsulation,ViewChild, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog,  MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { Works } from 'app/main/pages/project-module-bwo/works';
import { FinishWorkComponent } from './finish-work/finish-work.component';
@Component({
   
    selector     : 'work-completion',
    templateUrl  : './work-completion.component.html',
    styleUrls    : ['./work-completion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkCompletionComponent implements OnInit
{
    
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    works :Works;
    newlist=[];    
    Site_Flag : number=0;
    Role_ID : number=0;
    dialogRef_Compl : MatDialogRef<FinishWorkComponent>;
    @Input() complFlag : number;    
    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,        
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute

    )
    {
        
       if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.User_Name=this.User['User_Login'];
            this.Role_ID=this.User['Role_ID'];
                }

        
        this.siteAnalysisFormGroup=new FormGroup({
         
        
            });
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.complFlag=0;
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
          
        
  this.getOneWork();  
  this.getServiceList(this.Work_ID);

    }
    getOneWork()
    {
        //debugger;
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
           this.works=result;
           this.complFlag=result[0]['Compl_Flag'];
          
           
                })
    }
    getServiceList($id)
{
  
  //var ids=[];
  this.projectService.getServiceList($id).subscribe(result=>{
   for(var i=0;i<result.length;i++)
  {
    this.newlist.push(result[i]["service_name"]);
  }
    
})

}
workComplete()
{
  
        this.dialogRef_Compl = this.dialog.open(FinishWorkComponent, {
          panelClass:'finish-work-dialog',
          data      : {
            workid : this.Work_ID,
          }
      });
      
      this.dialogRef_Compl.afterClosed()
          .subscribe((response: FormGroup) => {
            this.getOneWork();
            
           if(!response)
           {
           
           }
          
            });
            
            
    
      }
      printCompletion()
      {
        this.router.navigate(['print-completion/'+this.Work_ID]);
      }  
}



    

