import { Component,OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Validators} from '@angular/forms';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { TenderAssocs } from '../tenderAssocs';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class TenderDetailsComponent implements OnInit {

  quoteFormGroup: FormGroup;
  assocs:TenderAssocs[];
  typeDisable : boolean=false;
  quantity : number;
  disAssoc : boolean=true;
  itemNo : number=0;
  flagNo : number=0;

  constructor(public dialogRef: MatDialogRef<TenderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private formBuilder: FormBuilder,public projectService:ProjectModuleService) { 
       this.quoteFormGroup = new FormGroup(
        {
         
          workID : new FormControl(),
          MEID : new FormControl(),
          assocName : new FormControl(),
          itemName : new FormControl(),
          unit : new FormControl(),
          rate : new FormControl(),
          quantity1 : new FormControl(),
          labNo : new FormControl(),
          days : new FormControl(),
          MEName : new FormControl(),
          comment : new FormControl(),
          qty : new FormControl(),
          WTID :new FormControl(),
          itemID : new FormControl(),
          countItem : new FormControl(),
          countFlag : new FormControl()
          
        });
        this.quoteFormGroup = this.formBuilder.group({
          workID : [''],
          MEID : [''],
          MEName : [''],
          assocName : ['', Validators.required],
          itemName : ['', Validators.required],
          unit : [''],
          rate : ['', Validators.required],
          quantity1 : ['', Validators.required ],
          labNo :[''],
        days : [''],
        comment : [''],
        qty :[''],
        WTID :[''],
        itemID :[''],
        countItem :[''],
        countFlag :['']
         
        }); }

  ngOnInit() 
  {
    
    this.typeDisable=true; 
    this.quoteFormGroup.controls['workID'].setValue(this.data['workid']);
    this.quoteFormGroup.controls['MEID'].setValue(this.data['ME_ID']);
    this.quoteFormGroup.controls['qty'].setValue(this.data['quantity']);
    this.quoteFormGroup.controls['itemName'].setValue(this.data['name']);
    this.quoteFormGroup.controls['unit'].setValue(this.data['unit']);
    this.quoteFormGroup.controls['quantity1'].setValue(this.data['quantity']);
    this.quoteFormGroup.controls['itemID'].setValue(this.data['itemID']);
    this.quantity=this.data['quantity'];
    this.quoteFormGroup.controls['itemName'].disable();
    this.quoteFormGroup.controls['quantity1'].disable();
    this.quoteFormGroup.controls['assocName'].disable();
    this.quoteFormGroup.controls['unit'].disable();
    this.quoteFormGroup.controls['WTID'].setValue(this.data['assoc']);
      if(this.data['type']!='Material Only')
   {
this.typeDisable=false;
   }
   
this.projectService.getSelectedAssocs(this.data['workid']).subscribe(result=>{
this.assocs=result;});

this.getAssocName();


  }
  saveTenderDetailsMaterial(values)
  {
    
    
    this.projectService.saveTenderLabDetails(values).subscribe(result => {console.log(result);
      if(result['Success']==true)
      {
       this.dialogRef.close();
      }
     
    })
   
   
    
  
  }
  getAssocName()
  {
this.projectService.getAssocName(this.data['assoc']).subscribe(result=>{
  this.quoteFormGroup.controls['assocName'].setValue(result[0]["Assoc_FirstName"]+" "+result[0]["Assoc_LastName"])
})
  }
  clearValues()
  {
    this.quoteFormGroup.controls['rate'].clearValidators();
    this.quoteFormGroup.controls['assocName'].clearValidators();
    this.quoteFormGroup.controls['rate'].setValue('');
    this.quoteFormGroup.controls['comment'].setValue('');

  }
  getCountItemsLab($id)
  {
    
    this.projectService.getCountItemsLabTender($id).subscribe(result=>{
      this.quoteFormGroup.controls['countItem'].setValue(result);
      this.itemNo=result;
      
    });
    this.projectService.getCountFlagsLabTender($id).subscribe(result1=>{
   
      this.quoteFormGroup.controls['countFlag'].setValue(result1);
      this.flagNo=result1;
    });
    if(this.itemNo==this.flagNo)
    {
      
    }
  }

}
