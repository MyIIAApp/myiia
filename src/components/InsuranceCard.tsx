import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonAvatar,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonLabel,
  CreateAnimation,
  IonPage,
  IonButton,
} from "@ionic/react";
import React from "react";
import InsuranceLogo from "../images/InsuranceLogo.svg"
import "../styles/Insurance.css"
interface InsuranceProps {
  result: any
}
class InsuranceCard extends React.Component<InsuranceProps> {
  constructor(props: InsuranceProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <IonCard class="insuranceCard">
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="10" class="insuranceTitle">
                {this.props.result.response.primary.InsuranceCompany == "" ? "New India Assurance" : this.props.result.response.primary.InsuranceCompany}
              </IonCol>
              <IonCol size="2" class="ion-text-end">
                <IonAvatar class="insuranceLogo">
                  <img src={InsuranceLogo} />
                </IonAvatar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="policyNumber">
                {this.props.result.response.primary.PolicyNumber}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="policyExpiry">
                Date Of Joining - {this.props.result.response.primary.DATEOFJOINING}
              </IonCol>
            </IonRow>
            <IonRow class="cardFooter">
              <IonCol class="sumInsuredValue">
                ₹&nbsp;{this.props.result.response.primary.SumInusred}
              </IonCol>
              <IonCol class="ion-text-end sumInsured">
                Sum Insured
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    );
  }
}

export default InsuranceCard;