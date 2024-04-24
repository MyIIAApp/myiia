import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonPopover,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSegment,
  IonSelect,
  IonSelectOption,
  IonSlide,
  IonSlides,
  IonToolbar,
} from "@ionic/react";
import React from "react";
// import "../../styles/Payment.css";
import { MembershipProfileModel } from "../models/Membership/MembershipProfileModel";
import { LoginMetadata } from "../models/LoginMetadata";
import HeaderToolbar from "../components/HeaderToolbar";
import { PaymentService } from "../services/PaymentService";
import RecordPayment from "./Payment/RecordPayment";
import Loading from "../components/Loading";
import { search } from "ionicons/icons";
import { MembershipProfileStatus } from "../constants/MenuConstants";
import CreateTicket from "../components/CreateTicket";

interface CreateTicketSearchStates {
  userDetails: MembershipProfileModel;
  phoneNumber: string;
  memberId: string;
  showPaymentModal: boolean;
  showModal: boolean;
  paymentReason: string;
  showPaymentPage: boolean;
  showProgress: boolean;
  showMember: boolean;
  yearList: any;
  // contain: any;
  showClear: boolean;
  showFinance: boolean;
  //   setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

interface CreateTicketSearchProps {
  loginMetadata: LoginMetadata;
  comeback: () => void;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class CreateTicketSearch extends React.Component<
  CreateTicketSearchProps,
  CreateTicketSearchStates
> {
  constructor(props: CreateTicketSearchProps) {
    super(props);
    this.state = {
      userDetails: new MembershipProfileModel(
        this.props.loginMetadata.tokenString,
        0,
        -1
      ),
      phoneNumber: "",
      memberId: "",
      showModal: false,
      showPaymentModal: false,
      paymentReason: "",
      showPaymentPage: false,
      showProgress: false,
      showMember: false,
      yearList: [],
      showClear: false,
      //   setLoginStateFunction: ,
      showFinance: false,
    };
  }

  componentDidMount() {
    console.log(this.props.loginMetadata);
  }

  protected getData(phoneNumber: string, memberId: string) {
    this.setState({ showProgress: true });
    let getMembershipProfilePromise = PaymentService.getUserProfile(
      this.props.loginMetadata,
      true,
      {
        phoneNumber: phoneNumber,
        memberId: memberId,
      }
    );
    getMembershipProfilePromise
      .then((result: MembershipProfileModel) => {
        if (
          result.id == -1 ||
          result.profileStatus <
            MembershipProfileStatus["ApprovedMembershipProfile"]
        ) {
          this.setState({
            showMember: true,
            showModal: false,
            showProgress: false,
          });
        } else {
          this.setState({ showProgress: true });
          this.setState({
            userDetails: result,
            showModal: true,
            showProgress: false,
            showMember: false,
          });
        }
      })
      .catch(() => {});
  }

  render() {
    if (this.state.showProgress) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <Loading />
        </IonPage>
      );
    } else if (this.state.showPaymentPage === false) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={this.props.comeback}
            showBackButton={true}
            showRefreshButton={true}
          />
          <IonContent>
            <IonSegment mode="md">
              <IonLabel
                className="raiseTicketHeading"
                color="black"
                style={{ marginBottom: 20 }}
              >
                <strong>
                  You can only raise issues and problems on behalf of other
                  members<br></br>Please search for the member
                </strong>
              </IonLabel>
            </IonSegment>
            <IonSegment
              mode="md"
              className="colorSeg"
              color="light"
              style={{ marginBottom: 9 }}
            >
              <IonCard color="primary">
                {/* <IonSegment className="phoneinput"> */}
                <IonItem>
                  <IonInput
                    type="text"
                    color="dark"
                    clearInput={true}
                    className="ion-padding"
                    maxlength={10}
                    value={this.state.phoneNumber}
                    placeholder="Enter the Phonenumber"
                    spellCheck={true}
                    required={true}
                    onIonChange={(e) => this.onNumberChange(e)}
                  ></IonInput>
                </IonItem>
              </IonCard>
              {/* </IonSegment> */}
              <IonButton
                onClick={() =>
                  this.getData(this.state.phoneNumber, this.state.memberId)
                }
                disabled={!this.isPhoneNumberValid()}
                className="searchicon"
                style={{ height: 61.8 }}
              >
                <IonIcon size="large" ios={search}></IonIcon>
              </IonButton>
            </IonSegment>
            <IonSegment mode="md" style={{ marginBottom: 9 }}>
              OR
            </IonSegment>
            <IonSegment
              className="colorSeg"
              color="light"
              style={{ marginBottom: 15 }}
            >
              {/* <IonSegment className="phoneinput"> */}
              <IonCard color="primary">
                <IonItem>
                  <IonInput
                    type="text"
                    color="dark"
                    clearInput={true}
                    className="ion-padding"
                    maxlength={5}
                    value={this.state.memberId}
                    placeholder="  Enter the MemberId"
                    spellCheck={true}
                    required={true}
                    onIonChange={(e) => this.onMemberIdChange(e)}
                  ></IonInput>
                </IonItem>
              </IonCard>
              {/* </IonSegment> */}
              <IonButton
                onClick={() =>
                  this.getData(this.state.phoneNumber, this.state.memberId)
                }
                disabled={!this.isMemberIdValid()}
                className="searchicon"
                style={{ height: 61.8 }}
              >
                <IonIcon size="large" ios={search}></IonIcon>
              </IonButton>
            </IonSegment>
          </IonContent>
          <IonModal
            isOpen={this.state.showModal}
            backdropDismiss={false}
            cssClass="modalClass"
          >
            <IonItem lines="full" className="modalHeader2">
              Member Details
            </IonItem>
            <IonGrid className="x">
              <IonRow class="details">
                <div className="labelHeader">Unit Name:</div>
                {this.state.userDetails.unitName}
              </IonRow>
              <IonRow class="details">
                <div className="labelHeader">GSTIN:</div>
                {this.state.userDetails.gstin}
              </IonRow>
              <IonRow class="details">
                <div className="labelHeader">First Name:</div>
                {this.state.userDetails.firstName}
              </IonRow>
              <IonRow class="details">
                <div className="labelHeader">Last Name: </div>
                {this.state.userDetails.lastName}
              </IonRow>
              <IonRow class="details">
                <div className="labelHeader">Chapter Name: </div>
                {this.state.userDetails.chapterName}
              </IonRow>
            </IonGrid>
            <IonGrid className="buttonItem">
              <IonRow>
                <IonCol>
                  <IonButton
                    fill="clear"
                    onClick={() => this.setState({ showModal: false })}
                    className="recordPaymentCancelButton"
                  >
                    <IonLabel>Cancel</IonLabel>
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    fill="clear"
                    onClick={() =>
                      this.setState({
                        showPaymentPage: true,
                        showModal: false,
                        showPaymentModal: false,
                      })
                    }
                    className="recordPaymentCancelButton"
                  >
                    <IonLabel>Create Ticket</IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonModal>

