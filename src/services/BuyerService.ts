import { SendEnquiryByBuyer, GetItemDetailsForBuyer, GetItemListingForBuyer, GetValidItemDetails, GetTopItemDetails } from "../constants/Config";
import { BuyerItemListExpiry, BuyerItemsList } from "../constants/StorageConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { APICallerPost } from "./BaseService";
export class BuyerService {
    public static async SendEnquiry(message: string, itemId: string, loginMetadata: LoginMetadata): Promise<any> {
        const body = { message: message, itemId: itemId };
        const result = await APICallerPost<any, any>(
            SendEnquiryByBuyer,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Enquiry/SendEnquiry"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async GetItemDetails(id: string, loginMetadata: LoginMetadata): Promise<any> {
        const body = { id: id };
        const result = await APICallerPost<any, any>(
            GetItemDetailsForBuyer,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Buyer/GetItemDetails"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async GetItemsList(loginMetadata: LoginMetadata,forceRefresh:boolean, category: string, subCategory: string): Promise<any> {
        const body = {
            category: category,
            subCategory: subCategory
        };
        const result = await APICallerPost<any, any>(
            GetItemListingForBuyer,
            body,
            loginMetadata,
            BuyerItemsList+category+subCategory,
            !forceRefresh,
            BuyerItemListExpiry,
            true,
            "BuyerItemsList"+category+subCategory
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async GetValidItemList( loginMetadata: LoginMetadata): Promise<any> {
        const body = { };
        const result = await APICallerPost<any, any>(
            GetValidItemDetails,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Buyer/GetItemDetails"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async GetTopItemList( loginMetadata: LoginMetadata): Promise<any> {
        const body = { };
        const result = await APICallerPost<any, any>(
            GetTopItemDetails,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Buyer/GetItemDetails"
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