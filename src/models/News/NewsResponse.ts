import { BaseResponse } from "../BaseResponse";
import { News } from "./News";

export class NewsResponse extends BaseResponse {
    public news: News[] = [];
}