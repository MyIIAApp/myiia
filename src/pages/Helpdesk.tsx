import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonPopover,
  IonSegment,
  IonList,
  IonImg,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonGrid,
  IonModal,
} from "@ionic/react";
import React from "react";
import CreateTicket from "../components/CreateTicket";
import HeaderToolbar from "../components/HeaderToolbar";
import TicketsList from "../components/TicketsList";
import { IsAdmin } from "../constants/Config";
import { HelpdeskView } from "../HelpdeskConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { Ticket } from "../models/Ticket";
import { TicketResponse } from "../models/TicketResponse";
import { HelpdeskService } from "../services/HelpdeskService";
import "../styles/Helpdesk.css";
import Nonmemberdisplay from "../images/Nonmemberdisplay.svg";
import plusIcon from "../images/plusIcon.svg";
import Membership from "./Membership/Membership";
import { HomePage, MembershipPage } from "../constants/MenuConstants";
import App from "../App";
import JoinIIA from "../components/Membership/JoinIIA";
import Loading from "../components/Loading";
import { DownloadTicketInExcelServices } from "../services/DownloadTicketInExcelServices";
import { Redirect } from "react-router";
import CreateTicketSearch from "./CreateTicketSearch";
interface HelpdeskProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}

interface HelpdeskState {
  ticketiia: Ticket[];
  ticketmember: Ticket[];
  ticketclosed: Ticket[];
  currentHelpdeskView: HelpdeskView;
  showSubmitState: boolean;
  ticket: Ticket[];
  showPop: boolean;
  page: string;
  ticketStatus: string;
  isLoading: boolean;
  excelFilePath: string;
  createTicketForAdmin: boolean;
}

class Helpdesk extends React.Component<HelpdeskProps, HelpdeskState> {
  constructor(props: HelpdeskProps) {
    super(props);
    this.state = {
      ticketiia: [],
      ticketmember: [],
      ticketclosed: [],
      createTicketForAdmin: false,
      currentHelpdeskView: HelpdeskView.HelpdeskHome,
      showSubmitState: false,
      ticket: [],
      showPop: false,
      page: HomePage.Page,
      ticketStatus: "",
      isLoading: true,
      excelFilePath: "",
    };
  }
  comeBack = () => {
    this.setState({
      createTicketForAdmin: false,
      currentHelpdeskView: HelpdeskView.HelpdeskHome,
    });
  };

