import {
  IonTitle,
  IonContent,
  IonSegment,
  IonButton,
  IonAlert,
  IonItem,
  IonImg,
  IonRouterLink,
  IonGrid,
  IonCol,
  IonRow,
  IonPopover,
  IonLabel,
  IonModal,
} from "@ionic/react";
import React from "react";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { MembershipService } from "../../services/MembershipService";
import "../../styles/Membership.css";
import { MembershipProfileStatus } from "../../constants/MembershipConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import {
  GSTDocsDirectory,
  ImageExtensions,
  MembershipDirectory,
  PDFExtensions,
  ProfilePhotoDirectory,
} from "../../constants/FileUploadConstants";
import FileUpload from "../FileUpload";
import Loading from "../Loading";
import {
  ApproveMembershipPage,
  CreateUpadateMembershipPage,
  HomePage,
  MembershipPage,
} from "../../constants/MenuConstants";
import viewIcon from "../../images/viewIcon.svg";
import { Browser } from "@capacitor/browser";
interface MembershipProfileFileUploadsProps {
  membershipProfile: MembershipProfileModel;
  slidesRef: any;
  page: string;
  disabled: boolean;
  loginMetadata: LoginMetadata;
  showError: boolean;
  setShowError: (value: boolean) => void;
  setMembershipStatusFunction: (value: number) => void;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}
interface MembershipProfileFileUploadsStates {
  disabled: boolean;
  showAlert: boolean;
  gstCertPath: string;
  profilePhoto: string;
  financialProof: string;
  signaturePath: string;
  udyamCardPath: string;
  alertMessage: string;
  showSpinner: boolean;
  showPreview: boolean;
  previewImagePath: string;
  onApprove: number;
  showAlert2: boolean;
}
class MembershipProfileFileUploads extends React.Component<
  MembershipProfileFileUploadsProps,
  MembershipProfileFileUploadsStates