          <IonAlert
            isOpen={this.state.showMember}
            message={"Incorrect details or in pending review."}
            buttons={[{ text: "Ok", role: "cancel" }]}
          />
        </IonPage>
      );
    } else {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => this.setState({ showPaymentPage: false })}
            showBackButton={true}
            showRefreshButton={false}
          />
          <IonContent>
            {
              <CreateTicket
                loginMetadata={this.props.loginMetadata}
                userId={this.state.userDetails.id}
                memberId={this.state.memberId}
                phoneNumber={this.state.phoneNumber}
              />
            }
          </IonContent>
        </IonPage>
      );
    }
  }

  onNumberChange(event: any) {
    this.setState({ phoneNumber: event.target.value });
  }
  public onMemberIdChange(event: any) {
    this.setState({ memberId: event.target.value });
  }
  public isPhoneNumberValid(): boolean {
    let phoneNumber = this.state.phoneNumber;
    const regex = /^[0-9]{10}$/;
    if (phoneNumber.length === 10 && regex.test(phoneNumber)) return true;

    return false;
  }
  public isMemberIdValid(): boolean {
    let id = this.state.memberId;
    const regex = /^[0-9]{5}$/;
    if (this.state.memberId.length === 5 && regex.test(id)) return true;

    return false;
  }
}

export default CreateTicketSearch;
