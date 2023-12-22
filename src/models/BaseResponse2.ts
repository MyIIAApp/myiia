import { LoginMetadata } from "./LoginMetadata";

export class BaseResponse2 {
    public loginMetadataList: LoginMetadata[] = [];
    public message: string = "";
    public unitName: string[] = [];
}