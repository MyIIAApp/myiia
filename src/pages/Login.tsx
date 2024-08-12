import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonAlert,
  IonToast,
  IonPage,
} from "@ionic/react";
import { close, closeOutline } from "ionicons/icons";
import React from "react";
import flag from "../images/indiaFlag.svg";
import logo from "../images/iiaLogo.svg";
import OTPimg from "../images/OTPVerification.svg";
import { BaseResponse } from "../models/BaseResponse";
import { LoginMetadata } from "../models/LoginMetadata";
import { LoginService } from "../services/LoginService";
import "../styles/Login.css";
import Loading from "../components/Loading";
import { BaseResponse2 } from "../models/BaseResponse2";
import HeaderToolbar from "../components/HeaderToolbar";
import MemberbershipSwitch from "../components/MembershipSwitch";

interface LoginStates {
  phoneNumber: string;
  otp: string;
  otpToken: string;
  isFirstPage: boolean;
  showState: boolean;
  showOtpState: boolean;
  showOtpTimerState: boolean;
  timer: number;

  adminalert: boolean;
  showloading: boolean;
  showUserSelectionPopup: boolean;
  response: BaseResponse2;
  index: number;
}

interface LoginProps {
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class Login extends React.Component<LoginProps, LoginStates> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      phoneNumber: "",
      isFirstPage: true,
      otp: "",
      otpToken: "",
      showState: false,
      showOtpState: false,
      showOtpTimerState: false,
      timer: 60,
      adminalert: false,
      showloading: false,
      showUserSelectionPopup: false,
      response: new BaseResponse2(),
      index: 0,
    };
  }

  render() {
    return (
      <IonPage className="limitContent">
        {this.state.showloading ? (
          <Loading />
        ) : this.state.showUserSelectionPopup? this.showPopup() :this.state.isFirstPage ? (
          this.enterPhoneNumber()
        ) : (
          this.enterOTP()
        )}
      </IonPage>
    );
  }
  showPopup(){
    return(
      <IonPage>
      <HeaderToolbar
      showBackButton={false}
      showRefreshButton={false}
      previousPage={()=>{}}
      refreshPage={()=>{}}/>
      <IonContent>
        <MemberbershipSwitch response={this.state.response} onIndexChange={(index : number ) => {this.onIndexChange(index);}}/>
      </IonContent>
      </IonPage>
    )
  }
  onIndexChange(index: number){
    this.props.setLoginStateFunction(this.state.response.loginMetadataList[index]);
  }
  enterPhoneNumber() {
    return (
      <IonContent className="offset-Content">
        <IonSegment mode ="md" className="colorSeg logoSegment">
          <IonImg src={logo}></IonImg>
        </IonSegment>
        <IonSegment mode ="md" className="colorSeg">
          <IonCardHeader>
            <IonCardTitle className="loginHeader">Welcome to IIA!</IonCardTitle>
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
                placeholder="Your mobile number"
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
        <IonSegment mode ="md" className="colorSeg">
          <IonButton
            type="submit"
            expand="block"
            className="basicbutton SendOTPButton"
            disabled={!this.isPhoneNumberValid()}
            onClick={(e) => (
              this.onNumberSubmitClicked(e),
              this.ionViewDidLoad(),
              this.StartTimer()
            )}
          >
            Send OTP
          </IonButton>
        </IonSegment>
         <IonSegment mode ="md" className="colorSeg">
           <a href="http://divisional.iiaonline.in/" style={{marginTop:'27px',color:'#3880ff'}}>IIA Divisional Login</a>
        </IonSegment>
        <IonToast
          isOpen={this.state.showState}
          message="OTP Sent"
          duration={2000}
          onDidDismiss={() => this.setState({ showState: false })}
        />
        <IonAlert
          isOpen={this.state.adminalert}
          message="You do not have permission to access. If you believe this is an error please contact iia@iiaonline.in"
          onDidDismiss={() => this.setState({ adminalert: false })}
          buttons={[{ text: "Close", role: "cancel" }]}
        ></IonAlert>
      </IonContent>
    );
  }

  Invalid(event: any) {
    return (
      <IonCardContent>
        <IonToast isOpen message="OTP Sent" position="bottom" />
      </IonCardContent>
    );
  }

  enterOTP() {
    return (
      <IonCardContent color="light" className="ion-margin-top">
        <IonSegment mode ="md" className="colorSeg">
          <IonCardHeader>
            <IonCardTitle color="primary" className="loginHeader">
              Enter Your Verification Code
            </IonCardTitle>
          </IonCardHeader>
        </IonSegment>
        <IonSegment mode ="md" className="colorSeg">
          <IonItem lines="none">
            <IonLabel>OTP sent to +91 {this.state.phoneNumber}</IonLabel>
            <IonButton
              className="ion-no-padding editButton"
              onClick={(e) => this.onBack(e)}
              fill="clear"
            >
              <IonLabel className="label-Text">Edit</IonLabel>
            </IonButton>
          </IonItem>
        </IonSegment>
        <IonSegment mode ="md" className="colorSeg">
          <IonImg src={OTPimg} className="ion-margin-bottom"></IonImg>
        </IonSegment>
        <IonSegment mode ="md" className="colorSeg">
          <IonCard color="secondary" className="SendOTPItemCard">
            <IonItem lines="none" color="secondary">
              <IonInput
                inputmode="numeric"
                color="dark"
                maxlength={6}
                value={this.state.otp}
                placeholder="OTP"
                className="OtpInputBox"
                onIonChange={(e) => this.onOTPChange(e)}
              ></IonInput>
              <IonIcon
                hidden={this.state.otp === "" ? true : false}
                onClick={() => {
                  this.setState({ otp: "" });
                }}
                color="dark"
              ></IonIcon>
            </IonItem>
          </IonCard>
        </IonSegment>
        <IonSegment mode ="md" className="colorSeg">
          <IonLabel
            className="incorrect-OTP-Text"
            hidden={!this.state.showOtpState}
          >
            The OTP Entered is Incorrect
          </IonLabel>
        </IonSegment>
        <IonSegment mode ="md" className="colorSeg">
          <IonButton
            expand="block"
            className="basicButton VerifyOTPButton"
            disabled={!this.isOTPValid()}
            onClick={(e) => this.onOTPVerfifyClicked(e)}
          >
            <IonLabel className="label-Text">Verify</IonLabel>
          </IonButton>
        </IonSegment>
        <IonSegment mode ="md" className="colorSeg">
          <IonItem lines="none">
            <IonLabel>Didn't recieve OTP?</IonLabel>
            <IonButton
              disabled={this.state.showOtpTimerState}
              className="ion-no-padding ion-no-margin"
              onClick={(e) => (
                this.onNumberSubmitClicked(e),
                this.setState({ showState: true, timer: 60 }),
                this.ionViewDidLoad(),
                this.StartTimer()
              )}
              fill="clear"
            >
              <IonLabel color="primary" className="editButton label-Text">
                Resend
              </IonLabel>
              <IonLabel
                hidden={!this.state.showOtpTimerState}
                className="marginTimer"
              >
                {this.state.timer}
              </IonLabel>
            </IonButton>
          </IonItem>
        </IonSegment>

        <IonToast
          isOpen={this.state.showState}
          message="OTP Sent"
          duration={2000}
          onDidDismiss={() =>
            this.setState({ showState: false, showOtpState: false })
          }
        />
      </IonCardContent>
    );
  }
  componentDidMount() {}

  onPhoneNumberChange(event: any) {
    this.setState({ phoneNumber: event.target.value });
  }

  onOTPChange(event: any) {
    this.setState({ otp: event.target.value });
  }

  onNumberSubmitClicked(event: any) {
    LoginService.SendOTP(this.state.phoneNumber)
      .then((res) => {
        this.setState({
          showState: true,
          isFirstPage: false,
          otpToken: res.token,
          showloading: false,
        });
      })
      .catch((error) =>
        this.setState({ adminalert: true, showloading: false })
      );
    this.setState({ showloading: true });
  }

  onOTPVerfifyClicked(event: any) {
    LoginService.VerifyOTP(
      this.state.phoneNumber,
      this.state.otp,
      this.state.otpToken
    )
      .then((r: BaseResponse2) => {
        if(r.loginMetadataList.length>1)
        this.setState({showUserSelectionPopup:true,showloading: false,response: r});
        else
        this.props.setLoginStateFunction(r.loginMetadataList[0]);
      })
      .catch(() => {
        this.setState({
          showOtpState: true,
          otp: "",
          showloading: false,
        });
      });
    this.setState({ showloading: true });
  }

  isPhoneNumberValid(): boolean {
    let phoneNumber = this.state.phoneNumber;

    if (!phoneNumber || phoneNumber.length !== 10) {
      return false;
    }

    return phoneNumber.match(/^[0-9]+$/) != null;
  }

  isOTPValid(): boolean {
    let otp = this.state.otp;

    if (!otp || otp.length !== 6) {
      return false;
    }

    return otp.match(/^[0-9]+$/) != null;
  }

  ionViewDidLoad() {
    this.setState({ showOtpTimerState: true });
    setTimeout((x) => {
      this.setState({ showOtpTimerState: false });
    }, 60000); //60 seconds
  }

  StartTimer() {
    const id = setInterval((x) => {
      if (this.state.timer === 0) {
        clearInterval(id);
        this.setState({ timer: 60 });
      } else {
        this.setState({ timer: this.state.timer - 1 });
      }
    }, 1000);
  }

  onBack(event: any) {
    this.setState({ isFirstPage: true, timer: 0, showOtpTimerState: false });
  }
}

export default Login;
