import { IsAdmin, IsDev, SendOTPUrl, VerifyOTPUrl } from "../constants/Config";
import {
  LoginMetadataExpiry,
  LoginMetadataKey,
} from "../constants/StorageConstants";
import { BaseResponse2 } from "../models/BaseResponse2";
import { LoginMetadata } from "../models/LoginMetadata";
import { APICallerPost } from "./BaseService";
export class LoginService {
  
  public static async SendOTP(phoneNumber: string): Promise<any> {
    const body = { phoneNumber: phoneNumber, isAdmin: IsAdmin, prod:!IsDev };
    console.log(body);
    const result = await APICallerPost<any, any>(
      SendOTPUrl,
      body,
      new LoginMetadata(""),
      "",
      false,
      0,
      false,
      "Login/SendOTP"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

    public static async VerifyOTP(phoneNumber: string, otp:string , otpToken: string): Promise<BaseResponse2> {

        const body = { 
            "phoneNumber": phoneNumber,
            "otp": otp,
            "isAdmin" : IsAdmin
        };

    const result = await APICallerPost<BaseResponse2, any>(
      VerifyOTPUrl,
      body,
      new LoginMetadata(otpToken),
      LoginMetadataKey,
      true,
      LoginMetadataExpiry,
      true,
      "Login/VerifyOTP"
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
