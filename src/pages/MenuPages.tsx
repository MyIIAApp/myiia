import { UseIonRouterResult } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import ComingSoon from "../components/ComingSoon";
import DisplayMessage from "../components/Membership/DisplayMessage";
import MembershipBenifits from "../components/Membership/MembershipBenifits";
import { peopleOutline } from "ionicons/icons";
import {
  ApproveMembershipPage,
  B2BPage,
  ContactPage,
  ChapterPage,
  CourierPage,
  CreateUpadateMembershipPage,
  HelpdeskPage,
  HelpdeskDashboardPage,
  HomePage,
  InsurancePage,
  LocalContactPage,
  MembershipBenefitPage,
  MembershipPage,
  NewsCreationPage,
  //added by me
  NonMembershipPayments,
  NewsPage,
  OffersPage,
  PaymentsPage,
  RecordPaymentPage,
  VirtualTradeFaresPage,
  PaymentHistoryPage,
  B2BSellerPage,
  B2BAdminPage,
  PaymentHistoryPageForAdmin,
  AdminPaymentByMember,
  AdminReport,
  CreateNewMembership,
  RengenerateAndDeleteInvoices,
  ViewNews,
  MagazinePage,
  MagazineCreationPage,
  ManageMagazinePage,
  IIADirectoryPage,
} from "../constants/MenuConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import Chapter from "./Chapter";
import Helpdesk from "./Helpdesk";
import HelpDeskDashBoard from "./HelpDesk/HelpdeskDashboard";
import Home from "./Home/Home";
import ContactUs from "./ContactUs/ContactUs";
import ApproveMembership from "./Membership/ApproveMembership";
import CreateUpadateMembershipProfile from "./Membership/CreateUpadateMembershipProfile";
import Membership from "./Membership/Membership";
import MyIIA from "./MyIIA/MyIIA";
import CreateNews from "./news/CreateNews";
import NewsList from "./news/NewsList";
import OfferCategoryList from "./Offers/OfferCategoryList";
import RecordPaymentSearch from "./Payment/RecordPaymentSearch";
import rejectedMembership from "../images/rejectedMembership.svg";
import EnquiryStatus from "./IIAMart/EnquiryStatus";
import Insurance from "./Insurance/Insurance";
import PaymentHistory from "./Payment/PaymentHistory";
import B2BAdmin from "./B2BAdmin/B2BAdmin";
import B2BBuyer from "./B2BBuyer/B2BBuyer";
import PaymentHistoryAdmin from "./Payment/PaymentHistoryAdmin";
//change made by me
import NonMemberPayments from "./Payment/NonMemberPayments";
import AdminReports from "./Payment/AdminReports";
import PaymentHistoryAdminByMember from "./Payment/PaymentHistoryAdminByMember";
import { MembershipProfileModel } from "../models/Membership/MembershipProfileModel";
import JoinIIA from "../components/Membership/JoinIIA";
import RengenerateAndDeleteInvoice from "../pages/Payment/RegenerateAndDeleteInvoice";
import AdminViewNews from "./news/AdminViewNews";
import B2BBuyerMain from "./B2BBuyer/B2BBuyerMain";
import Magazines from "./Magazine/Magazines";
import MagazineCreate from "./Magazine/MagazineCreate";
import AdminManageMagazine from "./Magazine/AdminManageMagazine";
import IIADirectory from "./IIADirectory/IIADirectory"

import IIADivisonalLogin from "../pages/IIADivisonalLogin";

interface MMenuPagesStates {
  memberShipProfile: MembershipProfileModel;
  membershipStatus: number;
}

