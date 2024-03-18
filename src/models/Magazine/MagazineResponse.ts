import { BaseResponse } from "../BaseResponse";
import { Magazine } from "./Magazine";

export class MagazineResponse extends BaseResponse {
    public magazine: Magazine[] = [];
}