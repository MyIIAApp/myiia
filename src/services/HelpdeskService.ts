import {
  GetSummaryForUserUrl,
  GetTicketUrl,
  CloseTicketUrl,
  AddCommentUrl,
  // CreateTicketUrl,
  AddAttachmentUrl,
  GetSummaryForChapterUrl,
  ChangeChapterUrl,
  ChangeStatusUrl,
  GetSummaryForAllChaptersURL,
  UpdateCommitteeTicket,
} from "../constants/Config";
import {
  AllChapterTicketsExpiry,
  AllChapterTicketsKey,
  AllTicketsExpiry,
  AllTicketsKey,
  GetTicketExpiry,
  LoginMetadataKey,
  GetTicketKey,
} from "../constants/StorageConstants";
import { CreateTicketResponse } from "../models/CreateTicketResponse";
import { LoginMetadata } from "../models/LoginMetadata";
import { Ticket } from "../models/Ticket";
import { TicketResponse } from "../models/TicketResponse";
import { APICallerPost } from "./BaseService";

export class HelpdeskService {
  

  public static async GetSummaryForUser(
      loginMetadata: LoginMetadata,
      forceRefresh: boolean
    ): Promise<TicketResponse>{
      const body = {
        ...loginMetadata,
       members:1
      };
      const response = await fetch('https://iiaonline.in/getIssueMember.php',{
        method:"POST",
        body:JSON.stringify(body)
      }).then(res=>{
        return res.json();
      })
      return response;
    }

  // public static async GetSummaryForUser(
  //   loginMetadata: LoginMetadata,
  //   forceRefresh: boolean
  // ): Promise<TicketResponse> {
  //   const body = {};

  //   const result = await APICallerPost<TicketResponse, any>(
  //     GetSummaryForUserUrl,
  //     body,
  //     loginMetadata,
  //     AllTicketsKey,
  //     !forceRefresh,
  //     AllTicketsExpiry,
  //     true,
  //     "Helpdesk/GetSummaryForUser"
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   return result;
  // }

