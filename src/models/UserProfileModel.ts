export class UserProfileModel {

  public phoneNumber : string = "";
  public membershipId: string = "";
  public membershipAdmissionfee : number= 0;
  public membershipFees: number= 0;
  public membershipCurrentExpiryYear: number= 0;
  public membershipJoinDate : any;
  public membershipRenewDate: any;
  public membershipExpiryYears: string = "";
    public profileStatus: number = 0;
    public id: number = -1;
    public chapterId: number = 0 ;
    public chapterName: string="" ;
    public token: string="";
   
    public unitName: string = "";
    public address: string = "";
    public district: string = "";
    public city: string = "";
    public state: string = "";
    public country: string = "India";
    public pincode: string = "";
    public industryStatus: string = "";
    public gstin: string = "";

    
    public productCategory: string = "";
    public productSubCategory: string = "";
    public majorProducts: string = "";
    public annualTurnOver: string = "";
    public enterpriseType: string = "";
    public exporter: string = "";
    public classification: string = "";
    public websiteUrl: string = "";


    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public profileImagePath: string = "";
    public gstCertPath: string = "";
    public financialProofPath: string = "";
    public signaturePath: string = "";
    public createdBy:number = -1;
    public createdDate: Date = new Date();
    public updatedDate: Date = new Date();
    
    constructor(tokenString:string, profileStatus:number ) {
        this.token = tokenString;
        this.profileStatus =profileStatus;
      }
    public validate(){
      if(this.chapterId==0 || 
        this.unitName=="" || this.address=="" || 
        this.district=="" ||  
        this.state=="" || this.country=="" ||  this.industryStatus=="" || 
        this.gstin=="" || this.productCategory=="" || 
        this.productSubCategory=="" || this.annualTurnOver==""   || 
         this.firstName=="" ||
        this.lastName=="" || this.firstName==""){
        return false;
      }
      return true;
    }
}