import {
  IonCard,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonRow,
  IonCol,
  IonRadioGroup,
  IonRadio
} from "@ionic/react";
import React from "react";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import "../../styles/Membership.css";

interface MembershipProfileCProps {
  membershipProfile: MembershipProfileModel;
  chapters: any;
  disabled: boolean;
  showError: boolean;
  gstCheck: boolean;
}
interface MembershipProfileCStates {
  disabled: boolean;
  firstName: string;
  lastName: string;
  chapterId: number;
  email: string;
  dateOfBirth: string;
  dateOfMarriage: string;
  websiteUrl: string;
  PhoneNumber: string;
  lastName1: string;
  firstName1: string;
}
class MembershipProfileC extends React.Component<
  MembershipProfileCProps,
  MembershipProfileCStates
> {
  constructor(props: MembershipProfileCProps) {
    super(props);

    this.state = {
      disabled: this.props.disabled,
      firstName: this.props.membershipProfile.firstName,
      lastName: this.props.membershipProfile.lastName,
      chapterId: this.props.membershipProfile.chapterId,
      email: this.props.membershipProfile.email,
      dateOfBirth: this.props.membershipProfile.dateOfBirth,
      dateOfMarriage: this.props.membershipProfile.dateOfMarriage,
      websiteUrl: this.props.membershipProfile.websiteUrl,
      PhoneNumber: this.props.membershipProfile.PhoneNumber,
      lastName1: this.props.membershipProfile.lastName,
      firstName1: this.props.membershipProfile.firstName,
    };
  }
  // componentDidMount() {
  //   console.log(this.props.membershipProfile);
  // }
  render() {
    return (
      <IonContent>
        <IonTitle class="addressHeadline">Authorized User Details</IonTitle>
        <div className="content">
          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.firstName == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              First Name*
            </IonLabel>
            <IonInput
              name="firstName"
              value={this.props.membershipProfile.firstName}
              readonly={
                (this.props.gstCheck) ||
                this.state.disabled
              }
              required={true}
              onIonChange={(e: any) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.lastName == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Last Name*
            </IonLabel>
            <IonInput
              name="lastName"
              readonly={
                (this.props.gstCheck) ||
                this.state.disabled
              }
              value={this.props.membershipProfile.lastName}
              required={true}
              onIonChange={(e: any) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={this.state.PhoneNumber == "" ? "medium" : "primary"}
            >
              PhoneNumber*
            </IonLabel>
            <IonInput
              name="PhoneNumber"
              readonly={this.props.disabled}
              value={this.props.membershipProfile.PhoneNumber}
              inputmode="tel"
              maxlength={10}
              required={true}
              onIonChange={(e: any) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={this.state.email == "" ? "medium" : "primary"}
            >
              Email
            </IonLabel>
            <IonInput
              name="email"
              readonly={this.props.disabled}
              value={this.props.membershipProfile.email}
              inputmode="email"
              onIonChange={(e: any) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.firstName == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Date of Birth
            </IonLabel>
            <IonInput>
              <IonDatetime
                name="dateOfBirth"
                placeholder=""
                style={{ color: "black" }}
                value={this.props.membershipProfile.dateOfBirth}
                onIonChange={(e: any) => this.handleInputChange(e)}
              ></IonDatetime>
            </IonInput>
          </IonItem>

          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={this.state.dateOfMarriage == null ? "medium" : "primary"}
            >
              Date of Marriage Anniversary
            </IonLabel>
            <IonInput>
              <IonDatetime
                name="dateOfMarriage"
                placeholder=""
                style={{ color: "black" }}
                value={this.props.membershipProfile.dateOfMarriage}
                onIonChange={(e: any) => this.handleInputChange(e)}
              ></IonDatetime>
            </IonInput>
          </IonItem>
          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={this.state.websiteUrl == "" ? "medium" : "primary"}
            >
              Website Url
            </IonLabel>
            <IonInput
              name="websiteUrl"
              readonly={this.props.disabled}
              value={this.props.membershipProfile.websiteUrl}
              onIonChange={(e: any) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem class="basicInput membershipProfileInput">
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.chapterId == 0
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Select IIA Chapter*
            </IonLabel>
            <IonSelect
              value={this.props.membershipProfile.chapterId}
              name="chapterId"
              class="selectDisabled"
              disabled={this.props.disabled}
              onIonChange={(e) => this.handleInputChange(e)}
            >
              {this.props.chapters
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
          </IonItem >
          <IonItem className="basicInput membershipProfileInput" style={{display:'none'}}>
            <IonRow>
              <IonCol size="12">
                  <p style={{color:"red",textAlign:"justify",marginBottom:"3px"}}>IIA NEWS is available free of cost online through a registered mobile number by SMS/WhatsApp
                </p>
                <p style={{color:"red",textAlign:"justify",margin:"5px 0"}}>Hardcopy through courier is available with yearly subscription <br />(12 issues) of Rs 600 /- inclusive of GST. </p>
                <p style={{color:"red",textAlign:"justify",marginTop:"5px",fontWeight:"600"}}> Do you want Hardcopy of IIA NEWS through courier - (with effect from 01/04/2024). </p>

                <IonRadioGroup allowEmptySelection={true} value="">
                  <IonRow>
                    <IonCol size="3">

                    </IonCol>
                    <IonCol size="3" style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      
                      <IonRadio value="end">
                      </IonRadio>
                      <span>Yes</span>
                    </IonCol>
                    <IonCol size="3" style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      <IonRadio value="start">
                      </IonRadio>
                      <span>No</span>
                    </IonCol>
                    <IonCol size="3">

                    </IonCol>
                  </IonRow>
                </IonRadioGroup>

              </IonCol>
            </IonRow>
          </IonItem>

        </div>
      </IonContent>
    );
    // console.log(this.props.membershipProfile);
  }

  handleInputChange(e) {
    // debugger;
    let prop = e.target.name;
    this.props.membershipProfile[prop] = e.target.value;
    let obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
  }
}

export default MembershipProfileC;
