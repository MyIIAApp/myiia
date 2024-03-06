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
}
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


 
   
  static ExtractFirstTwoDigits(inputString) {
    if(!inputString) return "";
    return inputString.slice(0, 2);
  }

  static DateFormate(){
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB');
    return formattedDate;
  }


  public static async updateInvoiceId(userid,fullinvoicenum){
    const data = {
      userid:userid,
      fullinvoicenum:fullinvoicenum
    }
    const response  = await fetch(`https://iiaonline.in/updateInvoiceNumber.php`,{
      method:"POST",
      body: JSON.stringify(data),
    });
    return response;
  }

 

  public static async BeforeInvoiceSave(props){
    const data = {
      Version: "1.1",
      TranDtls: { //done
        TaxSch: "GST",
        SupTyp: "B2B",
        RegRev: "Y",
        EcmGstin: null,
        IgstOnIntra: "N"
      },
      DocDtls: {
        Typ: "INV",
        No: 'SFMUMINV2300834',//(props.userId).toString(),
        Dt: PaymentService.DateFormate()
      },
      BuyerDtls: { //done
        Gstin: props.userdetails.gstin,
        LglNm: props.userdetails.unitName,
        TrdNm: props.userdetails.unitName,
        Pos: PaymentService.ExtractFirstTwoDigits(props.userdetails.gstin),
        Addr1: props.userdetails.address,
        Addr2: props.userdetails.address,
        Loc: props.userdetails.district,
        Pin: props.userdetails.pincode,
        Stcd: PaymentService.ExtractFirstTwoDigits(props.userdetails.gstin),
        Ph: props.userdetails.PhoneNumber,
        Em: props.userdetails.email
      },
      SellerDtls: { //done
        Gstin: "09AAATI4647K1ZB",
        LglNm: "INDIAN INDUSTRIES ASSOCIATION",
        TrdNm: "INDIAN INDUSTRIES ASSOCIATION",
        Addr1: "IIA Bhawan, Vibhuti Khand, Phase II, Gomti Nagar",
        Addr2: "IIA Bhawan, Vibhuti Khand, Phase II, Gomti Nagar",
        Loc: "Lucknow",
        Pin: 226010,
        Stcd: "09",
        Ph: "0522-2720090",
        Em: "admin@iiaonline.in",
        chapterId:props.loginMetadata.chapterId,
      },
      DispDtls: { //done
        Nm: "ABC company pvt ltd",
        Addr1: "7th block, kuvempu layout",
        Addr2: "kuvempu layou",
        Loc: "Banagalore",
        Pin: 562160,
        Stcd: "29"
      },
      ShipDtls: { //done
        Gstin: props.userdetails.gstin,
        LglNm: props.userdetails.unitName,
        TrdNm: props.userdetails.unitName,
        Addr1: props.userdetails.address,
        Addr2: props.userdetails.address,
        Loc: props.userdetails.district,
        Pin: 562160,
        Stcd: PaymentService.ExtractFirstTwoDigits(props.userdetails.gstin)
      },
      EwbDtls: { //done
        TransId: "12AWGPV7107B1Z1",
        TransName: "XYZ EXPORTS",
        TransMode: "1",
        Distance: 100, //madtoary
        TransDocNo: "DOC01",
        TransDocDt: "18/08/2020",
        VehNo: "ka123456",
        VehType: "R"
      },
      ExpDtls: {
        ShipBNo: "A-248",
        ShipBDt: "01/08/2020",
        CntCode: "AE",
        ForCur: "AED",
        Port: "INABG1",
        RefClm: "N",
        ExpDuty: 0
      },
      ItemList: [
        {
          AttribDtls: [
            { Nm: "Rice", Val: "10000" }
          ],
          PrdSlNo: "0",
          OrgCntry: null,
          OrdLineRef: null,
          TotItemVal:(props.dashboardobj.membershipFee + props.dashboardobj.admissionFee + props.dashboardobj.igst+props.dashboardobj.sgst + props.dashboardobj.cgst)-0,//full amt
          OthChrg: 0,
          StateCesNonAdvlAmt: 0,
          StateCesAmt: 0,
          StateCesRt: 0,
          CesNonAdvlAmt: 0,
          CesAmt: 0,
          CesRt: 0,

          SgstAmt: props.dashboardobj.sgst,
          CgstAmt: props.dashboardobj.cgst,
          IgstAmt: props.dashboardobj.igst,
          
          Qty: 1,
          AssAmt:  props.dashboardobj.membershipFee + props.dashboardobj.admissionFee, //membership fee
          PreTaxVal: 0,
          Discount: 0,
          TotAmt: props.dashboardobj.membershipFee + props.dashboardobj.admissionFee, //full amt
          UnitPrice:props.dashboardobj.membershipFee, //membership fee
          Unit: "NOS", 
          FreeQty:0,
          GstRt: 18,
          Barcde: "0",
          BchDtls: { Nm: "123456", ExpDt: `31/03/${props.expiryYear}`, WrDt: PaymentService.DateFormate },
          HsnCd: "1001",
          IsServc: "N",
          PrdDesc: "",
          SlNo: "1"
        },
        // { 
        //   AttribDtls: [
        //     { Nm: "Rice", Val: "10000" }
        //   ],
        //   PrdSlNo: "12345",
        //   OrgCntry: null,
        //   OrdLineRef: null,
        //   TotItemVal: 3225.6,
        //   OthChrg: 0,
        //   StateCesNonAdvlAmt: 0,
        //   StateCesAmt: 0,
        //   StateCesRt: 0,
        //   CesNonAdvlAmt: 0,
        //   CesAmt: 0,
        //   CesRt: 0,
        //   SgstAmt: 172.8,
        //   CgstAmt: 172.8,
        //   IgstAmt: 0,
        //   Qty: 12,
        //   AssAmt: 2880,
        //   PreTaxVal: 0,
        //   Discount: 0,
        //   TotAmt: 2880,
        //   UnitPrice: 240,
        //   Unit: "PCS",
        //   FreeQty: 0,
        //   GstRt: 12,
        //   Barcde: null,
        //   BchDtls: { Nm: "123456", ExpDt: "01/08/2020", WrDt: "01/09/2020" },
        //   HsnCd: "9405",
        //   IsServc: "N",
        //   PrdDesc: null,
        //   SlNo: "2"
        // }
      ],
      ValDtls: {
        AssVal: (props.dashboardobj.membershipFee + props.dashboardobj.admissionFee) - 0,
        CgstVal: props.dashboardobj.cgst,
        SgstVal: props.dashboardobj.sgst,
        IgstVal: props.dashboardobj.igst,
        CesVal: 0,
        StCesVal: 0,
        RndOffAmt: 0,
        TotInvVal: props.dashboardobj.membershipFee + props.dashboardobj.admissionFee + props.dashboardobj.igst+props.dashboardobj.sgst + props.dashboardobj.cgst,
        TotInvValFc: 0,
        Discount: 0,
        OthChrg: 0
      },
      PayDtls: {
        Nm: "ABCDE",
        AccDet: "5697389713210",
        Mode: "Cash",
        FinInsBr: "SBIN11000",
        CrTrn: "test",
        PayInstr: "Gift",
        PayTerm: "100",
        DirDr: "test",
        CrDay: 100,
        PaidAmt: 10000,
        PaymtDue: 5000
      },
      RefDtls: {
        InvRm: "TEST",
        PrecDocDtls: [
          { InvNo: "DOC/002", InvDt: "01/08/2020", OthRefNo: "123456" }
        ],
        ContrDtls: [
          {
            RecAdvDt: "01/08/2020",
            RecAdvRefr: "Doc/003",
            TendRefr: "Abc001",
            ContrRefr: "Co123",
            ExtRefr: "Yo456",
            ProjRefr: "Doc-456",
            PORefr: "Doc-789",
            PORefDt: "01/08/2020"
          }
        ],
        DocPerdDtls: { InvStDt: "01/08/2020", InvEndDt: "01/09/2020" }
      },
      AddlDocDtls: [
        { Url: "https://einv-apisandbox.nic.in", Docs: "Test Doc", Info: "Document Test" }
      ]
    };
    //https://iiaonline.in
    // https://iiaonline.in/e_invoicing_iia.php 
    // const newdata = {
    //   invoice1:'SFMUMINV2300866'
    // }
    const response = await fetch(`https://iiaonline.in/e_invoicing_iia.php`, {
	    method: "POST", 
	    body: JSON.stringify(data),
	  }).then(res=>{
      return res.json();
    });
    return response;
  }

    /////////////////////////////////////////////31-01-2024 for NON-Member////////////////////////////////////////////////////////////////////

  public static async BeforeInvoiceSaveForNonMember(user,prop){
    const data = {
      Version: "1.1",
      TranDtls: { //done
        TaxSch: "GST",
        SupTyp: "B2B",
        RegRev: "Y",
        EcmGstin: null,
        IgstOnIntra: "N"
      },
      DocDtls: {
        Typ: "INV",
        No: 'SFMUMINV2300834',//(user.userId).toString(),
        Dt: PaymentService.DateFormate()
      },
      BuyerDtls: { //
        Gstin: user.gstin,
        LglNm: user.Name,
        TrdNm: user.Name,
        Pos: PaymentService.ExtractFirstTwoDigits(user.gstin),
        Addr1: user.Address,
        Addr2: user.Address,
        Loc: user.states,
        Pin: user.pincode,
        Stcd: PaymentService.ExtractFirstTwoDigits(user.gstin),
        Ph: user.PhoneNumber,
        Em: user.Email
      },
      SellerDtls: { //done
        Gstin: "09AAATI4647K1ZB",
        LglNm: "INDIAN INDUSTRIES ASSOCIATION",
        TrdNm: "INDIAN INDUSTRIES ASSOCIATION",
        Addr1: "IIA Bhawan, Vibhuti Khand, Phase II, Gomti Nagar",
        Addr2: "IIA Bhawan, Vibhuti Khand, Phase II, Gomti Nagar",
        Loc: "Lucknow",
        Pin: 226010,
        Stcd: "09",
        Ph: "0522-2720090",
        Em: "admin@iiaonline.in",
        chapterId:prop.loginMetadata.chapterId,
      },
      DispDtls: { //done
        Nm: "ABC company pvt ltd",
        Addr1: "7th block, kuvempu layout",
        Addr2: "kuvempu layou",
        Loc: "Banagalore",
        Pin: 562160,
        Stcd: "29"
      },
      ShipDtls: { //done
        // Gstin: user.userdetails.gstin,
        // LglNm: user.userdetails.unitName,
        // TrdNm: user.userdetails.unitName,
        // Addr1: user.userdetails.address,
        // Addr2: user.userdetails.address,
        // Loc: user.userdetails.district,
        Pin: 562160,
        Stcd: PaymentService.ExtractFirstTwoDigits(user.gstin)
      },
      EwbDtls: { //done
        TransId: "12AWGPV7107B1Z1",
        TransName: "XYZ EXPORTS",
        TransMode: "1",
        Distance: 100, //madtoary
        TransDocNo: "DOC01",
        TransDocDt: "18/08/2020",
        VehNo: "ka123456",
        VehType: "R"
      },
      ExpDtls: {
        ShipBNo: "A-248",
        ShipBDt: "01/08/2020",
        CntCode: "AE",
        ForCur: "AED",
        Port: "INABG1",
        RefClm: "N",
        ExpDuty: 0
      },
      ItemList: [
        ...user.itemList
      ],
      ValDtls: {
        AssVal: user.subt,
        CgstVal: user.dashboardObject.cgst,
        SgstVal: user.dashboardObject.sgst,
        IgstVal: user.dashboardObject.igst,
        CesVal: 0,
        StCesVal: 0,
        RndOffAmt: 0,
        TotInvVal: user.totalgst,
        TotInvValFc: 0,
        Discount: 0,
        OthChrg: 0
      },
      PayDtls: {
        Nm: "ABCDE",
        AccDet: "5697389713210",
        Mode: "Cash",
        FinInsBr: "SBIN11000",
        CrTrn: "test",
        PayInstr: "Gift",
        PayTerm: "100",
        DirDr: "test",
        CrDay: 100,
        PaidAmt: 10000,
        PaymtDue: 5000
      },
      RefDtls: {
        InvRm: "TEST",
        PrecDocDtls: [
          { InvNo: "DOC/002", InvDt: "01/08/2020", OthRefNo: "123456" }
        ],
        ContrDtls: [
          {
            RecAdvDt: "01/08/2020",
            RecAdvRefr: "Doc/003",
            TendRefr: "Abc001",
            ContrRefr: "Co123",
            ExtRefr: "Yo456",
            ProjRefr: "Doc-456",
            PORefr: "Doc-789",
            PORefDt: "01/08/2020"
          }
        ],
        DocPerdDtls: { InvStDt: "01/08/2020", InvEndDt: "01/09/2020" }
      },
      AddlDocDtls: [
        { Url: "https://einv-apisandbox.nic.in", Docs: "Test Doc", Info: "Document Test" }
      ]
    };
    //https://iiaonline.in
    const response = await fetch(`https://iiaonline.in/e_invoice_non_member.php`, {
	    method: "POST", 
	    body: JSON.stringify(data),
	  }).then(res=>{
      return res.json();
    });
    return response;
  }

  public static async Updatenonmember(phone,gstin,name,invoiceId){
    const data = {
      phone:phone,
      gstin:gstin,
      name:name,
      invoiceId:invoiceId
    }
    const response  = await fetch(`https://iiaonline.in/update_non_member.php`,{
      method:"POST",
      body: JSON.stringify(data),
    });
    return response;
  }

}
