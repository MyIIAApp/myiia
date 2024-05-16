import { IonCard, IonContent, IonPage, IonGrid, IonCardContent, IonLabel, IonIcon, IonHeader } from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { MagazineView } from "../../MagazineConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Magazine } from "../../models/Magazine/Magazine";
import { MagazineResponse } from "../../models/Magazine/MagazineResponse";
import { MagazineService } from "../../services/MagazineService";
import "../../styles/Helpdesk.css";
import CurrentMagazine from "./CurrentMagazine";
import MagazinebyMonthandYear from "./MagazinebyMonthandYear";
import PastMagazine from "./PastMagazine";
import "../../styles/Magazine.css"
import { Browser } from "@capacitor/browser";
interface MagazinesPageStates {
  isLoading: boolean;
  currentMagazineView: MagazineView;
  currentList: Magazine[];
  pastList: Magazine[];
  }
  
  interface MagazinesPageProps {
    loginMetadata: LoginMetadata;
  }
  
  class Magazines extends React.Component<
    MagazinesPageProps,
    MagazinesPageStates
  > {
    constructor(props: MagazinesPageProps) {
      super(props);
      this.state = {
        isLoading: false,
        currentMagazineView: MagazineView.MagazineHome,
        currentList: [],
        pastList: [],
      };
    }

    componentDidMount(): void {
      Browser.open({url:"https://iiaonline.in/Uploads/NewsLetter/PdfAttachment/IIA-NewsLetter.pdf"});
    }

    // getData(forceRefresh: boolean) {      
    //   this.setState({ isLoading: true });
    //   return MagazineService.GetCurrentMagazine(
    //     this.props.loginMetadata,
    //     forceRefresh
    //   )
    //     .then((magazineResponse1: MagazineResponse) => {
    //       this.setState({
    //         currentList: magazineResponse1.magazine,
    //         isLoading: false,
    //       });
    //     })
    //     .catch(() => {
    //       this.setState({ isLoading: false });
    //     });
    // }
    
    //   getPastData(forceRefresh: boolean) {
    //     this.setState({ isLoading: true });
    //     return MagazineService.GetPastMagazine(
    //       this.props.loginMetadata,
    //       forceRefresh
    //     )
    //       .then((magazineResponse2: MagazineResponse) => {
    //         this.setState({
    //           pastList: magazineResponse2.magazine,
    //           isLoading: false,
    //         });
    //       })
    //       .catch(() => {
    //         this.setState({ isLoading: false });
    //       });
    //   }

    render() {
      //this.state.isLoading
      if (true) {
        return (
          <IonPage>
            <HeaderToolbar
              refreshPage={() => {}}
              previousPage={() => {}}
              showBackButton={false}
              showRefreshButton={true}
            />
            {/* <Loading /> */}
          </IonPage>
        );
      }
      
    //   if (this.state.currentMagazineView === MagazineView.MagazineHome) {
    //     return this.homeContent();
    //   } else if (this.state.currentMagazineView === MagazineView.CurrentMagazine) {
    //     return this.getCurrentContent();
    //   } else if (this.state.currentMagazineView === MagazineView.PastMagazine) {
    //     return this.getPastContent();
    //   } else if (this.state.currentMagazineView === MagazineView.MagazinebyMonthandYear) {
    //     return this.getMonthandYearContent();
    //   }

    //   return this.homeContent();
    // }
    //    private homeContent() {
    //       return (
    //         <IonPage>
    //           <HeaderToolbar
    //       refreshPage={() => {}}
    //       previousPage={() => {}}
    //       showBackButton={false}
    //       showRefreshButton={true}
    //     />
    //             <IonContent>
    //             <IonGrid className="limitContent">
    //         <IonCard class="statuslistcard" onClick={() => {this.onCurrentClicked(); this.getData(true);}}>
    //           <IonCardContent class="labcent">
    //               <IonLabel class="statuslabel labcent">View Current Magazines</IonLabel>
    //           </IonCardContent>
    //           </IonCard>
    //           <IonCard class="statuslistcard" onClick={() => {this.onPastClicked(); this.getPastData(true);}}>
    //           <IonCardContent class="labcent">
    //               <IonLabel class="statuslabel">View All Past Magazines</IonLabel>
    //               <IonIcon name="chevronForward"></IonIcon>
    //           </IonCardContent>
    //           </IonCard>
    //           <IonCard class="statuslistcard" onClick={() => this.onMonthandYearClicked()}>
    //           <IonCardContent class="labcent">
    //               <IonLabel class="statuslabel">View Magazines by specific Month and Year</IonLabel>
    //               <IonIcon name="chevronForward"></IonIcon>
    //           </IonCardContent>
    //           </IonCard>
    //           </IonGrid>
                  
    //             </IonContent>
    //         </IonPage>
    //     );
    }

    // private onCurrentClicked() {
    //   this.setState({currentMagazineView: MagazineView.CurrentMagazine})
    // }

    // private onPastClicked() {
    //   this.setState({currentMagazineView: MagazineView.PastMagazine})
    // }

    // private onMonthandYearClicked() {
    //   this.setState({currentMagazineView: MagazineView.MagazinebyMonthandYear})
    // }

    // private onBackClicked() {
    //   this.setState({currentMagazineView: MagazineView.MagazineHome})
    // }

    // private getCurrentContent() {
    //   if (this.state.currentList.length === 0) {
    //     return (
    //       <IonPage>
    //         <HeaderToolbar
    //           refreshPage={() => this.getData(true)}
    //           previousPage={() => this.onBackClicked()}
    //           showBackButton={true}
    //           showRefreshButton={true}
    //         />
    //         <IonHeader class="maghead ion-no-border">
    //               CURRENT MAGAZINES
    //         </IonHeader>
    //         <IonContent class="nomag">
    //           No Magazines to show
    //         </IonContent>
    //       </IonPage>
    //     );
    //   }
  
    //   return(
    //     <IonPage>
    //           <HeaderToolbar
    //       refreshPage={() => this.getData(true)}
    //       previousPage={() => this.onBackClicked()}
    //       showBackButton={true}
    //       showRefreshButton={true}
    //     />
    //     <IonContent>
    //       <CurrentMagazine currentList={this.state.currentList} loginMetaData={this.props.loginMetadata}></CurrentMagazine>
    //     </IonContent>
    //     </IonPage>
    //   );
    // }

    // private getPastContent() {
    //   if (this.state.pastList.length === 0) {
    //     return (
    //       <IonPage>
    //         <HeaderToolbar
    //           refreshPage={() => {}}
    //           previousPage={() => this.onBackClicked()}
    //           showBackButton={true}
    //           showRefreshButton={false}
    //         />
    //         <IonHeader class="maghead ion-no-border">
    //               PAST MAGAZINES
    //         </IonHeader>
    //         <IonContent class="nomag">
    //           No Magazines to show
    //         </IonContent>
    //       </IonPage>
    //     );
    //   }
    //   return (
    //     <IonPage>
    //       <HeaderToolbar
    //       refreshPage={() => this.getPastData(true)}
    //       previousPage={() => this.onBackClicked()}
    //       showBackButton={true}
    //       showRefreshButton={true}
    //     />
    //     <IonContent>
    //       <PastMagazine pastList={this.state.pastList} loginMetaData={this.props.loginMetadata}></PastMagazine>
    //     </IonContent>
    //     </IonPage>
    //   )
    // }

    // private getMonthandYearContent() {
    //   return (
    //     <IonPage>
    //       <HeaderToolbar
    //       refreshPage={() => {}}
    //       previousPage={() => this.onBackClicked()}
    //       showBackButton={true}
    //       showRefreshButton={false}
    //     />
    //     <IonContent>
    //       <MagazinebyMonthandYear loginMetaData={this.props.loginMetadata} />
    //     </IonContent>
    //     </IonPage>
    //   )
    // }
}

export default Magazines;
