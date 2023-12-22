import { IonCard, IonContent, IonGrid, IonHeader, IonInfiniteScrollContent, IonLabel, IonList, IonPage } from "@ionic/react";
import React from "react";
import { MagazineView } from "../../MagazineConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Magazine } from "../../models/Magazine/Magazine";
import { MagazineResponse } from "../../models/Magazine/MagazineResponse";
import { MagazineService } from "../../services/MagazineService";
import MagazineCard from "./MagazineCard";
import "../../styles/Magazine.css";

interface PastMagazineStates{
    isLoading: boolean;
    currentMagazineView: MagazineView;
}

interface PastMagazineProps{
    loginMetaData: LoginMetadata,
    pastList: Magazine[]
}

class PastMagazine extends React.Component<
PastMagazineProps,
    PastMagazineStates
  > {
    constructor(props: PastMagazineProps) {
      super(props);
      this.state = {
        isLoading: false,
        currentMagazineView: MagazineView.PastMagazine,
      };
    }

    render() {
        console.log(this.props.pastList)
        return(
            <IonPage>
              <IonHeader class="maghead ion-no-border">
                  PAST MAGAZINES
              </IonHeader>
              <IonContent>  
        {this.props.pastList.map((magazineItem: Magazine) => {
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

export default PastMagazine;