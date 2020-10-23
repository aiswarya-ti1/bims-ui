import { Component, OnDestroy, OnInit, ViewEncapsulation, Output, EventEmitter, Input  } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { CertificationService } from '../../../certification.service';
import { AssocDetails } from '../../AssocDetails';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { AddNewServiceAssocComponent } from 'app/main/pages/project-module-bwo/tabs/work-tender/add-new-associate/add-new-associate.component';

import { SegmentRates } from '../../segmentRate';
import { Projects } from '../../projects';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { AddServiceRatesNewComponent } from './add-serv-rates-new/add-serv-rates-new.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Documents } from '../verification/documents';
import { AddProductAssociateDialogComponent } from 'app/main/pages/associates/add-prod-associate/add-prod-associate.component';






@Component({
    selector     : 'about-assoc',
    templateUrl  : './about-assoc.component.html',
    styleUrls    : ['./about-assoc.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    providers : [AboutAssociateComponent]
})
export class AboutAssociateComponent implements OnInit
{
    @Output() setAssocStatusFlag=new EventEmitter<number>();
    @Input('type') Type_ID : number;
   
    
  Assoc_ID : number=0;
  details : AssocDetails[];
  projects:Projects[];
  dialogRef_AddNew :MatDialogRef<AddNewServiceAssocComponent>;
  dialogRef_AddNewProdAssoc :MatDialogRef<AddProductAssociateDialogComponent>;
  dialogRef_AddRate : MatDialogRef<AddServiceRatesNewComponent>;
  dialogRef_AddProject : MatDialogRef<AddProjectsComponent>;
  confirmDialogRef : MatDialogRef<FuseConfirmDialogComponent>;
  rateExists : number =0;
  projectExists:number =0;
  displayedColumns :['Segment','Service','Pattern','LRate','LMRate'];
  dataSource;
  assocs : SegmentRates[];
  Status_ID : number;
  Segment_ID : number;
  Seg_Name : string;
  newlist =[];
  seglist=[];
  prodSegList=[];
  prodGroupList=[];
  docs : Documents[];


    constructor(
       
        private _formBuilder: FormBuilder, private certService : CertificationService,
        public snackBar: MatSnackBar,private activatedRoute: ActivatedRoute, private dialog : MatDialog
    )
    {
        
    }
    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
    
      this.Assoc_ID=params['associd'];
     
      
    });
    //alert(this.Type_ID)

    this.getOneAssocDetails(this.Assoc_ID);
    this.getSegmentRate();
    this.getProjects();
    this.getAssocDocs(this.Assoc_ID);
    this.getAssocServices();
    this.getProdSegments();

}

