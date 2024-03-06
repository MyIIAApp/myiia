import { GetIIADirectoryLists } from "../constants/Config";
import { IIADirectoryKey, IIADirectoryExpiry } from "../constants/StorageConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { IIADirectoryResponse } from "../models/IIADirectory/IIADirectoryResponse";
import { APICallerPost } from "./BaseService";

export class IIADirectoryService {
    public static async GetIIADirectoryLists(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean,
        search: string
    ) :
    Promise<IIADirectoryResponse>{
      const body={
        search: search,
      }

    const result = await APICallerPost<IIADirectoryResponse, any>(
        GetIIADirectoryLists,
        body,
        loginMetadata,
        IIADirectoryKey,
        !forceRefresh,
        IIADirectoryExpiry,
        true,
        "IiaDirectory/GetIIADirectoryLists"
      )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
        console.log(result);
      return result;
      
    }
}