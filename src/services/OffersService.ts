import { GetOfferDetailURL, GetOffersUrl } from "../constants/Config";
import { OfferResponse } from "../models/Offers/OfferResponse";
import { APICallerPost } from "./BaseService";
import {
  OffersKey,
  OffersExpiry,
  OffersDetailExpiry,
  OffersDetailKey,
} from "../constants/StorageConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { Offer } from "../models/Offers/Offer";

export class OfferService {
  public static async GetOffers(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean,
    category: string
  ): Promise<OfferResponse> {
    const body = {
      category: category,
    };

    const result = await APICallerPost<OfferResponse, any>(
      GetOffersUrl,
      body,
      loginMetadata,
      OffersKey + category,
      !forceRefresh,
      OffersExpiry,
      true,
      "Offers/GetOffers"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async GetOfferDetail(
    loginMetadata: LoginMetadata,
    SNo: string
  ): Promise<Offer[]> {
    const body = {
      sno: SNo,
    };

    const result = await APICallerPost<Offer[], any>(
      GetOfferDetailURL,
      body,
      loginMetadata,
      OffersDetailKey + SNo,
      true,
      OffersDetailExpiry,
      true,
      "Offers/GetOfferDetail"
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
