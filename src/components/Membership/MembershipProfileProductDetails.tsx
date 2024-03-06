import {
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonTextarea,
  IonItem,
  IonContent,
  IonTitle,
} from "@ionic/react";
import React from "react";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import "../../styles/Membership.css";

interface MembershipProfileBProps {
  membershipProfile: MembershipProfileModel;
  productData: any;
  showError: boolean;
  disabled: boolean;
  gstCheck: boolean;
}
interface MembershipProfileBStates {
  subProductData: string[];
  productCategory: string;
  productSubCategory: string;
  exporter: string;
  classification: string;
  enterpriseType: string;
  annualTurnOver: string;
  majorProducts: string;
  disabled: boolean;
}

class MembershipProfileB extends React.Component<
  MembershipProfileBProps,
  MembershipProfileBStates
> {
  constructor(props: MembershipProfileBProps) {
    super(props);
    let subProductData=[];
    this.props.productData.map((product: any) => {
      if (product.name == this.props.membershipProfile.productCategory) {
        subProductData=product.category;
      }
    });
    this.state = {
      subProductData: subProductData,
      productCategory: this.props.membershipProfile.productCategory,
      productSubCategory: this.props.membershipProfile.productSubCategory,
      exporter: this.props.membershipProfile.exporter,
      classification: this.props.membershipProfile.classification,
      enterpriseType: this.props.membershipProfile.enterpriseType,
      annualTurnOver: this.props.membershipProfile.annualTurnOver,
      majorProducts: this.props.membershipProfile.majorProducts,
      disabled: this.props.disabled,
    };
  }
  render() {
    return (
      <IonContent>
        <IonTitle class="addressHeadline">Industry Products</IonTitle>
        <div className="content">
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.productCategory == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Product Category*
            </IonLabel>

            <IonSelect
              value={this.props.membershipProfile.productCategory}
              name="productCategory"
              class="selectDisabled"
              disabled={this.props.disabled}
              onIonChange={(e) => this.selectProduct(e)}
            >
              {this.props.productData.map((product: any) => {
                return (
                  <IonSelectOption key={product.name} value={product.name}>
                    {product.name}
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
                this.state.productSubCategory == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Sub-Category*
            </IonLabel>
            <IonSelect
              value={this.props.membershipProfile.productSubCategory}
              name="productSubCategory"
              class="selectDisabled"
              disabled={this.props.disabled}
              onIonChange={(e) => this.handleInputChange(e)}
            >
              {this.state.subProductData.map((subproduct: string) => {
                return (
                  <IonSelectOption key={subproduct} value={subproduct}>
                    {subproduct}
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
                this.state.exporter == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Exporter
            </IonLabel>
            <IonSelect
              value={this.props.membershipProfile.exporter}
              name="exporter"
              class="selectDisabled"
              disabled={this.props.disabled}
              onIonChange={(e) => this.handleInputChange(e)}
            >
              <IonSelectOption value="Yes">Yes</IonSelectOption>
              <IonSelectOption value="No">No</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.classification == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Classification
            </IonLabel>
            <IonSelect
              value={this.props.membershipProfile.classification}
              name="classification"
              class="selectDisabled"
              disabled={this.props.disabled}
              onIonChange={(e) => this.handleInputChange(e)}
            >
              <IonSelectOption value="Manufacturing Sector Enterprise">
                Manufacturing Sector Enterprise
              </IonSelectOption>
              <IonSelectOption value="Service Sector Enterprise">
                Service Sector Enterprise
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.enterpriseType == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Enterprise Type
            </IonLabel>
            <IonSelect
              value={this.props.membershipProfile.enterpriseType}
              name="enterpriseType"
              class="selectDisabled"
              disabled={this.props.disabled}
              onIonChange={(e) => this.handleInputChange(e)}
            >
              <IonSelectOption value="Micro Enterprise">
                Micro Enterprise
              </IonSelectOption>
              <IonSelectOption value="Small Enterprise">
                Small Enterprise
              </IonSelectOption>
              <IonSelectOption value="Medium Enterprise">
                Medium Enterprise
              </IonSelectOption>
              <IonSelectOption value="Large Scale / Other">
                Large Scale / Other
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={
                this.state.annualTurnOver == ""
                  ? this.props.showError
                    ? "danger"
                    : "medium"
                  : "primary"
              }
            >
              Annual TurnOver*
            </IonLabel>
            <IonSelect
              value={this.props.membershipProfile.annualTurnOver}
              name="annualTurnOver"
              class="selectDisabled"
              disabled={this.props.disabled}
              onIonChange={(e) => this.handleInputChange(e)}
            >
              <IonSelectOption value="Upto 1 Crore">
                Upto 1 Crore
              </IonSelectOption>
              <IonSelectOption value="Rs 1 Crore - 3 Crore">
                Rs 1 Crore - 3 Crore
              </IonSelectOption>
              <IonSelectOption value="Above 3 Crore">
                Above 3 Crore
              </IonSelectOption>
              <IonSelectOption value="Other Individuals/Organizations/Associations irres">
                Other Individuals/Organizations/Associations irrespective of
                Turnover
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem
            class="basicInput membershipProfileInput"
          >
            <IonLabel
              position="floating"
              class="selectDisabled"
              color={this.state.majorProducts == "" ? "medium" : "primary"}
            >
              Major Products{" "}
            </IonLabel>
            <IonTextarea
              value={this.props.membershipProfile.majorProducts}
              name="majorProducts"
              readonly={this.props.disabled}
              required={true}
              onIonChange={(e) => this.handleInputChange(e)}
            ></IonTextarea>
          </IonItem>
        </div>
      </IonContent>
    );
  }

  selectProduct(e) {
    this.handleInputChange(e);
    this.props.membershipProfile["productSubCategory"] = "";
    this.props.productData.map((product: any) => {
      if (product.name == e.target.value) {
        this.setState({ subProductData: product.category });
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

export default MembershipProfileB;
