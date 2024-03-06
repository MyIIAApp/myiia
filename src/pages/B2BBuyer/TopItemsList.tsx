import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { B2BPage } from "../../constants/MenuConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { ItemResponse } from "../../models/B2B/ItemResponse";
import { Item } from "../../models/B2B/Item";
import { RouteComponentProps } from "react-router";
import { BuyerService } from "../../services/BuyerService";
import { pin } from "ionicons/icons";
import TopItemDetails from "./TopItemDetails";

interface TopItemsListProps {
  loginMetadata: LoginMetadata;
  setBackButton: (value: boolean) => void;
  showBackButton: boolean;
}
interface TopItemsListStates {
  currentPage: string;
  showSearchListing: boolean;
  showTopListing: boolean;
  Items: Item[];
  itemNo: number;
}

class TopItemsList extends React.Component<
  TopItemsListProps,
  TopItemsListStates
> {
  constructor(props: TopItemsListProps) {
    super(props);
    this.state = {
      currentPage: "SearchListing",
      showSearchListing: false,
      showTopListing: false,
      Items: [],
      itemNo: 0,
    };
  }
  componentDidMount() {
    BuyerService.GetTopItemList(this.props.loginMetadata)
      .then((response) => {
        this.setState({ Items: response });
        this.state.Items.map((item) => {
          //   console.log(item.Name);
        });
      })
      .catch(() => {});
  }
  showDetailsItem(index) {
    this.props.setBackButton(true);
    this.setState({ itemNo: index });
  }

  render() {
    return !this.props.showBackButton ? (
      <IonContent>
        <IonGrid class="limitContent" style={{ marginTop: "50px" }}>
          {this.state.Items.map((item: Item, index: number) => (
            <IonCard
              key={item.Id}
              class="buyeritemListCard"
              onClick={() => this.showDetailsItem(index)}
            >
              <IonGrid class="ion-no-padding">
                <IonRow>
                  <IonCol size="4">
                    <IonImg
                      className="buyerListingimage"
                      src={item.PhotoPath}
                    ></IonImg>
                  </IonCol>
                  <IonCol offset="1">
                    <IonRow class="">
                      <IonLabel class="itemListName">{item.Name}</IonLabel>
                    </IonRow>
                    <IonRow>
                      <IonLabel class="itemListSellerName">
                        {item.SellerName}
                      </IonLabel>
                    </IonRow>
                    <IonRow>
                      <IonLabel class="itemListPrice">
                        &#8377;&nbsp;{item.Price}
                      </IonLabel>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          ))}
        </IonGrid>
      </IonContent>
    ) : (
      <TopItemDetails
        loginMetadata={this.props.loginMetadata}
        item={this.state.Items[this.state.itemNo]}
      />
    );
  }
}
export default TopItemsList;
