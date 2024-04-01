import {
  IonContent,
  IonPage,
  IonSegment,
  IonRouterLink,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonFooter,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/ContactUs.css";
import mail from "../../images/mail.svg";
import phone from "../../images/phone.svg";
import mapIcon from "../../images/mapIcon.svg";

interface ContactStates {}
interface ContactProps {}

class ContactUs extends React.Component<ContactProps, ContactStates> {
  constructor(props: ContactProps) {
    super(props);
  }
  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={false}
        />
        <IonContent>
          <IonGrid className="limitContent">
            <IonSegment mode ="md">
              <IonRouterLink href="https://www.google.com/maps/place/INDIAN+INDUSTRIES+ASSOCIATION/@26.8629309,81.0091742,17z/data=!3m1!4b1!4m5!3m4!1s0x399958077c2e82a7:0xb92c35c6b8e9442a!8m2!3d26.8629285!4d81.011373">
                <img className="icon" src={mapIcon} alt="" />
              </IonRouterLink>
            </IonSegment>
            <IonSegment mode ="md">
              <IonRouterLink
                href="https://www.google.com/maps/place/INDIAN+INDUSTRIES+ASSOCIATION/@26.8629309,81.0091742,17z/data=!3m1!4b1!4m5!3m4!1s0x399958077c2e82a7:0xb92c35c6b8e9442a!8m2!3d26.8629285!4d81.011373"
                className="mapContent"
              >
                IIA Bhawan, Vibhuti Khand,
              </IonRouterLink>
            </IonSegment>
            <IonSegment mode ="md">
              <IonRouterLink
                href="https://www.google.com/maps/place/INDIAN+INDUSTRIES+ASSOCIATION/@26.8629309,81.0091742,17z/data=!3m1!4b1!4m5!3m4!1s0x399958077c2e82a7:0xb92c35c6b8e9442a!8m2!3d26.8629285!4d81.011373"
                className="mapContent"
              >
                Phase-II, Gomti Nagar,
              </IonRouterLink>
            </IonSegment>
            <IonSegment mode ="md">
              <IonRouterLink
                href="https://www.google.com/maps/place/INDIAN+INDUSTRIES+ASSOCIATION/@26.8629309,81.0091742,17z/data=!3m1!4b1!4m5!3m4!1s0x399958077c2e82a7:0xb92c35c6b8e9442a!8m2!3d26.8629285!4d81.011373"
                className="mapContent"
              >
                Lucknow, Uttar Pradesh 226010
              </IonRouterLink>
            </IonSegment>
            <IonSegment mode ="md"
              className="msmeSeg"
              onClick={() => window.open("mailto:" + "iia@iiaonline.in")}
            >
              <img className="icon" src={mail} alt="" />
            </IonSegment>
            <IonSegment mode ="md"
              className="msmeSeg"
              onClick={() => window.open("mailto:" + "iia@iiaonline.in")}
            >
              iia@iiaonline.in
            </IonSegment>
            <IonSegment mode ="md"
              className="msmeSeg"
              onClick={() => window.open("tel:" + "8601855570")}
            >
              <img className="icon" src={phone} alt="" />
            </IonSegment>
            <IonSegment mode ="md"
              className="msmeSeg"
              onClick={() => window.open("tel:" + "8601855570")}
            >
              +91 8601855570
            </IonSegment>
            <IonSegment mode ="md"
              className="msmeSeg"
              onClick={() => window.open("tel:" + "8601855546")}
            >
              +91 8601855546
            </IonSegment>
            <IonSegment mode ="md" className="foot">Powered by Flecks Tech</IonSegment>
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-center ion-text-wrap" size="6">
                  <IonButton
                    class="feedbackBttn ion-text-wrap"
                    onClick={() => window.open("https://www.fleckstech.com/")}
                    title="support@fleckstech.com"
                  >
                    Visit our website
                  </IonButton>
                </IonCol>
                <IonCol className="ion-text-center" size="6">
                  <IonButton
                    class="feedbackBttn ion-text-wrap"
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=fleckstech.myiia&hl=en",
                        "_system"
                      )
                    }
                    title="iia@iiaonline.in"
                  >
                    Rate App
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonGrid>
        </IonContent>
        <IonFooter>
          <IonGrid>
            <IonRow>
              <IonCol className="ion-text-center ion-text-nowrap">
                <IonRouterLink
                  href="https://iiaprodstorage.blob.core.windows.net/legal/About.pdf"
                  className="legalContent"
                >
                  About Us
                </IonRouterLink>
              </IonCol>
              <IonCol className="ion-text-center ion-text-nowrap">
                <IonRouterLink
                  href="https://iiaprodstorage.blob.core.windows.net/legal/PrivacyPolicy.pdf"
                  className="legalContent"
                >
                  Privacy Policy
                </IonRouterLink>
              </IonCol>
              <IonCol className="ion-text-center ion-text-nowrap">
                <IonRouterLink
                  href="https://iiaprodstorage.blob.core.windows.net/legal/Refund.pdf"
                  className="legalContent"
                >
                  Refund & Cancellation
                </IonRouterLink>
              </IonCol>
              <IonCol className="ion-text-center ion-text-nowrap">
                <IonRouterLink
                  href="https://iiaprodstorage.blob.core.windows.net/legal/TnC.pdf"
                  className="legalContent"
                >
                  Terms & Conditions
                </IonRouterLink>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonFooter>
      </IonPage>
    );
  }
}

export default ContactUs;
