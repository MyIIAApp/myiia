import { LoginMetadata } from "./LoginMetadata";

export class BaseResponse {
    public loginMetadata: LoginMetadata | null = null;
    public message: string = "";
}