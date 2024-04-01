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
  IonDatetime,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Payment.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import Loading from "../../components/Loading";
import ProgressBar from "../../components/ProgressBar";
import { DBservice } from "../../services/DBService";
import { Browser } from "@capacitor/browser";
import { MembershipService } from "../../services/MembershipService";

interface AdminReportsStates {
  AdminReportsRecord: any;
  showloading: boolean;
  showAlert: boolean;
  alertMessage: string;
  excelPath: string;
  progressBar: boolean;
  startDate: string;
  endDate: string;
  chapterId: number;
  chapters: any;
  reason: string;
}
interface AdminReportsProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class AdminReports extends React.Component<
  AdminReportsProps,
  AdminReportsStates
> {
  static Page: string;
  constructor(props: AdminReportsProps) {
    super(props);
    this.state = {
      AdminReportsRecord: [],
      showloading: true,
      showAlert: false,
      alertMessage: "",
      excelPath: "",
      progressBar: false,
      startDate: "",
      endDate: "",
      chapterId: 82,
      chapters: null,
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
  render() {
    if (this.state.showloading)
      return (
        <IonPage>
          <HeaderToolbar
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
            refreshPage={() => {}}
          ></HeaderToolbar>
          <IonContent>
            <Loading />
          </IonContent>
        </IonPage>
      );
    else if (this.state.progressBar)
      return (
        <IonPage>
          <HeaderToolbar
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
            refreshPage={() => {}}
          ></HeaderToolbar>
          <IonContent>
            <ProgressBar />
          </IonContent>
        </IonPage>
      );
    return (
      <IonPage>
        <HeaderToolbar
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={false}
          refreshPage={() => {}}
        ></HeaderToolbar>
        <IonContent>
          <IonAlert
            isOpen={this.state.showAlert}
            message={this.state.alertMessage}
            onDidDismiss={() => {
              this.setState({ showAlert: false });
            }}
          ></IonAlert>
          <IonGrid class="limitContent" style={{ marginTop: 10 }}>
            <IonRow>
              <IonButton
                class="basicbutton SendOTPButton"
                style={{ margin: "auto" }}
                onClick={() => {
                  this.dbSync();
                }}
              >
                Database Sync
              </IonButton>
            </IonRow>
            <IonRow style={{ marginTop: 10, marginBottom: 20 }}>
              <IonButton
                class="basicbutton SendOTPButton"
                style={{ margin: "auto" }}
                onClick={() => {
                  this.downloadData();
                }}
              >
                Download All Members Data
              </IonButton>
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
            <IonRow>
              <IonSegment mode ="md">
                <IonItem class="basicInputGSt">
                  <IonLabel position="floating" class="selectDisabled">
                    Download GST Report For*
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
            <IonRow style={{ marginTop: 10 }}>
              <IonButton
                className="babasicbutton SendOTPButton"
                style={{ margin: "auto" }}
                disabled={!this.isDateValid() || this.state.reason == ""}
                onClick={() => this.downloadGSTReport()}
              >
                Download GST Report
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
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
  dbSync() {
    this.setState({ progressBar: true });
    DBservice.DBSync(this.props.loginMetadata)
      .then((resp) => {
        this.setState({
          progressBar: false,
          showAlert: true,
          alertMessage: "Database Synced Successfully",
        });
      })
      .catch((e) => {
        this.setState({
          progressBar: false,
          showAlert: true,
          alertMessage: "Failed",
        });
      });
  }
  downloadData() {
    this.setState({ showloading: true });
    DBservice.FetchMemberData(this.props.loginMetadata)
      .then((resp) => {
        this.setState({ showloading: false, excelPath: resp.path });
        debugger;
        Browser.open({ url: this.state.excelPath });
      })
      .catch((e) => {
        this.setState({
          showloading: false,
          showAlert: true,
          alertMessage: "Failed",
        });
      });
  }
  downloadGSTReport(): void {
    this.setState({ showloading: true });
    PaymentService.FetchGSTReport(
      this.props.loginMetadata,
      this.state.startDate,
      this.state.endDate,
      this.state.chapterId,
      this.state.reason
    )
      .then((resp) => {
        this.setState({ showloading: false, excelPath: resp.path });
        Browser.open({ url: this.state.excelPath });
      })
      .catch((e) => {
        this.setState({
          showloading: false,
          showAlert: true,
          alertMessage: "Failed",
        });
      });
  }
}
export default AdminReports;
