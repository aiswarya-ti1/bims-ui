import {PipeTransform, Pipe} from '@angular/core';
import { InitiatePayments } from 'app/main/pages/project-module-awo/tabs/payment-initiation/initiatePayments';
import { extractStyleParams } from '@angular/animations/browser/src/util';
import { DatePipe } from '@angular/common';


@Pipe({
    name : 'mFeeFilter',
    

})
export class MFeeFilterPipe implements PipeTransform
{


transform(items: any, workID:number, custName: string, sDate :string, eDate: string ,Paid: string,Unpaid: string){
    
    console.log('EndDate '+eDate)
    if (items && items.length){
       
        return items.filter(item =>{
            var datePipe = new DatePipe("en-US");  
            sDate= datePipe.transform(sDate, 'yyyy-MM-dd');  
            eDate= datePipe.transform(eDate, 'yyyy-MM-dd'); 
            console.log(sDate, eDate);
            //debugger;
            console.log(item.Work_ID,item.Cust_FirstName, item.M_PaidDate, item.eDate)
            if (workID && item.Work_ID != workID){
                console.log(item.Work_ID, typeof(item.workID), workID, typeof(workID));
                return false;
            }
            if (custName && item.Cust_FirstName.toLowerCase().startsWith(custName.toLowerCase())==false){
                return false;
            }
            if (sDate && (item.M_PaidDate >= sDate)==false){
               // console.log(sDate);
                return false;
            }
            if (eDate && (item.M_PaidDate <= eDate)==false){
                return false;
            }
            if (Paid && item.MFee_Flag==0){
                return false;
            }
            if (Unpaid && item.MFee_Flag!=0){
                return false;
            }
            
            return true;
       })
    }
    else{
        return items;
    }
}
/*transform(value: Array<any>, searchTerm: {[key: string]: any }): Array<any> {
    return value.filter(payment => {
        let notMatchingField = Object.keys(searchTerm)
                                     .find(key => payment[key] !== searchTerm[key]);

        return !notMatchingField; // true if matches all fields
    });
}*/
}
