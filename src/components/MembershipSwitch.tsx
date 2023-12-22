import {
  IonPopover,
  IonItem,
  IonHeader,
  IonRadioGroup,
  IonLabel,
  IonRadio,
  IonButton,
} from "@ionic/react";
import React from "react";
import { BaseResponse2 } from "../models/BaseResponse2";
import "../styles/Login.css";
interface MembershipSwitchStates {
  index: number;
}
interface MembershipSwitchProps {
  response: BaseResponse2;
  onIndexChange: (index: number) => void;
}
class MemberbershipSwitch extends React.Component<
  MembershipSwitchProps,
  MembershipSwitchStates
> {
  constructor(props: MembershipSwitchProps) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  render() {
    return (
      <IonPopover isOpen={true} backdropDismiss={false} cssClass="selectUnit">
        <IonItem lines="full">
          <IonHeader className="modalHeader">Select Unit Name</IonHeader>
        </IonItem>
        <IonRadioGroup
          value={this.state.index}
          className="radioClass"
          onIonChange={(e) => this.setState({ index: e.detail.value })}
        >
          {this.props.response.unitName.map((unit: string, index: number) => {
            return (
              <IonItem lines="none" key={index}>
                <IonLabel className="radioClass">{unit}</IonLabel>
                <IonRadio mode="md" value={index} slot="start"></IonRadio>
              </IonItem>
            );
          })}
        </IonRadioGroup>
        <IonItem className="buttonItem">
          <IonButton
            fill="clear"
            onClick={() => this.props.onIndexChange(0)}
            className="cancelButton"
          >
            <IonLabel className="cancelButton">Cancel</IonLabel>
          </IonButton>
          <IonButton
            fill="clear"
            className="recordButton"
            onClick={() => this.props.onIndexChange(this.state.index)}
          >
            <IonLabel className="recordButton">Ok</IonLabel>
          </IonButton>
        </IonItem>
      </IonPopover>
    );
  }
}
export default MemberbershipSwitch;
