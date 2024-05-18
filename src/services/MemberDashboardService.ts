import { MemberClickedTableUrl, MemberDashboardUrl } from "../constants/Config";
import { APICallerPost } from "./BaseService";

import { LoginMetadata } from "../models/LoginMetadata";
import { MemberDashboard } from "../models/MemberDashboard/MemberDashboard";
import { TableContentExpiry, TableContentKey } from "../constants/StorageConstants";

export class MemberDashboardService{
    // public static async GetMemberDashboard(
    //     loginMetadata: LoginMetadata,
    //     forceRefresh: boolean
    //   ): Promise<MemberDashboard> {
    //     const body = {
    //     };
    //     const result = await APICallerPost<MemberDashboard, any>(
    //       MemberDashboardUrl,
    //       body,
    //       loginMetadata,
    //       "MemberDashboard",
    //       !forceRefresh,
    //       24*60*60,
    //       true,
    //       "MemberDashboard/GetMemberDashboard"
    //     )
    //       .then((response) => {
    //         return response;
    //       })
    //       .catch((error) => {
    //         throw error;
    //       });
    //     return result;
    //   }
    public static async GetMemberDashboard(
      loginMetadata: LoginMetadata,
       forceRefresh: boolean,
       fyear:string
    ):Promise<MemberDashboard> {
          const body = {
            loginMetadata,
            fyear
          };
      const result = await fetch('https://iiaonline.in/newapi_iia/getmemberhsipdashboard_Test.php',{
        method:"POST",
        body:JSON.stringify(body)
      }).then(res=>{
        return res.json();
      })
      return result;
    }
    
      public static async GetNumberClickedData(
        loginMetadata: LoginMetadata,
        dataType: string,
      ): Promise<MemberDashboard> {
        const body = {
          dataType: dataType
        };
        const result = await APICallerPost<any, any>(
          MemberClickedTableUrl,
          body,
          loginMetadata,
          TableContentKey + dataType,
          true,
          TableContentExpiry,
          true,
          "MemberDashboard/GetMemberDashboard"
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