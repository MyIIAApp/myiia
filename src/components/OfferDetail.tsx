import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonSegment,
  IonGrid
} from "@ionic/react";
import React from "react";
import { Offer } from "../models/Offers/Offer";
import { OfferService } from "../services/OffersService";
import { LoginMetadata } from "../models/LoginMetadata";
import Loading from "./Loading";
import "../styles/Offers.css";

interface OfferDetailStates {
  offer: Offer;
  isUpdating: boolean;
}

interface OfferDetailProps {
  loginMetadata: LoginMetadata;
  SNo: string;
}

class OfferDetail extends React.Component<OfferDetailProps, OfferDetailStates> {
  constructor(props: OfferDetailProps) {
    super(props);
    this.state = { offer: new Offer(), isUpdating: false };
  }

  componentDidMount() {
    OfferService.GetOfferDetail(this.props.loginMetadata, this.props.SNo)
      .then((offerResponse: Offer[]) => {
        if (offerResponse.length !== 0) {
          this.setState({
            offer: offerResponse[0],
          });
        }
      })
      .catch(() => {});
  }

  render() {
    if (!this.state.offer.SNo || this.state.isUpdating) {
      return <Loading />;
    }

    return this.getOfferContent();
  }

  private getOfferContent() {
    return (
      <IonContent>
        <IonGrid className="limitContent">
        <IonList>
          <IonItem lines="none" class="offermod1">
            {this.state.offer.Name}
          </IonItem>
          <div hidden={!this.state.offer.OfferSummary}>
            <p className="offermod2">Summary</p>
            <p className="offermod3">{this.state.offer.OfferSummary}</p>
            <p className="offermod2">Details</p>
            <ol>
              <li className="offermod4" hidden={!this.state.offer.BulletPoint1}>
                {this.state.offer.BulletPoint1}
              </li>
              <li className="offermod4" hidden={!this.state.offer.BulletPoint2}>
                {this.state.offer.BulletPoint2}
              </li>
              <li className="offermod4" hidden={!this.state.offer.BulletPoint3}>
                {this.state.offer.BulletPoint3}
              </li>
              <li className="offermod4" hidden={!this.state.offer.BulletPoint4}>
                {this.state.offer.BulletPoint4}
              </li>
              <li className="offermod4" hidden={!this.state.offer.BulletPoint5}>
                {this.state.offer.BulletPoint5}
              </li>
            </ol>
          </div>
          <div hidden={!this.state.offer.phoneNumber}>
            <p className="offermod2">Phone Number</p>
            <p className="offermod3">{this.state.offer.phoneNumber}</p>
          </div>
          <div hidden={!this.state.offer.Website}>
            <p className="offermod2">Website</p>
            <p className="offermod3">{this.state.offer.Website}</p>
          </div>
          <div hidden={!this.state.offer.Address}>
            <p className="offermod2">Address</p>
            <p className="offermod3">{this.state.offer.Address}</p>
          </div>
        </IonList>
        <IonSegment mode ="md">
          <IonButton
            class="offerdownbutton"
            onClick={() => window.open(this.state.offer.ProspectusPath)}
          >
            Download Offer Prospectus
          </IonButton>
        </IonSegment>
        </IonGrid>
      </IonContent>
    );
  }
}

export default OfferDetail;
