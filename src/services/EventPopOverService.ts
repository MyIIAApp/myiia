import { ShowEventPopOverURL } from "../constants/Config";
import { EventPopOverURL, EventPopOverURLExpiry } from "../constants/StorageConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { APICallerPost } from "./BaseService";
export class EventPopOverService {
    public static async GetPopOverURL(loginMetadata: LoginMetadata): Promise<any> {
        const body = { };
        const result = await APICallerPost<any, any>(
            ShowEventPopOverURL,
            body,
            loginMetadata,
            EventPopOverURL,
            true,
            EventPopOverURLExpiry,
            true,
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
}