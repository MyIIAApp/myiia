import {
  IonSegment,
  IonButton,
  IonContent,
  IonImg,
  IonSlide,
  IonSlides,
  IonLabel,
  IonGrid,
  IonModal,
} from "@ionic/react";
import React from "react";
import "../../styles/Membership.css";
import slider1 from "../../images/applicationProcessSlide1.svg";
import slider2 from "../../images/applicationProcessSlide2.svg";
import slider3 from "../../images/applicationProcessSlide3.svg";

const slideOpts = {
  loop: true,
  initialSlide: 0,
  speed: 2000,
  grabCursor: true,
};

interface ApplicationProcessProps {
  applicationnProcessModal: boolean;
  setApplicationnProcessModal: (value: boolean) => void;
  setbecomeMember: () => void;
}
interface ApplicationProcessStates {}
class ApplicationProcess extends React.Component<
  ApplicationProcessProps,
  ApplicationProcessStates
> {
  constructor(props: ApplicationProcessProps) {
    super(props);
  }

  render() {
    return (
      <IonModal
        isOpen={this.props.applicationnProcessModal}
        onDidDismiss={() => this.props.setApplicationnProcessModal(false)}
        cssClass="popoverDim"
      >
        <IonSegment mode ="md" color="light">
          <IonLabel className="ion-margin titleSlide">
            Become a Member in 3 Easy Steps
          </IonLabel>
        </IonSegment>
        <IonContent>
          <IonSlides
            pager={true}
            className="applicationSlides"
            options={slideOpts}
          >
            <IonSlide>
              <IonGrid>
                <IonSegment mode ="md" color="light">
                  <img src={slider1} className="slideImageCentre" alt="" />
                </IonSegment>
                <IonSegment mode ="md" color="light">
                  <IonLabel className="ion-margin titleSlide">
                    Fill Up The Form
                  </IonLabel>
                </IonSegment>
              </IonGrid>
            </IonSlide>
            <IonSlide>
              <IonGrid>
                <IonSegment mode ="md" color="light">
                  <img src={slider2} className="slideImageCentre" alt="" />
                </IonSegment>
                <IonSegment mode ="md" color="light">
                  <IonLabel className="ion-margin titleSlide">
                    Wait For Admin to Approve Your Application
                  </IonLabel>
                </IonSegment>
              </IonGrid>
            </IonSlide>
            <IonSlide>
              <IonGrid>
                <IonSegment mode ="md" color="light">
                  <img src={slider3} className="slideImageCentre" alt="" />
                </IonSegment>
                <IonSegment mode ="md" color="light">
                  <IonLabel className="ion-margin titleSlide">
                    Pay Membership Feesthrough Cash, Card or Online
                  </IonLabel>
                </IonSegment>
              </IonGrid>
            </IonSlide>
          </IonSlides>
        </IonContent>
        <IonSegment mode ="md" color="light">
          <IonButton
            class="basicButton popoverBecomeIIAMemberButton"
            onClick={() => this.props.setbecomeMember()}
          >
            Become a Member Now
          </IonButton>
        </IonSegment>
      </IonModal>
    );
  }
}

export default ApplicationProcess;
