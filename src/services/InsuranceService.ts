import {InsuranceUrl} from "../constants/Config";
import { APICallerPost } from "./BaseService";
import { LoginMetadata } from "../models/LoginMetadata";
export class InsuranceService{
    public static async getInsuranceDetails(loginMetadata:LoginMetadata,mobile :any, forceRefresh: boolean):Promise<any>{
        const body = {
            mobile: mobile
        };
        const result = await APICallerPost<any,any>(
            InsuranceUrl,
            body,
            loginMetadata,
            "InsuranceDetails",
            !forceRefresh,
            24*60*60,
            true,
            "Insurance/InsuranceDetails"
        ).then((response) => {
            return response;
        }).catch((error) => {
            throw error;
        })
        return result;
    }
}