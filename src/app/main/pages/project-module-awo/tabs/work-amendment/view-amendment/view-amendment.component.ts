import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { LabEstimates } from 'app/main/pages/project-module-bwo/labEstimate';
import { WorkScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/workScheduleDetails';
import { PaymentScheduleDetails } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/paymentScheduleDetails';
import { TermsAndConditions } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-terms-conditions/termsAndCondition';
import { KeyDeliverables } from 'app/main/pages/project-module-bwo/tabs/work-order-prepare/add-key-deliverables/keyDeliverables';
@Component({
    selector     : 'view-amendment',
    templateUrl  : './view-amendment.component.html',
    styleUrls    : ['./view-amendment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ViewAmendmentComponent
{
    User:Array<User>;
    User_ID: number=0;
    Category : number=0;
    dialogRef;
    Work_ID : number=0;
     Site_Flag: number=0;
    Est_Flag : number=0;
    InitWO_Flag : number=0;
    Role_ID : number=0;
    AmendNo : number;
    items:LabEstimates;
    Total : number;
    words_total : string;
    keys:KeyDeliverables;
    terms : TermsAndConditions;
    a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    n ;
    workSched : WorkScheduleDetails;
    paySched :PaymentScheduleDetails;
    constructor(private sessionSt: SessionStorageService, private dialog : MatDialog, private _fuseConfigService:FuseConfigService,
        private projectService : ProjectModuleService,  private activatedRoute: ActivatedRoute)
    {
        if(this.sessionSt.retrieve('user')!=null){
            this.User=this.sessionSt.retrieve('user')
            this.User_ID=this.User['User_ID'];
            this.Category=this.User['User_Category'];
            this.Role_ID=this.User['Role_ID'];
    }
    this._fuseConfigService.config = {
        layout: {
            navbar   : {
                hidden: false
            },
            toolbar  : {
                hidden: true
            },
            footer   : {
                hidden: true
            },
            sidepanel: {
                hidden: false
            }
        }
    };
}
ngOnInit()
{
    this.activatedRoute.params.subscribe((params: Params) => {
        this.Work_ID=params['workid'];
        this.AmendNo=params['amendno'];
        
      });
      this.getAmendedLineItems();
      this.getTotalAmendItems();
      this.getAmendWorkSchedule();
      this.getAmendPaySchedule();
      this.getAmendKeyDeliverables();
      this.getAmendTerms();
}
getAmendedLineItems()
{
    this.projectService.getAmendedLineItems(this.Work_ID, this.AmendNo).subscribe(result=>{
        this.items=result;
    })
}
getTotalAmendItems()
{
    this.projectService.getTotalAmendItems(this.Work_ID,this.AmendNo).subscribe(result=>{
        this.Total=result;
        this.words_total=this.inWords(this.Total);
    })
}
getAmendWorkSchedule()
  {
    this.projectService.getAmendedWorkSchedule(this.Work_ID,this.AmendNo).subscribe(result=>{
      
     this.workSched=result;
     
     
      
    });
  }
  getAmendPaySchedule()
  {
    this.projectService.getAmendedPaySchedule(this.Work_ID,this.AmendNo).subscribe(result=>{
          this.paySched=result;
    });
     
  }
  getAmendKeyDeliverables()
  {
    this.projectService.getAmendedKeyDeliverables(this.Work_ID, this.AmendNo).subscribe(result=>{
          this.keys=result;
       
    });
  }
  getAmendTerms()
  {
    this.projectService.getAmendedTerms(this.Work_ID, this.AmendNo).subscribe(result=>{
      
this.terms=result;

    });
  }
inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    this.n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!this.n) return; var str = '';
    str += (this.n[1] != 0) ? (this.a[Number(this.n[1])] || this.b[this.n[1][0]] + ' ' + this.a[this.n[1][1]]) + 'crore ' : '';
    str += (this.n[2] != 0) ? (this.a[Number(this.n[2])] || this.b[this.n[2][0]] + ' ' + this.a[this.n[2][1]]) + 'lakh ' : '';
    str += (this.n[3] != 0) ? (this.a[Number(this.n[3])] || this.b[this.n[3][0]] + ' ' + this.a[this.n[3][1]]) + 'thousand ' : '';
    str += (this.n[4] != 0) ? (this.a[Number(this.n[4])] || this.b[this.n[4][0]] + ' ' + this.a[this.n[4][1]]) + 'hundred ' : '';
    str += (this.n[5] != 0) ? ((str != '') ? 'and ' : '') + (this.a[Number(this.n[5])] || this.b[this.n[5][0]] + ' ' + this.a[this.n[5][1]]) + 'only ' : '';
    return str;
}
       
}
