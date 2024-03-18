import { BaseResponse } from "../BaseResponse";
import { Offer } from "./Offer";

export class OfferResponse extends BaseResponse {
    public offer: Offer[] = [];
}