import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonSegment,
} from "@ionic/react";
import { checkmarkCircle, closeCircle, logOutOutline } from "ionicons/icons";
import React from "react";
import ReactGA from "react-ga";
import { Event } from "../components/Tracker";
import { IsAdmin } from "../constants/Config";
import {
  AppPage,
  B2BPage,
  ContactPage,
  ChapterPage,
  HelpdeskPage,
  HelpdeskDashboardPage,
  HomePage,
  LocalContactPage,
  MembershipBenefitPage,
  MembershipPage,
  MembershipProfileStatus,
  NewsCreationPage,
  NewsPage,
  OffersPage,
  InsurancePage,
  ApproveMembershipPage,
  CreateUpadateMembershipPage,
  RecordPaymentPage,
  PaymentHistoryPage,
  B2BSellerPage,
  B2BAdminPage,
  PaymentHistoryPageForAdmin,
  AdminPaymentByMember,
  AdminReport,
  //my addition
  NonMembershipPayments,
  CreateNewMembership,
  RengenerateAndDeleteInvoices,
  ViewNews,
  MagazinePage,
  MagazineCreationPage,
  ManageMagazinePage,
  IIADirectoryPage,
  IIAwebsitePage
} from "../constants/MenuConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { UserProfileModel } from "../models/UserProfileModel";
import { MembershipService } from "../services/MembershipService";
import "../styles/Menu.css";

interface MenuStates {
  membershipProfile: UserProfileModel;
}

