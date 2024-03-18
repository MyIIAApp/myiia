import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonTitle,
  IonIcon,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonAlert,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import MembershipProfile from "../../components/Membership/MembershipProfile";
import { MembershipProfileStatus } from "../../constants/MembershipConstants";
import { CreateUpadateMembershipPage } from "../../constants/MenuConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { MembershipService } from "../../services/MembershipService";
import "../../styles/Membership.css";
import { close, closeOutline } from "ionicons/icons";
import flag from "../../images/indiaFlag.svg";

interface CreateUpadateMembershipProfileStates {
  showMemberProfile: boolean;
  membershipProfile: MembershipProfileModel;
  phoneNumber: string;
  showProgress: boolean;
  notMember: boolean;
  memberId: string;
}

interface CreateUpadateMembershipProfileProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}

class CreateUpadateMembershipProfile extends React.Component<
  CreateUpadateMembershipProfileProps,
  CreateUpadateMembershipProfileStates
> {
  constructor(props: CreateUpadateMembershipProfileProps) {
    super(props);
    let newProfile = new MembershipProfileModel(
      this.props.loginMetadata.tokenString,
      MembershipProfileStatus.ApprovedMembershipProfile,
      -1
    );
    this.state = {
      showMemberProfile: false,
      membershipProfile: newProfile,
      phoneNumber: "",
      showProgress: false,
      notMember: false,
      memberId: "",
    };
  }

  componentDidMount() {}
  protected getMemberProfile(phoneNumber: string, memberId: string) {
    this.setState({ showProgress: true });
    MembershipService.getMembershipProfile(this.props.loginMetadata, true, {
      phoneNumber: phoneNumber,
      memberId: memberId,
    })
      .then((response: MembershipProfileModel) => {
        if (response.id == -1 || response.profileStatus < 5) {
          this.setState({
            showProgress: false,
            showMemberProfile: false,
            notMember: true,
          });
        } else {
          this.setState({
            membershipProfile: response,
            showProgress: false,
            showMemberProfile: true,
            notMember: false,
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
    } else if (this.state.showMemberProfile) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {
              this.reset(0);
            }}
            showBackButton={true}
            showRefreshButton={false}
          />
          <IonContent>
            <MembershipProfile
              membershipProfile={this.state.membershipProfile}
              disabled={false}
              gstCheck={false}
              page={CreateUpadateMembershipPage.Page}
              loginMetadata={this.props.loginMetadata}
              setMembershipStatusFunction={(value: number) => this.reset(value)}
              setLoginStateFunction={(loginMetadata: LoginMetadata | null) =>
                this.props.setLoginStateFunction(loginMetadata)
              }
              changePage={(value: string) => this.props.changePage(value)}
            />
          </IonContent>
        </IonPage>
      );
    } else {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent>
            <IonGrid className="ContentCenters limitContent">
              <IonSegment mode ="md" className="colorSeg">
                <IonCardHeader>
                  <IonCardTitle className="loginHeader">
                    Update Membership Profile
                  </IonCardTitle>
                </IonCardHeader>
              </IonSegment>
              <IonSegment mode ="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonImg src={flag}></IonImg>
                    <IonLabel className="ion-padding-start" color="dark">
                      +91
                    </IonLabel>
                    <IonInput
                      inputmode="tel"
                      color="dark"
                      maxlength={10}
                      value={this.state.phoneNumber}
                      placeholder="Enter mobile number"
                      onIonChange={(e) => this.onPhoneNumberChange(e)}
                    ></IonInput>
                    <IonIcon
                      hidden={this.state.phoneNumber === "" ? true : false}
                      onClick={() => {
                        this.setState({ phoneNumber: "" });
                      }}
                      ios={closeOutline}
                      md={close}
                      color="dark"
                    ></IonIcon>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode ="md">OR</IonSegment>
              <IonSegment mode ="md" className="colorSeg">
                <IonCard color="secondary" className="SendOTPItemCard">
                  <IonItem lines="none" color="secondary">
                    <IonInput
                      inputmode="tel"
                      color="dark"
                      maxlength={5}
                      value={this.state.memberId}
                      placeholder="Enter 5 digits Member Id"
                      onIonChange={(e) => this.onMemberIdChange(e)}
                    ></IonInput>
                    <IonIcon
                      hidden={this.state.memberId === "" ? true : false}
                      onClick={() => {
                        this.setState({ memberId: "" });
                      }}
                      ios={closeOutline}
                      md={close}
                      color="dark"
                    ></IonIcon>
                  </IonItem>
                </IonCard>
              </IonSegment>
              <IonSegment mode ="md" className="colorSeg">
                <IonButton
                  type="submit"
                  expand="block"
                  className="basicbutton SendOTPButton"
                  disabled={!this.isPhoneNumberValid()}
                  onClick={(event) =>
                    this.getMemberProfile(
                      this.state.phoneNumber,
                      this.state.memberId
                    )
                  }
                >
                  Submit
                </IonButton>
              </IonSegment>
            </IonGrid>
            <IonAlert
              isOpen={this.state.notMember}
              message={"Not a valid Phone Number/MemberId"}
              buttons={[{ text: "Ok", role: "cancel" }]}
            />
          </IonContent>
        </IonPage>
      );
    }
  }
  public reset(value: number) {
    this.setState({
      showMemberProfile: false,
      phoneNumber: "",
      memberId: "",
      membershipProfile: new MembershipProfileModel(
        this.props.loginMetadata.tokenString,
        MembershipProfileStatus.ApprovedMembershipProfile,
        -1
      ),
    });
  }
  public onPhoneNumberChange(event: any) {
    this.setState({ phoneNumber: event.target.value });
  }
  public onMemberIdChange(event: any) {
    this.setState({ memberId: event.target.value });
  }
  public isPhoneNumberValid(): boolean {
    let phoneNumber = this.state.phoneNumber;

    if (phoneNumber.length === 10) return true;
    if (this.state.memberId.length === 5) return true;

    return false;
  }
}

export default CreateUpadateMembershipProfile;
