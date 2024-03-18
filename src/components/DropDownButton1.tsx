import {
  IonSegment,
  IonButton,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
  IonRouterLink,
  IonCard,
  IonList,
  IonItem,
} from "@ionic/react";
import React, { useState } from "react";
import arrow from "../images/benifitsArrow.svg";
import IIAMartCategorySubCategory from "../JsonFiles/IIAMart.json";
import { B2BPage } from "../constants/MenuConstants";
import "../styles/B2BBuyer.css";
import { BuyerService } from "../services/BuyerService";
import { LoginMetadata } from "../models/LoginMetadata";

interface DropDownButtonProps {
  Category: string;
  isChecked: boolean;
  loginMetadata: LoginMetadata;
  validSubcategory: any;
}

interface DropDownButtonStates {
  showState: boolean;
  imgcssClass: string;
}

class DropDownButton1 extends React.Component<
  DropDownButtonProps,
  DropDownButtonStates
> {
  constructor(props: DropDownButtonProps) {
    super(props);
    this.state = {
      showState: false,
      imgcssClass: "rotate0",
    };
  }

  toggleDetails() {
    // console.log(this.props.Category);
    this.setState({ showState: !this.state.showState });
    if (this.state.showState) {
      this.setState({ imgcssClass: "rotate0" });
    } else {
      this.setState({ imgcssClass: "rotate180" });
    }
  }
  componentDidMount() {}
  render() {
    return (
      <IonGrid>
        <IonSegment mode="md">
          <IonButton
            className="b2bdropdownBttn"
            onClick={(e) => this.toggleDetails()}
          >
            <IonGrid>
              <IonRow>
                <IonCol size="11">
                  <IonLabel className="ion-text-wrap">
                    {this.props.Category}
                  </IonLabel>
                </IonCol>
                <IonCol className="ion-align-self-center" size="1">
                  <img className={this.state.imgcssClass} src={arrow} alt="" />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonButton>
        </IonSegment>

        <IonList key={this.props.Category} class="b2bcard">
          {this.state.showState == true
            ? this.props.isChecked == true
              ? IIAMartCategorySubCategory[this.props.Category]
                  .sort()
                  .map((SubCategory: string) => {
                    if (
                      this.props.validSubcategory.indexOf(SubCategory) != -1
                    ) {
                      return (
                        <IonItem key={SubCategory}>
                          <IonRouterLink
                            class="firstPageSubcategoryName"
                            color="dark"
                            routerLink={
                              "/" +
                              B2BPage.Page +
                              "/" +
                              this.props.Category +
                              "/" +
                              SubCategory
                            }
                          >
                            <IonLabel>{SubCategory}</IonLabel>
                          </IonRouterLink>
                        </IonItem>
                      );
                    }
                  })
              : IIAMartCategorySubCategory[this.props.Category]
                  .sort()
                  .map((SubCategory: string) => {
                    return (
                      <IonItem key={SubCategory}>
                        <IonRouterLink
                          class="firstPageSubcategoryName"
                          color="dark"
                          routerLink={
                            "/" +
                            B2BPage.Page +
                            "/" +
                            this.props.Category +
                            "/" +
                            SubCategory
                          }
                        >
                          <IonLabel>{SubCategory}</IonLabel>
                        </IonRouterLink>
                      </IonItem>
                    );
                  })
            : null}
        </IonList>
      </IonGrid>
    );
  }
}

export default DropDownButton1;
