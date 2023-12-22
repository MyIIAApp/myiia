import {
  GetSummaryForUserUrl,
  GetTicketUrl,
  CloseTicketUrl,
  AddCommentUrl,
  CreateTicketUrl,
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
  ): Promise<TicketResponse> {
    const body = {};

    const result = await APICallerPost<TicketResponse, any>(
      GetSummaryForUserUrl,
      body,
      loginMetadata,
      AllTicketsKey,
      !forceRefresh,
      AllTicketsExpiry,
      true,
      "Helpdesk/GetSummaryForUser"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

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

  public static async CloseTicket(
    loginMetadata: LoginMetadata,
    TicketNumber: string
  ): Promise<TicketResponse> {
    const body = {
      ticketnumber: TicketNumber,
    };

    const result = await APICallerPost<TicketResponse, any>(
      CloseTicketUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Helpdesk/CloseTicket"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async CreateTicket(
    loginMetadata: LoginMetadata,
    title: string,
    description: string,
    category: string,
    attachmenturl: string,
    userId: number
  ): Promise<CreateTicketResponse> {
    const body = {
      title: title,
      description: description,
      category: category,
      attachmenturl: attachmenturl,
      userId:userId.toString(),
    };

    const result = await APICallerPost<CreateTicketResponse, any>(
      CreateTicketUrl,
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
    };

    const result = await APICallerPost<any, any>(
      AddCommentUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Helpdesk/AddComment"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async AddAttachment(
    loginMetadata: LoginMetadata,
    ticketnumber: string,
    attachmenturl: string
  ) {
    const body = {
      ticketnumber: ticketnumber,
      attachmenturl: attachmenturl,
    };

    const result = await APICallerPost<any, any>(
      AddAttachmentUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Helpdesk/AddAttachment"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async GetSummaryForChapter(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean
  ): Promise<TicketResponse> {
    const body = {};

    const result = await APICallerPost<TicketResponse, any>(
      GetSummaryForChapterUrl,
      body,
      loginMetadata,
      AllTicketsKey,
      !forceRefresh,
      AllTicketsExpiry,
      true,
      "Helpdesk/GetSummaryForChapter"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async GetSummaryForAllChapter(
    loginMetadata: LoginMetadata,
    forceRefresh: boolean
  ): Promise<TicketResponse> {
    const body = {};

    const result = await APICallerPost<TicketResponse, any>(
      GetSummaryForAllChaptersURL,
      body,
      loginMetadata,
      AllChapterTicketsKey,
      !forceRefresh,
      AllChapterTicketsExpiry,
      true,
      "Helpdesk/GetSummaryForAllChapter"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

  public static async ChangeChapter(
    loginMetadata: LoginMetadata,
    ticketnumber: string
  ) {
    const body = {
      ticketnumber: ticketnumber,
    };

    const result = await APICallerPost<any, any>(
      ChangeChapterUrl,
      body,
      loginMetadata,
      "",
      false,
      0,
      false,
      "Helpdesk/ChangeChapter"
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }

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
