import { BaseResponse } from "../BaseResponse";
import { PaymentRecordAllInvoice } from "./PaymentRecordAllInvoice"

export class PaymentRecordResponse extends BaseResponse {
    public paymentRecord: PaymentRecordAllInvoice[] = [];
}