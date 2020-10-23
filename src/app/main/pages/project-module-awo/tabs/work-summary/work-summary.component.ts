import { Component, OnInit, ViewEncapsulation,ViewChild, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ProjectModuleService } from 'app/main/pages/project-module/project-module.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ReceivedPayments } from './recievedPayments';
import { InitiatePayments } from '../payment-initiation/initiatePayments';
import { MatSnackBar } from '@angular/material';


@Component({
   
    selector     : 'work-summary',
    templateUrl  : './work-summary.component.html',
    styleUrls    : ['./work-summary.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkSummaryComponent implements OnInit
{
  Work_ID :number;
  payments :ReceivedPayments[];
  initPayments :InitiatePayments[];
  GrandTotal : number;
  TotalRecAmount : number;
  InitTotal : number;
  PaidTotal : number;
  BalCust : number;
  AcBal : number;
  MFee : number;
  AssocFee: number;
  TotalSplitAmount : number;
  TotalWO : number;
  
  constructor(public projectService:ProjectModuleService, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar) 
    { 
    }
    ngOnInit(): void
    {
      this.activatedRoute.params.subscribe((params: Params) => {
            
        this.Work_ID=params['workid'];     
        });
     
        this.getAllRecievedPayments();
        this.getTotals();

    }
    getAllRecievedPayments()
    {
      //debugger;
      this.projectService.getAllRecievedPayments(this.Work_ID).subscribe(result=>{console.log(result);
        this.payments=result;
      })
    }
    getTotals()
    {
      //debugger;
      this.projectService.getAllTotals(this.Work_ID).subscribe(result=>{console.log(result);
        this.GrandTotal=result['GrandTotal'];
        this.TotalRecAmount=result['RecAmount']
        this.TotalSplitAmount=result['RecAmountSplit'];
        this.InitTotal=result['Init'];
        this.PaidTotal=result['Paid'];
        this.BalCust=result['CustBal'];
        this.AcBal=result['AcBal'];
        this.MFee=result['Mfee'];
        this.AssocFee=result['AssocFee'];
        this.TotalWO=result['TotalWorkAmt'] ;
      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        }
            )
    }
    getAllPaidPayments()
    {
      this.projectService.getAllPaidPayments(this.Work_ID).subscribe(result=>{console.log(result);
        this.initPayments=result;

      },  error=>{console.log(error);
    
        this.openSnackBar('Server Error. Please try again!!','OK');
        }
            )
    }
   

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }   
}



    

