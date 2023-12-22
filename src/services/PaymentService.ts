import { GetMembershipProfile, InsertPaymentUrl,GetMissingMembershipYears, GetPaymentHistory, GetInvoice, CreatePaymentUrl, GetPaymentHistoryForAdmin, GetPaymentHistoryForAdminByMember, FetchGSTReportURL, RegenrateOrDeleteInvoiceUrl, GetNonMemberInvoice, RegenrateOrDeleteInvoiceUrlNonMember, GetPaymentByInvoice, GetAllInvoice } from "../constants/Config";
import { insertPaymentExpiry, insertPaymentKey, memberprofileExpiry, memberprofileKey } from "../constants/StorageConstants";
import {  Year, YearDetails } from "../models/financialYear";
import { LoginMetadata } from "../models/LoginMetadata";
import { MembershipProfileModel } from "../models/Membership/MembershipProfileModel";
import { APICallerPost } from "./BaseService";
import {GetPaymentDetails} from "../constants/Config";
import {paymentDetails} from "../models/paymentDetails"
import NonMemberItemDetailsModel from "../models/Payment/NonMemberItemDetailsModel";
import { createGesture } from "@ionic/react";
import { PaymentRecordResponse } from "../models/Payment/PaymentRecordAllInvoiceResponse";


export class PaymentService{