interface MenuProps {
  loginMetadata: LoginMetadata;
  changePage: (value: string) => void;
  page: string;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class Menu extends React.Component<MenuProps, MenuStates> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      membershipProfile: new UserProfileModel(
        this.props.loginMetadata.tokenString,
        0
      ),
    };
  }
  componentDidMount() {
    this.getData(false);
    ReactGA.pageview("Menu");
  }

  protected getData(forceRefresh: boolean) {
    if (!this.props.loginMetadata.isAdmin) {
      let getUserProfilePromise = MembershipService.getUserProfile(
        this.props.loginMetadata,
        forceRefresh,
        {}
      );
      getUserProfilePromise
        .then((result: any) => {
          this.setState({
            membershipProfile: result,
          });
          if (
            this.props.loginMetadata.membershipStatus != result.profileStatus
          ) {
            this.props.loginMetadata.membershipStatus = result.profileStatus;
            this.props.setLoginStateFunction(this.props.loginMetadata);
          }
        })
        .catch(() => { });
    }
  }
  render() {
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader color="primary">
              {this.props.loginMetadata.isAdmin === true
                ? this.props.loginMetadata.phoneNumber
                : this.props.loginMetadata.membershipStatus <
                  MembershipProfileStatus.Active
                  ? this.props.loginMetadata.phoneNumber
                  : this.state.membershipProfile.unitName}
              {"  "}
            </IonListHeader>
            <IonNote>
              {this.props.loginMetadata.isAdmin === true ? (
                <span>{this.props.loginMetadata.chapterName} Admin </span>
              ) : (
                MembershipProfileStatus[
                this.props.loginMetadata.membershipStatus === 6 ? 5 : this.props.loginMetadata.membershipStatus
                ]
              )}
              {this.props.loginMetadata.membershipStatus === 5 || this.props.loginMetadata.membershipStatus === 6 ||
                this.props.loginMetadata.isAdmin ? (
                <IonIcon className="noteIcon" ios={checkmarkCircle}></IonIcon>
              ) : (
                <IonIcon className="noteIcon" ios={closeCircle}></IonIcon>
              )}
            </IonNote>
            {IsAdmin ? this.getMenusForAdminApp() : this.getMenusForUserApp()}
          </IonList>
          <IonSegment mode="md">
            <IonButton
              color="light"
              expand="block"
              className="logoutButton"
              onClick={(e) => (
                this.props.setLoginStateFunction(null),
                Event("Button", "click", "Logout")
              )}
            >
              <IonIcon ios={logOutOutline} color="primary"></IonIcon>
              <IonLabel color="primary">Logout</IonLabel>
            </IonButton>
          </IonSegment>
        </IonContent>
      </IonMenu>
    );
  }

  private getMenuItem(appPage: AppPage, index: number) {
    return (
      <IonMenuToggle key={index} autoHide={false} color="light">
        <IonItem
          onClick={() => (
            this.props.changePage(appPage.Page), ReactGA.pageview(appPage.Page)
          )}
          routerLink={"/" + appPage.Page}
          lines="none"
          detail={false}
          color={appPage.Page == this.props.page ? "light" : "primary"}
          hidden={
            this.props.loginMetadata.chapterId != 82 && index === 5 && IsAdmin
          }
        >
          <IonIcon
            color={appPage.Page == this.props.page ? "primary" : "light"}
            slot="start"
            ios={appPage.IosIcon}
            md={appPage.MdIcon}
          />
          <IonLabel
            color={appPage.Page == this.props.page ? "primary" : "light"}
          >
            {appPage.Page}
          </IonLabel>
        </IonItem>
      </IonMenuToggle>
    );
  }


  private getMenusForUserApp() {
    return (
      <div>
        {this.getMenuItem(HomePage, 0)}
        {this.getMenuItem(MembershipPage, 1)}
        {this.getMenuItem(MembershipBenefitPage, 2)}
        {this.getMenuItem(NewsPage, 3)}
        {this.getMenuItem(B2BPage, 4)}
        {this.getMenuItem(B2BSellerPage, 5)}
        {this.getMenuItem(InsurancePage, 6)}
        {this.getMenuItem(OffersPage, 7)}
        {this.getMenuItem(HelpdeskPage, 8)}
        {this.getMenuItem(LocalContactPage, 9)}
        {this.getMenuItem(PaymentHistoryPage, 10)}
        {this.getMenuItem(MagazinePage, 11)}
        {this.getMenuItem(IIADirectoryPage, 12)}
        {this.getMenuItem(ContactPage, 13)}
      </div>
    );
  }

  private getMenusForAdminApp() {
    return (
      <div>
        {this.getMenuItem(HomePage, 0)}
        {this.getMenuItem(NewsCreationPage, 1)}
        {this.props.loginMetadata.chapterId == 82
          ? this.getMenuItem(ViewNews, 2)
          : undefined}          
        {this.getMenuItem(HelpdeskDashboardPage, 4)}
        {this.getMenuItem(HelpdeskPage, 3)}
        {this.props.loginMetadata.chapterId == 82 ?
          this.getMenuItem(ChapterPage, 6) : null}
        {this.getMenuItem(ApproveMembershipPage, 7)}
        {this.getMenuItem(B2BAdminPage, 5)}
        {this.getMenuItem(CreateUpadateMembershipPage, 8)}
        {this.getMenuItem(RecordPaymentPage, 9)}
        {this.getMenuItem(PaymentHistoryPageForAdmin, 10)}
        {this.getMenuItem(AdminPaymentByMember, 11)}
        {this.getMenuItem(CreateNewMembership, 12)}

        {this.props.loginMetadata.chapterId == 82
          ? this.getMenuItem(RengenerateAndDeleteInvoices, 13)
          : undefined}
        {this.props.loginMetadata.chapterId == 82
          ? this.getMenuItem(AdminReport, 14)
          : undefined}
        {this.getMenuItem(NonMembershipPayments, 15)}
        {this.props.loginMetadata.chapterId == 82
          ? this.getMenuItem(MagazineCreationPage, 16) 
          : undefined}
        {this.props.loginMetadata.chapterId == 82
          ? this.getMenuItem(ManageMagazinePage, 17) 
          : undefined}
        {this.getMenuItem(IIADirectoryPage, 18)}
      </div>
    );
  }

  ListIndustryName() {
    if (this.state.membershipProfile.unitName === "") {
      return (
        <IonListHeader color="primary">
          {this.props.loginMetadata.phoneNumber}
        </IonListHeader>
      );
    } else {
      return (
        <IonListHeader color="primary">
          {this.state.membershipProfile.unitName}
        </IonListHeader>
      );
    }
  }
}

export default Menu;