interface MenuPagesProps
  extends RouteComponentProps<{
    page: string;
  }> {
  changePage: (value: string) => void;
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

interface AppPage {
  Page: string;
  IosIcon: string;
  MdIcon: string;
}

const IIADivisonal:AppPage = {
  Page: "IIA Divisional Chairman Login",
  IosIcon:  peopleOutline,
  MdIcon: peopleOutline,
}
class MenuPages extends React.Component<MenuPagesProps, MMenuPagesStates> {
  constructor(props: MenuPagesProps) {
    super(props);
    this.state = {
      memberShipProfile: new MembershipProfileModel("", -1, -1),
      membershipStatus: -1,
    };
  }
  public setMembershipStatusFunction(value: number) {
    this.setState({ membershipStatus: value });
  }
  render() {
    return this.mainComponent();
  }

  mainComponent() {
    //redirects to homepage when clicked on home button
    if (
      this.props.match.params.page === HomePage.Page ||
      this.props.match.params.page == undefined
    ) {
      return (
        <Home
          loginMetadata={this.props.loginMetadata}
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }
    if (this.props.match.params.page === ContactPage.Page) {
      return <ContactUs />;
    }
    if (this.props.match.params.page === AdminPaymentByMember.Page) {
      return (
        <PaymentHistoryAdminByMember
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
        />
      );
    }

    if (this.props.match.params.page === MembershipPage.Page) {
      return (
        <Membership
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }
    //i have made this change
    if (this.props.match.params.page === NonMembershipPayments.Page) {
      return (
        <NonMemberPayments
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
        />
      );
    }

    //create membership page par jaata hai
    if (this.props.match.params.page === CreateNewMembership.Page) {
      return (
        <JoinIIA
          membershipProfile={this.state.memberShipProfile}
          loginMetadata={this.props.loginMetadata}
          setMembershipStatusFunction={(value: number) =>
            this.setMembershipStatusFunction(value)
          }
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }

    if (this.props.match.params.page === ViewNews.Page) {
      return (
        <AdminViewNews
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
        />
      );
    }
    //redirects to approve membership page,if commented out invalid url appears
    if (this.props.match.params.page === ApproveMembershipPage.Page) {
      return (
        <ApproveMembership
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }

    if (this.props.match.params.page === RengenerateAndDeleteInvoices.Page) {
      return (
        <RengenerateAndDeleteInvoice
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }
    if (this.props.match.params.page === PaymentHistoryPage.Page) {
      return (
        <PaymentHistory
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
        />
      );
    }
    if (this.props.match.params.page === PaymentHistoryPageForAdmin.Page) {
      return (
        <PaymentHistoryAdmin
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
        />
      );
    }
    //redirects to the record admin page.Invalid url appears if commented out.
    if (this.props.match.params.page === RecordPaymentPage.Page) {
      return (
        <RecordPaymentSearch
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
        />
      );
    }
    if (this.props.match.params.page === CreateUpadateMembershipPage.Page) {
      return (
        <CreateUpadateMembershipProfile
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
            this.props.setLoginStateFunction(loginMetadata)
          }
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }
    if (this.props.match.params.page === InsurancePage.Page) {
      return (
        <Insurance
          loginMetadata={this.props.loginMetadata}
          changePage={(value: string) => this.props.changePage(value)}
        ></Insurance>
      );
    }

    if (this.props.match.params.page === NewsPage.Page) {
      return (
        <NewsList
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
        />
      );
    }

    if (this.props.match.params.page === OffersPage.Page) {
      return <OfferCategoryList loginMetadata={this.props.loginMetadata} />;
    }

    if (this.props.match.params.page === HelpdeskPage.Page) {
      return (
        <Helpdesk
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }
    if (this.props.match.params.page === AdminReport.Page) {
      return (
        <AdminReports
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
        />
      );
    }
    if (this.props.match.params.page === HelpdeskDashboardPage.Page) {
      return <HelpDeskDashBoard loginMetadata={this.props.loginMetadata} />;
    }

    if (this.props.match.params.page === CourierPage.Page) {
      return <ComingSoon />;
    }

    if (this.props.match.params.page === LocalContactPage.Page) {
      return (
        <MyIIA
          loginMetadata={this.props.loginMetadata}
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }

    if (this.props.match.params.page === B2BPage.Page) {
      return <B2BBuyerMain loginMetadata={this.props.loginMetadata} />;
    }
    if (this.props.match.params.page === B2BSellerPage.Page) {
      return (
        <EnquiryStatus
          loginMetadata={this.props.loginMetadata}
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }

    if (this.props.match.params.page === VirtualTradeFaresPage.Page) {
      return <ComingSoon />;
    }
    if (this.props.match.params.page === PaymentsPage.Page) {
      return <ComingSoon />;
    }

    //this redirects to 'create IIA and MSME' page,invalid url appears when commented out.
    if (this.props.match.params.page === NewsCreationPage.Page) {
      return (
        <CreateNews
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
        />
      );
    }

    if (this.props.match.params.page === HelpdeskPage.Page) {
      return (
        <Helpdesk
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }

    if (this.props.match.params.page === ChapterPage.Page) {
      return (
        <Chapter
          loginMetadata={this.props.loginMetadata}
          setLoginStateFunction={this.props.setLoginStateFunction}
          changePage={(value: string) => this.props.changePage(value)}
        />
      );
    }
    if (this.props.match.params.page === B2BAdminPage.Page) {
      return <B2BAdmin loginMetadata={this.props.loginMetadata} />;
    }

    if (this.props.match.params.page === MagazinePage.Page) {
      return <Magazines loginMetadata={this.props.loginMetadata} />
    }

    if (this.props.match.params.page === MagazineCreationPage.Page) {
      return <MagazineCreate loginMetadata={this.props.loginMetadata} />
    }

    if (this.props.match.params.page === ManageMagazinePage.Page) {
      return <AdminManageMagazine loginMetadata={this.props.loginMetadata} />
    }

    if (this.props.match.params.page === IIADirectoryPage.Page) {
      return <IIADirectory loginMetadata={this.props.loginMetadata} />;
    }

    
  if (this.props.match.params.page === IIADivisonal.Page) {
    return <IIADivisonalLogin />;
  }


    if (this.props.match.params.page === MembershipBenefitPage.Page) {
      return <MembershipBenifits />;
    } else {
      return (
        <DisplayMessage
          logoPath={rejectedMembership}
          message="Invalid PageURl"
        />
      );
    }
  }
}

export default MenuPages;
