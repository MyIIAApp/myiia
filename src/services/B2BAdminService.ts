import { B2BAdminBlockUnblockListingUrl, B2BAdminDashboardValuesUrl, B2BAdminEnquiriesUrl, B2BAdminListingsUrl } from "../constants/Config";
import { B2BAdminDashboard, B2BAdminDashboardExpiry, B2BAdminEnquiries, B2BAdminEnquiriesExpiry, B2BAdminListings, B2BAdminListingsExpiry } from "../constants/StorageConstants";
import { AdminDashboard } from "../models/B2B/AdminDashboard";
import { AdminEnquiryResponse } from "../models/B2B/AdminEnquiryResponse";
import { AdminListingResponse } from "../models/B2B/AdminListingResponse";
import { BaseResponse } from "../models/BaseResponse";
import { LoginMetadata } from "../models/LoginMetadata";
import { APICallerPost } from "./BaseService";
export class B2BAdminService {
    public static async GetB2BAdminDashboardValues(loginMetadata: LoginMetadata, forceRefresh: boolean): Promise<AdminDashboard> {
        const body = { };
        const result = await APICallerPost<AdminDashboard, any>(
            B2BAdminDashboardValuesUrl,
            body,
            loginMetadata,
            B2BAdminDashboard,
            !forceRefresh,
            B2BAdminDashboardExpiry,
            true,
            "B2B/B2BAdminDashboard"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }

    public static async GetB2BAdminEnquiries(loginMetadata: LoginMetadata, forceRefresh: boolean): Promise<AdminEnquiryResponse> {
        const body = { };
        const result = await APICallerPost<AdminEnquiryResponse, any>(
            B2BAdminEnquiriesUrl,
            body,
            loginMetadata,
            B2BAdminEnquiries,
            !forceRefresh,
            B2BAdminEnquiriesExpiry,
            true,
            "B2B/B2BAdminEnquiries"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }

    public static async GetB2BAdminListings(loginMetadata: LoginMetadata, forceRefresh: boolean): Promise<AdminListingResponse> {
        const body = { };
        const result = await APICallerPost<AdminListingResponse, any>(
            B2BAdminListingsUrl,
            body,
            loginMetadata,
            B2BAdminListings,
            !forceRefresh,
            B2BAdminListingsExpiry,
            true,
            "B2B/B2BAdminListings"
        )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
        return result;
    }
    
    public static async BlockUnblockListing(loginMetadata: LoginMetadata, update: string, itemId: string): Promise<BaseResponse> {
        const body = {
            update: update,
            itemId: itemId
         };
        const result = await APICallerPost<BaseResponse, any>(
            B2BAdminBlockUnblockListingUrl,
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
}
export default B2BAdminService;