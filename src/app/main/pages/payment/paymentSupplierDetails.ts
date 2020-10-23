export class PaymentSupplierDetails
{
    PayHistory_ID : number;
    PO_ID : number;
    Bill_No : number;
    Bill_Amount:Float32Array;
    Bill_Date : Date;
    Paid_Amount:Float32Array;
    Supplier_Amount :Float32Array;
    Paid_Supp_Amount :Float32Array;
    Paid_Mangmt_Fee :Float32Array;
    PO_Date :Date;
    Remarks : string;
    Work_ID : number;
    Actual_Pay_Date : Date;
    Actual_Amount : Float32Array;
    Amount_Rec_Flag : number;
    PayStatus_ID : number;
    Management_Fee : Float32Array;
    Assoc_Payable_Amt : Float32Array;
    Management_Fee_Perc : number;
    Cust_ID : number;
    Cust_FirstName : string;
    Cust_MidName : string;
    Cust_LastName : string;
    Assoc_ID : number;
    Assoc_FirstName : string;
    Assoc_MiddleName : string;
    Assoc_LastName : string;
    Trans_ID :number;
  
    Paid_Date : Date;
    Pay_StatusName : string;
    MFee_Flag : number;
    AssocFee_Flag : number;
}