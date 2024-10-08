import {
  IonInput,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonContent,
  IonTitle,
  IonText,
} from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { VerifyGSTService } from "../../services/VerifyGSTServices";
import "../../styles/Membership.css";


interface MembershipProfileAProps {
  membershipProfile: MembershipProfileModel;
  showError: boolean;
  indianStates: any;
  disabled: boolean;
  loginMetadata: LoginMetadata;
  gstCheck: boolean;
}
interface MembershipProfileAStates {
  districts: string[];
  unitName: string;
  unitName1:string,
  gstin: string;
  country: string;
  state: string;
  district: string;
  city: string;
  city1: string;
  GstResponse: boolean;
  pincode: string;
  pincode1:string;
  address: string;
  address1:string;
  industryStatus: string;
  disabled: boolean;
  membershipId:string;
  memExpirydate:string;
  memJoiningdate:string;
}
class MembershipProfileA extends React.Component<
  MembershipProfileAProps,
  MembershipProfileAStates
> {
  constructor(props: MembershipProfileAProps) {
    super(props);
    let districts=[];
    this.props.indianStates.map((state: any) => {
      if (state.state == this.props.membershipProfile.state) {
        districts= state.districts ;
      }
    });
    this.state = {
      districts: districts,
      disabled: this.props.disabled,
      GstResponse: true,
      unitName: this.props.membershipProfile.unitName,
      unitName1: this.props.membershipProfile.unitName,
      gstin: this.props.membershipProfile.gstin,
      country: this.props.membershipProfile.country,
      state: this.props.membershipProfile.state,
      district: this.props.membershipProfile.district,
      city: this.props.membershipProfile.city,
      city1: this.props.membershipProfile.city,
      pincode: this.props.membershipProfile.pincode,
      pincode1: this.props.membershipProfile.pincode,
      address: this.props.membershipProfile.address,
      address1: this.props.membershipProfile.address,
      industryStatus: this.props.membershipProfile.industryStatus,
      membershipId:"",
      memExpirydate:"",
      memJoiningdate:""
    };
  }
  
  async getExpiryAndJoinDate(id){
    const response = await fetch(`https://iiaonline.in/newapi_iia/getExpiryJoiningDate.php?id=${id}`);
    const result = await response.json();
    this.setState({
      membershipId:result.MembershipId,
      memExpirydate:result.expirydate,
      memJoiningdate:result.MembershipJoinDate
    })
  }

  componentDidMount(){
    this.setState({GstResponse: true})
    this.getExpiryAndJoinDate(this.props.membershipProfile.id)
  }
  render() {
    return (
      <IonContent>
        <IonTitle class="addressHeadline">Industry Address</IonTitle>
        <div className="content">
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.unitName == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Unit Name*
            </IonLabel>
            <IonInput
              placeholder="Unit Name"
              name="unitName"
              readonly={((this.props.gstCheck) || (this.state.disabled))?true:false}
              value={this.props.membershipProfile.unitName}
              required={true}
              onIonChange={(e: any) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>

          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.gstin == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              GSTIN*
            </IonLabel>
            <IonInput
              maxlength={15}
              placeholder="GST"
              name="gstin"
              readonly={((this.props.gstCheck) || this.state.disabled)}
              value={this.props.membershipProfile.gstin}
              required={true}
              onIonChange={(e: any) => {this.handleInputChange(e);
              }}
            ></IonInput>
          </IonItem>
            
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color="danger"
            >
              Membership Id
            </IonLabel>
            <IonInput
              placeholder="MemberShip Id"
              readonly={true}
              value={this.state.membershipId}
            ></IonInput>
          </IonItem>
            
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color="danger"
            >
              Joining date
            </IonLabel>
            <IonInput
              placeholder="Joining date"
              readonly={true}
              value={this.state.memJoiningdate}
            ></IonInput>
          </IonItem>

          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color="danger"
            >
              Expiry date
            </IonLabel>
            <IonInput
              placeholder="Expiry date"
              readonly={true}
              value={this.state.memExpirydate}
            ></IonInput>
          </IonItem>

          <IonText color="dark">
            <h6>Unit Address</h6>
          </IonText>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.state == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              State*
            </IonLabel>
            <IonSelect
              value={this.props.membershipProfile.state}
              name="state"
              class="selectDisabled"
              disabled={((this.props.gstCheck && this.props.membershipProfile.state.length!=0) || this.state.disabled)}
              onIonChange={(e) => this.selectState(e)}
            >
              {this.props.indianStates.map((state: any) => {
                return (
                  <IonSelectOption key={state.state} value={state.state}>
                    {state.state}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.district == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              District*
            </IonLabel>
            <IonSelect
              name="district"
              class="selectDisabled"
              value={this.props.membershipProfile.district}
              disabled={((this.props.gstCheck && this.props.membershipProfile.district.length!=0) || this.state.disabled)}
              onIonChange={(e) => this.handleInputChange(e)}
            >
              {this.state.districts.map((district: any) => {
                return (
                  <IonSelectOption key={district} value={district}>
                    {district}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.city == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              City
            </IonLabel>
            <IonInput
              placeholder="City"
              name="city"
              readonly={((this.props.gstCheck) || this.state.disabled)}
              value={this.props.membershipProfile.city}
              onIonChange={(e) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.pincode == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Pincode
            </IonLabel>
            <IonInput
              placeholder="Pin Code"
              name="pincode"
              readonly={((this.props.gstCheck) || this.state.disabled)}
              value={this.props.membershipProfile.pincode}
              onIonChange={(e) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.address == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Address*
            </IonLabel>
            <IonInput
              placeholder="Address"
              name="address"
              readonly={((this.props.gstCheck) || this.state.disabled)}
              value={this.props.membershipProfile.address}
              required={true}
              onIonChange={(e) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.industryStatus == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Industry Status*
            </IonLabel>
            {(this.props.gstCheck && this.props.membershipProfile.industryStatus.length!=0)?
            <IonInput readonly={this.state.disabled} value={this.props.membershipProfile.industryStatus}></IonInput>:
            <IonSelect
              value={this.props.membershipProfile.industryStatus}
              name="industryStatus"
              class="selectDisabled"
              onIonChange={(e) => this.handleInputChange(e)}
            >
              <IonSelectOption value="Public Limited">
                Public Limited
              </IonSelectOption>
              <IonSelectOption value="Private Limited">
                Private Limited
              </IonSelectOption>
              <IonSelectOption value="Partnership">Partnership</IonSelectOption>
              <IonSelectOption value="Proprietorship">
                Proprietorship
              </IonSelectOption>
              <IonSelectOption value="Registered Society">
                Registered Society
              </IonSelectOption>
              <IonSelectOption value="Trust">Trust</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>}
          </IonItem>
        </div>
      </IonContent>
    );
  }

  selectState(e) {
    this.handleInputChange(e);
    this.props.membershipProfile["district"] = "";
    this.props.indianStates.map((state: any) => {
      if (state.state == e.target.value) {
        this.setState({ districts: state.districts });
      }
    });
  }
  handleInputChange(e) {
    let prop = e.target.name;
    this.props.membershipProfile[prop] = e.target.value;
    let obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
  }
  }

export default MembershipProfileA;
