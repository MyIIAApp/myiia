import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { MagazineView } from "../../MagazineConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Magazine } from "../../models/Magazine/Magazine";
import { MagazineResponse } from "../../models/Magazine/MagazineResponse";
import { MagazineService } from "../../services/MagazineService";
import MagazineCard from "./MagazineCard";
import "../../styles/Magazine.css";
import { searchOutline } from "ionicons/icons";

interface MagazinebyMonthandYearStates{
    magazineCurrentView: MagazineView;
    magazineMonth: string;
    magazineYear: string;
    isLoading: boolean;
    filteredList: Magazine[];
}

interface MagazinebyMonthandYearProps{
    loginMetaData: LoginMetadata,

}

class MagazinebyMonthandYear extends React.Component<MagazinebyMonthandYearProps, MagazinebyMonthandYearStates> {
    constructor(props: MagazinebyMonthandYearProps) {
        super(props);
        this.state = {
            magazineCurrentView: MagazineView.MagazinebyMonthandYear,
            magazineMonth: "",
            magazineYear: "",
            isLoading: false,
            filteredList: []
        };
      }

    getData(forceRefresh: boolean) {      
    this.setState({ isLoading: true });
    return MagazineService.GetMagazineByMonthAndYear(
      this.props.loginMetaData,
      forceRefresh,
      this.state.magazineMonth,
      this.state.magazineYear
    )
      .then((magazineResponse: MagazineResponse) => {
        this.setState({
          filteredList: magazineResponse.magazine,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

      render() {
        console.log(this.state.filteredList)
        if (this.state.isLoading) {
            return (
              <IonPage>
                <IonContent>
                  <Loading />
                </IonContent>
              </IonPage>
            );
          }
        return(
            <IonPage>
              <IonHeader class="maghead ion-no-border">
                  SEARCH MAGAZINES
            </IonHeader>
                
                <IonRow class="search">
                  <IonCol>
                <IonSelect value={this.state.magazineMonth} onIonChange={ (e) => this.onMonthChange(e)} placeholder="Select Month">
                    <IonSelectOption value= "January">January</IonSelectOption>
                    <IonSelectOption value= "February">February</IonSelectOption>
                    <IonSelectOption value= "March">March</IonSelectOption>
                    <IonSelectOption value= "April">April</IonSelectOption>
                    <IonSelectOption value= "May">May</IonSelectOption>
                    <IonSelectOption value= "June">June</IonSelectOption>
                    <IonSelectOption value= "July">July</IonSelectOption>
                    <IonSelectOption value= "August">August</IonSelectOption>
                    <IonSelectOption value= "September">September</IonSelectOption>
                    <IonSelectOption value= "October">October</IonSelectOption>
                    <IonSelectOption value= "November">November</IonSelectOption>
                    <IonSelectOption value= "December">December</IonSelectOption>
                  </IonSelect>
                  </IonCol>
                
                <IonCol>
                <IonInput maxlength={4}
                value={this.state.magazineYear}
                spellCheck={true}
                required={true}
                onIonChange={(e)=>this.onYearChange(e)}
                placeholder="Enter Year">
                </IonInput>
                </IonCol>
                <IonCol size="2">
                <IonButton onClick={() => this.getData(true) }><IonIcon ios={searchOutline} md={searchOutline}></IonIcon></IonButton>
                </IonCol>
                </IonRow>
                <IonContent>
                {this.state.filteredList.length === 0 ? <IonContent class="nomag">No Magazines to show</IonContent> : this.state.filteredList.map((magazineItem: Magazine) => {
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

      onMonthChange(event: any) {
        this.setState({ magazineMonth: event.target.value });
      }
  
      onYearChange(event: any) {
        this.setState({ magazineYear: event.target.value });
      }


}

export default MagazinebyMonthandYear;