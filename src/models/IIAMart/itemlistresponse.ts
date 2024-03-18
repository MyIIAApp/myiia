import { BaseResponse } from "../BaseResponse";
import { items } from "./items";

export class itemlistresponse extends BaseResponse{
    public itemList: any[] = [];
}