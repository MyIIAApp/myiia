import { BaseResponse } from "../BaseResponse";
import { Leader } from "./Leader";

export class LeaderResponse extends BaseResponse {
    public ho: Leader[] = [];
    public chapter: Leader[] = [];
}