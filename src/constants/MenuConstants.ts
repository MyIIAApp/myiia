import {
  bugOutline,
  businessOutline,
  callOutline,
  cashOutline,
  globeOutline,
  helpCircleOutline,
  homeOutline,
  idCardOutline,
  mailOutline,
  medkitOutline,
  newspaperOutline,
  peopleOutline,
  ticketOutline,
  walletOutline,
  createOutline,
  cubeOutline,
  helpSharp,
  documentsOutline,
  gridOutline,
  compassOutline,
  albumsOutline,
  folderOpenOutline
} from "ionicons/icons";

export enum MembershipProfileStatus {
  "Not a Member" = 0,
  SavedMembershipProfile = 1,
  SubmittedMembershipProfile = 2,
  RejectedMembershipProfile = 3,
  ApprovedMembershipProfile = 4,
  Active = 5,
  Grace = 6,
  Expired = 7
}

export interface AppPage {
  Page: string;
  IosIcon: string;
  MdIcon: string;
}

export const HomePage: AppPage = {
  Page: "Home",
  IosIcon: homeOutline,
  MdIcon: homeOutline,
};
export const RengenerateAndDeleteInvoices: AppPage = {
  Page: "Invoice Update",
  IosIcon: walletOutline,
  MdIcon: walletOutline,
};

export const MembershipPage: AppPage = {
  Page: "Membership",
  IosIcon: idCardOutline,
  MdIcon: idCardOutline
}



export const AdminPaymentByMember: AppPage = {
  Page: "Payment History By Member",
  IosIcon: documentsOutline,
  MdIcon: documentsOutline
}
export const ViewNews: AppPage = {
  Page: "View - Notifications & Circulars",
  IosIcon: documentsOutline,
  MdIcon: documentsOutline
}
export const ApproveMembershipPage: AppPage = {
  Page: 'Approve Membership',
  IosIcon: idCardOutline,
  MdIcon: idCardOutline
}
export const RecordPaymentPage: AppPage = {
  Page: 'Record Payment',
  IosIcon: walletOutline,
  MdIcon: walletOutline
}
export const AdminReport: AppPage = {
  Page: 'Reports',
  IosIcon: gridOutline,
  MdIcon: gridOutline
}
//my addition
export const NonMembershipPayments: AppPage = {
  Page: 'Non Member Payments',
  IosIcon: walletOutline,
  MdIcon: walletOutline
}
export const CreateUpadateMembershipPage: AppPage = {
  Page: 'Update Membership Profile',
  IosIcon: createOutline,
  MdIcon: createOutline
}
export const CreateNewMembership: AppPage = {
  Page: 'Create New Profile',
  IosIcon: createOutline,
  MdIcon: createOutline
}

export const MemberProfilePage: AppPage = {
  Page: 'MemberProfilePage',
  IosIcon: idCardOutline,
  MdIcon: idCardOutline
}

export const NewsPage: AppPage = {
  Page: "Notifications and Circulars",
  IosIcon: newspaperOutline,
  MdIcon: newspaperOutline,
};

export const InsurancePage: AppPage = {
  Page: "Insurance",
  IosIcon: medkitOutline,
  MdIcon: medkitOutline,
};

export const OffersPage: AppPage = {
  Page: "Offers",
  IosIcon: cashOutline,
  MdIcon: cashOutline,
};

export const CourierPage: AppPage = {
  Page: "Courier",
  IosIcon: mailOutline,
  MdIcon: mailOutline,
};

export const HelpdeskPage: AppPage = {
  Page: "Issues and Problems",
  IosIcon: helpCircleOutline,
  MdIcon: helpCircleOutline,
};
export const HelpdeskDashboardPage: AppPage = {
  Page: "Helpdesk Dashboard",
  IosIcon: helpSharp,
  MdIcon: helpSharp,
};
//adding new
/*export const NonMembershipPayment: AppPage = {
  Page: "NON Member",
  IosIcon: helpSharp,
  MdIcon: helpSharp,
};*/

export const LocalContactPage: AppPage = {
  Page: "Organisation Structure",
  IosIcon:  peopleOutline,
  MdIcon: peopleOutline,
};

export const B2BPage: AppPage = {
  Page: "IIA Mart",
  IosIcon: businessOutline,
  MdIcon: businessOutline,
};
export const B2BSellerPage: AppPage = {
  Page: "Manage IIA Mart",
  IosIcon: businessOutline,
  MdIcon: businessOutline,
};
export const B2BAdminPage: AppPage = {
  Page: "IIA Mart Admin",
  IosIcon: businessOutline,
  MdIcon: businessOutline,
};
export const ContactPage: AppPage = {
  Page: "Contact Us",
  IosIcon: callOutline,
  MdIcon: callOutline,
};

export const VirtualTradeFaresPage: AppPage = {
  Page: "Virtual Trade Fares",
  IosIcon: peopleOutline,
  MdIcon: peopleOutline,
};

export const PaymentsPage: AppPage = {
  Page: "Payments",
  IosIcon: walletOutline,
  MdIcon: walletOutline,
};

export const NewsCreationPage: AppPage = {
  Page: "Create - Notifications & Circulars",
  IosIcon: newspaperOutline,
  MdIcon: newspaperOutline,
};

export const CreateTicketPage: AppPage = {
  Page: "Create Tickets",
  IosIcon: ticketOutline,
  MdIcon: ticketOutline,
};

export const GetTicketPage: AppPage = {
  Page: "Get Tickets",
  IosIcon: ticketOutline,
  MdIcon: ticketOutline,
};

export const ActiveTicketPage: AppPage = {
  Page: "Active Tickets",
  IosIcon: ticketOutline,
  MdIcon: ticketOutline,
};

export const ChapterPage: AppPage = {
  Page: "Chapter Issues and Problems",
  IosIcon: ticketOutline,
  MdIcon: ticketOutline,
};

export const HeadOfficePage: AppPage = {
  Page: "Head Office",
  IosIcon: globeOutline,
  MdIcon: globeOutline,
};

export const MembershipBenefitPage: AppPage = {
  Page: "Benefits",
  IosIcon: cubeOutline,
  MdIcon: cubeOutline
}
export const PaymentHistoryPage: AppPage = {
  Page: "Payment History",
  IosIcon: documentsOutline,
  MdIcon: documentsOutline
}
export const PaymentHistoryPageForAdmin: AppPage = {
  Page: "Payment History By Chapter",
  IosIcon: compassOutline,
  MdIcon: compassOutline
}
export const MagazineCreationPage: AppPage = {
  Page: "Create - Magazine",
  IosIcon: albumsOutline,
  MdIcon: albumsOutline,
};
export const MagazinePage: AppPage = {
  Page: "IIA Magazines",
  IosIcon: albumsOutline,
  MdIcon: albumsOutline,
};
export const ManageMagazinePage: AppPage = {
  Page: "Manage Magazine",
  IosIcon: albumsOutline,
  MdIcon: albumsOutline,
}

export const IIADirectoryPage: AppPage = {
  Page: "IIA Directory",
  IosIcon: folderOpenOutline,
  MdIcon: folderOpenOutline
}

export const IIAwebsitePage:AppPage = {
  Page: "Issues and Problems",
  IosIcon: helpCircleOutline,
  MdIcon: helpCircleOutline,
}
