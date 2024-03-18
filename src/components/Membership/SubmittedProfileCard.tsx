import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
} from "@ionic/react";
import viewIcon from "../../images/viewIcon.svg";
import React from "react";
import "../../styles/Membership.css";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";

interface SubmittedProfileCardProps {
  membershipProfile: MembershipProfileModel;
  buttonString: string;
  buttonFunction: (event: any) => void;
}

class SubmittedProfileCard extends React.Component<SubmittedProfileCardProps> {
  constructor(props: SubmittedProfileCardProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IonCard class="submittedProfileCard">
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="9">
                <IonCardTitle>
                  {this.props.membershipProfile.unitName}
                </IonCardTitle>
                <IonText>
                  <h6>{this.props.membershipProfile.gstin}</h6>
                </IonText>
                <IonCardSubtitle>
                  {this.props.membershipProfile.chapterName} Chapter
                </IonCardSubtitle>
              </IonCol>
              <IonCol size="3" class="viewButtonColumn">
                <IonButton
                  class="basicButton viewButton"
                  onClick={(event) => this.props.buttonFunction(event)}
                >
                  <IonImg src={viewIcon} alt="" />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    );
  }
}

export default SubmittedProfileCard;
