import { Attachments } from "./Attachments";
import { Comments } from "./Comments";

export class Ticket {
  public TicketNumber: string = "";
  public Title: string = "";
  public Description: string = "";
  public Category: string = "";
  public ChapterId: string = "";
  public Status: string = "";
  public TicketCreationTime: string = new Date().toISOString();
  public UserId: string = "";
  public Comment: Comments[] = [];
  public Attachment: Attachments[] = [];
  public ClosedTicketTime: string = new Date().toISOString();
  public UserName: string = "";
  public PhoneNumber: string = "";
  public ChapterName: string = "";
  public CommitteeId: string = "";

  constructor() {
    this.TicketNumber = "";
    this.Status = "Closed";
  }
}
