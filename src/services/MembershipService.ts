import { ApplyForMembership, ApproveMembershipApplication, GetActiveMembership, GetChapters, GetMembershipProfile, GetUserProfile, PaymentAndActivationForMembership, UpdateMemberProfilePictureUrl, UpdateMembershipProfileUrl } from "../constants/Config";
import { activeMembership, activeMembershipExpiry, chaptersExpiry, chaptersKey, memberprofileExpiry, memberprofileKey, userprofileExpiry, userprofileKey } from "../constants/StorageConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { ActiveMembershipModel } from "../models/Membership/ActiveMembershipModel";
import { MembershipPaymentModel } from "../models/Membership/MembershipPaymentModel";
import { MembershipProfileModel } from "../models/Membership/MembershipProfileModel";
import { UserProfileModel } from "../models/UserProfileModel";
import { APICallerPost } from "./BaseService";

export class MembershipService{

    public static async getActiveMembership( loginMetadata: LoginMetadata,forceRefresh:boolean): Promise<ActiveMembershipModel> {

        const body = {
        };

        const result = await APICallerPost<ActiveMembershipModel, any>(
            GetActiveMembership,
            body,
            loginMetadata,
            activeMembership,
            !forceRefresh,
            activeMembershipExpiry,
            true,
            "Membership/getActiveMembership"
        ).then((response) => {
            response.membershipExpiryDate=response.membershipExpiryDate != "" ? response.membershipExpiryDate.substring(0,10) : "";
            response.membershipSince=response.membershipSince != "" ? response.membershipSince.substring(0,10) : "";
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async getChapters(loginMetadata: LoginMetadata): Promise<any> {

        const body = {
        };

        const result = await APICallerPost<any, any>(
            GetChapters,
            body,
            loginMetadata,
            chaptersKey,
            true,
            chaptersExpiry,
            true,
            "Membership/getChapters"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async applyForMembership(loginMetadata: LoginMetadata,membershipProfile: MembershipProfileModel ): Promise<any> {
        const body = membershipProfile
        const result = await APICallerPost<any, any>(
            ApplyForMembership,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Membership/applyForMembership"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async updateMembershipProfile(loginMetadata: LoginMetadata,membershipProfile: MembershipProfileModel ): Promise<any> {
        const body = membershipProfile
        const result = await APICallerPost<any, any>(
            UpdateMembershipProfileUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Membership/updateMembershipProfile"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async getMembershipProfile(loginMetadata: LoginMetadata,forceRefresh:boolean,body:any): Promise<MembershipProfileModel> {

      
        const result = await APICallerPost<MembershipProfileModel, any>(
            GetMembershipProfile,
            body,
            loginMetadata,
            memberprofileKey,
            !forceRefresh,
            memberprofileExpiry,
            true,
            "Membership/getMembershipProfile"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async getUserProfile(loginMetadata: LoginMetadata,forceRefresh:boolean,body:any): Promise<UserProfileModel> {

      
        const result = await APICallerPost<UserProfileModel, any>(
            GetUserProfile,
            body,
            loginMetadata,
            userprofileKey,
            !forceRefresh,
            userprofileExpiry,
            true,
            "Membership/getUserProfile"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async getMembershipProfilesByStatus(loginMetadata: LoginMetadata ,profileStatus:number): Promise<any> {

        const body = {
            "profileStatus":profileStatus
        };

        const result = await APICallerPost<any, any>(
            GetMembershipProfile,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Membership/getMembershipProfilesByStatus"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }
    public static async approveMembershipApplication(loginMetadata: LoginMetadata,userId:number,profileStatus:number): Promise<any> {

        const body = {
            "userId":userId,
            "status":profileStatus
        };

        const result = await APICallerPost<any, any>(
            ApproveMembershipApplication,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Membership/approveMembershipApplication"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }
    
    public static async paymentAndActivationForMembership(loginMetadata: LoginMetadata,membershipPaymentModel:MembershipPaymentModel): Promise<any> {
        const body = membershipPaymentModel;
        const result = await APICallerPost<any, any>(
            PaymentAndActivationForMembership,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Membership/paymentAndActivationForMembership"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }

    public static async updateMemberProfilePhoto(loginMetadata: LoginMetadata,photoPath: string): Promise<any> {
        const body = {
            photoPath:photoPath
        };
        const result = await APICallerPost<any, any>(
            UpdateMemberProfilePictureUrl,
            body,
            loginMetadata,
            "",
            false,
            0,
            false,
            "Membership/UpdateMemberProfilePicture"
        ).then((response) => {
            return response;
        })
            .catch((error) => {
                throw error;
            })
        return result;
    }
    
}
