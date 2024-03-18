import { IonSegment, IonLabel,  IonImg,IonGrid } from "@ionic/react";
import React from "react";
import "../../styles/Membership.css";

interface DisplayMessageProps {
  message: string;
  logoPath: string;
}

class DisplayMessage extends React.Component<DisplayMessageProps> {
  render() {
    return (
      <IonGrid className="limitContent">
        <IonSegment mode ="md" class="logoSegment">
          <IonImg src={this.props.logoPath} class="iiaImageCentre" alt="" />
        </IonSegment>
        <IonSegment mode ="md">
          <IonLabel className="ion-text-wrap displayMessage" color="primary">
            {this.props.message}
          </IonLabel>
        </IonSegment>
      </IonGrid>
    );
  }
}

export default DisplayMessage;
