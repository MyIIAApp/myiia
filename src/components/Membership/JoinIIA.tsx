import {
  IonSegment,
  IonButton,
  IonContent,
  IonImg,
  IonAlert,
  IonSlide,
  IonSlides,
  IonPopover,
  IonLabel,
  IonGrid,
  IonPage,
  IonInput,
  IonItem,
  IonList,
  IonToast,
  IonSpinner,
  IonModal,
} from "@ionic/react";
import React from "react";
import { MembershipProfileStatus } from "../../constants/MembershipConstants";
import {
  MembershipBenefitPage,
  MembershipPage,
} from "../../constants/MenuConstants";
import logo from "../../images/JoinIIALogo2.svg";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import "../../styles/Membership.css";
import HeaderToolbar from "../HeaderToolbar";
import MembershipProfile from "./MembershipProfile";

import ApplicationProcess from "./ApplicationProcess";
import { VerifyGSTService } from "../../services/VerifyGSTServices";

interface JoinIIAProps {
  loginMetadata: LoginMetadata;
  membershipProfile: MembershipProfileModel;
  setMembershipStatusFunction: (value: number) => void;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}
interface JoinIIAStates {
  showMemberProfile: boolean;
  membershipProfile: MembershipProfileModel;
  membershipAlert: boolean;
  applicationnProcessModal: boolean;
  membershipBenifit: boolean;
  gstin: string;
  showPreview: boolean;
  showPreviewLoading: boolean;
  showToast: boolean;
}
class JoinIIA extends React.Component<JoinIIAProps, JoinIIAStates> {
  constructor(props: JoinIIAProps) {
    super(props);
    let newProfile = new MembershipProfileModel(
      this.props.loginMetadata.tokenString,
      MembershipProfileStatus.SavedMembershipProfile,
      parseInt(this.props.loginMetadata.id)
    );
    this.state = {
      showMemberProfile: false,
      membershipProfile: newProfile,
      membershipAlert: false,
      applicationnProcessModal: false,
      membershipBenifit: false,
      gstin: "",
      showPreview: this.props.loginMetadata.isAdmin?true:false,
      showToast: false,
      showPreviewLoading: false,
    };
  }

