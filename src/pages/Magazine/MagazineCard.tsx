import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonItem, IonLabel, IonList, IonRouterLink, IonRow, IonText } from "@ionic/react";
import React from "react";
import { Magazine } from "../../models/Magazine/Magazine";
import downloadIcon from "../../images/uploadIcon2.svg";
import "../../styles/Magazine.css";
import { Browser } from "@capacitor/browser";

interface MagazineCardStates {

}

interface MagazineCardProps {
    magazineItem: Magazine;
}

class MagazineCard extends React.Component <MagazineCardProps, MagazineCardStates> {
    constructor(props: MagazineCardProps) {
        super(props);
        this.state = {
        };
      }

      render() {
        return(
            <IonGrid>
              <IonCard class="magazine">
                  <IonRow>
                    <img src={this.getPdfPath()} height="150" width="100%" />
                  </IonRow>
                  <IonRow>
                    <IonCol size="10">
                  <IonRow>
                    <IonCardSubtitle class="subtitle">
                    &nbsp;{this.props.magazineItem.title}
                    </IonCardSubtitle>
                  </IonRow>
                  <IonRow>
                      <IonCol>
                        <IonCardSubtitle class="subtitle2">
                          {this.props.magazineItem.magazineMonth}&nbsp;&nbsp;{this.props.magazineItem.magazineYear}
                        </IonCardSubtitle>
                      </IonCol>
                  </IonRow>
                  </IonCol>
                  <IonCol>
                      <IonButton onClick={() => window.open(this.props.magazineItem.magazinePath)}>
                        <IonImg src={downloadIcon} />
                      </IonButton>
                  </IonCol>
                  </IonRow>
              </IonCard>
            </IonGrid>)
      }
      getPdfPath(){
        return this.props.magazineItem.coverPhotoPath;
      }
}

export default MagazineCard;