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
interface ItemDetailsStates {
  showPop: boolean;
  enquiry: string;
  showLoading: boolean;
  showAlert: boolean;
  enquirySent: boolean;
  index: number;
  itemList: ItemResponse;
  showError: boolean;
}
interface ItemDetailsProps
  extends RouteComponentProps<{
    page: string;
    category: string;
    subCategory: string;
    index: string;
  }> {
  loginMetadata: LoginMetadata;
}
class ItemDetails extends React.Component<ItemDetailsProps, ItemDetailsStates> {
  static contextType = NavContext;
  constructor(props: ItemDetailsProps) {
    super(props);

    this.state = {
      showPop: false,
      enquiry: "",
      showLoading: true,
      showAlert: false,
      enquirySent: false,
      index: -1,
      itemList: new ItemResponse(),
      showError: false,
    };
  }
  componentDidMount() {
    // debugger;
    try {
      this.setState({ index: parseInt(this.props.match.params.index) });
      StorageService.Get(
        BuyerItemsList +
          this.props.match.params.category +
          this.props.match.params.subCategory
      )
        .then((res: ItemResponse) => {
          this.setState({
            showLoading: false,
            itemList: res,
          });
        })
        .catch((error) =>
          this.setState({ showLoading: false, showAlert: true })
        );
    } catch {
      this.setState({ showError: true });
    }
  }

  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => {
            this.redirect();
          }}
          showBackButton={true}
          showRefreshButton={false}
        />
        <IonContent>
          <IonGrid class="limitContent ion-no-padding">
            {!this.state.showError ? (
              this.state.showLoading ? (
                <Loading />
              ) : (
                <IonGrid class="ion-no-padding">
                  <IonGrid class="ion-no-padding">
                    <IonRow>
                      <IonCol class="">
                        <img
                          src={
                            this.state.itemList.itemListing[this.state.index]
                              .PhotoPath
                          }
                          alt="No Image Available"
                          className="itemImage2"
                        />
                      </IonCol>
                    </IonRow>
                    <IonRow class="itemId">
                      #{this.state.itemList.itemListing[this.state.index].Id}
                    </IonRow>
                    <IonRow class="itemName">
                      <IonCol size="7">
                        {this.state.itemList.itemListing[this.state.index].Name}
                      </IonCol>
                      <IonCol class="ion-text-end">
                        &#8377;&nbsp;
                        {
                          this.state.itemList.itemListing[this.state.index]
                            .Price
                        }
                      </IonCol>
                    </IonRow>
                    <IonRow class="itemDescription">
                      {
                        this.state.itemList.itemListing[this.state.index]
                          .ItemDescription
                      }
                    </IonRow>
                    <IonRow class="sellerInfo">Seller&nbsp;Info</IonRow>
                    <IonRow className="leftMargin">
                      <IonCol>
                        <IonRow className="sellerName sellerNameRow">
                          Seller&nbsp;Name
                        </IonRow>
                        <IonRow className="sellerName2 sellerNameRow">
                          {
                            this.state.itemList.itemListing[this.state.index]
                              .SellerName
                          }
                        </IonRow>
                      </IonCol>
                    </IonRow>
                    <IonRow className="leftMargin">
                      <IonCol>
                        <IonRow className="sellerName sellerNameRow">
                          Seller&nbsp;Location
                        </IonRow>
                        <IonRow className="sellerName2 sellerNameRow">
                          {
                            this.state.itemList.itemListing[this.state.index]
                              .SellerLocation
                          }
                        </IonRow>
                      </IonCol>
                    </IonRow>

                    <IonToolbar class="enquiryButtonFooter">
                      <IonButton
                        disabled={
                          this.state.itemList.itemListing[this.state.index]
                            .EnquiryStatus == "1"
                        }
                        expand="block"
                        className={
                          this.state.itemList.itemListing[this.state.index]
                            .EnquiryStatus == "1"
                            ? "enquiryButton1"
                            : "enquiryButton"
                        }
                        onClick={() => {
                          this.setState({ showPop: true });
                        }}
                      >
                        <IonLabel>
                          {this.state.itemList.itemListing[this.state.index]
                            .EnquiryStatus == "1"
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
              )
            ) : (
              <DisplayMessage
                logoPath={rejectedMembership}
                message="Invalid PageURl"
              />
            )}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  enquiryInput(event: any) {
    this.setState({ enquiry: event.target.value });
  }

  async sendmessage(item){
    let data = {
      item_id:item,
      message:this.state.enquiry,
      loginMetadata:this.props.loginMetadata
    }
    const response = await fetch('https://iiaonline.in/newapi_iia/sendEnquerySMS.php',{
      method:'POST',
      body:JSON.stringify(data)
    })
  }

  SendEnquiry(event: any) {
    this.setState({ showLoading: true });
    BuyerService.SendEnquiry(
      this.state.enquiry,
      this.state.itemList.itemListing[this.state.index].Id,
      this.props.loginMetadata
    )
      .then((res) => {
        this.sendmessage(this.state.itemList.itemListing[this.state.index].Id);
        this.state.itemList.itemListing[this.state.index].EnquiryStatus = "1";
        StorageService.Set(
          BuyerItemsList +
            this.state.itemList.itemListing[this.state.index].Category +
            this.state.itemList.itemListing[this.state.index].SubCategory,
          this.state.itemList,
          BuyerItemListExpiry
        ).then(() => {
          this.setState({ showLoading: false, enquirySent: true });
        });
      })
      .catch((error) => this.setState({ showLoading: false, showAlert: true }));
  }
  redirect() {
    this.context.navigate(
      "/" +
        "IIA Mart" +
        "/" +
        this.props.match.params.category +
        "/" +
        this.props.match.params.subCategory,
      "back"
    );
  }
}
export default ItemDetails;
