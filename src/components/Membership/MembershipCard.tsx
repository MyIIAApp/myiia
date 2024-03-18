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
} from "@ionic/react";
import React from "react";
import defaultProfile from "../../images/defaultProfileIcon.svg";
import "../../styles/Membership.css";
import { ActiveMembershipModel } from "../../models/Membership/ActiveMembershipModel";
import { MembershipCardStatus } from "../../constants/MembershipConstants";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";

interface MembershipCardProps {
  membershipModel: ActiveMembershipModel;
  membershipProfile: MembershipProfileModel;
}

class MembershipCard extends React.Component<MembershipCardProps> {
  constructor(props: MembershipCardProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <IonCard class="membershipCard">
        <IonCardHeader class="membershipCardUpper">
          <CreateAnimation
            duration={2000}
            iterations={Infinity}
            keyframes={[
              { offset: 0, transform: "scale(1)", opacity: "1" },
              { offset: 0.1, transform: "scale(1.1)", opacity: "1.1" },
              { offset: 0.2, transform: "scale(1.2)", opacity: "1.2" },
              { offset: 0.3, transform: "scale(1.1)", opacity: "1.1" },
              { offset: 0.4, transform: "scale(1)", opacity: "1" },
              { offset: 0.5, transform: "scale(0.9)", opacity: "0.9" },
              { offset: 0.6, transform: "scale(0.8)", opacity: "0.8" },
              { offset: 0.7, transform: "scale(0.7)", opacity: "0.7" },
              { offset: 0.8, transform: "scale(0.8)", opacity: "0.8" },
              { offset: 0.9, transform: "scale(0.9)", opacity: "0.9" },
              { offset: 1, transform: "scale(1)", opacity: "1" },
            ]}
            easing="ease-out"
            play={true}
          >
            <IonSegment mode ="md"
              class={
                this.props.membershipModel.membershipStatus ==
                MembershipCardStatus.ACTIVE || this.props.membershipModel.membershipStatus ==
                MembershipCardStatus.GRACE
                  ? "membershipCardStatus membershipCardStatusActive"
                  // : this.props.membershipModel.membershipStatus ==
                  //   MembershipCardStatus.GRACE
                  // ? "membershipCardStatus membershipCardStatusGrace"
                  : "membershipCardStatus membershipCardStatusExpired"
              }
            >
              <IonLabel>
                <strong>
                  {
                    MembershipCardStatus[
                      this.props.membershipModel.membershipStatus == 6 ? 5: this.props.membershipModel.membershipStatus
                    ]
                  }
                </strong>
              </IonLabel>
            </IonSegment>
          </CreateAnimation>
        </IonCardHeader>
        <IonGrid>
          <IonRow class="membershipCardProfileRow">
            <IonCol size="auto">
              <IonAvatar>
                <img className="avatarSize" src={this.props.membershipProfile.profileImagePath!=""?this.props.membershipProfile.profileImagePath:defaultProfile} />
              </IonAvatar>
            </IonCol>
            <IonCol size="auto" class="membershipCardNameColumn">
              <IonCardTitle  class="gridFont membershipCardTitle">
                {this.props.membershipModel.firstName}{" "}
                {this.props.membershipModel.lastName}
              </IonCardTitle>
              <IonCardSubtitle class="membershipCardSubTitle ">
                {this.props.membershipModel.chapterName} Chapter
              </IonCardSubtitle>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol class="ion-align-self-end">
                <IonSegment mode ="md">
                  <IonCardTitle class="membershipCardTitle">
                    {this.props.membershipModel.membershipId}
                  </IonCardTitle>
                </IonSegment>
              </IonCol>
              <IonCol>
                <IonSegment mode ="md">
                  <IonCardTitle  class="membershipCardTitle">
                    {this.props.membershipProfile.unitName}
                  </IonCardTitle>
                </IonSegment>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonSegment mode ="md">
                  <IonCardSubtitle  class="gridFont">
                    <strong>Membership ID</strong>
                  </IonCardSubtitle>
                </IonSegment>
              </IonCol>
              <IonCol>
                <IonSegment mode ="md">
                  <IonCardSubtitle class="gridFont">
                    <strong>Industry Name</strong>
                  </IonCardSubtitle>
                </IonSegment>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonSegment mode ="md">
                  <IonCardTitle  class="membershipCardTitle">
                    {this.props.membershipModel.membershipSince}
                  </IonCardTitle>
                </IonSegment>
                <IonSegment mode ="md">
                  <IonCardSubtitle  class="gridFont">
                    <strong>Member since</strong>
                  </IonCardSubtitle>
                </IonSegment>
              </IonCol>
              <IonCol>
                <IonSegment mode ="md">
                  <IonCardTitle  class="membershipCardTitle">
                    {this.props.membershipModel.membershipExpiryDate}
                  </IonCardTitle>
                </IonSegment>
                <IonSegment mode ="md">
                  <IonCardSubtitle  class="gridFont">
                    <strong>Renewal Due Date</strong>
                  </IonCardSubtitle>
                </IonSegment>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    );
  }
}

export default MembershipCard;
