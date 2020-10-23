import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'app/main/user';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { SalesCustomers } from 'app/main/pages/sales-module/salesCustomers';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Works } from 'app/main/pages/project-module-bwo/works';


@Component({
  selector: 'receipt-filter',
  templateUrl: './receipt-filter.component.html',
  styleUrls: ['./receipt-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class ReceiptFilterComponent implements OnInit {
  transactionForm : FormGroup; 
  WorkID:Works[];
  assocs:[];
  customers :SalesCustomers[];
  filteredData;
  fWorkID : number=0;
  fCustID: number=0;
  fType : number;
  fAssocID : number=0;
  Type_ID : number;
  filteredWorkID :Observable<Number[]>;
  fInit : string="false";
  fAuth : string="false";
  fApprove : string="false";
  fMfee : string="false";
  fAFee : string="false";

  
  
  

  constructor(public dialogRef: MatDialogRef<ReceiptFilterComponent>,public projectService:ProjectModuleService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) private data: any,public router:Router,
    private _formBuilder: FormBuilder,private sessionSt:SessionStorageService) { 
      this.transactionForm = new FormGroup(
        {
          payID:new FormControl(),
          typeID : new FormControl(),
          custName : new FormControl(),
          workID : new FormControl(),
          assocName : new FormControl(),
          init : new FormControl(),
          auth : new FormControl(),
          approve : new FormControl(),
          mpaid : new FormControl(),
          apaid : new FormControl(),
          
                   
        });

        this.transactionForm= this._formBuilder.group({
          payID:[''],
          typeID :['', Validators.required],
          custName : [''],
          workID :[''],
          assocName :[''],
          init : [''],
          auth :[''],
          approve:[''],
          mpaid :[''],
          apaid :['']
        
        });
        /*this.filteredWorkID = this.transactionForm.controls['workID'].valueChanges
        .pipe(
          startWith(''),
          map(ID => ID ? this._filterWorkID(ID) : this.WorkID.slice())
        );*/

    }

  ngOnInit() {
   
   this.transactionForm.controls['typeID'].setValue(this.data['typeID']);
   this.Type_ID=this.data['typeID'];
   this.getAllWorkID();
   this.getAllCustomers();
   this.getAllAssocs();
     //this.PayID=this.data['payID'];
  }
  getAllWorkID()
  {
    this.projectService.getAllWorkID().subscribe(result=>{console.log(result);
      this.WorkID=result;
    })
  }
 /* private _filterWorkID(ID: number): Works[] {
   

    return ID.filter( Works=>{return Works.Work_ID.startsWith(ID)==true});
    
  }*/
  getAllCustomers()
  {
    this.projectService.getAllCustomers().subscribe(result=>{console.log(result);
    this.customers=result;
  })
  }
  getAllAssocs()
  {
    this.projectService.getAllAssocs().subscribe(result=>{console.log(result);
      this.assocs=result;
    })
  }
  
  applyFilter(values)
  {
 console.log(values);
 this.fWorkID=values['workID'];
 this.fCustID=values['custName'];
 this.fType=values['typeID'];
 this.fAssocID=values['assocName'];
 this.fInit=values['init'];
 this.fAuth=values['auth'];
 this.fApprove=values['approve'];
 this.fMfee=values['mpaid'];
 this.fAFee=values['apaid'];

 console.log('Work '+this.fWorkID+','+'Cust'+this.fCustID+','+'Type '+this.fType+'Assoc '+this.fAssocID)
 console.log('Init'+this.fInit+'Auth '+this.fAuth+'Approve'+this.fApprove+'MFee '+this.fMfee +'AFee' +this.fAFee);
//     this.projectService.applyFilter(values).subscribe(result=>{console.log(result);
//       this.filteredData=result;
//     })
  }
 closeDialog()
 {
   
  this.fWorkID=0;
  this.fCustID=0;
  
  this.fAssocID=0;
  this.fInit='';
  this.fAuth='';
  this.fApprove='';
  this.fMfee='';
  this.fAFee='';
  console.log('FInit '+this.fInit);
  this.dialogRef.close();
 }

}
