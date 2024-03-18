import { IonContent, IonHeader, IonInfiniteScrollContent, IonList, IonPage } from "@ionic/react";
import React from "react";
import { MagazineView } from "../../MagazineConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Magazine } from "../../models/Magazine/Magazine";
import MagazineCard from "./MagazineCard";
import "../../styles/Magazine.css";

interface CurrentMagazineStates{
    isLoading: boolean;
    currentMagazineView: MagazineView;
}

interface CurrentMagazineProps{
    loginMetaData: LoginMetadata;
    currentList: Magazine[];
}

class CurrentMagazine extends React.Component<
CurrentMagazineProps,
    CurrentMagazineStates
  > {
    constructor(props: CurrentMagazineProps) {
      super(props);
      this.state = {
        isLoading: false,
        currentMagazineView: MagazineView.CurrentMagazine
      };
    }      

    render() {
        console.log(this.props.currentList)
        return(
            <IonPage>
              <IonHeader class="maghead ion-no-border">
                  CURRENT MAGAZINES
              </IonHeader>
              <IonContent>
        {this.props.currentList.map((magazineItem: Magazine) => {
        return(
            <IonList key={magazineItem.id}>
                <MagazineCard magazineItem={magazineItem}/>
            </IonList>
        );
    })}
    </IonContent>
    </IonPage>
    )
  }
}

export default CurrentMagazine;