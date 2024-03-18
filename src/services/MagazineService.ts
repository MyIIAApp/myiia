import { LoginMetadata } from "../models/LoginMetadata";
import { MagazineResponse } from "../models/Magazine/MagazineResponse";
import { APICallerPost } from "./BaseService";
import { CreateMagazineUrl, GetAllMagazineUrl, GetMagazineByMonthAndYearUrl, GetCurrentMagazineUrl, GetPastMagazineUrl } from "../constants/Config";
import { MagazineKey, MagazineExpiry } from "../constants/StorageConstants";

export class MagazineService {
    public static async CreateMagazine(
        loginMetadata: LoginMetadata,
        title: string,
        magazinePath: string,
        magazineMonth: string,
        magazineYear: string,
        coverPhotoPath: string,
        opration: string
    ): Promise<MagazineResponse> {
        const body = {
            title: title,
            magazinePath: magazinePath,
            magazineMonth: magazineMonth,
            magazineYear: magazineYear,
            coverPhotoPath: coverPhotoPath,
            opration: opration
        };

        const result = await APICallerPost<any, any>(
            CreateMagazineUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Magazine/CreateMagazine"
          )
            .then((response) => {
              return response;
            })
            .catch((error) => {
              throw error;
            });
          return result;
    }

    public static async GetCurrentMagazine(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean
      ): Promise<MagazineResponse> {
    
        const result = await APICallerPost<MagazineResponse, any>(
            GetCurrentMagazineUrl,
            "",
            loginMetadata,
            MagazineKey,
            !forceRefresh,
            MagazineExpiry,
            true,
            "Magazine/GetCurrentMagazine"
        )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });
          console.log(result)
        return result;
      }
      
      public static async GetPastMagazine(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean
      ): Promise<MagazineResponse> {
    
        const result = await APICallerPost<MagazineResponse, any>(
            GetPastMagazineUrl,
            "",
            loginMetadata,
            MagazineKey,
            !forceRefresh,
            MagazineExpiry,
            true,
            "Magazine/GetPastMagazine"
        )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });
          console.log(result)
        return result;
      }

      public static async GetMagazineByMonthAndYear(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean,
        magazineMonth: string,
        magazineYear: string
      ): Promise<MagazineResponse> {
        const body = {
          magazineMonth: magazineMonth,
          magazineYear: magazineYear
      };
    
        const result = await APICallerPost<MagazineResponse, any>(
            GetMagazineByMonthAndYearUrl,
            body,
            loginMetadata,
            MagazineKey,
            !forceRefresh,
            MagazineExpiry,
            true,
            "Magazine/GetMagazineByMonthAndYear"
        )
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });
        return result;
      }
      
      public static async GetAllMagazine(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean
      ): Promise<MagazineResponse> {
        
        const result = await APICallerPost<MagazineResponse, any>(
          GetAllMagazineUrl,
          "",
          loginMetadata,
          MagazineKey,
          !forceRefresh,
          MagazineExpiry,
          true,
          "Magazine/GetAllMagazine"
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