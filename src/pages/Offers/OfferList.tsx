import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSegment,
} from "@ionic/react";
import React from "react";
import { Offer } from "../../models/Offers/Offer";
import { OfferResponse } from "../../models/Offers/OfferResponse";
import { OfferService } from "../../services/OffersService";
import "../../styles/Offers.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { OfferView } from "../../OfferConstants";
import viewoffer from "../../images/viewoffer.svg";
import OfferDetail from "../../components/OfferDetail";
import Loading from "../../components/Loading";

interface OfferListStates {
  offerList: Offer[];
  currentview: OfferView;
  showModal: boolean;
  currentSNo: string;
  showLoading: boolean;
}

interface OfferListProps {
  loginMetadata: LoginMetadata;
  category: string;
  searialNo:number;
}

class OfferList extends React.Component<OfferListProps, OfferListStates> {
  constructor(props: OfferListProps) {
    super(props);
    this.state = {
      offerList: [],
      currentview: OfferView.OfferList,
      showModal: false,
      currentSNo: "",
      showLoading: true,
    };
  }
  async getOffeer(){
    const response  = await fetch(`https://iiaonline.in/newapi_iia/getOffer.php?serailNo=${this.props.searialNo}`);
    const result = await response.json();
    return result;
  }
  componentDidMount() {
    this.getOffeer().then(res=>{
      this.setState({ showLoading: false, offerList: res });
    })
    .catch(()=>{
      this.setState({ showLoading: false });
    })
    // OfferService.GetOffers(this.props.loginMetadata, false, this.props.category)
    //   .then((offerResponse: OfferResponse) => {
    //     this.setState({ showLoading: false, offerList: offerResponse.offer });
    //   })
    //   .catch(() => {
    //     this.setState({ showLoading: false });
    //   });
  }

  render() {
    if (this.state.showLoading) {
      return <Loading></Loading>;
    } else if (this.state.offerList.length === 0) {
      return (
        <IonLabel className="no-items limitContent">
          Sorry No Offers to display
        </IonLabel>
      );
    }

    return (
      <IonGrid className="limitContent">
        <IonList>
          {this.state.offerList.map((offerItem: any) => {
            return (
              <IonCard key={offerItem.id} class="offerlist">
                <IonGrid>
                  <IonRow>
                    <IonCol size="9">
                      <IonRow class="offerlistdet1" style={{lineHeight:'16px'}}>{offerItem.OrgName}</IonRow>
                      {/* <IonRow class="offerlistdet2">
                        {offerItem.OfferSummary}
                      </IonRow> */}
                      <IonRow class="offerlistdet3">{offerItem.city}</IonRow>
                    </IonCol>
                    <IonCol>
                      <IonRow></IonRow>
                      <IonRow>
                        <IonCard
                          class="viewbutton"
                          onClick={()=>window.open(offerItem.attachpdf)}
                        >
                          <IonSegment mode ="md">
                            <IonImg src={viewoffer} class="viewsvg" />
                          </IonSegment>
                        </IonCard>
                      </IonRow>
                      <IonRow></IonRow>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            );
          })}
          <IonModal
            isOpen={this.state.showModal}
            onDidDismiss={() => this.setState({ showModal: false })}
            cssClass="popoverDim"
          >
            <OfferDetail
              loginMetadata={this.props.loginMetadata}
              SNo={this.state.currentSNo}
            />
          </IonModal>
        </IonList>
      </IonGrid>
    );
  }

  private onViewClick(SNo: string) {
    this.setState({ showModal: true, currentSNo: SNo });
  }
}

export default OfferList;
