import { DBSyncURL, FetchMemberDataURL } from "../constants/Config";
import { LoginMetadata } from "../models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export class DBservice {
    public static async DBSync(
      loginMetadata: LoginMetadata,
    ): Promise<any> {
      const body = {};
  
      const result = await APICallerPost<any, any>(
        DBSyncURL,
        body,
        loginMetadata,
        "",
        true,
        0,
        true,
        "Helpdesk/GetSummaryForUser"
      )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
      return result;
    }
    public static async FetchMemberData(
        loginMetadata: LoginMetadata,
      ): Promise<any> {
        const body = {};
    
        const result = await APICallerPost<any, any>(
            FetchMemberDataURL,
          body,
          loginMetadata,
          "",
          false,
          0,
          true,
          "Helpdesk/GetSummaryForUser"
        )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });
        return result;
      }
}