> {
  constructor(props: MembershipProfileFileUploadsProps) {
    super(props);

    this.state = {
      disabled: this.props.disabled,
      gstCertPath: this.props.membershipProfile.gstCertPath.startsWith(";#$")
        ? ""
        : this.props.membershipProfile.gstCertPath.split(";#$")[0],
      profilePhoto: this.props.membershipProfile.profileImagePath,
      financialProof: this.props.membershipProfile.financialProofPath,
      signaturePath: this.props.membershipProfile.signaturePath,
      udyamCardPath:
        this.props.membershipProfile.gstCertPath.split(";#$").length == 2
          ? this.props.membershipProfile.gstCertPath.split(";#$")[1]
          : this.props.membershipProfile.gstCertPath.startsWith(";#$")
          ? this.props.membershipProfile.gstCertPath.split(";#$")[0]
          : "",
      showAlert: false,
      alertMessage: "",
      showSpinner: false,
      showPreview: false,
      previewImagePath: "",
      onApprove: 0,
      showAlert2: false,
    };
  }

  render() {
    return (
      <IonContent>
        <IonTitle class="addressHeadline">Document Upload</IonTitle>
        <IonGrid class="heightadjust">
          <IonRow>
            <IonCol size="10">
              <IonItem
                class="membershipFileUpload"
                disabled={this.state.disabled}
                lines="none"
              >
                <FileUpload
                  supportedExtensions={ImageExtensions + "," + PDFExtensions}
                  loginMetadata={this.props.loginMetadata}
                  onFileUploaded={(path: string) =>
                    this.ongstImagePathChange(path)
                  }
                  buttonTitle={"Image"}
                  fileDirectory={GSTDocsDirectory}
                  filePath={this.state.gstCertPath}
                  buttonLabel={
                    this.state.gstCertPath == ""
                      ? "GST CERTIFICATE PHOTO"
                      : this.state.gstCertPath.substring(
                          90,
                          this.state.gstCertPath.length
                        )
                  }
                  disabled={this.state.disabled}
                  id="gstPhoto"
                />
              </IonItem>
            </IonCol>
            <IonCol size="2">
              <IonButton
                class="basicButton viewButton"
                onClick={() => {
                  if (this.state.gstCertPath == "") {
                    this.setState({
                      showAlert: true,
                      alertMessage: "No file to show",
                    });
                  } else {
                    this.setState({
                      previewImagePath: this.state.gstCertPath,
                    });
                    Browser.open({ url: this.state.gstCertPath });
                  }
                }}
              >
                <IonImg src={viewIcon} alt="" />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="10">
              <IonItem
                class="membershipFileUpload"
                disabled={this.state.disabled}
                lines="none"
              >
                <FileUpload
                  supportedExtensions={ImageExtensions + "," + PDFExtensions}
                  loginMetadata={this.props.loginMetadata}
                  onFileUploaded={(path: string) =>
                    this.onProfileImagePathChange(path)
                  }
                  buttonTitle={"Image"}
                  fileDirectory={ProfilePhotoDirectory}
                  filePath={this.state.profilePhoto}
                  buttonLabel={
                    this.state.profilePhoto == ""
                      ? "PROFILE PHOTO"
                      : this.state.profilePhoto.substring(
                          95,
                          this.state.profilePhoto.length
                        )
                  }
                  disabled={this.state.disabled}
                  id="profilePhoto"
                />
              </IonItem>
            </IonCol>
            <IonCol size="2">
              <IonButton
                class="basicButton viewButton"
                onClick={() => {
                  if (this.state.profilePhoto == "") {
                    this.setState({
                      showAlert: true,
                      alertMessage: "No file to show",
                    });
                  } else {
                    this.setState({
                      previewImagePath: this.state.profilePhoto,
                    });
                    Browser.open({ url: this.state.profilePhoto });
                  }
                }}
              >
                <IonImg src={viewIcon} alt="" />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="10">
              <IonItem
                class="membershipFileUpload"
                disabled={this.state.disabled}
                lines="none"
              >
                <FileUpload
                  supportedExtensions={ImageExtensions + "," + PDFExtensions}
                  loginMetadata={this.props.loginMetadata}
                  onFileUploaded={(path: string) =>
                    this.onSignatureImagePathChange(path)
                  }
                  buttonTitle={"Image"}
                  fileDirectory={ProfilePhotoDirectory}
                  filePath={this.state.signaturePath}
                  buttonLabel={
                    this.state.signaturePath == ""
                      ? "SIGNATURE PHOTO"
                      : this.state.signaturePath.substring(
                          95,
                          this.state.signaturePath.length
                        )
                  }
                  disabled={this.state.disabled}
                  id="signaturePhoto"
                />
              </IonItem>
            </IonCol>
            <IonCol size="2">
              <IonButton
                class="basicButton viewButton"
                onClick={() => {
                  if (this.state.signaturePath == "") {
                    this.setState({
                      showAlert: true,
                      alertMessage: "No file to show",
                    });
                  } else {
                    this.setState({
                      previewImagePath: this.state.signaturePath,
                    });
                    Browser.open({ url: this.state.signaturePath });
                  }
                }}
              >
                <IonImg src={viewIcon} alt="" />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="10">
              <IonItem
                class="membershipFileUpload"
                disabled={this.state.disabled}
                lines="none"
              >
                <FileUpload
                  supportedExtensions={ImageExtensions + "," + PDFExtensions}
                  loginMetadata={this.props.loginMetadata}
                  onFileUploaded={(path: string) =>
                    this.onFinancialProofImagePathChange(path)
                  }
                  buttonTitle={"Image"}
                  fileDirectory={ProfilePhotoDirectory}
                  filePath={this.state.financialProof}
                  buttonLabel={
                    this.state.financialProof == ""
                      ? "BANK STATEMENT OR ITR"
                      : this.state.financialProof.substring(
                          95,
                          this.state.financialProof.length
                        )
                  }
                  disabled={this.state.disabled}
                  id="financialPhoto"
                />
              </IonItem>
            </IonCol>
            <IonCol size="2">
              <IonButton
                class="basicButton viewButton"
                onClick={() => {
                  if (this.state.financialProof == "") {
                    this.setState({
                      showAlert: true,
                      alertMessage: "No file to show",
                    });
                  } else {
                    this.setState({
                      previewImagePath: this.state.financialProof,
                    });
                    Browser.open({ url: this.state.financialProof });
                  }
                }}
              >
                <IonImg src={viewIcon} alt="" />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="10">
              <IonItem
                class="membershipFileUpload"
                disabled={this.state.disabled}
                lines="none"
              >
                <FileUpload
                  supportedExtensions={ImageExtensions + "," + PDFExtensions}
                  loginMetadata={this.props.loginMetadata}
                  onFileUploaded={(path: string) =>
                    this.onUdyamCardImagePathChange(path)
                  }
                  buttonTitle={"Image"}
                  fileDirectory={ProfilePhotoDirectory}
                  filePath={this.state.udyamCardPath}
                  buttonLabel={
                    this.state.udyamCardPath == ""
                      ? "Udyam Card"
                      : this.state.udyamCardPath.substring(
                          95,
                          this.state.udyamCardPath.length
                        )
                  }
                  disabled={this.state.disabled}
                  id="udhamcard"
                />
              </IonItem>
            </IonCol>
            <IonCol size="2">
              <IonButton
                class="basicButton viewButton"
                onClick={() => {
                  if (this.state.udyamCardPath == "") {
                    this.setState({
                      showAlert: true,
                      alertMessage: "No file to show",
                    });
                  } else {
                    this.setState({
                      previewImagePath: this.state.udyamCardPath,
                    });
                    Browser.open({ url: this.state.udyamCardPath });
                  }
                }}
              >
                <IonImg src={viewIcon} alt="" />
              </IonButton>
            </IonCol>
          </IonRow>
          {this.state.showSpinner ? (
            <Loading />
          ) : (
            <IonSegment mode="md">{this.submit()}</IonSegment>
          )}
        </IonGrid>
        <IonModal
          isOpen={this.state.showPreview}
          backdropDismiss={false}
          cssClass="uploadProfilePicturePopover"
        >
          <IonSegment mode="md" class="previewText">
            Preview
          </IonSegment>
          <IonSegment mode="md">
            <img
              src={this.state.previewImagePath}
              className="profilePictureUploadPreview"
            ></img>
          </IonSegment>
          <IonSegment mode="md" class="uploadProfilePictureButtons">
            <IonButton
              class="profilePictureUploadButton"
              onClick={() => {
                this.setState({ showPreview: false });
              }}
            >
              <IonLabel>close</IonLabel>
            </IonButton>
          </IonSegment>
        </IonModal>
        <IonAlert
          isOpen={this.state.showAlert}
          message={this.state.alertMessage}
          onDidDismiss={() =>
            this.setState({ showAlert: false, alertMessage: "" })
          }
          buttons={[{ text: "Ok", role: "cancel" }]}
        />
        <IonAlert
          isOpen={this.state.showAlert2}
          message={this.state.alertMessage}
          onDidDismiss={() =>
            this.setState({
              showAlert2: false,
              alertMessage: "",
            })
          }
          buttons={[
            { text: "No", role: "cancel" },
            {
              text: "Yes",
              handler: () => {
                const num =
                  this.state.onApprove === 1
                    ? MembershipProfileStatus.ApprovedMembershipProfile
                    : MembershipProfileStatus.RejectedMembershipProfile;
                this.approveMembership(num);
                this.setState({
                  showAlert2: false,
                  alertMessage: "",
                  onApprove: 0,
                });
              },
            },
          ]}
        />
      </IonContent>
    );
  }
  ongstImagePathChange(path: string): void {
    this.props.membershipProfile.gstCertPath =
      path + ";#$" + this.state.udyamCardPath;
    this.setState({ gstCertPath: path });
  }
  onProfileImagePathChange(path: string): void {
    this.props.membershipProfile.profileImagePath = path;
    this.setState({ profilePhoto: path });
  }
  onSignatureImagePathChange(path: string) {
    this.props.membershipProfile.signaturePath = path;
    this.setState({ signaturePath: path });
  }
  onFinancialProofImagePathChange(path: string) {
    this.props.membershipProfile.financialProofPath = path;
    this.setState({ financialProof: path });
  }
  onUdyamCardImagePathChange(path: string) {
    debugger;
    this.props.membershipProfile.gstCertPath =
      this.state.gstCertPath + ";#$" + path;
    this.setState({ udyamCardPath: path });
  }

  submit() {
    if (this.props.page == ApproveMembershipPage.Page) {
      return (
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                class="basicButton MemberButton"
                onClick={(e) => {
                  this.setState({
                    showAlert2: true,
                    alertMessage: "Are you sure about Approval?",
                    onApprove: 1,
                  });
                }}
              >
                Approve
              </IonButton>
            </IonCol>
            {/*Reject Button*/}
            <IonCol>
              <IonButton
                class="basicButton MemberButton"
                onClick={(e) => {
                  this.setState({
                    showAlert2: true,
                    alertMessage: "Are you sure about Rejection?",
                    onApprove: 2,
                  });
                }}
              >
                Reject
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      );
    } else if (this.props.page == MembershipPage.Page) {
      return (
        <IonButton
          class="basicButton MemberButton"
          onClick={(event) => this.applyForMembership()}
        >
          Send To Review
        </IonButton>
      );
    } else if (this.props.page == CreateUpadateMembershipPage.Page) {
      return (
        <IonButton
          class="basicButton MemberButton"
          onClick={(event) => this.updateMemberProfile()}
        >
          Submit
        </IonButton>
      );
    }
  }
  updateMemberProfile() {
    // if (!this.props.membershipProfile.validate()) {
    //   this.props.setShowError(true);
    //   this.setState({
    //     showAlert: true,
    //     alertMessage: "Please fill all the required* fields",
    //   });
    // } else {
    this.props.slidesRef.current.lockSwipes(true);
    this.setState({ disabled: true, showSpinner: true });
    if (
      this.props.membershipProfile.profileStatus <
      MembershipProfileStatus.ApprovedMembershipProfile
    ) {
      this.props.membershipProfile.profileStatus =
        MembershipProfileStatus.ApprovedMembershipProfile;
    }
    MembershipService.updateMembershipProfile(
      this.props.loginMetadata,
      this.props.membershipProfile
    )
      .then((response: any) => {
        this.props.setMembershipStatusFunction(
          MembershipProfileStatus.ApprovedMembershipProfile
        );
      })
      .catch((error: any) => {
        this.props.slidesRef.current.lockSwipes(false);
        this.setState({
          showAlert: true,
          alertMessage: error.message,
          disabled: false,
          showSpinner: false,
        });
      });
    // }
  }
  rejectMembership(action: number) {
    this.setState({ disabled: true, showSpinner: true });
    MembershipService.approveMembershipApplication(
      this.props.loginMetadata,
      this.props.membershipProfile.id,
      action
    )
      .then((response: any) => {
        this.props.setMembershipStatusFunction(this.props.membershipProfile.id);
      })
      .catch((error: any) => {
        this.props.slidesRef.current.lockSwipes(false);
        this.setState({
          showAlert: true,
          alertMessage: error.message,
          showSpinner: false,
        });
      });
  }
  approveMembership(action: number) {
    this.props.slidesRef.current.lockSwipes(true);
    this.setState({ disabled: true, showSpinner: true });
    MembershipService.approveMembershipApplication(
      this.props.loginMetadata,
      this.props.membershipProfile.id,
      action
    )
      .then((response: any) => {
        this.props.setMembershipStatusFunction(this.props.membershipProfile.id);
      })
      .catch((error: any) => {
        this.props.slidesRef.current.lockSwipes(false);
        this.setState({
          showAlert: true,
          alertMessage: error.message,
          showSpinner: false,
        });
      });
  }
  validate(membershipObject: any) {
    if (
      membershipObject.chapterId == 0 ||
      membershipObject.unitName == "" ||
      membershipObject.address == "" ||
      membershipObject.district == "" ||
      membershipObject.state == "" ||
      membershipObject.country == "" ||
      membershipObject.industryStatus == "" ||
      membershipObject.gstin == "" ||
      membershipObject.productCategory == "" ||
      membershipObject.productSubCategory == "" ||
      membershipObject.annualTurnOver == "" ||
      membershipObject.firstName == "" ||
      membershipObject.lastName == "" ||
      membershipObject.firstName == "" ||
      membershipObject.PhoneNumber == "" ||
      membershipObject.enterpriseType == "" ||
      membershipObject.classification == "" ||
      membershipObject.exporter == ""
    ) {
      return false;
    }
    return true;
  }
  applyForMembership() {
    this.props.membershipProfile.country = "India";
    if (!this.validate(this.props.membershipProfile)) {
      this.props.setShowError(true);
      this.setState({
        showAlert: true,
        alertMessage: "Please fill all the required* fields",
      });
    } else {
      this.props.slidesRef.current.lockSwipes(true);
      // debugger;
      this.setState({ disabled: true, showSpinner: true });
      this.subscriptionUserdetail();
      MembershipService.applyForMembership(
        this.props.loginMetadata,
        this.props.membershipProfile
      )
        .then((response: any) => {
          if (this.props.loginMetadata.isAdmin) {
            this.setState({
              showSpinner: false,
              showAlert: true,
              alertMessage: "Profile Submitted Successfully",
            });
            this.props.changePage(HomePage.Page);
          } else {
            let newLoginMetaData = this.props.loginMetadata;
            newLoginMetaData.membershipStatus =
              MembershipProfileStatus.SubmittedMembershipProfile;
            this.props.setLoginStateFunction(newLoginMetaData);
            this.props.setMembershipStatusFunction(
              MembershipProfileStatus.SubmittedMembershipProfile
            );
            this.setState({ showSpinner: false });
          }
        })
        .catch((error: any) => {
          this.props.slidesRef.current.lockSwipes(false);
          this.setState({
            showAlert: true,
            alertMessage: error.message,
            disabled: false,
            showSpinner: false,
          });
        });
    }
  }
  handleInputChange(e) {
    let prop = e.target.name;
    this.props.membershipProfile[prop] = e.target.value;
    let obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
  }

  async subscriptionUserdetail(){
    let check = this.props.membershipProfile.subscripCheck;
    if(check && check == "no") return;
    let data = {
      adminId:this.props.loginMetadata.id,
      gstin:this.props.membershipProfile.gstin,
      phone:this.props.membershipProfile.PhoneNumber,
      unitname:this.props.membershipProfile.unitName,
      autoId:new Date().getTime()
    };
    const response = await fetch('https://iiaonline.in/newapi_iia/magazine_iia_member.php',{
      method:"POST",
      body:JSON.stringify(data)
    })
  }
}

export default MembershipProfileFileUploads;
