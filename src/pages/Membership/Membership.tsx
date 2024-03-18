import {
  IonButton,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonPopover,
  IonSegment,
} from "@ionic/react";
import React from "react";
import FileUpload from "../../components/FileUpload";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import DisplayMessage from "../../components/Membership/DisplayMessage";
import JoinIIA from "../../components/Membership/JoinIIA";
import MembershipCard from "../../components/Membership/MembershipCard";
import PaymentForm from "../Membership/PaymentForm";
import {
  ImageExtensions,
  ProfilePhotoDirectory,
} from "../../constants/FileUploadConstants";
import {
  ApprovedMembershipDisplayMessage,
  MembershipProfileStatus,
  RejectedMembershipDisplayMessage,
  SubmitMembershipDisplayMessage,
} from "../../constants/MembershipConstants";
import {
  CreateUpadateMembershipPage,
  MembershipBenefitPage,
  MembershipPage,
} from "../../constants/MenuConstants";
import approvedMembership from "../../images/approvedMembership.svg";
import rejectedMembership from "../../images/rejectedMembership.svg";
import submittedMembership from "../../images/submittedMembership.svg";
import { LoginMetadata } from "../../models/LoginMetadata";
import { ActiveMembershipModel } from "../../models/Membership/ActiveMembershipModel";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { Call2 } from "../../services/BaseService";
import { MembershipService } from "../../services/MembershipService";
import "../../styles/Membership.css";
import { Browser } from "@capacitor/browser";
import MembershipProfile from "../../components/Membership/MembershipProfile";
import { getDefaultSettings } from "http2";
interface MembershipStates {
  membershipModel: ActiveMembershipModel;
  membershipProfile: MembershipProfileModel;
  membershipStatus: number;
  showProgress: boolean;
  profileImagePath: string;
  showPopover: boolean;
  showPayment: boolean;
  showUpdate: boolean;
  gst: string;
}

interface MembershipProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}

class Membership extends React.Component<MembershipProps, MembershipStates> {
  constructor(props: MembershipProps) {
    super(props);
    this.state = {
      membershipModel: new ActiveMembershipModel(),
      membershipProfile: new MembershipProfileModel(
        this.props.loginMetadata.tokenString,
        0,
        -1
      ),
      membershipStatus: this.props.loginMetadata.membershipStatus,
      showProgress: true,
      profileImagePath: "",
      showPopover: false,
      showPayment: false,
      showUpdate: false,
      gst: "",
    };
  }

  componentDidMount() {
    this.getData(false);
  }

  protected getData(forceRefresh: boolean) {
    this.setState({ showProgress: true });
    let getActiverMembershipPromise = MembershipService.getActiveMembership(
      this.props.loginMetadata,
      forceRefresh
    );
    let getMembershipProfilePromise = MembershipService.getMembershipProfile(
      this.props.loginMetadata,
      forceRefresh,
      {}
    );
    Promise.all([getActiverMembershipPromise, getMembershipProfilePromise])
      .then((result: any[]) => {
        this.setState({
          membershipModel: result[0],
          membershipProfile: result[1][0],
          membershipStatus: result[1][0].profileStatus,
          showProgress: false,
          showPayment: false,
          profileImagePath: result[1][0].profileImagePath,
        });
        this.props.loginMetadata.membershipStatus = result[1][0].profileStatus;
        this.props.setLoginStateFunction(this.props.loginMetadata);
      })
      .catch(() => {});
  }

  updateProfile(event: any) {}

