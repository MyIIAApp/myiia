import { BaseResponse } from "../BaseResponse";
import { Item } from "./Item";

export class ItemResponse extends BaseResponse {
    public itemListing: Item[] = [];
}