  /////////////////old function///////////////////
  public static async GetTicket(
    loginMetadata: LoginMetadata,
    TicketNumber: string
  ): Promise<Ticket[]> {
    const body = {
      ticketnumber: TicketNumber,
    };

    const result = await APICallerPost<Ticket[], any>(
      GetTicketUrl,
      body,
      loginMetadata,
      GetTicketKey + TicketNumber,
      false,
      GetTicketExpiry,
      true,
      "Helpdesk/GetTicket"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

   /////////////////new function///////////////////
  public static async GetTicketDetails(
    loginMetadata: LoginMetadata,
    TicketNumber: string
  ):Promise<Ticket[]>{
    const body = {
      ticketnumber: TicketNumber,
    };
    const response = await fetch('https://iiaonline.in/getIssueMemberDetails.php',{
      method:"POST",
      body:JSON.stringify(body)
    }).then(res=>{
      return res.json();
    })
    return response;
  }

   public static async CloseTicket(
    loginMetadata: LoginMetadata,
    TicketNumber: string
  ): Promise<TicketResponse> {
    const body = {
      ticketnumber: TicketNumber,
      ...loginMetadata
    };
    const response = await fetch('https://iiaonline.in/closeTicket.php',{
      method:"POST",
      body:JSON.stringify(body)
    })
    .then(res=>{
      return res.json();
    }).catch((error)=>{
      throw error;
    })
    return response;
  }

  // public static async CloseTicket(
  //   loginMetadata: LoginMetadata,
  //   TicketNumber: string
  // ): Promise<TicketResponse> {
  //   const body = {
  //     ticketnumber: TicketNumber,
  //   };

  //   const result = await APICallerPost<TicketResponse, any>(
  //     CloseTicketUrl,
  //     body,
  //     loginMetadata,
  //     "",
  //     false,
  //     0,
  //     false,
  //     "Helpdesk/CloseTicket"
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   return result;
  // }



  public static async CreateTicket(
    loginMetadata: LoginMetadata,
    title: string,
    otherDetail:string,
    description: string,
    category: string,
    attachmenturl: string,
    userId: number,
    phoneNumber:string,
    memberId:string,
  ): Promise<CreateTicketResponse> {
    const body = {
      title: title,
      description: description,
      category: category,
      attachmenturl: attachmenturl,
      otherDetail:otherDetail,
      userId:userId.toString(),
      phoneNumber:phoneNumber,
      memberId:memberId,
      loginMetadata:loginMetadata
    };

    const result = await APICallerPost<CreateTicketResponse, any>(
      'https://iiaonline.in/testmyiiapp.php' , 
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Helpdesk/CreateTicket"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }


  

  public static async UpdateCommitteeTicket(
    loginMetadata: LoginMetadata,
    ticketNumber: string,
    committeeId: string
  ){
    const body = {
      ticketNumber: ticketNumber,
      committeeId: committeeId
    };
    // debugger
    const result = await APICallerPost<any, any>(
      UpdateCommitteeTicket,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Helpdesk/UpdateTicket"
    )
      .then((response) => {
        return response;
       
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async AddComment(
    loginMetadata: LoginMetadata,
    ticketnumber: string,
    comments: string,
    committeeId:string,
  ) {
    const body = {
      ticketnumber: ticketnumber,
      comments: comments,
      committeeId:committeeId,
      ...loginMetadata
    };
    const response = await fetch("https://iiaonline.in/add_comment_issue.php",{
      method:"POST",
      body:JSON.stringify(body)
    }).then((response) => {
        return response;
      })
      .catch((error) => {
         throw error;
      });
    return response;
  }
    
  //old
  // public static async AddComment(
  //   loginMetadata: LoginMetadata,
  //   ticketnumber: string,
  //   comments: string,
  //   committeeId:string,
  // ) {
  //   const body = {
  //     ticketnumber: ticketnumber,
  //     comments: comments,
  //     committeeId:committeeId,
  //     ...loginMetadata
  //   };

  //   const result = await APICallerPost<any, any>(
  //    AddCommentUrl,
  //     body,
  //     loginMetadata,
  //     "",
  //     false,
  //     0,
  //     false,
  //     "Helpdesk/AddComment"
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   return result;
  // }

    public static async AddAttachment(
    loginMetadata: LoginMetadata,
    ticketnumber: string,
    attachmenturl: string
  ) {
    const body = {
      ticketnumber: ticketnumber,
      attachmenturl: attachmenturl,
      ...loginMetadata
    };
    const response = await fetch("https://iiaonline.in/uploadIssueAttachment.php",{
      method:"POST",
      body:JSON.stringify(body)
    }).then(res=>{
      return res.json()
    }).catch((error) => {
        throw error;
    });
    return response;
  }

  //old
  // public static async AddAttachment(
  //   loginMetadata: LoginMetadata,
  //   ticketnumber: string,
  //   attachmenturl: string
  // ) {
  //   const body = {
  //     ticketnumber: ticketnumber,
  //     attachmenturl: attachmenturl,
  //   };

  //   const result = await APICallerPost<any, any>(
  //     AddAttachmentUrl,
  //     body,
  //     loginMetadata,
  //     "",
  //     false,
  //     0,
  //     false,
  //     "Helpdesk/AddAttachment"
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   return result;
  // }

  public static async GetSummaryForChapter(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean
  ):Promise<TicketResponse>{
    const response = await fetch('https://iiaonline.in/getIssueMember.php',{
      method:"POST",
      body:JSON.stringify(loginMetadata)
    }).then(res=>{
      return res.json();
    })
    return response;
  }

  // public static async GetSummaryForChapter(
  //   loginMetadata: LoginMetadata,
  //   forceRefresh: boolean
  // ): Promise<TicketResponse> {
  //   const body = {};

  //   const result = await APICallerPost<TicketResponse, any>(
  //     GetSummaryForChapterUrl,
  //     body,
  //     loginMetadata,
  //     AllTicketsKey,
  //     !forceRefresh,
  //     AllTicketsExpiry,
  //     true,
  //     "Helpdesk/GetSummaryForChapter"
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   return result;
  // }


  public static async GetSummaryForAllChapter(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean
  ): Promise<TicketResponse> {
    const body = {};

    const response = await fetch('https://iiaonline.in/getIssueForChapter.php',{
      method:"POST",
      body:JSON.stringify(loginMetadata)
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  //old
  // public static async GetSummaryForAllChapter(
  //   loginMetadata: LoginMetadata,
  //   forceRefresh: boolean
  // ): Promise<TicketResponse> {
  //   const body = {};

  //   const result = await APICallerPost<TicketResponse, any>(
  //     GetSummaryForAllChaptersURL,
  //     body,
  //     loginMetadata,
  //     AllChapterTicketsKey,
  //     !forceRefresh,
  //     AllChapterTicketsExpiry,
  //     true,
  //     "Helpdesk/GetSummaryForAllChapter"
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   return result;
  // }

  public static async ChangeChapter(
    loginMetadata: LoginMetadata,
    ticketnumber: string
  ):Promise<any> {
    const body = {
      ticketnumber: ticketnumber,
    };
    const response = await fetch('https://iiaonline.in/assignToHead.php',{
      method:"POST",
      body:JSON.stringify(body)
    }).then((response) => {
      return response;
    })
    .catch((error) => {
       throw error;
    });
    return response;
  }

  public static async CheckIfAssignToHeadOffice(ticketnumber:string):Promise<any>{
    const body = {
      ticketnumber,
    }
    const response = await fetch('https://iiaonline.in/checkForHeadOffice.php',{
      method:"POST",
      body:JSON.stringify(body)
    }).then(res=>{
      return res.json();
    }).catch(error=>{
      throw error;
    });
    return response;
  }

  //old
  // public static async ChangeChapter(
  //   loginMetadata: LoginMetadata,
  //   ticketnumber: string
  // ) {
  //   const body = {
  //     ticketnumber: ticketnumber,
  //   };

  //   const result = await APICallerPost<any, any>(
  //     ChangeChapterUrl,
  //     body,
  //     loginMetadata,
  //     "",
  //     false,
  //     0,
  //     false,
  //     "Helpdesk/ChangeChapter"
  //   )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   return result;
  // }

  public static async ChangeStatus(
    loginMetadata: LoginMetadata,
    ticketnumber: string,
    status: string
  ) {
    const body = {
      ticketnumber: ticketnumber,
      status: status,
    };

    const result = await APICallerPost<any, any>(
      ChangeStatusUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Helpdesk/ChangeStatus"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
}