  renewMembership(event: any) {}
  public setMembershipStatusFunction(value: number) {
    this.setState({ membershipStatus: value });
  }
  render() {
    if (this.state.showPayment) {
      return (
        <PaymentForm
          loginMetadata={this.props.loginMetadata}
          expiryYear={this.state.membershipModel.membershipExpiryDate}
          resetMembershipData={(forceRefresh: boolean) => {
            this.getData(forceRefresh);
          }}
          changePage={() => {
            this.setState({ showPayment: false });
          }}
        />
      );
    }
    if (this.state.showUpdate) {
      return (
        <IonPage>
          <HeaderToolbar
            showBackButton={true}
            showRefreshButton={false}
            refreshPage={() => {}}
            previousPage={() => {
              this.setState({ showUpdate: false });
            }}
          />
          <IonContent>
            <MembershipProfile
              membershipProfile={this.state.membershipProfile}
              disabled={false}
              gstCheck={false}
              page={MembershipPage.Page}
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
    }
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
    } else if (
      this.state.membershipStatus ==
      MembershipProfileStatus.SubmittedMembershipProfile
    ) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => this.getData(true)}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <DisplayMessage
              logoPath={submittedMembership}
              message={SubmitMembershipDisplayMessage}
            />
          </IonContent>
        </IonPage>
      );
    } else if (
      this.state.membershipStatus ==
      MembershipProfileStatus.RejectedMembershipProfile
    ) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => this.getData(true)}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <DisplayMessage
              logoPath={rejectedMembership}
              message={RejectedMembershipDisplayMessage}
            />
            <IonButton
              class="reapplyButton limitContent"
              onClick={() => this.setState({ showUpdate: true })}
            >
              Re-apply
            </IonButton>
          </IonContent>
        </IonPage>
      );
    } else if (
      this.state.membershipStatus ==
      MembershipProfileStatus.ApprovedMembershipProfile
    ) {
      const now  = new Date()
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => this.getData(true)}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <DisplayMessage
              logoPath={approvedMembership}
              message={ApprovedMembershipDisplayMessage}
            />
            <IonSegment mode ="md">
                <IonButton
                  class="basicButton viewBenefitsButton"
                  onClick={() => this.pay()}
                >
                  pay {now.getMonth() < 3 ? (now.getFullYear()-1)+ "-" + now.getFullYear():(now.getFullYear())+ "-" + (now.getFullYear()+1)}
                </IonButton>
              </IonSegment>
          </IonContent>
        </IonPage>
      );
    } else if (
      this.state.membershipStatus == MembershipProfileStatus.NewMembership
    ) {
      return (
        <JoinIIA
          membershipProfile={this.state.membershipProfile}
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
    } else if (
      this.state.membershipStatus >= MembershipProfileStatus.ActiveMembership &&
      this.state.membershipStatus <= MembershipProfileStatus.ExpiredMembership
    ) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => this.getData(true)}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <IonGrid className="limitContent">
              <IonSegment mode ="md">
                <MembershipCard
                  membershipModel={this.state.membershipModel}
                  membershipProfile={this.state.membershipProfile}
                />
              </IonSegment>
              <IonSegment mode ="md">
                <IonButton
                  class="basicButton viewBenefitsButton"
                  routerLink={"/" + MembershipBenefitPage.Page}
                  onClick={() =>
                    this.props.changePage(MembershipBenefitPage.Page)
                  }
                >
                  View Membership Benefits
                </IonButton>
              </IonSegment>
              {this.state.membershipProfile.profileImagePath == "" ? (
                <IonSegment mode ="md" class="profilePictureImageUploadButton">
                  <FileUpload
                    supportedExtensions={ImageExtensions}
                    loginMetadata={this.props.loginMetadata}
                    onFileUploaded={(path: string) =>
                      this.onProfileImagePathChange(path)
                    }
                    buttonTitle={"Image"}
                    fileDirectory={ProfilePhotoDirectory}
                    filePath={this.state.profileImagePath}
                    buttonLabel="Profile Photo"
                    disabled={false}
                    id="profileImagePhoto"
                  />
                  <IonPopover
                    isOpen={this.state.showPopover}
                    backdropDismiss={false}
                    cssClass="uploadProfilePicturePopover"
                  >
                    <IonSegment mode ="md" class="previewText">Preview</IonSegment>
                    <IonSegment mode ="md">
                      <img
                        src={this.state.profileImagePath}
                        className="profilePictureUploadPreview"
                      ></img>
                    </IonSegment>
                    <IonSegment mode ="md" class="uploadProfilePictureButtons">
                      <IonButton
                        class="profilePictureUploadButton"
                        onClick={() => {
                          this.upload();
                        }}
                      >
                        <IonLabel>Submit</IonLabel>
                      </IonButton>
                      <IonButton
                        class="profilePictureUploadButton"
                        onClick={() => {
                          this.cancelUpload();
                        }}
                      >
                        <IonLabel>Cancel</IonLabel>
                      </IonButton>
                    </IonSegment>
                  </IonPopover>
                </IonSegment>
              ) : null}
              {this.state.membershipStatus >=
                MembershipProfileStatus.ActiveMembership && (new Date().getMonth() > 2 && new Date().getFullYear() >= parseInt(
                        this.state.membershipModel.membershipExpiryDate.slice(0, 4)
                      ) || new Date().getMonth() < 3 && new Date().getFullYear() > parseInt(
                        this.state.membershipModel.membershipExpiryDate.slice(0, 4)
                      ))
              // (this.state.membershipStatus ==
              //   MembershipProfileStatus.ActiveMembership &&
              //   new Date().getMonth() < 3 &&
              //   new Date().getFullYear() ==
              //     parseInt(
              //       this.state.membershipModel.membershipExpiryDate.slice(0, 4)
              //     )) 
              ? (
                <IonSegment mode ="md">
                  <IonButton
                    class="basicButton viewBenefitsButton"
                    onClick={() => this.pay()}
                  >
                    pay{" "}
                    {this.state.membershipModel.membershipExpiryDate.slice(
                      0,
                      4
                    )}
                    -
                    {parseInt(
                      this.state.membershipModel.membershipExpiryDate.slice(
                        0,
                        4
                      )
                    ) + 1}
                  </IonButton>
                </IonSegment>
              ) : null}
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    } else {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => this.getData(true)}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <DisplayMessage
              logoPath={rejectedMembership}
              message="Please Login Again"
            />
          </IonContent>
        </IonPage>
      );
    }
  }
  onProfileImagePathChange(path: string): void {
    this.setState({ profileImagePath: path, showPopover: true });
  }
  upload() {
    this.setState({ showProgress: true });
    MembershipService.updateMemberProfilePhoto(
      this.props.loginMetadata,
      this.state.profileImagePath
    )
      .then((res: any) => {
        this.state.membershipProfile.profileImagePath =
          this.state.profileImagePath;
        this.getData(true);
        this.setState({ showProgress: false, showPopover: false });
      })
      .catch((error: any) => {
        this.setState({ profileImagePath: "", showPopover: false });
      });
  }
  cancelUpload() {
    this.setState({ profileImagePath: "", showPopover: false });
  }
  public reset(value: number) {
    this.setState({
      showUpdate: false,
      membershipProfile: new MembershipProfileModel(
        this.props.loginMetadata.tokenString,
        value,
        -1
      ),
      membershipStatus: value,
    });
    this.getData(true);
  }
  pay() {
    // let s =
    //   '<ion-view><ion-content><div class="full-width"><h1>Please Wait.., Your transaction is processing...</h1><img src="../img/loader.gif" /></div><form name="sendParam" id="sendParam" method="post" action="https://test.payu.in/_payment"><input type="hidden" name="key" id="key" value="7rnFly"><input type="hidden" name="productinfo" id="productinfo" value="membership"><input type="hidden" name="hash" id="hash" value="0cb046f567f258c768fa8419a3910b96c9bac5eeeb133bf6e4b2b99d52786ea912462bf0eda676886f5d97a30dd13a0e5e3eb279415913fff867f822db590939"><input type="hidden" name="txnid" id="txnid" value="515151515151527"><input type="hidden" name="amount" id="amount" value="100.00"><input type="hidden" name="firstname" id="firstname" value="mohan"><input type="hidden" name="email" id="email" value="mohan@gmail.com"><input name="phone" type="hidden" id="phone" value="9854786587"><input type="hidden" name="surl" id="surl" value="http://localhost:7071/api/MakePayment" size="64"><input type="hidden" name="furl" id="furl" value="https://www.yahoo.com" size="64"><input type="hidden" name="service_provider" id="service_provider" value=""><input type="hidden" name="udf1" id="udf1" value="mohan"><input type="hidden" name="udf2" id="udf2" value="9992323456"><input type="hidden" name="udf3" id="udf3" value="mohan@gmail.com"><input type="hidden" name="udf4" id="udf4" value="chandi"><input type="hidden" name="udf5" id="udf5" value="rohtak"><input type="submit" value="enter" style="position: absolute; left: -9999px" /></form><style type="text/css">.full-width {width: 100%;float: left;text-align: center;} h1 {font-size: 35px;width: 50%;margin-top: 30px;margin: 100px auto 0 auto;} img { margin-top: 30px; }</style><script type="text/javascript"> function submitForm() {document.sendParam.submit();}submitForm();</script></ion-content></ion-view>';
    // // s = "data:text/html;base64," + btoa(s);
    // Browser.open({
    //   url: "https://test.payu.in/_payment_options?mihpayid=266f12150f0a51c0c964d6bb4cb664e59f4c3c3fbf1b5bc23b57df07306a2930&userToken=",
    //   windowName: "_self",
    // });

    // win?.document.write(s);
    this.setState({ showPayment: true });
    // Call2("https://test.payu.in/_payment").then((response) => {
    //   console.log(response);
    // });
  }
}

export default Membership;
