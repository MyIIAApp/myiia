import { GetAdminName, GetAdminSourceGST } from "../constants/Config";
import { LoginMetadata } from "../models/LoginMetadata";
import { APICallerPost } from "./BaseService";

export class AdminNameService {
    public static async GetAdminName(loginMetadata: LoginMetadata):Promise<any>{
        const result = await APICallerPost<any, any>(
            GetAdminName,
            "",
            loginMetadata,
            "",
            false,
            0,
            false,
            "AdminName/GetAdminName"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }

    public static async GetAdminSourceGST(loginMetadata: LoginMetadata):Promise<any>{
        const result = await APICallerPost<any, any>(
            GetAdminSourceGST,
            "",
            loginMetadata,
            "",
            false,
            0,
            false,
            "AdminName/GetAdminSourceGST"
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