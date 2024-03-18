import {  GetLeadersUrl, Sliderimages } from "../constants/Config";
import { MyIIALeadersExpiry, MyIIALeadersKey, MyIIASliderExpiry, MyIIASliderImageKey } from "../constants/StorageConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { LeaderResponse } from "../models/MyIIA/LeaderResponse";
import { APICallerPost } from "./BaseService";


export class MyIIAService{

    public static async getSliderimages(loginMetadata: LoginMetadata): Promise<any> {

        const body = {Param:'HOME'};

        const result = await APICallerPost<any, any>(
            Sliderimages,
            body,
            loginMetadata ,
            MyIIASliderImageKey,
            true,
            MyIIASliderExpiry,
            true,
            "MyIIASliderimages"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async getLeaders(loginMetadata: LoginMetadata): Promise<LeaderResponse> {
        const body = {
        };
    
        const result = await APICallerPost<LeaderResponse, any>(
          GetLeadersUrl,
          body,
          loginMetadata,
          MyIIALeadersKey,
          true,
          MyIIALeadersExpiry,
          true,
          "MyIIALeaders"
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
