import { GetTicketsInExcelUrl } from "../constants/Config";
import { APICallerPost } from "./BaseService";

import { LoginMetadata } from "../models/LoginMetadata";
import { HelpdeskDashboard } from "../models/HelpdeskDashboard/HelpdeskDashboard";

export class DownloadTicketInExcelServices {
  public static async GetMemberDashboard(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean
  ): Promise<any> {
    const body = {};
    const result = await APICallerPost<any, any>(
      GetTicketsInExcelUrl, //url
      body, //body
      loginMetadata, //metadata
      "", //cache key
      false, //use cache
      0, //cache expiry
      false, //update cache
      "getDataInExcel/GetDataInExcel" //key
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