getOneAssocDetails(id)
{
  this.certService.getOneAssociate(id, this.Type_ID).subscribe(result=>{console.log(result);
      this.details=result;
      this.Status_ID=result[0]['Assoc_Status'];
      this.setAssocStatusFlag.emit(this.Status_ID);
     
      this.Segment_ID=result[0]['Segment_ID'];
  },  error=>{console.log(error);
    
    this.openSnackBar('Server Error. Please try again!!','OK');
    })
  this.getAssocServices();
  
}

    
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
 
 
  editContactDetails()
    {
     
      if(this.Type_ID==1){
        this.dialogRef_AddNew = this.dialog.open(AddNewServiceAssocComponent, {
          panelClass:'add-new-associate-dialog',
          data      : {
              typeid : 1,
              associd : this.Assoc_ID
           
          }
      });
    
      this.dialogRef_AddNew.afterClosed()
      .subscribe((response: FormGroup) => {
              this.getOneAssocDetails(this.Assoc_ID);
          if ( !response )
          {
             
            this.getOneAssocDetails(this.Assoc_ID);
          return;
          }
      });
  

      }
      else if(this.Type_ID==2)
      {
        this.dialogRef_AddNewProdAssoc = this.dialog.open(AddProductAssociateDialogComponent, {
          panelClass:'add-prod-associate-dialog',
          data      : {
              typeid : 2,
              associd : this.Assoc_ID
           
          }
      });
    
      this.dialogRef_AddNew.afterClosed()
      .subscribe((response: FormGroup) => {
              this.getOneAssocDetails(this.Assoc_ID);
          if ( !response )
          {
             
            this.getOneAssocDetails(this.Assoc_ID);
          return;
          }
      });
  
      }
     
    }
    editGeneralDetails()
    {
      this.dialogRef_AddNew = this.dialog.open(AddNewServiceAssocComponent, {
        panelClass:'add-new-associate-dialog',
        data      : {
            typeid :  3,
            associd : this.Assoc_ID
         
        }
    });
  
    this.dialogRef_AddNew.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getOneAssocDetails(this.Assoc_ID);
            
        if ( !response )
        {
          this.getOneAssocDetails(this.Assoc_ID);
    
        return;
        }
    });
    }
    getProdSegments()
    {
      this.certService.getProdAssocSegments(this.Assoc_ID).subscribe(result=>{console.log(result);
      //this.prodSegList=result['Segment_Name'];
      for(var i=0;i<result.length;i++)
        {
          this.prodSegList.push(result[i]["Seg_Name"]);
          this.prodGroupList.push(result[i]["Group_Name"]);
        }
    })
    console.log('Seg'+this.prodSegList);
    console.log('Group'+this.prodGroupList);
    }
    getSegmentRate()
    {
      this.certService.getSegmentRate(this.Assoc_ID).subscribe(response=>{console.log(response);
        this.assocs=response;
      
        if(response.length==0)
        {
         this.rateExists=0;
        }
        else{
         this.rateExists=1;
        }
        if(!response){return;}
       
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
    }
    addRates(id, type, name)
    {
      this.dialogRef_AddRate = this.dialog.open(AddServiceRatesNewComponent, {
        panelClass:'add-serv-rates-new-dialog',
        data      : {
            rateid : id,
            typeid : type,
            serv_name : name
         
        }
    });
  
    this.dialogRef_AddRate.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getSegmentRate();
            
        if ( !response )
        {
          this.getSegmentRate();
    
        return;
        }
    });
    }
    chkProjectExists(){
      this.certService.chkProjectExists(this.Assoc_ID).subscribe(result=>{console.log(result);
       
        if(result.length==0)
        {
          this.projectExists=0;
        }
        else{
          this.projectExists=1;
        }
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
    }
    getProjects()
    {
      this.chkProjectExists();
      this.certService.getProjectDetails(this.Assoc_ID).subscribe(result=>{console.log(result);
      this.projects=result;},  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        })
    }
    addProject(id, type)
    {
      this.dialogRef_AddProject = this.dialog.open(AddProjectsComponent, {
        panelClass:'add-projects-dialog',
        data      : {
            associd : this.Assoc_ID,
            custid : id,
            typeid :type
         
        }
    });
  
    this.dialogRef_AddProject.afterClosed()
    .subscribe((response: FormGroup) => {
      this.getProjects();
            
        if ( !response )
        {
           this.getProjects();
    
        return;
        }
    });
    }

    finishRegistration()
    {
      //code for status change
      this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish Registration?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
            if(result==true)
            {
              this.certService.changeRegStatus(this.Assoc_ID).subscribe(results=>{console.log(results);
              //code to run getOneAssociate of certf.html
              this.getOneAssocDetails(this.Assoc_ID);
              }); 
            }
        }
        this.confirmDialogRef = null;
    });
     
    }
    docDownload(type)
{
  this.certService.docDownload(type, this.Assoc_ID).subscribe(
    
      
    (res) => {console.log(res[0]);
           
      window.open(res[0]);
     
  })
}
getAssocDocs(id)
    {
      this.certService.getAssocDocs(id).subscribe(result=>{console.log(result);
        this.docs=result;
      })
    }
    getAssocServices()
    {
      this.certService.getAssocSegments(this.Assoc_ID).subscribe(result1=>{console.log(result1);
        for(var i=0;i<result1.length;i++)
        {
          this.seglist.push(result1[i]["Segment_Name"]);
        }
        console.log(this.seglist);
       
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
      this.certService.getAssocServices(this.Assoc_ID,this.Segment_ID).subscribe(result=>{console.log(result);
        for(var i=0;i<result.length;i++)
        {
          this.newlist.push(result[i]["Service_Name"]);
        }
        console.log(this.newlist);
       
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        });
    }
}