  render() {
    if (this.state.showMemberProfile) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => { }}
            previousPage={() => {
              this.setState({
                showMemberProfile: false,
                showPreviewLoading: false,
              });
            }}
            showBackButton={true}
            showRefreshButton={false}
          />
          <IonContent>
            <MembershipProfile
              membershipProfile={this.state.membershipProfile}
              disabled={false}
              gstCheck={!this.props.loginMetadata.isAdmin}
              page={MembershipPage.Page}
              loginMetadata={this.props.loginMetadata}
              setMembershipStatusFunction={(value: number) =>
                this.props.setMembershipStatusFunction(value)
              }
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
            refreshPage={() => { }}
            previousPage={() => { }}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent>
            <IonGrid className="limitContent">
              <IonToast
                isOpen={this.state.showToast}
                onDidDismiss={() => this.setState({ showToast: false })}
                message="Invalid GSTIN, please contact HO to add member without GST"
                duration={5000}
              />
              :
              <IonModal
                isOpen={this.state.showPreview}
                backdropDismiss={true}
                onDidDismiss={() => {
                  this.setState({ showPreview: false, gstin: "" });
                }}
              >
                <IonGrid>
                  <IonSegment mode ="md" class="popoverTitle">Enter the GSTIN</IonSegment>
                  <IonSegment mode ="md">
                    <IonInput
                      placeholder="GST"
                      class="popoverInput"
                      name="gstin"
                      value={this.state.gstin}
                      required={true}
                      type="text"
                      maxlength={15}
                      onIonChange={(e: any) => {
                        this.handleInputChange(e);
                      }}
                    ></IonInput>
                  </IonSegment>
                  {this.state.showPreviewLoading ? (
                    <IonSegment mode ="md">
                      <IonSpinner name="lines"></IonSpinner>
                    </IonSegment>
                  ) : null}
                  <IonSegment mode ="md">
                    <IonButton
                      // disabled={
                      //   this.state.gstin.length != 15
                      //     ? true
                      //     : this.state.showPreviewLoading
                      //       ? true
                      //       : false
                      // }
                      onClick={() => this.VerifyGst()}
                    >
                      Submit
                    </IonButton>
                  </IonSegment>
                </IonGrid>
              </IonModal>
              <IonSegment mode ="md" color="light" class="joinIIAlogoSegment">
                <IonImg src={logo} class="iiaImageCentre" alt="" />
              </IonSegment>
              <IonSegment mode ="md" color="light" class="whiteBackground">
                <IonButton
                  class="basicButton becomeIIAMemberButton"
                  onClick={() => {
                    this.setState({ showPreview: true });
                  }}
                >
                  {this.props.loginMetadata.isAdmin ? "Create New Member" : "Become an IIA Member"}
                </IonButton>
              </IonSegment>
              <IonSegment mode ="md" color="light">
                {!this.props.loginMetadata.isAdmin?<IonButton
                  class="basicButton viewBenefitButton"
                  routerLink={"/" + MembershipBenefitPage.Page}
                  onClick={(e) =>
                    this.props.changePage(MembershipBenefitPage.Page)
                  }
                >
                  View Membership Benefits
                </IonButton>:null}
              </IonSegment>
              <IonSegment mode ="md" color="light">
              {!this.props.loginMetadata.isAdmin?<IonButton
                  class="basicButton applicationProcessButton"
                  onClick={() => this.applicationProcess()}
                >
                  Application Process
                </IonButton>:null}
              </IonSegment>
              <IonAlert
                isOpen={this.state.membershipAlert}
                message="Please contact iia@iiaonline.in or call at 8601855540/45 to become a member."
                onDidDismiss={() => this.setState({ membershipAlert: false })}
                buttons={[{ text: "Close", role: "cancel" }]}
              ></IonAlert>
              <ApplicationProcess
                applicationnProcessModal={this.state.applicationnProcessModal}
                setApplicationnProcessModal={(value: boolean) =>
                  this.setState({ applicationnProcessModal: value })
                }
                setbecomeMember={() => this.becomeMember()}
              ></ApplicationProcess>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    }
  }

  becomeMember() {
    this.setState({ showMemberProfile: true });
    // this.setState({ membershipAlert: true });
  }
  viewBenefits() {
    // this.props.changePage(NewsPage.Page)
    this.setState({ membershipBenifit: true });
  }
  applicationProcess() {
    this.setState({ applicationnProcessModal: true });
  }
  VerifyGst() {
    this.setState({ showPreviewLoading: true });
    VerifyGSTService.VerifyGSTDetails(
      this.props.loginMetadata,
      this.state.gstin
    ).then((response: any) => {
      response.error == true ? 
      (this.props.loginMetadata.isAdmin && this.props.loginMetadata.chapterId == 82) ? this.becomeMember() : this.setState({ showToast: true, showPreviewLoading: false }) 
      : this.update(response);
    });
  }
  handleInputChange(e) {
    this.setState({ gstin: e.target.value });
  }
  update(response: any) {
    this.props.membershipProfile.unitName = response.taxpayerInfo.tradeNam;
    this.props.membershipProfile.state = response.taxpayerInfo.pradr.addr.stcd;
    this.props.membershipProfile.gstin = this.state.gstin;
    this.props.membershipProfile.district = response.taxpayerInfo.pradr.addr.dst;
    this.props.membershipProfile.city = response.taxpayerInfo.pradr.addr.city;
    this.props.membershipProfile.pincode = response.taxpayerInfo.pradr.addr.pncd;
    this.props.membershipProfile.address = 
    response.taxpayerInfo.pradr.addr.st + 
    response.taxpayerInfo.pradr.addr.bno +
    response.taxpayerInfo.pradr.addr.loc;
    this.props.membershipProfile.industryStatus = response.taxpayerInfo.ctb;
    this.props.membershipProfile.firstName =
      response.taxpayerInfo.lgnm.split(" ")[0];
    this.props.membershipProfile.lastName =
      response.taxpayerInfo.lgnm.split(" ")[1];
    this.setState({ membershipProfile: this.props.membershipProfile });
    this.becomeMember();
  }
}
export default JoinIIA;
