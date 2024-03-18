export class MembershipPaymentModel {
    public userId: number = -1;    
    public paymentMode: number =  1;
    public chequeNumber: string = "";
    public fullAmount: string = "";
    public membershipId:string= "";
    public profileImagePath:string = "";

    constructor(userId:number) {
        this.userId = userId;
    }
}

