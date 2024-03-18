import {
  IonContent,
  IonGrid,
  IonPage,
  IonSearchbar,
  IonList,
  IonItem,
  IonRouterLink,
  IonLabel,
  IonToggle,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React from "react";
import DropDownButton1 from "../../components/DropDownButton1";
import HeaderToolbar from "../../components/HeaderToolbar";
import IIAMartCategorySubCategory from "../../JsonFiles/IIAMart.json";
import { LoginMetadata } from "../../models/LoginMetadata";
import { B2BPage } from "../../constants/MenuConstants";
import "../../styles/B2BBuyer.css";
import { search } from "ionicons/icons";
import { BuyerService } from "../../services/BuyerService";
import Loading from "../../components/Loading";
interface B2BBuyerProps {
  loginMetadata: LoginMetadata;
}
interface B2BBuyerStates {
  category: string;
  subCategory: string;
  searchText: string;
  isShowing: boolean;
  arr: any;
  isChecked: boolean;
  validItems: any;
  isLoading: boolean;
}
class B2BBuyer extends React.Component<B2BBuyerProps, B2BBuyerStates> {
  constructor(props: B2BBuyerProps) {
    super(props);
    this.state = {
      category: "",
      subCategory: "",
      searchText: "",
      isShowing: true,
      arr: Object.keys(IIAMartCategorySubCategory),
      isChecked: false,
      validItems: {},
      isLoading: true,
    };
  }
  componentDidMount() {
    BuyerService.GetValidItemList(this.props.loginMetadata).then((response) => {
      this.setState({ validItems: response, isLoading: false });
    });
  }
  handleInputChange(e) {
    const query = e.target.value;
    this.setState({ searchText: query });
    const arr = new Array<string>();
    requestAnimationFrame(() => {
      Object.keys(IIAMartCategorySubCategory).map((category) => {
        IIAMartCategorySubCategory[category].map((subCategory) => {
          var included = arr.includes(category);
          var isIncludedQuery = category
            .toLowerCase()
            .includes(query.toLowerCase());
          if (
            (isIncludedQuery && !included) ||
            (!isIncludedQuery &&
              subCategory.toLowerCase().includes(query.toLowerCase()) &&
              !included)
          ) {
            arr.push(category);
          }
        });
      });
      this.setState({ arr: arr });
    });
  }

  render() {
    return (
      <IonPage>
        {/* <HeaderToolbar
          showBackButton={false}
          showRefreshButton={false}
          refreshPage={() => {}}
          previousPage={() => {}}
        /> */}
        <IonSegment mode ="md">
          <IonSearchbar
            className="newSearchBar"
            value={this.state.searchText}
            onIonFocus={() => {
              this.setState({ isShowing: false });
            }}
            placeholder="Search"
            onIonInput={(e) => {
              this.handleInputChange(e);
            }}
            animated={true}
            onIonCancel={() => {
              this.setState({ isShowing: true, arr: [] });
            }}
            searchIcon={search}
          ></IonSearchbar>
        </IonSegment>
        <IonSegment mode ="md">
          <IonLabel style={{ marginTop: "9px" }}>
            <strong>Hide categories with zero listings</strong>
          </IonLabel>
          <IonToggle
            checked={this.state.isChecked}
            onIonChange={(e) => {
              this.logOutInformation(e);
            }}
          />
        </IonSegment>

        {this.state.isLoading ? (
          <Loading />
        ) : this.state.isShowing ? (
          <IonContent>
            <IonGrid class="limitContent">
              {Object.keys(IIAMartCategorySubCategory)
                .sort()
                .map((category: any) => {
                  if (category === "") {
                  } else if (this.state.isChecked) {
                    if (
                      Object.keys(this.state.validItems).indexOf(category) != -1
                    ) {
                      return (
                        <DropDownButton1
                          Category={category}
                          isChecked={this.state.isChecked}
                          loginMetadata={this.props.loginMetadata}
                          validSubcategory={this.state.validItems[category]}
                          key={category}
                        />
                      );
                    }
                  } else {
                    return (
                      <DropDownButton1
                        Category={category}
                        isChecked={this.state.isChecked}
                        loginMetadata={this.props.loginMetadata}
                        validSubcategory={this.state.validItems[category]}
                        key={category}
                      />
                    );
                  }
                })}
            </IonGrid>
          </IonContent>
        ) : (
          <IonContent>
            <IonGrid class="limitContent">
              {this.state.arr.sort().map((category: string) => {
                if (this.state.isChecked) {
                  if (
                    Object.keys(this.state.validItems).indexOf(category) != -1
                  ) {
                    return (
                      <DropDownButton1
                        Category={category}
                        isChecked={this.state.isChecked}
                        loginMetadata={this.props.loginMetadata}
                        validSubcategory={this.state.validItems[category]}
                        key={category}
                      />
                    );
                  }
                } else {
                  return (
                    <DropDownButton1
                      Category={category}
                      isChecked={this.state.isChecked}
                      loginMetadata={this.props.loginMetadata}
                      validSubcategory={this.state.validItems[category]}
                      key={category}
                    />
                  );
                }
              })}
            </IonGrid>
          </IonContent>
        )}
      </IonPage>
    );
  }
  logOutInformation(e) {
    this.setState({ isChecked: e.detail.checked });
  }
}
export default B2BBuyer;