  async componentDidMount() {
    if (this.props.loginMetadata.isAdmin) {
      await this.getadmindata(true);
      this.downloadData();
    } else {
      this.getData(true);
    }
  }
  downloadData() {
    this.setState({ isLoading: true });
    return DownloadTicketInExcelServices.GetMemberDashboard(
      this.props.loginMetadata,
      true
    )
      .then((response: any) => {
        this.setState({ isLoading: false, excelFilePath: response.path });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  private getadmindata(forceRefresh: boolean) {
    this.setState({ isLoading: true });
    return HelpdeskService.GetSummaryForChapter(
      this.props.loginMetadata,
      forceRefresh
    )
      .then((ticketResponse: TicketResponse) => {
        this.setState({
          ticketiia: ticketResponse.ticketIia,
          ticketmember: ticketResponse.ticketMember,
          ticketclosed: ticketResponse.ticketClosed,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  private getData(forceRefresh: boolean) {
    this.setState({ isLoading: true });
    return HelpdeskService.GetSummaryForUser(
      this.props.loginMetadata,
      forceRefresh
    )
      .then((ticketResponse: TicketResponse) => {
        this.setState({
          ticketiia: ticketResponse.ticketIia,
          ticketmember: ticketResponse.ticketMember,
          ticketclosed: ticketResponse.ticketClosed,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {
              IsAdmin ? this.getadmindata(true) : this.getData(true);
            }}
            previousPage={() => {}}
            showBackButton={
              this.state.currentHelpdeskView === HelpdeskView.HelpdeskList
                ? true
                : false
            }
            showRefreshButton={true}
          />
          <Loading />
        </IonPage>
      );
    }
    if (this.state.createTicketForAdmin) {
      return this.getDetailsForAdmin();
    }

    if (this.state.currentHelpdeskView === HelpdeskView.HelpdeskHome) {
      return this.getHelpdeskHomeContent();
    } else if (this.state.currentHelpdeskView === HelpdeskView.HelpdeskList) {
      return this.getHelpdeskListContent();
    } else if (this.state.currentHelpdeskView === HelpdeskView.CreateTicket) {
      return this.getHelpdesCreateContent();
    }

    return this.getHelpdeskHomeContent();
  }

  private getHelpdeskHomeContent() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {
            IsAdmin ? this.getadmindata(true) : this.getData(true);
          }}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={true}
        />
        <IonContent>
          <IonGrid className="limitContent">
            <IonCard class="statuslistcard">
              <IonCardContent>
                <IonItem
                  detail
                  onClick={(e) =>
                    this.onHomepageBadgeClicked("Pending on Member")
                  }
                  lines="none"
                >
                  <IonLabel class="statuslabel">Pending on Member</IonLabel>
                  <IonBadge slot="end" class="badge">
                    {this.state.ticketmember.length}
                  </IonBadge>
                </IonItem>
              </IonCardContent>
            </IonCard>
            <IonCard class="statuslistcard">
              <IonCardContent>
                <IonItem
                  onClick={(e) => this.onHomepageBadgeClicked("Pending on IIA")}
                  detail
                  lines="none"
                >
                  <IonLabel class="statuslabel">Pending on IIA</IonLabel>
                  <IonBadge slot="end" class="badge">
                    {this.state.ticketiia.length}
                  </IonBadge>
                </IonItem>
              </IonCardContent>
            </IonCard>
            <IonCard class="statuslistcard">
              <IonCardContent>
                <IonItem
                  onClick={(e) => this.onHomepageBadgeClicked("Closed")}
                  detail
                  lines="none"
                >
                  <IonLabel class="statuslabel">Closed Tickets</IonLabel>
                  <IonBadge slot="end" class="badge">
                    {this.state.ticketclosed.length}
                  </IonBadge>
                </IonItem>
              </IonCardContent>
            </IonCard>
            <IonButton
              onClick={() => {
                IsAdmin
                  ? this.setState({ createTicketForAdmin: true })
                  : this.props.loginMetadata.membershipStatus >= 3
                  ? this.onCreateTicketClicked()
                  : this.onCreatePop();
              }}
              // hidden={IsAdmin}
              class="commonbutton"
            >
              <IonImg src={plusIcon} />
              &nbsp; Raise New Issues
            </IonButton>
            <IonButton
              hidden={!IsAdmin}
              class="commonbutton"
              style={{ marginTop: 12 }}
              href={this.state.excelFilePath}
            >
              Download Tickets
            </IonButton>
            <IonModal
              isOpen={this.state.showPop}
              backdropDismiss={false}
              onDidDismiss={() => this.setState({ showPop: false })}
            >
              <IonContent>
                <IonList>
                  <IonItem lines="none" class="createpop1">
                    <IonSegment mode="md">
                      <IonImg src={Nonmemberdisplay} />
                    </IonSegment>
                  </IonItem>
                  <IonItem lines="none" class="createpop2">
                    <IonSegment mode="md">
                      This feature is currently available only for members. For
                      generic query, please contact iia@iiaonline.in or call at
                      8601855540/45
                    </IonSegment>
                  </IonItem>
                  <IonItem lines="none">
                    <IonSegment mode="md">
                      <IonButton
                        class="createpop3"
                        onClick={() => this.becomeMember()}
                      >
                        Become Member Now!
                      </IonButton>
                    </IonSegment>
                  </IonItem>
                </IonList>
              </IonContent>
            </IonModal>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  private onHomepageBadgeClicked(status: string) {
    let ticket: Ticket[];
    if (status === "Pending on IIA") {
      ticket = this.state.ticketiia;
    } else if (status === "Pending on Member") {
      ticket = this.state.ticketmember;
    } else if (status === "Closed") {
      ticket = this.state.ticketclosed;
    } else {
      ticket = [];
    }
    this.setState({
      currentHelpdeskView: HelpdeskView.HelpdeskList,
      ticket: ticket,
      ticketStatus: status,
    });
  }

  private onMemberPage() {}

  private onCreateTicketClicked() {
    this.setState({
      currentHelpdeskView: HelpdeskView.CreateTicket,
    });
  }

  private onCreatePop() {
    this.setState({ showPop: true });
  }

  private onCreateBackClicked() {
    this.props.loginMetadata.isAdmin
      ? this.getadmindata(true)
      : this.getData(true);
    this.setState({
      currentHelpdeskView: HelpdeskView.HelpdeskHome,
    });
  }
  private getDetailsForAdmin() {
    return (
      <IonPage>
        <IonContent>
          <CreateTicketSearch
            loginMetadata={this.props.loginMetadata}
            comeback={this.comeBack}
            setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
              this.props.setLoginStateFunction(loginMetadata)
            }
          />
        </IonContent>
      </IonPage>
    );
  }
  private getHelpdeskListContent() {
    return (
      <TicketsList
        ticketsList={this.state.ticket}
        loginMetadata={this.props.loginMetadata}
        setViewFunction={(value: string) => this.onCreateBackClicked()}
        refreshTicketList={(value: string) => this.getTicketRefreshData(value)}
        ticketStatus={this.state.ticketStatus}
      />
    );
  }

  private getHelpdesCreateContent() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => this.onCreateBackClicked()}
          showBackButton={true}
          showRefreshButton={false}
        />
        <IonContent>
          <CreateTicket loginMetadata={this.props.loginMetadata} userId={-1} memberId=""/>
        </IonContent>
      </IonPage>
    );
  }

  getTicketRefreshData(value: string) {
    let promise: Promise<any>;
    if (this.props.loginMetadata.isAdmin) {
      promise = this.getadmindata(true);
    } else {
      promise = this.getData(true);
    }
    promise.then(() => this.onHomepageBadgeClicked(value));
  }

  becomeMember() {
    this.props.changePage(MembershipPage.Page);
  }
}

export default Helpdesk;
