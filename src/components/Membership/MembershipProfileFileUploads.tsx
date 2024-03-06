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
  IonCheckbox
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

  showAlldataList:boolean;
  showSendReview:boolean;
  showRequiredAlert:boolean;
  showRequiredMessage:string;
  checkuncheck:boolean;
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
      showAlldataList:false,
      showSendReview:false,
      showRequiredAlert:false,
      showRequiredMessage:"",
      checkuncheck:false,
    };
  }
  componentDidMount(): void {
    console.log("run");
  }
  render() {
    const styles:any = {
      wraptext:{
        width: "54%",whiteSpace:"pre-wrap"
      },
      heading:{
        fontWeight:600,
      }
      
    }
    return (
      (this.state.showAlldataList)?
      <IonContent>
         <IonAlert
          isOpen={this.state.showRequiredAlert}
          message={this.state.showRequiredMessage}
          onDidDismiss={() =>{
            this.setState({ showRequiredAlert: false })
            this.setState({checkuncheck:false})
          }}
        ></IonAlert>

        <IonGrid class="heightadjust">
          <IonRow>
              <IonCol size="12">
               <IonButton  onClick={() => this.setState({ showAlldataList: false })}>Show document</IonButton>
  
                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Unit Name</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.unitName}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Gstin</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.gstin}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>State</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.state}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>District</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.district}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>City</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.city}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Pincode</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.pincode}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Address</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.address}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Industry Status</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.industryStatus}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Product Category</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.productCategory}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Exporter</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.exporter}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Sub Category</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.productSubCategory}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Classification</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.classification}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Enterprise type</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.enterpriseType}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Annual TurnOver</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.annualTurnOver}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Name</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.firstName} {this.props.membershipProfile.lastName}</p>
                  </IonLabel>
                </IonItem>

      
                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Phone Number</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.PhoneNumber}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Email</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.email}</p>
                  </IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Date of Birth</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.dateOfBirth}</p>
                  </IonLabel>
                </IonItem>
               
                <IonItem>
                  <IonLabel style={{display:"flex",justifyContent:"space-between"}}>
                    <h4 style={styles.heading}>Date of Anniversary</h4>
                    <p style={styles.wraptext}>{this.props.membershipProfile.dateOfMarriage}</p>
                  </IonLabel>
                </IonItem>

                {/* onIonChange={(e) => this.toggleTextBox(e)} 
                  checked={this.state.showTextbox ? true:false} */}
                <IonItem>
                  <IonRow>
                    <IonCol size="1">
                      <IonCheckbox onIonChange={(e)=>this.checkForValidation(e)}
                      checked={this.state.checkuncheck}
                      >
                      </IonCheckbox>&nbsp;&nbsp;&nbsp;&nbsp;
                    </IonCol>
                    <IonCol size="11">
                       <p style={{color:"red",textAlign:"justify"}}>I hereby declare that the details provided above including GST NO., Email ID, Mobile No. and Pincode is correct and verified.
                      </p>
                    </IonCol>
                  </IonRow>
                </IonItem>
                  {
                    (this.state.showSendReview) ? <IonButton
                    class="basicButton MemberButton"
                    onClick={(event) => this.applyForMembership()}
                  >
                    Send To Review
                  </IonButton> : null
                  }
              </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      
      :
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
        onClick={(event) => this.setState({ showAlldataList: true })}

        >
        Submit
        </IonButton>

        // <IonButton
        //   class="basicButton MemberButton"
        //   onClick={(event) => this.applyForMembership()}
        // >
        //   Send To Review
        // </IonButton>
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
      membershipObject.exporter == "" ||
      membershipObject.email == ""
      
    ) {
      return false;
    }
    return true;
  }
  validateForCheck(membershipObject: any):boolean{
    let message = "Required:";
    if (membershipObject.gstin == "" || membershipObject.pincode == "" || membershipObject.email == "") {
       if(!membershipObject.gstin){
         message = message + " GST"
       }
       if(!membershipObject.pincode){
        message = message + " pincode";
       }
       if(!membershipObject.email){
        message = message + " email";
       }
      this.setState({ showRequiredMessage: message })
      return false;
    }
    return true;
  }
  
  checkForValidation(event:any):void {
    if(event.detail.checked){
      this.setState({checkuncheck:true})
      if(!this.validateForCheck(this.props.membershipProfile)){
        this.setState({showSendReview:false})
        this.setState({showRequiredAlert:true})
      }else{
        this.setState({showSendReview:true})
        this.setState({showRequiredAlert:false})
       
      }
    }else{
      this.setState({showSendReview:false})
      this.setState({checkuncheck:false})
    }
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
      this.setState({ disabled: true, showSpinner: true });
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
}

export default MembershipProfileFileUploads;
