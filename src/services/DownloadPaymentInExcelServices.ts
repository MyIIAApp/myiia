import { GetPaymentInExcel } from "../constants/Config";
import { APICallerPost } from "./BaseService";

import { LoginMetadata } from "../models/LoginMetadata";
import { HelpdeskDashboard } from "../models/HelpdeskDashboard/HelpdeskDashboard";

export default class DownloadPaymentInExcelServices {
  public static async GetExcelLink(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean,startDate: string, endDate: string, chapterId: number, opration: string, reason:string
  ): Promise<any> {
    const body = {
      startDate:startDate,
      endDate: endDate,
      chapterId: chapterId,
      opration: opration,
      reason:reason
    } 
    const result = await APICallerPost<any, any>(
      GetPaymentInExcel, //url
      body, //body
      loginMetadata, //metadata
      "", //cache key
      false, //use cache
      0, //cache expiry
      false, //update cache
      "getPaymentInExcel/GetPaymentInExcel" //key
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    return result;
  }
}
