import {
  IonContent,
  IonPage,
  IonSegment,
  IonRouterLink,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonFooter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonList,
  IonAlert,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonDatetime,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Payment.css";
import "../../styles/Membership.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import Loading from "../../components/Loading";
import { closeOutline, close } from "ionicons/icons";
import { MembershipService } from "../../services/MembershipService";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import flag from "../../images/indiaFlag.svg";
import DownloadPaymentInExcelServices from "../../services/DownloadPaymentInExcelServices";
import { Browser } from "@capacitor/browser";

interface PaymentHistoryAdminStates {
  PaymentHistoryRecord: any;
  showloading: boolean;
  showMemberEntry: boolean;
  startDate: string;
  endDate: string;
  excelFilePath: string;
  chapterId: number;
  chapters: any;
  showAlert: boolean;
  alertMessage: string;
  reason: string;
}
interface PaymentHistoryAdminProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class PaymentHistoryAdmin extends React.Component<
  PaymentHistoryAdminProps,
  PaymentHistoryAdminStates
> {
  static Page: string;
  constructor(props: PaymentHistoryAdminProps) {
    super(props);
    this.state = {
      PaymentHistoryRecord: [],
      showloading: true,
      showMemberEntry: true,
      startDate: "",
      endDate: "",
      excelFilePath: "",
      chapterId: this.props.loginMetadata.chapterId,
      chapters: null,
      showAlert: false,
      alertMessage: "",
      reason: "",
    };
  }
  componentDidMount() {
    MembershipService.getChapters(this.props.loginMetadata)
      .then((response: any) => {
        this.setState({ chapters: response.chapters, showloading: false });
      })
      .catch(() => {});
    console.log(this.state.chapters);
  }
  choice = ["Membership", "Non-Membership"];
  downloadData(opration: string) {
    this.setState({ showloading: true });
    return DownloadPaymentInExcelServices.GetExcelLink(
      this.props.loginMetadata,
      true,
      this.state.startDate,
      this.state.endDate,
      this.state.chapterId,
      opration,
      this.state.reason
    )
      .then((response: any) => {
        this.setState({ excelFilePath: response.path, showloading: false });
        Browser.open({ url: this.state.excelFilePath });
      })
      .catch((error) => {
        this.setState({ showloading: false });
      });
  }
  paymentData() {
    PaymentService.paymentHistoryServiceForAdmin(
      this.props.loginMetadata,
      true,
      this.state.startDate,
      this.state.endDate,
      this.state.reason
    )
      .then((response: any) => {
        this.setState({
          PaymentHistoryRecord: response,
          showloading: false,
          showMemberEntry: false,
        });
      })
      .catch(() => {
        this.setState({ showloading: false });
      });
  }
  render() {
    if (this.state.showloading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent>
            <Loading />
          </IonContent>
        </IonPage>
      );
    } else if (this.state.showMemberEntry) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent>
            <IonAlert
              isOpen={this.state.showAlert}
              message={this.state.alertMessage}
              onDidDismiss={() => {
                this.setState({ showAlert: false });
              }}
            ></IonAlert>
            <IonGrid className="ContentCenters limitContent">
              <IonSegment mode="md" className="colorSeg">
                <IonCardHeader>
                  <IonCardTitle className="loginHeader">
                    Fetch Invoice
                  </IonCardTitle>
                </IonCardHeader>
              </IonSegment>
              <IonRow>
                <IonSegment mode="md">
                  <IonItem class="basicInputGSt">
                    <IonLabel position="floating" class="selectDisabled">
                      Fetch Invoice For*
                    </IonLabel>
                    <IonSelect
                      value={this.state.reason}
                      name="Invoice Type"
                      class="selectDisabled"
                      onIonChange={(e) =>
                        this.setState({ reason: e.detail.value })
                      }
                    >
                      {this.choice.map((val: any) => {
                        return (
                          <IonSelectOption key={val} value={val}>
                            {val}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                </IonSegment>
              </IonRow>

              {this.props.loginMetadata.chapterId == 82 ? (
                <IonItem style={{ width: 300, marginLeft: "24%" }}>
                  <IonLabel position="floating" class="selectDisabled">
                    Select IIA Chapter*
                  </IonLabel>
                  <IonSelect
                    value={this.state.chapterId}
                    name="chapterId"
                    class="selectDisabled"
                    onIonChange={(e) =>
                      this.setState({ chapterId: e.detail.value })
                    }
                  >
                    {this.state.chapters
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        else if (a.name > b.name) return 1;
                        else return 0;
                      })
                      .map((chapter: any) => {
                        return (
                          <IonSelectOption key={chapter.id} value={chapter.id}>
                            {chapter.name}
                          </IonSelectOption>
                        );
                      })}
                  </IonSelect>
                </IonItem>
              ) : undefined}
              <IonSegment mode="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonDatetime
                      placeholder="Enter Start Date"
                      style={{ color: "black" }}
                      value={this.state.startDate}
                      onIonChange={(e) => this.onStartDateChange(e)}
                    ></IonDatetime>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode="md">
                <IonLabel>To</IonLabel>
              </IonSegment>
              <IonSegment mode="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonDatetime
                      placeholder="Enter End Date"
                      style={{ color: "black" }}
                      value={this.state.endDate}
                      onIonChange={(e) => this.onendDateChange(e)}
                    ></IonDatetime>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode="md" className="colorSeg">
                <IonButton
                  type="submit"
                  expand="block"
                  className="basicbutton SendOTPButton"
                  disabled={!this.isDateValid() || this.state.reason === ""}
                  onClick={(event) => this.paymentData()}
                >
                  Submit
                </IonButton>
              </IonSegment>
              <IonSegment mode="md" className="colorSeg">
                {
                  <IonButton
                    className="basicbutton SendOTPButton"
                    disabled={!this.isDateValid() || this.state.reason === ""}
                    onClick={() => this.downloadData("success")}
                  >
                    Download Invoice in Excel
                  </IonButton>
                }
              </IonSegment>
              {this.props.loginMetadata.chapterId == 82 ? (
                <IonRow style={{ marginTop: 10 }}>
                  <IonButton
                    className="basicbutton SendOTPButton"
                    style={{ margin: "auto", width: 500 }}
                    disabled={
                      !this.isDateValid() ||
                      this.state.reason === "Non-Membership"
                    }
                    onClick={() => this.downloadData("failed")}
                  >
                    {" "}
                    Download Failed Payment in Excel{" "}
                  </IonButton>
                </IonRow>
              ) : (
                ""
              )}
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    } else {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {
              this.setState({ showMemberEntry: true });
            }}
            showBackButton={true}
            showRefreshButton={false}
          />
          {this.state.PaymentHistoryRecord.length == 0 ? (
            <IonContent>
              <IonSegment mode="md" class="limitContent noDue">
                No Payment Made till Now
              </IonSegment>
            </IonContent>
          ) : (
            <IonContent>
              <IonGrid className="limitContent">
                <IonSegment mode="md" className="payHead">
                  Payment History
                </IonSegment>
                <IonList>
                  {this.state.PaymentHistoryRecord.map((paymentList: any) => {
                    if (
                      this.state.chapterId == 82 ||
                      this.state.chapterId == paymentList.ChapterId
                    ) {
                      var date = new Date(paymentList.DateTime);
                      return (
                        <IonCard className="payGrid" key={paymentList.DateTime}>
                          <IonGrid className="payCard">
                            <IonRow>
                              <IonCol size="7" className="payDivide">
                                <IonRow className="payReason">
                                  {paymentList.PaymentReason}
                                </IonRow>
                                <IonRow className="payMode">
                                  {paymentList.PaymentMode}
                                </IonRow>
                              </IonCol>
                              <IonCol size="4.5" class="ion-text-end payAmount">
                                {paymentList.Total}
                              </IonCol>
                            </IonRow>
                            <IonRow className="no-padding">
                              <IonCol
                                size="7"
                                className="payDivide payTime"
                                class="ion-no-padding"
                              >
                                {date.getDate() +
                                  "/" +
                                  (date.getMonth() + 1) +
                                  "/" +
                                  date.getFullYear() +
                                  " " +
                                  date.getHours() +
                                  ":" +
                                  (date.getMinutes() >= 10
                                    ? date.getMinutes()
                                    : "0" + date.getMinutes()) +
                                  ":" +
                                  (date.getSeconds() >= 10
                                    ? date.getSeconds()
                                    : "0" + date.getSeconds())}
                              </IonCol>
                              <IonCol
                                size="4.5"
                                class="ion-no-padding ion-text-end"
                              >
                                <IonRouterLink
                                  href={paymentList.InvoicePath}
                                  className="payContent"
                                >
                                  Download Invoice
                                </IonRouterLink>
                              </IonCol>
                            </IonRow>
                            <IonRow className="no-padding payDivide payTime">
                              Payment by&nbsp;{" "}
                              <strong>{paymentList.AdminName}</strong> &nbsp;of
                              chapter &nbsp;
                              <strong>{paymentList.ChapterName}</strong>
                            </IonRow>
                          </IonGrid>
                        </IonCard>
                      );
                    }
                  })}
                </IonList>
              </IonGrid>
            </IonContent>
          )}
        </IonPage>
      );
    }
  }

  public onStartDateChange(event: any) {
    this.setState({ startDate: event.target.value.split('T')[0] });
    console.log(this.state.startDate);
  }
  public onendDateChange(event: any) {
    this.setState({ endDate: event.target.value.split('T')[0] });
  }
  public isDateValid(): boolean {
    return (
      new Date(this.state.startDate) < new Date(this.state.endDate) /*&&
      new Date(this.state.endDate) <= new Date(Date.now())*/
    );
  }
}

export default PaymentHistoryAdmin;
