import {VerifyGstNumberUrl} from "../constants/Config";
import { APICallerPost } from "./BaseService";
import { LoginMetadata } from "../models/LoginMetadata";
export class VerifyGSTService{
    public static async VerifyGSTDetails(loginMetadata:LoginMetadata,gstNo :any):Promise<any>{
        const body = {
            gstNo: gstNo
        };
        const result = await APICallerPost<any,any>(
            VerifyGstNumberUrl,
            body,
            loginMetadata,
            "GSTDetails",
            false,
            0,
            false,
            "VerifyGST"
        ).then((response) => {
            return response;
        }).catch((error) => {
            throw error;
        })
        return result;
    }
}