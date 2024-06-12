import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  NavContext,
  IonSlides,
  IonSlide,
  IonSpinner
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/B2BBuyer.css";
import "./Imag.css";
import Loading from "../../components/Loading";
import { Item } from "../../models/B2B/Item";
import { LoginMetadata } from "../../models/LoginMetadata";
import { BuyerService } from "../../services/BuyerService";
import { ItemResponse } from "../../models/B2B/ItemResponse";
import { RouteComponentProps } from "react-router";
import { B2BPage } from "../../constants/MenuConstants";
interface ItemsListStates {
  Items: Item[];
  showLoading: boolean;
  index: number;
  martcateAds:any[];
}
interface ItemsListProps
  extends RouteComponentProps<{
    page: string;
    category: string;
    subCategory: string;
  }> {
  loginMetadata: LoginMetadata;
}
const slideOpts = {
  autoplay: true,
  loop: true,
  initialSlide: 0,
  speed: 2000,
  grabCursor: true,
};
class ItemsList extends React.Component<ItemsListProps, ItemsListStates> {
  static contextType = NavContext;
  constructor(props: ItemsListProps) {
    super(props);
    this.state = {
      Items: [],
      showLoading: false,
      index: 0,
      martcateAds:[]
    };
  }
  async getAdsMart(cat,scat){
    let data = {
      cat,
      scat
    }
    const response  = await fetch(`https://iiaonline.in/IIAMartCategory/getMartCatAdsUser.php`,{
      method:'POST',
      body:JSON.stringify(data)
    });
    const result = await response.json();
    this.setState({martcateAds:result});
  }

  componentDidMount() {
    this.getData(false);
    this.getAdsMart(this.props.match.params.category,this.props.match.params.subCategory);
    
  }
  private getData(forceRefresh: boolean) {
    this.setState({ showLoading: true });
    BuyerService.GetItemsList(
      this.props.loginMetadata,
      forceRefresh,
      this.props.match.params.category,
      this.props.match.params.subCategory
    )
      .then((ItemResponse: ItemResponse) => {
        this.setState({ showLoading: false, Items: ItemResponse.itemListing });
      })
      .catch(() => {
        this.setState({ showLoading: false });
      });
  }
  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {
            this.getData(true);
          }}
          previousPage={() => {
            this.redirect();
          }}
          showBackButton={true}
          showRefreshButton={true}
        />
        <IonContent>
          

          <IonGrid class="limitContent">
          {
              (this.state.martcateAds.length>0) ?  <IonSegment mode ="md" className="myiiaImgseg">
              <IonSlides
                className="myiiaSlider"
                options={slideOpts}
                pager={true}
              >
                {this.state.martcateAds.map((item: any) => {
                  return (
                    <IonSlide key={item.id}>
                      <IonImg
                        style={{objectFit:'contain !important'}}
                        className="myiiaImage"
                        src={
                          item.adsImage
                        }
                      />
                    </IonSlide>
                  );
                })}
              </IonSlides>
              </IonSegment>: null 
            }

            {this.state.showLoading ? (
              <Loading />
            ) : this.state.Items.length != 0 ? (
              this.state.Items.map((item: Item, index: number) => (
                <IonCard
                  key={item.Id}
                  class="buyeritemListCard"
                  routerLink={
                    "/" +
                    B2BPage.Page +
                    "/" +
                    this.props.match.params.category +
                    "/" +
                    this.props.match.params.subCategory +
                    "/" +
                    index
                  }
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
              ))
            ) : (
              <IonGrid class="limitContent noItems">
                <IonSegment mode="md">Sorry No Items to display</IonSegment>
              </IonGrid>
            )}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  redirect() {
    this.context.navigate("/" + "IIA Mart", "back");
  }
}
export default ItemsList;
