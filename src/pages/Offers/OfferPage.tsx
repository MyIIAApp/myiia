import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Elements.css";
import OfferCategoryList from "./OfferCategoryList";

interface OfferPageStates {}

interface OfferPageProps {
  loginMetadata: LoginMetadata;
}

class OfferPage extends React.Component<OfferPageProps, OfferPageStates> {
  constructor(props: OfferPageProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => {}}
          showBackButton={false}
          showRefreshButton={true}
        />
        <IonContent>
          <OfferCategoryList loginMetadata={this.props.loginMetadata} />
        </IonContent>
      </IonPage>
    );
  }
}

export default OfferPage;
