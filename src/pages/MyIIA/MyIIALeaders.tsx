import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
} from "@ionic/react";
import phoneIcon from "../../images/phoneIcon.svg";
import mailIcon from "../../images/mail-outline.svg";
import React from "react";
import defaultProfile from "../../images/helpdeskUserIcon.svg";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Leader } from "../../models/MyIIA/Leader";
import "../../styles/MyIIA.css";

interface MyIIALeadersProps {
  loginMetadata: LoginMetadata;
  leaders: Leader;
}

class MyIIALeaders extends React.Component<MyIIALeadersProps> {
  constructor(props: MyIIALeadersProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IonGrid className="limitContent ion-no-padding ion-no-margin">
      <IonCard class="IIACard">
        <IonGrid class="ion-no-padding">
          <IonRow>
          <IonCol size="8.5" className="myiiacoldeails">
              <IonGrid>
                <IonRow>
                  <IonCardTitle className="leaderName ion-text-wrap">
                    {this.props.leaders.Name}
                  </IonCardTitle>
                </IonRow>
                <IonRow>
                  <IonCardSubtitle className="leaderDesg">
                    {this.props.leaders.Designation}
                  </IonCardSubtitle>
                </IonRow>
                <IonRow>
                  <IonCardSubtitle className="chapterName">
                    {this.props.leaders.ChapterName}
                  </IonCardSubtitle>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol className="myiiacol" size="3.5">
              <IonButton
                className="leaderbttn"
                onClick={() =>
                  window.open("tel:" + this.props.leaders.PhoneNumber)
                }
              >
                <img className="icons" src={phoneIcon} alt="" />
              </IonButton>
              <IonButton
                className="leaderbttn"
                onClick={() =>
                  window.open("mailto:" + this.props.leaders.Email)
                }
              >
                <img className="icons" src={mailIcon} alt="" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
      </IonGrid>
    );
  }

  getImagePath() {
    if (this.props.leaders.ProfilePhoto === "") {
      return defaultProfile;
    } else {
      return this.props.leaders.ProfilePhoto;
    }
  }
}

export default MyIIALeaders;
