import {
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import { B2BPage } from "../../constants/MenuConstants";
import IIAMartCategorySubCategory from "../../JsonFiles/IIAMart.json";
import { LoginMetadata } from "../../models/LoginMetadata";
import "../../styles/B2BBuyer.css";
interface B2BBuyerFirstPageProps {
  loginMetadata: LoginMetadata;
}
interface B2BBuyerFirstPageStates {
  category: string;
  subCategory: string;
}
class B2BBuyerFirstPage extends React.Component<
  B2BBuyerFirstPageProps,
  B2BBuyerFirstPageStates
> {
  constructor(props: B2BBuyerFirstPageProps) {
    super(props);
    this.state = {
      category: "",
      subCategory: "",
    };
  }
  render() {
    return (
      <IonPage>
        <HeaderToolbar
          showBackButton={false}
          showRefreshButton={false}
          refreshPage={() => {}}
          previousPage={() => {}}
        />
        <IonContent>
          <IonGrid class="limitContent">
            {Object.keys(IIAMartCategorySubCategory)
              .sort()
              .map((Category: string) => {
                return (
                  <IonGrid key={Category} class="CategorySubCategoryGrid">
                    <IonLabel class="firstPageCategoryName">
                      {Category}
                    </IonLabel>
                    <IonRow class="firstPageCategory">
                      {IIAMartCategorySubCategory[Category].sort().map(
                        (SubCategory: string) => {
                          return (
                            <IonCol
                              key={SubCategory}
                              offset="0.4"
                              size="3"
                              class="firstPageSubcategory"
                            >
                              <IonRouterLink
                                class="firstPageSubcategoryName"
                                color="dark"
                                routerLink={
                                  "/" +
                                  B2BPage.Page +
                                  "/" +
                                  Category +
                                  "/" +
                                  SubCategory
                                }
                              >
                                {SubCategory}
                              </IonRouterLink>
                            </IonCol>
                          );
                        }
                      )}
                    </IonRow>
                  </IonGrid>
                );
              })}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
}
export default B2BBuyerFirstPage;
