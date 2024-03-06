import {
  IonPopover,
  IonButton,
  IonList,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonSegment,
  IonLabel,
  IonPage,
  IonContent,
  IonTextarea,
  IonToast,
  NavContext,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/B2BBuyer.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { BuyerService } from "../../services/BuyerService";
import Loading from "../../components/Loading";
import DisplayMessage from "../../components/Membership/DisplayMessage";
import { StorageService } from "../../services/StorageService";
import {
  BuyerItemListExpiry,
  BuyerItemsList,
} from "../../constants/StorageConstants";
import rejectedMembership from "../../images/rejectedMembership.svg";
import { ItemResponse } from "../../models/B2B/ItemResponse";
import { RouteComponentProps } from "react-router";
import { Item } from "../../models/B2B/Item";
interface TopItemDetailsStates {
  showPop: boolean;
  enquiry: string;
  showLoading: boolean;
  showAlert: boolean;
  enquirySent: boolean;
  index: number;
}
interface TopItemDetailsProps {
  item: Item;
  loginMetadata: LoginMetadata;
}
class TopItemDetails extends React.Component<
  TopItemDetailsProps,
  TopItemDetailsStates
> {
  static contextType = NavContext;
  constructor(props: TopItemDetailsProps) {
    super(props);

    this.state = {
      showPop: false,
      enquiry: "",
      showLoading: false,
      showAlert: false,
      enquirySent: false,
      index: -1,
    };
  }
  componentDidMount() {}

  render() {
    return (
      <IonPage>
        <IonContent style={{ marginTop: "300px" }}>
          <IonGrid class="limitContent ion-no-padding">
            {this.state.showLoading ? (
              <Loading />
            ) : (
              <IonGrid class="ion-no-padding">
                <IonGrid class="ion-no-padding">
                  <IonRow>
                    <IonCol class="">
                      <img
                        src={this.props.item.PhotoPath}
                        alt="No Image Available"
                        className="itemImage2"
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow class="itemId">#{this.props.item.Id}</IonRow>
                  <IonRow class="itemName">
                    <IonCol size="7">{this.props.item.Name}</IonCol>
                    <IonCol class="ion-text-end">
                      &#8377;&nbsp;
                      {this.props.item.Price}
                    </IonCol>
                  </IonRow>
                  <IonRow class="itemDescription">
                    {this.props.item.ItemDescription}
                  </IonRow>
                  <IonRow class="sellerInfo">Seller&nbsp;Info</IonRow>
                  <IonRow className="leftMargin">
                    <IonCol>
                      <IonRow className="sellerName sellerNameRow">
                        Seller&nbsp;Name
                      </IonRow>
                      <IonRow className="sellerName2 sellerNameRow">
                        {this.props.item.SellerName}
                      </IonRow>
                    </IonCol>
                  </IonRow>
                  <IonRow className="leftMargin">
                    <IonCol>
                      <IonRow className="sellerName sellerNameRow">
                        Seller&nbsp;Location
                      </IonRow>
                      <IonRow className="sellerName2 sellerNameRow">
                        {this.props.item.SellerLocation}
                      </IonRow>
                    </IonCol>
                  </IonRow>

                  <IonToolbar class="enquiryButtonFooter">
                    <IonButton
                      disabled={this.props.item.EnquiryStatus == "1"}
                      expand="block"
                      className={
                        this.props.item.EnquiryStatus == "1"
                          ? "enquiryButton1"
                          : "enquiryButton"
                      }
                      onClick={() => {
                        this.setState({ showPop: true });
                      }}
                    >
                      <IonLabel>
                        {this.props.item.EnquiryStatus == "1"
                          ? "Enquiry Sent"
                          : "Send Enquiry"}
                      </IonLabel>
                    </IonButton>
                  </IonToolbar>
                </IonGrid>

                <IonPopover
                  isOpen={this.state.showPop}
                  onDidDismiss={() => this.setState({ showPop: false })}
                >
                  <IonList>
                    <IonItem lines="none" class="createpop1">
                      <IonSegment mode="md" class="inputenq">
                        <IonTextarea
                          class="enquiryInput"
                          rows={8}
                          placeholder="Enter Message"
                          onIonInput={(e) => this.enquiryInput(e)}
                          value={this.state.enquiry}
                        ></IonTextarea>
                      </IonSegment>
                    </IonItem>
                    <IonItem lines="none">
                      <IonSegment mode="md">
                        <IonButton
                          class="createpop3"
                          disabled={this.state.enquiry == ""}
                          onClick={(e) => {
                            this.SendEnquiry(e);
                            this.setState({ showPop: false });
                          }}
                        >
                          <IonLabel class="sendEnquiryButton">
                            Send Enquiry
                          </IonLabel>
                        </IonButton>
                      </IonSegment>
                    </IonItem>
                  </IonList>
                </IonPopover>
                <IonToast
                  isOpen={this.state.enquirySent}
                  message="Enquiry Sent"
                  duration={2000}
                  onDidDismiss={() => this.setState({ enquirySent: false })}
                />
                <IonAlert
                  isOpen={this.state.showAlert}
                  message="Unable to process Request. Please Try Again Later"
                  onDidDismiss={() => this.setState({ showAlert: false })}
                  buttons={[{ text: "Close", role: "cancel" }]}
                ></IonAlert>
              </IonGrid>
            )}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  enquiryInput(event: any) {
    this.setState({ enquiry: event.target.value });
  }
  SendEnquiry(event: any) {
    this.setState({ showLoading: true });
    BuyerService.SendEnquiry(
      this.state.enquiry,
      this.props.item.Id,
      this.props.loginMetadata
    )
      .then((res) => {
        this.props.item.EnquiryStatus = "1";
        StorageService.Set(
          BuyerItemsList +
            this.props.item.Category +
            this.props.item.SubCategory,
          this.props.item,
          BuyerItemListExpiry
        ).then(() => {
          this.setState({ showLoading: false, enquirySent: true });
        });
      })
      .catch((error) => this.setState({ showLoading: false, showAlert: true }));
  }
}
export default TopItemDetails;
