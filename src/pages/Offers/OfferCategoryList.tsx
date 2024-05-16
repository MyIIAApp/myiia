import {
  IonAlert,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonSegment,
} from "@ionic/react";
import React from "react";
import OfferList from "./OfferList";
import { LoginMetadata } from "../../models/LoginMetadata";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Elements.css";
import offercat1 from "../../images/offercat1.svg";
import offercat2 from "../../images/offercat2.svg";
import offercat3 from "../../images/offercat3.svg";
import offercat4 from "../../images/offercat4.svg";
import offercat5 from "../../images/offercat5.svg";
import offercat6 from "../../images/offercat6.svg";
import offercat7 from "../../images/offercat7.svg";
import offercat8 from "../../images/offercat8.svg";
import offercat9 from "../../images/offercat9.svg";
import { OfferView } from "../../OfferConstants";
import { Offer } from "../../models/Offers/Offer";

interface OfferCategoryListStates {
  offerList: Offer[];
  promoteClick: boolean;
  currentview: OfferView;
  category: string;
  searialNo:number;
}

interface OfferCategoryListProps {
  loginMetadata: LoginMetadata;
}

class OfferCategoryList extends React.Component<
  OfferCategoryListProps,
  OfferCategoryListStates
> {
  constructor(props: OfferCategoryListProps) {
    super(props);
    this.state = {
      offerList: [],
      promoteClick: false,
      currentview: OfferView.OfferCategoryList,
      category: "",
      searialNo:0,
    };
  }

  render() {
    if (this.state.currentview === OfferView.OfferCategoryList) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <IonGrid className="limitContent">
              <IonSegment mode ="md">
                <IonButton
                  className="promotebutton"
                  onClick={(e) => this.onPromoteClicked()}
                >
                  Promote Your Business
                </IonButton>
                <IonAlert
                  isOpen={this.state.promoteClick}
                  message="Partner with IIA to give exclusive offers to IIA members and grow 
              your business. For more details, you can contact 
              us at iia@iiaonline.in or call at 8601855540/45"
                  onDidDismiss={() => this.setState({ promoteClick: false })}
                  buttons={[{ text: "Close", role: "cancel" }]}
                />
              </IonSegment>
              <IonGrid class="offercat">
                <IonRow>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) =>
                        this.onCateogryClicked("IT Solution & Electronics",1)
                      }
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat1} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">IT Solution & Electronics</IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) => this.onCateogryClicked("Healthcare",3)}
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat2} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">HealthCare</IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) =>
                        this.onCateogryClicked("Health Insurance",4)
                      }
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat3} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">Health Insurance</IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) =>
                        this.onCateogryClicked("Hotels and Restaurants",5)
                      }
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat4} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">Hotels and Restaurants</IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) => this.onCateogryClicked("Automobiles",7)}
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat5} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">Automobiles</IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) =>
                        this.onCateogryClicked(
                          "Steel Pallet & Material Handling",11
                        )
                      }
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat6} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">
                          Steel Pallet & Material Handling
                        </IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) =>
                        this.onCateogryClicked("Utensils & Kitchen Items",10)
                      }
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat7} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">Utensils & Kitchen Items</IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                  <IonCol>
                    <IonCard
                      class="offercard"
                      onClick={(e) =>
                        this.onCateogryClicked("COVID-19 Related Items",14)
                      }
                    >
                      <IonRow>
                        <IonSegment mode ="md">
                          <IonImg src={offercat8} class="offercatphoto" />
                        </IonSegment>
                      </IonRow>
                      <IonRow class="offercattext">
                        <IonSegment mode ="md">COVID-19 Related Items</IonSegment>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCard
                    class="offercardother"
                    onClick={(e) => this.onCateogryClicked("",20)}
                  >
                    <IonSegment mode ="md">
                      <IonImg src={offercat9} class="offercardothertext" />
                    </IonSegment>
                  </IonCard>
                </IonRow>
              </IonGrid>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    }
    if (this.state.currentview === OfferView.OfferList) {
      return this.getOfferList();
    }
  }

  private onPromoteClicked() {
    this.setState({ promoteClick: true });
  }

  private onBackClick() {
    this.setState({ currentview: OfferView.OfferCategoryList });
  }

  private onCateogryClicked(category: string,searialNo1:number) {
    this.setState({ category: category, currentview: OfferView.OfferList,searialNo:searialNo1 });
  }

  private getOfferList() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {}}
          previousPage={() => this.onBackClick()}
          showBackButton={true}
          showRefreshButton={false}
        />
        <IonContent>
          <OfferList
            loginMetadata={this.props.loginMetadata}
            category={this.state.category}
            searialNo={this.state.searialNo}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default OfferCategoryList;
