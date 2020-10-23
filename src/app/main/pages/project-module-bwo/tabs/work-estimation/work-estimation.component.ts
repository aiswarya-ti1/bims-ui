import { Component, OnInit, ViewEncapsulation, ViewChild, NgZone } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog,MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import { ProjectModuleBWOComponent } from '../../project-module-bwo.component';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { AddLineItemsFormDialogComponent } from './add-line-items/add-line-items.component';
import { LabEstimates } from '../../labEstimate';
import { EditItemDetailsComponent } from './edit-item-details/edit-item-details.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DesignUploadComponent } from './design-upload/design-upload.component';
import { Services } from 'app/main/pages/profile/tabs/services/services';
import { AddMoreServicesDialogComponent } from './add-more-services/add-more-services.component';
import { SetPriorityItemsFormDialogComponent } from './set-priority-items/set-priority-items.component';
import { ReferencesFormDialogComponent } from './references/references.component';
import { AddTemplatesFormDialogComponent } from './add-template/add-template.component';



@Component({
    selector     : 'work-estimation',
    templateUrl  : './work-estimation.component.html',
    styleUrls    : ['./work-estimation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkEstimationComponent implements OnInit
{
    User_ID:number=0;
    User_Name : string;
    User:Array<User>;
    siteAnalysisFormGroup : FormGroup;
    Work_ID : number=0;
    dialogRef_Items: MatDialogRef<AddLineItemsFormDialogComponent>;
    dialogRef_Edit: MatDialogRef<EditItemDetailsComponent>;
    dialogRef_Design: MatDialogRef<DesignUploadComponent>;
    dialogRef_Service : MatDialogRef<AddMoreServicesDialogComponent>;
    dialogRef_Priority : MatDialogRef<SetPriorityItemsFormDialogComponent>;
    dialogRef_Ref : MatDialogRef<ReferencesFormDialogComponent>;
    dialogRef_Template : MatDialogRef<AddTemplatesFormDialogComponent>;
    Item_Count : number=0;
    design_count : number=0;
    type_ID : number=0;
    items:LabEstimates[];
    Est_Flag : number=0;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>; 
    selectedFile:File = null;
    Role_ID : number=0;
    Serv_ID=[];
    newlist=[];
    services:Services;
    Seg_ID : number=0;
    workStatus : number=0;

    @ViewChild(MatPaginator) paginator: MatPaginator;
   // @ViewChild('filter') filter: ElementRef;
   
    constructor(
        
        private sessionSt: SessionStorageService,
        private _formBuilder: FormBuilder,
        private router:Router,
        private dialog:MatDialog, private sanitizer:DomSanitizer,
        private projectBWOService : ProjectModuleBWOComponent,
private projectService : ProjectModuleService,
        private activatedRoute: ActivatedRoute,public snackBar: MatSnackBar,
        private bwo : ProjectModuleBWOComponent,private zone:NgZone

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
        this.activatedRoute.params.subscribe((params: Params) => {
    
            this.Work_ID=params['workid'];
           
            
          });
          this.getOneWork();
 this.getWorkLineItems();
 this.getWorkLineItemsCount();
 this.getDesignCount();
 this.getServiceIDs(this.Work_ID);
 this.getWorkServices(this.Work_ID);
 
    }
    getServiceIDs($id)
    {
    var ids=[];
    this.projectService.getServiceIDs($id).subscribe(result=>{
         for(var i=0;i<result.length;i++)
      {
        ids.push(result[i]["service_ID"]);
     
    }
     
      this.Serv_ID.push(ids);
    });
    
    
    }
    getOneWork()
    {
        this.projectService.getOneWork(this.Work_ID).subscribe(result=>{
         
            this.Est_Flag=result[0]['Est_Flag'];
            this.Seg_ID=result[0]['Segment_ID'];
            this.workStatus=result[0]['WorkStatus'];
            
            
                })
    }


    getDesignCount()
    {
        this.projectService.getDesignCount(this.Work_ID).subscribe(result=>{
        this.design_count=result;
    })
    }
    getWorkLineItems()
    {
        
    this.projectService.getWorkLineItems(this.Work_ID).subscribe(result=>{
       this.items= result;
    })
    }
    getWorkLineItemsCount()
    {
        
    this.projectService.getWorkLineItemsCount(this.Work_ID).subscribe(result=>{
       this.Item_Count=result;
    })
    }
    rowClick($id, $itemID)
    {
        this.dialogRef_Edit = this.dialog.open(EditItemDetailsComponent, {
            panelClass:'edit-item-details-dialog',
            data      : {
             workid : this.Work_ID,
                          leID : $id,
                          itemid : $itemID
              
            }
        });
      
        this.dialogRef_Edit.afterClosed()
        .subscribe((response: FormGroup) => {
            this.getWorkLineItemsCount();
            this.getWorkLineItems();
           
            if ( !response )
            {
                return;
            }
        });
    }
    addLineItems()
    {
        this.dialogRef_Items = this.dialog.open(AddLineItemsFormDialogComponent, {
            panelClass:'add-line-items-dialog',
            data      : {
             workid : this.Work_ID,
             type : this.type_ID
              
            }
        });
      
        this.dialogRef_Items.afterClosed()
        .subscribe((response: FormGroup) => {
             this.getWorkLineItemsCount();
            this.getWorkLineItems();
           
            if ( !response )
            {
                this.getWorkLineItemsCount();
                this.getWorkLineItems();
                return;
            }
        });
    }
    finishEst()
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish estimation?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                if(result==true)
                {
                    this.projectService.finishEstimate(this.Work_ID).subscribe(result=>{
                     
                           this.getOneWork();
                           this.bwo.getOneWork(this.Work_ID);
                       
                    });
                }
            }
            this.confirmDialogRef = null;
        });
        
    }
    addMoreServices()
    {
        this.dialogRef_Service = this.dialog.open(AddMoreServicesDialogComponent, {
            panelClass:'add-more-services-dialog',
            data      : {
             workid : this.Work_ID,
             segid : this.Seg_ID
            
              
            }
        });
      
        this.dialogRef_Design.afterClosed()
        .subscribe((response: FormGroup) => {
           this.getWorkServices(this.Work_ID);
           
           
            if ( !response )
            {
                this.getWorkServices(this.Work_ID);
                return;
            }
        });
    }
    uploadDesign()
    {
        this.dialogRef_Design = this.dialog.open(DesignUploadComponent, {
            panelClass:'design-upload-dialog',
            data      : {
             workid : this.Work_ID,
            
              
            }
        });
      
        this.dialogRef_Design.afterClosed()
        .subscribe((response: FormGroup) => {
           this.getDesignCount();
           
           
            if ( !response )
            {
                return;
            }
        });
    }
    printEst()
    {
        this.router.navigate(['print-estimate/'+this.Work_ID]);
    }

       downloadDesign()
       {
     this.projectService.downloadDesign(this.Work_ID).subscribe(
      
         (res) => {console.log(res[0]);
           
               window.open(res[0]);
              
         });
      
     
         
     }
     getWorkServices($id)
{
this.projectService.getWorkServices($id).subscribe(result=>{
  this.services=result;
})
}
setPriority()
{
    this.dialogRef_Priority = this.dialog.open(SetPriorityItemsFormDialogComponent, {
        panelClass:'set-priority-items-dialog',
        data      : {
         workid : this.Work_ID,
        
          
        }
    });
  
    this.dialogRef_Priority.afterClosed()
    .subscribe((response: FormGroup) => {
     this.getWorkLineItems();
       
       
        if ( !response )
        {
            return;
        }
    });
}

addTemplate()
{
    this.dialogRef_Template = this.dialog.open(AddTemplatesFormDialogComponent, {
        panelClass:'add-template-dialog',
        data      : {
        workid : this.Work_ID
        }
    });
  
    this.dialogRef_Template.afterClosed()
    .subscribe((response: FormGroup) => {
        
        this.getWorkLineItemsCount();
        this.getWorkLineItems();
       
        if ( !response )
        {  this.getWorkLineItemsCount();
            this.getWorkLineItems();
       
        }
    }); 
}
}
