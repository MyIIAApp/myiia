import {
  IonContent,
  IonSegment,
  IonCard,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonImg,
} from "@ionic/react";
import React from "react";
import "../../styles/IIAMart.css";
import Phone1 from "../../images/Phone1.svg";
import Location from "../../images/Location.svg";
import { details } from "../../models/IIAMart/details";

interface PendingEnquiryStates {
  enquiry: boolean;
}
interface PendingEnquiryProps {
  product: details;
  index: number;
  changeStatus: (index: number) => void;
}
class PendingEnquiry extends React.Component<
  PendingEnquiryProps,
  PendingEnquiryStates
> {
  constructor(props: PendingEnquiryProps) {
    super(props);
    this.state = {
      enquiry: false,
    };
  }
  render() {
    return (
      <IonContent>
        <IonGrid className="limitContent">
          <IonRow>
            <IonCol class="heading ion-text-center">Buyer Information </IonCol>
          </IonRow>
          <IonCard class="enquirygrid limitcontent">
            <IonGrid class="gridmargin">
              <IonRow class="title1">Buyer name</IonRow>
              <IonRow className="info">
                {this.props.product.FirstName}
                {this.props.product.LastName}
              </IonRow>
              <IonRow>
                <IonCol size="10.5" class="ion-no-padding">
                  <IonRow class="title1">Phone Number</IonRow>
                  <IonRow className="info">
                    {this.props.product.PhoneNumber}
                  </IonRow>
                </IonCol>
                <IonCol size="1.5" class="floatright">
                  <IonImg
                    class="infoimg"
                    src={Phone1}
                    onClick={() =>
                      window.open("tel:" + this.props.product.PhoneNumber)
                    }
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10.5" class="ion-no-padding">
                  <IonRow class="title1">Location</IonRow>
                  <IonRow className="info">{this.props.product.Address}</IonRow>
                </IonCol>
                <IonCol size="1.5" class="floatright">
                  <IonImg class="infoimg" src={Location} />
                </IonCol>
              </IonRow>
              <IonRow class="title1">Time</IonRow>
              <IonRow className="info">{this.props.product.Time}</IonRow>
              <IonRow class="title1">Message</IonRow>
              <IonRow className="info">{this.props.product.Message}</IonRow>
            </IonGrid>
          </IonCard>
          <IonRow>
            <IonCol class="heading ion-text-center">Listing Information</IonCol>
          </IonRow>
          <IonCard key={this.props.product.Id} class="">
            <IonGrid>
              <IonRow>
                <IonCol size="4" className="ion-no-padding">
                  <img
                    className="itemimg"
                    src={this.props.product.PhotoPath}
                  ></img>
                </IonCol>
                <IonCol offset="1">
                  <IonRow class="">
                    <IonLabel class="itemListName">
                      {this.props.product.Name}
                    </IonLabel>
                  </IonRow>
                  <IonRow class="space">
                    <IonCol size="6">
                      <IonSegment mode ="md" class="itembtn">
                        <IonLabel class="itemListCategory">
                          &nbsp;&nbsp;{this.props.product.Category}&nbsp;&nbsp;
                        </IonLabel>
                      </IonSegment>
                    </IonCol>
                    <IonCol>
                      <IonSegment mode ="md" class="itembtn">
                        <IonLabel class="itemListCategory">
                          &nbsp;&nbsp;{this.props.product.SubCategory}
                          &nbsp;&nbsp;
                        </IonLabel>
                      </IonSegment>
                    </IonCol>
                  </IonRow>
                  <IonRow class="space1">
                    <IonLabel class="itemListPrice">
                      Price :&nbsp;{this.props.product.Price}
                    </IonLabel>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          {this.props.product.EnquiryStatus == "0" ? (
            <IonButton
              class="enquirybtn0"
              onClick={() => {
                this.setState({ enquiry: true });
                this.props.changeStatus(this.props.index);
              }}
            >
              Mark as Resolved
            </IonButton>
          ) : (
            <IonSegment mode ="md" class="enquirybtn1">
              <IonLabel className="btncontent"> Resolved</IonLabel>
            </IonSegment>
          )}
        </IonGrid>
      </IonContent>
    );
  }
}

export default PendingEnquiry;
