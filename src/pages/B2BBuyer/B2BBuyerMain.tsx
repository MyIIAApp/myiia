import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
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
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LoginMetadata } from "../../models/LoginMetadata";
import "../../styles/B2BAdmin.css";
import B2BBuyer from "./B2BBuyer";
import TopItemsList from "./TopItemsList";
interface B2BBuyerMainProps {
  loginMetadata: LoginMetadata;
}
interface B2BBuyerMainStates {
  currentPage: string;
  showSearchListing: boolean;
  showTopListing: boolean;
  showBackButton: boolean;
}
class B2BBuyerMain extends React.Component<
  B2BBuyerMainProps,
  B2BBuyerMainStates
> {
  constructor(props: B2BBuyerMainProps) {
    super(props);
    this.state = {
      currentPage: "SearchListing",
      showSearchListing: false,
      showTopListing: false,
      showBackButton: false,
    };
  }

  setBackButton(value: boolean) {
    this.setState({ showBackButton: value });
  }
  render() {
    return (
      <IonPage>
        <HeaderToolbar
          showBackButton={this.state.showBackButton}
          showRefreshButton={/*!this.state.showBackButton*/ false}
          previousPage={() => {
            console.log("hhh");
            this.setState({ showBackButton: false });
          }}
          refreshPage={() => {}}
        ></HeaderToolbar>
        <IonContent class="contentClass">
          <IonSegment
            mode="md"
            slot="fixed"
            value={this.state.currentPage}
            class="tabButton"
          >
            {this.state.showBackButton == false ? (
              <>
                <IonSegmentButton
                  value="TopListings"
                  onClick={() => {
                    this.setState({ currentPage: "TopListings" });
                  }}
                >
                  <IonLabel class="adminTabButton">Latest Products</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="SearchListing"
                  defaultChecked={this.state.currentPage == "SearchListing"}
                  onClick={() => {
                    this.setState({ currentPage: "SearchListing" });
                  }}
                >
                  <IonLabel class="adminTabButton">Search Products</IonLabel>
                </IonSegmentButton>
              </>
            ) : null}
          </IonSegment>

          {this.state.currentPage == "SearchListing" ? (
            this.state.showSearchListing ? (
              <Loading />
            ) : (
              <B2BBuyer loginMetadata={this.props.loginMetadata} />
            )
          ) : this.state.currentPage == "TopListings" ? (
            this.state.showTopListing ? (
              <Loading />
            ) : (
              <TopItemsList
                loginMetadata={this.props.loginMetadata}
                setBackButton={(value: boolean) => this.setBackButton(value)}
                showBackButton={this.state.showBackButton}
              />
            )
          ) : null}
        </IonContent>
      </IonPage>
    );
  }
}
export default B2BBuyerMain;
