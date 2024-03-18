import { CreateNewsUrl, GetNewsUrl } from "../constants/Config";
import { NewsExpiry, NewsKey } from "../constants/StorageConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { NewsResponse } from "../models/News/NewsResponse";
import { APICallerPost } from "./BaseService";

export class NewsService {
  public static async GetNews(
    loginMetadata: LoginMetadata,
    category: string,
    forceRefresh: boolean
  ): Promise<NewsResponse> {
    const body = {
      category: category,
    };

    const result = await APICallerPost<NewsResponse, any>(
      GetNewsUrl,
      body,
      loginMetadata,
      NewsKey,
      !forceRefresh,
      NewsExpiry,
      true,
      "News/GetNews"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async CreateNews(
    loginMetadata: LoginMetadata,
    title: string,
    description: string,
    link: string,
    imagePath: string,
    opration: string
  ): Promise<NewsResponse> {
    const body = {
      title: title,
      description: description,
      link: link,
      category: "",
      imagePath: imagePath,
      opration: opration
    };

    const result = await APICallerPost<any, any>(
      CreateNewsUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "News/CreateNews"
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
