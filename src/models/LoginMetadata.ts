export class LoginMetadata {
  public tokenString: string = "";
  public id: string = "";
  public phoneNumber: string = "";
  public membershipStatus: number =0;
  public chapterId: number = 0;
  public chapterName: string="";
  public isAdmin: boolean = false;

  constructor(token:string) {
    this.tokenString = token;
  }
}
