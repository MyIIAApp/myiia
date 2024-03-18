import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import React from "react";
import { IsAdmin } from "../constants/Config";
import { HelpdeskView } from "../HelpdeskConstants";
import ticketListIcon from "../images/ticketListIcon.svg";
import { LoginMetadata } from "../models/LoginMetadata";
import { Ticket } from "../models/Ticket";
import "../styles/Helpdesk.css";
import HeaderToolbar from "./HeaderToolbar";
import SubjectCommitteeChairman from "../JsonFiles/SubjectCommitteeChairman.json";
import TicketsDetails from "./TicketsDetails";

interface TicketsListStates {
  tickets: Ticket[];
  currentHelpdeskView: HelpdeskView;
  currentStateSelected: string;
  sCommitteChairman: any;
  committeeName: string;
  committeeId: any;
  defaultPreview: boolean;
}

interface TicketsListProps {
  ticketsList: Ticket[];
  loginMetadata: LoginMetadata;
  setViewFunction: (value: string) => void;
  refreshTicketList: (value: string) => void;
  ticketStatus: string;
}

class TicketsList extends React.Component<TicketsListProps, TicketsListStates> {
  constructor(props: TicketsListProps) {
    super(props);
    this.state = {
      tickets: [],
      currentHelpdeskView: HelpdeskView.HelpdeskList,
      currentStateSelected: "",
      sCommitteChairman: SubjectCommitteeChairman,
      committeeName: "",
      committeeId: 0,
      defaultPreview: true,
    };
  }
  render() {
    if (this.state.currentHelpdeskView === HelpdeskView.TicketDetails) {
      return this.getTicketContent();
    }
    if (this.props.ticketsList.length === 0) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() =>
              this.props.refreshTicketList(this.props.ticketStatus)
            }
            previousPage={() =>
              this.props.setViewFunction(HelpdeskView.HelpdeskHome)
            }
            showBackButton={true}
            showRefreshButton={true}
          />
          <IonContent>
            <IonGrid className="limitContent">
              <IonSegment mode="md" class="logoSegment">
                <IonItem lines="none">
                  <IonIcon ios={warningOutline} md={warningOutline} />
                </IonItem>
              </IonSegment>
              <IonSegment mode="md">
                <IonLabel>No Tickets Available</IonLabel>
              </IonSegment>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    }

    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() =>
            this.props.refreshTicketList(this.props.ticketStatus)
          }
          previousPage={() =>
            this.props.setViewFunction(HelpdeskView.HelpdeskHome)
          }
          showBackButton={true}
          showRefreshButton={true}
        />
        <IonContent>
          <IonGrid className="limitContent">
            {IsAdmin ? (
              <IonRow style={{ marginBottom: "18px", marginTop: "20px" }}>
                <IonCol
                  style={{
                    flexdirection: "column",
                    justifyContent: "space-between",
                  }}
                  size="12"
                >
                  <IonItem class="SelectInputSCC">
                    <IonLabel
                      position="floating"
                      class="LabelPosition"
                      color={"high"}
                    >
                      Filter by Alotted Committee
                    </IonLabel>
                    <IonSelect
                      value={this.state.committeeName}
                      name="Committee"
                      class=""
                      onIonChange={(e) => this.updateValue(e)}
                    >
                      <IonSelectOption key={-1} value={"allTickets"}>
                        All tickets
                      </IonSelectOption>
                      <IonSelectOption key={-2} value={undefined}>
                        Not Alloted
                      </IonSelectOption>
                      {this.state.sCommitteChairman.map((val: any) => {
                        return (
                          <IonSelectOption
                            key={val.Committee_ID}
                            value={val.Committee_Name}
                          >
                            {val.Committee_Name}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
            ) : null}
            <IonList>
              {this.props.ticketsList
                .filter((val) => {
                  if (!this.state.defaultPreview) {
                    return val.CommitteeId == this.state.committeeId;
                  } else {
                    return true;
                  }
                })
                .map((ticketsItem: Ticket) => {
                  return (
                    <IonCard key={ticketsItem.TicketNumber} class="ticketlist">
                      <IonCardContent>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="6">
                              <IonCardTitle class="listcardsubtitle">
                                #{ticketsItem.TicketNumber}
                              </IonCardTitle>
                            </IonCol>
                            <IonCol size="6" class="listcardtime">
                              {ticketsItem.TicketCreationTime.split("T")[0]}{" "}
                              {ticketsItem.TicketCreationTime.split(
                                "T"
                              )[1].substring(0, 5)}
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol size="10">
                              <IonRow class="ticketListCatSubcat">
                                <IonLabel class="ticketListCatSubcat2">
                                  <strong>
                                    {ticketsItem.Category.split(",")[0]}
                                  </strong>
                                  &nbsp;&gt;
                                </IonLabel>

                                <IonLabel class="ticketListCatSubcat2">
                                  {ticketsItem.Category.split(",")[1]}
                                  &nbsp;&nbsp;
                                </IonLabel>
                              </IonRow>
                              <IonRow class="ticketListTitle">
                                {ticketsItem.Title}
                              </IonRow>
                            </IonCol>
                            <IonCol size="2">
                              <IonButton
                                class="openbutton"
                                onClick={(e) =>
                                  this.onOpenClicked(ticketsItem.TicketNumber)
                                }
                              >
                                <IonImg src={ticketListIcon} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            &nbsp;&nbsp;
                            <strong>{ticketsItem.ChapterName.trim()}</strong>
                            &nbsp;Chapter
                          </IonRow>
                        </IonGrid>
                      </IonCardContent>
                    </IonCard>
                  );
                })}
            </IonList>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  private onOpenClicked(TicketNumber: string) {
    this.setState({
      currentHelpdeskView: HelpdeskView.TicketDetails,
      currentStateSelected: TicketNumber,
    });
  }

  private getTicketContent() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => {
            this.props.refreshTicketList(this.props.ticketStatus);
            this.setState({ currentHelpdeskView: HelpdeskView.HelpdeskList });
          }}
          showBackButton={true}
          showRefreshButton={false}
        />
        <IonContent>
          <IonGrid className="limitContent">
            <TicketsDetails
              TicketNumber={this.state.currentStateSelected}
              loginMetadata={this.props.loginMetadata}
              setViewFunction={(value: string) =>
                this.props.setViewFunction(value)
              }
            />
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  updateValue(e) {
    if (e.detail.value === "allTickets") {
      this.setState({
        committeeName: e.detail.value,
        defaultPreview: true,
      });
    } else {
      // console.log(this.props.ticketsList);
      const ID = SubjectCommitteeChairman.find(
        (Idnum) => Idnum.Committee_Name === e.detail.value
      );
      this.setState({
        defaultPreview: false,
        committeeName: e.detail.value,
        committeeId: ID?.Committee_ID,
      });
      // console.log(this.state.committeeId + " " + this.state.committeeName);
    }
  }
}

export default TicketsList;
