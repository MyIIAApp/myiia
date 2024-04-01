import { BaseResponse } from "./BaseResponse";

export class Year{
    public startYear:string = "";
    public expiryYear:string="";
}

export class YearDetails{
    public finance: Year[] = [];
}