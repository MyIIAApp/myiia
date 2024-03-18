import { DeleteItemDetailsBySeller, EditDetailsBySeller, GetEnquiryDetailsBySeller } from "../constants/Config";
import { UpdateEnquiryDetailsBySeller } from "../constants/Config";
import { GetSellerItemDetails } from "../constants/Config";
import { APICallerPost } from "./BaseService";

import { LoginMetadata } from "../models/LoginMetadata";
import { detailsresponse } from "../models/IIAMart/detailsresponse"
import { itemlistresponse } from "../models/IIAMart/itemlistresponse"
import { GetEnquiryStatus, GetEnquiryStatusExpiry,GetItemsStatus,GetItemStatusExpiry } from "../constants/StorageConstants";
export class IIAMartEnquiryService {
    public static async GetEnquiry(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean
    ): Promise<detailsresponse
    > {
        const body = {
        };
        const result = await APICallerPost<detailsresponse, any>(
            GetEnquiryDetailsBySeller,
            body,
            loginMetadata,
            GetEnquiryStatus,
            !forceRefresh,
            GetEnquiryStatusExpiry,
            true,
            "GetEnquiryStatus"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async UpdateEnquiryDetailsBySeller(
        loginMetadata: LoginMetadata,
        enquiryId :string
    ): Promise<detailsresponse
    > {
        const body = {
            EnquiryId: enquiryId
        };
        const result = await APICallerPost<detailsresponse, any>(
            UpdateEnquiryDetailsBySeller,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            ""
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async GetSellerItemDetails(
        loginMetadata: LoginMetadata,
        forceRefresh: boolean
    ): Promise<any
    > {
        const body = {
        };
        const result = await APICallerPost<any, any>(
            GetSellerItemDetails,
            body,
            loginMetadata,
            GetItemsStatus,
            !forceRefresh,
            GetItemStatusExpiry,
            true,
            "GetItemsList"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async DeleteOrActivateSellerItemDetails(
        loginMetadata: LoginMetadata,
        toggle : boolean,
        id : string,
        active : string
    ): Promise<any
    > {
        const body = {
            toggle: toggle,
            id: id,
            active : active
        };
        const result = await APICallerPost<any, any>(
            DeleteItemDetailsBySeller,
            body,
            loginMetadata,
            GetItemsStatus,
            false,
            GetItemStatusExpiry,
            true,
            "mnmnmn"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    public static async EditOrCreateItem(
        loginMetadata: LoginMetadata,
        id: string,
        name: string,
        description:string,
        category:string,
        subCategory:string,
        price:string,
        photoPath:string,
        editOrNew:boolean
    ): Promise<any
    > {
        const body = {
            id: id,
        name: name,
        description:description,
        category:category,
        subCategory:subCategory,
        price:price,
        photoPath:photoPath,
        editOrNew:editOrNew
        };
        const result = await APICallerPost<any, any>(
            EditDetailsBySeller,
            body,
            loginMetadata,
            GetItemsStatus,
            false,
            GetItemStatusExpiry,
            true,
            "mmn"
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