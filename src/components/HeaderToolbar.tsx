import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonSegment,
  IonToolbar,
} from "@ionic/react";
import {
  chevronBackOutline,
  refresh,
  returnUpBackOutline,
} from "ionicons/icons";
import React from "react";
import "../styles/Elements.css";

interface HeaderToolbarStates {}

interface HeaderToolbarProps {
  showBackButton: boolean;
  showRefreshButton: boolean;
  refreshPage: () => void;
  previousPage: () => void;
}

class HeaderToolbar extends React.Component<
  HeaderToolbarProps,
  HeaderToolbarStates
> {
  render() {
    return (
      <IonHeader className="ion-no-border">
        <IonToolbar class="rect">
          <IonButtons slot="start">
            {this.props.showBackButton ? (
              <IonButton
                color="light"
                onClick={() => this.props.previousPage()}
              >
                <IonIcon
                  size="large"
                  ios={returnUpBackOutline}
                  md={returnUpBackOutline}
                ></IonIcon>
                <IonLabel className="backButton"></IonLabel>
              </IonButton>
            ) : (
              <IonMenuButton color="light" />
            )}
          </IonButtons>
          <IonButtons slot="end">
            {this.props.showRefreshButton ? (
              <IonButton color="light" onClick={() => this.props.refreshPage()}>
                <IonIcon
                  class="button-inner"
                  size="large"
                  ios={refresh}
                ></IonIcon>
              </IonButton>
            ) : null}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    );
  }
}

export default HeaderToolbar;
