import {PipeTransform, Pipe} from '@angular/core';
import { InitiatePayments } from 'app/main/pages/project-module-awo/tabs/payment-initiation/initiatePayments';
import { extractStyleParams } from '@angular/animations/browser/src/util';

@Pipe({
    name : 'paymentFilter',
    

})
export class PaymentFilterPipe implements PipeTransform
{
//private counter=0;
/*transform(value:any,searchTerm :any):any
{

if(!searchTerm)
{
    return value;
}
return value.filter(payment=>
    {
        return payment.Cust_FirstName.startsWith(searchTerm)==true;
        
    }
)}*/

transform(items: any, workID:number, custName: string, assocName: string, Init: string, Auth: string ,App: string,MFee: string, AFee: string, Paid : string){
    
    if (items && items.length){
        return items.filter(item =>{
            //debugger;
            //console.log(item.Work_ID,item.Cust_FirstName, item.Assoc_FirstName)
            if (workID && item.Work_ID != workID){
                return false;
            }
            if (custName && item.Cust_FirstName.toLowerCase().startsWith(custName.toLowerCase())==false){
                return false;
            }
            if (assocName && item.Assoc_FirstName.toLowerCase().startsWith(assocName.toLowerCase()) ==false){
                return false;
            }
            if (Init && item.Pay_Status_ID!=1){
                return false;
            }
            if (Auth && item.Pay_Status_ID!=4){
                return false;
            }
            if (App && item.Pay_Status_ID!=2){
                return false;
            }
            if (Paid && item.Pay_Status_ID!=3){
                return false;
            }
            if (MFee && item.MFee_Flag !=1){
                return false;
            }
            if (AFee && item.AssocPay_Flag !=1){
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
