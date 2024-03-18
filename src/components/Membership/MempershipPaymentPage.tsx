import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import { MembershipPaymentModel } from "../../models/Membership/MembershipPaymentModel";
import { MembershipService } from "../../services/MembershipService";
import "../../styles/Membership.css";

interface MempershipPaymentPageProps {
  loginMetadata: LoginMetadata;
  membershipPaymentModel: MembershipPaymentModel;
  setFunction: () => void;
}
interface MempershipPaymentPageStates {
  showSpinner: boolean;
}
class MempershipPaymentPage extends React.Component<
  MempershipPaymentPageProps,
  MempershipPaymentPageStates
> {
  constructor(props: MempershipPaymentPageProps) {
    super(props);
    this.state = {
      showSpinner: false,
    };
  }
  render() {
    return (
      <IonCard class="PaymentCard">
        <IonCardHeader>
          <IonCardTitle>Pay Details</IonCardTitle>
          {/* <IonCardSubtitle>
        Fill in the Details:
        </IonCardSubtitle> */}
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonLabel position="stacked">Payment Mode</IonLabel>
            <IonSelect
              placeholder="PaymentMode"
              value={this.props.membershipPaymentModel.paymentMode}
              name="paymentMode"
              onIonChange={(e) => this.handleInputChange(e)}
            >
              <IonSelectOption value={1}>Cash</IonSelectOption>
              <IonSelectOption value={2}>Cheque</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Full Amount</IonLabel>
            <IonInput
              placeholder="fullAmount"
              name="fullAmount"
              value={this.props.membershipPaymentModel.fullAmount}
              onIonChange={(e: any) => this.handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonSegment mode ="md" class="MemberButton">
            {this.state.showSpinner ? (
              <IonSpinner name="lines" />
            ) : (
              <IonButton
                shape="round"
                expand="block"
                color="primary"
                onClick={(event) => this.applyForMembership()}
              >
                Submit
              </IonButton>
            )}
          </IonSegment>
        </IonCardContent>
      </IonCard>
    );
  }

  applyForMembership() {
    this.setState({ showSpinner: true });
    MembershipService.paymentAndActivationForMembership(
      this.props.loginMetadata,
      this.props.membershipPaymentModel
    )
      .then((response: any) => {
        this.props.setFunction();
      })
      .catch(() => {});
  }

  handleInputChange(e) {
    let prop = e.target.name;
    this.props.membershipPaymentModel[prop] = e.target.value;
  }
}

export default MempershipPaymentPage;
