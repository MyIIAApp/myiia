export class Comments {
  public TicketNumber: string = "";
  public UserName: string = "";
  public Comments: string = "";
  public CommentCreationTime: string = new Date().toISOString();
  public AdminName: string = "";
}
