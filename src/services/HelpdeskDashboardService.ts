import { HelpdeskDashboardUrl } from "../constants/Config";
import { APICallerPost } from "./BaseService";

import { LoginMetadata } from "../models/LoginMetadata";
import { HelpdeskDashboard } from "../models/HelpdeskDashboard/HelpdeskDashboard";

export class HelpdeskDashboardService{
    public static async GetMemberDashboard(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean
      ): Promise<HelpdeskDashboard> {
        const body = {
        };
        const result = await APICallerPost<HelpdeskDashboard, any>(
          HelpdeskDashboardUrl,
          body,
          loginMetadata,
          "HelpdeskDashboard",
          !forceRefresh,
          24*60*60,
          true,
          "HelpdeskDashboard/GetHelpdeskDashboard"
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