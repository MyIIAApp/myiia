import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import "../../styles/B2BAdmin.css";
import { ban } from "ionicons/icons";
import { AdminListingResponse } from "../../models/B2B/AdminListingResponse";
import Loading from "../../components/Loading";
import { AdminListing } from "../../models/B2B/AdminListing";
import B2BAdminService from "../../services/B2BAdminService";

interface B2BAdminListingProps {
  loginMetadata: LoginMetadata;
}
interface B2BAdminListingStates {
  listings: AdminListingResponse;
  showLoading: boolean;
  alertMessage: string;
  showAlert: boolean;
  itemId: string;
  update: string;
  index: number;
}
class B2BAdminListing extends React.Component<
  B2BAdminListingProps,
  B2BAdminListingStates
> {
  constructor(props: B2BAdminListingProps) {
    super(props);
    this.state = {
      listings: new AdminListingResponse(),
      showLoading: false,
      alertMessage: "",
      showAlert: false,
      itemId: "",
      update: "",
      index: -1,
    };
  }
  componentDidMount() {
    this.getData(false);
  }
  private getData(forceRefresh: boolean) {
    this.setState({ showLoading: false });
    B2BAdminService.GetB2BAdminListings(this.props.loginMetadata, forceRefresh)
      .then((response: AdminListingResponse) => {
        this.setState({ listings: response, showLoading: false });
      })
      .catch((e) => {
        this.setState({ showLoading: false });
        throw e;
      });
  }
  render() {
    return this.state.showLoading ? (
      <Loading />
    ) : (
      <IonGrid class="limitContent listingGrid">
        {this.state.listings.adminListingsList
          .sort(this.cmp)
          .map((listing: AdminListing, ind: number) => {
            return (
              <IonCard class="adminListingCard" key={listing.ItemId}>
                <IonGrid class="ion-no-padding">
                  <IonRow class="adminListingRow">
                    <IonCol size="4">
                      <IonImg
                        src={listing.PhotoPath}
                        class="adminListingimage"
                      ></IonImg>
                    </IonCol>
                    <IonCol offset="1">
                      <IonRow class="">
                        <IonLabel class="itemListName">
                          {listing.ItemName}
                        </IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel class="itemListSellerName">
                          {listing.SellerName}
                        </IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonLabel class="itemListPrice">
                          &#8377;&nbsp;{listing.ItemPrice}
                        </IonLabel>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    {listing.Status == "2" ? (
                      <IonButton
                        class="adminListingUnblockButton"
                        onClick={() => {
                          this.setState({
                            index: ind,
                            showAlert: true,
                            alertMessage:
                              "Do you want to unblock this Listing?",
                            itemId: listing.ItemId,
                            update: "unblock",
                          });
                        }}
                      >
                        <IonIcon src={ban}></IonIcon>&nbsp;Unblock
                      </IonButton>
                    ) : (
                      <IonButton
                        class="adminListingBlockButton"
                        onClick={() => {
                          this.setState({
                            index: ind,
                            showAlert: true,
                            alertMessage: "Do you want to block this Listing?",
                            itemId: listing.ItemId,
                            update: "block",
                          });
                        }}
                      >
                        <IonIcon src={ban}></IonIcon>&nbsp;Block
                      </IonButton>
                    )}
                  </IonRow>
                </IonGrid>
              </IonCard>
            );
          })}
        <IonAlert
          isOpen={this.state.showAlert}
          message={this.state.alertMessage}
          onDidDismiss={() =>
            this.setState({
              showAlert: false,
              alertMessage: "",
              itemId: "",
              update: "",
              index: -1,
            })
          }
          buttons={[
            { text: "Cancel", role: "cancel" },
            {
              text: "Yes",
              handler: () => {
                this.blockUnblock(
                  this.state.update,
                  this.state.itemId,
                  this.state.index
                );
              },
            },
          ]}
        />
      </IonGrid>
    );
  }
  cmp(a: AdminListing, b: AdminListing) {
    if (a.Status < b.Status) return -1;
    else if (a.Status > b.Status) return 1;
    else return 0;
  }
  blockUnblock(update: string, itemId: string, index: number) {
    this.setState({ showLoading: true });
    B2BAdminService.BlockUnblockListing(
      this.props.loginMetadata,
      update,
      itemId
    )
      .then(() => {
        if (update == "block")
          this.state.listings.adminListingsList[index].Status = "2";
        else this.state.listings.adminListingsList[index].Status = "1";
        this.setState({
          showLoading: false,
          showAlert: false,
          update: "",
          alertMessage: "",
          itemId: "",
        });
        this.getData(true);
      })
      .catch((e) => {
        this.setState({
          showLoading: false,
          showAlert: false,
          update: "",
          alertMessage: "",
          itemId: "",
        });
        throw e;
      });
  }
}
export default B2BAdminListing;
