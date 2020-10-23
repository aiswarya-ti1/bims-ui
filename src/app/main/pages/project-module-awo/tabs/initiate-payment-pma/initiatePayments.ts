export class InitiatePayments
{
    InitPay_ID : number;
    Work_ID : number;
    ReqAmount : Float32Array;
    ReqDate :Date;
    MFee_Perc : Float32Array;
    MFee : Float32Array;
    AssocPay : Float32Array;
    PayStatus_ID : number;
    Paid_MFee : Float32Array;
    Paid_AssocPay : Float32Array;
    PaidDate : Date;
    Pay_StatusName : string;
    Cust_ID : number;
    Cust_FirstName : string;
    Cust_MidName : string;
    Cust_LastName : string;
    Assoc_ID : number;
    Assoc_FirstName : string;
    Assoc_MiddleName : string;
    Assoc_LastName : string;
    Trans_ID :number;
    Trans_Type:string;
  
}