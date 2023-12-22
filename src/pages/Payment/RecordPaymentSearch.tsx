import {
  IonAlert,
  IonButton,
  IonButtons,
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
import "../../styles/Payment.css";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { LoginMetadata } from "../../models/LoginMetadata";
import HeaderToolbar from "../../components/HeaderToolbar";
import { PaymentService } from "../../services/PaymentService";
import RecordPayment from "./RecordPayment";
import Loading from "../../components/Loading";
import { search } from "ionicons/icons";
import { MembershipProfileStatus } from "../../constants/MenuConstants";

interface RecordPaymentSearchStates {
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
}

interface RecordPaymentSearchProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class RecordPaymentSearch extends React.Component<
  RecordPaymentSearchProps,
  RecordPaymentSearchStates
> {
  constructor(props: RecordPaymentSearchProps) {
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
      showFinance: false
    };
  }

  componentDidMount() {
    // this.getData(true);
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

        if (result.id == -1 || result.profileStatus < MembershipProfileStatus["ApprovedMembershipProfile"]) {
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
            showMember: false
          });
        }
      })
      .catch(() => { });
  }

  render() {
    if (this.state.showProgress) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => { }}
            previousPage={() => { }}
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
            refreshPage={() => { }}
            previousPage={() => { }}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <IonSegment mode ="md"
              className="ion-no-margin ion-no-padding phoneSegment"
              color="light"
            >
              <IonSegment mode ="md" className="phoneinput">
                <IonInput
                  type="text"
                  clearInput={true}
                  className="ion-padding"
                  maxlength={10}
                  value={this.state.phoneNumber}
                  placeholder="  Enter the Phonenumber"
                  spellCheck={true}
                  required={true}
                  onIonChange={(e) => this.onNumberChange(e)}
                ></IonInput>
              </IonSegment>
              <IonButton
                onClick={() =>
                  this.getData(this.state.phoneNumber, this.state.memberId)
                }
                disabled={!this.isPhoneNumberValid()}
                className="searchicon"
              >
                <IonIcon size="large" ios={search}></IonIcon>
              </IonButton>
            </IonSegment>
            <IonSegment mode ="md">OR</IonSegment>
            <IonSegment mode ="md" className="ion-no-margin ion-no-padding " color="light">
              <IonSegment mode ="md" className="phoneinput">
                <IonInput
                  type="text"
                  clearInput={true}
                  className="ion-padding"
                  maxlength={5}
                  value={this.state.memberId}
                  placeholder="  Enter the MemberId"
                  spellCheck={true}
                  required={true}
                  onIonChange={(e) => this.onMemberIdChange(e)}
                ></IonInput>
              </IonSegment>
              <IonButton
                onClick={() =>
                  this.getData(this.state.phoneNumber, this.state.memberId)
                }
                disabled={!this.isMemberIdValid()}
                className="searchicon"
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
                    <IonLabel>Record Payment</IonLabel>
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
            refreshPage={() => { }}
            previousPage={() => this.setState({ showPaymentPage: false })}
            showBackButton={true}
            showRefreshButton={false}
          />
          <IonContent>
            <RecordPayment
              loginMetadata={this.props.loginMetadata}
              setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
                this.props.setLoginStateFunction(loginMetadata)
              }
              paymentReason="Membership"
              memberId={this.state.memberId}
              phoneNumber={this.state.phoneNumber}
              userId={this.state.userDetails.id}
            />
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
    const regex = /^[0-9]{10}$/
    if (phoneNumber.length === 10 && regex.test(phoneNumber)) return true;

    return false;
  }
  public isMemberIdValid(): boolean {
    let id = this.state.memberId;
    const regex = /^[0-9]{5}$/
    if (this.state.memberId.length === 5 && regex.test(id)) return true;

    return false;
  }
}

export default RecordPaymentSearch;