    public static async getUserProfile(loginMetadata: LoginMetadata,forceRefresh:boolean,body:any ): Promise<MembershipProfileModel> {
        const result = await APICallerPost<MembershipProfileModel, any>(
            GetMembershipProfile,
            body,
            loginMetadata,
            memberprofileKey,
            false,
            memberprofileExpiry,
            true,
            "Payment/UserProfile"
        ).then((response) => {
          
            return response;
          })
          .catch((error) => {
            throw error;
          })
        return result;
      }
      public static async GetMissingMembershipYears(loginMetadata: LoginMetadata,forceRefresh:boolean,phoneNumber:string,memberId:string,userId:number): Promise<any>{
        
        const body = {
          phoneNumber:phoneNumber,
          memberId:memberId,
          userId:userId
        };
        
        const result = await APICallerPost<any, any>(
            GetMissingMembershipYears,
            body,
            loginMetadata,
            insertPaymentKey,
            false,
            insertPaymentExpiry,
            true,
            "Payment/InsertPayment"
        ).then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          })
        return result;
    }
    public static async paymentDetailService(loginMetadata: LoginMetadata,forceRefresh:boolean,userId:number): Promise<paymentDetails>{{
      const body = {
        userId:userId
      };
      
      const result = await APICallerPost<paymentDetails, any>(
          GetPaymentDetails,
          body,
          loginMetadata,
          "",
          !forceRefresh,
          insertPaymentExpiry,
          true,
          "Payment/paydetails"
      ).then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        })
      return result;
    }
    
}
public static async createPaymentUrl(loginMetadata: LoginMetadata): Promise<any>{{
  
  const result = await APICallerPost<any, any>(
      CreatePaymentUrl,
      null,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Payment/createPaymentUrl"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}

}
public static async GetInvoiceService(loginMetadata: LoginMetadata,userId:number,paymentMode:string,paymentMade:string,chequeNumber:string,startYear:string,expiryYear:string,paymentType: string,subTotal:string,paymentReason2: string,paymentReason: string): Promise<any>{
        
  const body = {
    userId:userId,
    paymentMode:paymentMode,
    paymentMade:paymentMade,
    chequeNumber:chequeNumber,
    startYear:startYear,
    expiryYear:expiryYear,
    paymentType: paymentType,
    subTotal:subTotal,
    paymentReason2: paymentReason2,
    paymentReason: paymentReason
  };
  
  const result = await APICallerPost<any, any>(
    GetInvoice,
      body,
      loginMetadata,
      "",
      false,
      insertPaymentExpiry,
      true,
      "payment/invoice"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}
    public static async paymentHistoryService(loginMetadata: LoginMetadata,forceRefresh:boolean): Promise<any>{{
      const body = {
      };
      
      const result = await APICallerPost<any, any>(
        GetPaymentHistory,
          body,
          loginMetadata,
          "",
          false,
          insertPaymentExpiry,
          true,
          "Payment/History"
      ).then((response) => {
          return response.paymentRecord;
        })
        .catch((error) => {
          throw error;
        })
      return result;
    }
}
public static async paymentHistoryServiceForAdmin(loginMetadata: LoginMetadata,forceRefresh:boolean, startDate: string, endDate: string, reason:string): Promise<any>{{
  const body = {
    startDate: startDate,
    endDate: endDate,
    reason: reason
  };
  
  const result = await APICallerPost<any, any>(
    GetPaymentHistoryForAdmin,
      body,
      loginMetadata,
      "",
      false,
      insertPaymentExpiry,
      true,
      "Payment/History"
  ).then((response) => {
      return response.paymentRecord;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}
}
public static async paymentHistoryServiceForAdminByMember(loginMetadata: LoginMetadata,forceRefresh:boolean, userId: string): Promise<any>{{
  const body = {
    userId: userId
  };
  
  const result = await APICallerPost<any, any>(
      GetPaymentHistoryForAdminByMember,
      body,
      loginMetadata,
      "",
      false,
      insertPaymentExpiry,
      true,
      "Payment/HistoryById"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}
}
public static async paymentServiceForAdminByInvoice(loginMetadata: LoginMetadata,forceRefresh:boolean, invoiceId: string): Promise<any>{{
  const body = {
    invoiceId: invoiceId
  };
  
  const result = await APICallerPost<any, any>(
    GetPaymentByInvoice,
      body,
      loginMetadata,
      "",
      false,
      insertPaymentExpiry,
      true,
      "Payment/HistoryByInvoice"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
    console.log(result)
  return result;
}
}
public static async FetchGSTReport(loginMetadata: LoginMetadata, startDate: string, endDate: string, chapterId: number, reason:string): Promise<any>{{
  const body = {
    startDate: startDate,
    endDate: endDate,
    chapterId: chapterId,
    reason:reason
  };
  
  const result = await APICallerPost<any, any>(
    FetchGSTReportURL,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Payment/History"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}
}
public static async RegenerateOrDeleteInvoice(loginMetadata: LoginMetadata, operation: string, invoiceId: string): Promise<any>{{
  const body = {
    operation: operation,
    invoiceId: invoiceId
  };
  
  const result = await APICallerPost<any, any>(
    RegenrateOrDeleteInvoiceUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Payment/History"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}
}
public static async RegenerateOrDeleteInvoiceNonMember(loginMetadata: LoginMetadata, operation: string, invoiceId: string): Promise<any>{{
  const body = {
    operation: operation,
    invoiceId: invoiceId
  };
  
  const result = await APICallerPost<any, any>(
    RegenrateOrDeleteInvoiceUrlNonMember,
      body,
      loginMetadata,
      "",
      false,
      0,
      true,
      "Payment/History"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}
}3
public static async GetNonMemberInvoiceService(loginMetadata: LoginMetadata,name:string,state:string,address:string,gstin:string,paymentMode:string,checkNumber:string,checkDate:string,phoneNumber:string,itemList:NonMemberItemDetailsModel[],subTotal:number,cgst:number,sgst:number,igst:number){
  const body = {
    name:name,
    state:state,
    address:address,
    gstin:gstin,
    paymentMode:paymentMode,
    checkNumber:checkNumber,
    checkDate:checkDate,
    phoneNumber:phoneNumber,
    itemList:itemList,
    subTotal:subTotal,
    cgst:cgst,
    sgst:sgst,
    igst:igst,
    
  };
  
  const result = await APICallerPost<any, any>(
    GetNonMemberInvoice,
      body,
      loginMetadata,
      "",
      false,
      insertPaymentExpiry,
      true,
      "payment/invoice"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })
  return result;
}

public static async paymentAllInvoices(loginMetadata: LoginMetadata,forceRefresh:boolean, search: string): Promise<any>{{
  const body = {
    search: search
  };
  
  const result = await APICallerPost<PaymentRecordResponse, any>(
    GetAllInvoice,
      body,
      loginMetadata,
      "",
      false,
      insertPaymentExpiry,
      true,
      "Payment/AllInvoice"
  ).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    })

  return result;
}
}

}
