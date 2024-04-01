import { BaseResponse } from "./BaseResponse";
import { Ticket } from "./Ticket";

export class TicketResponse extends BaseResponse {
  public ticketIia: Ticket[] = [];
  public ticketMember: Ticket[] = [];
  public ticketClosed: Ticket[] = [];
}
