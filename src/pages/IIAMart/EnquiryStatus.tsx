import {
  IonContent,
  IonPage,
  IonSegment,
  IonGrid,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonRow,
  IonCol,
  IonImg,
  IonToggle,
  IonButton,
  useIonToast,
  IonList,
  IonPopover,
  IonAlert
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route } from "react-router";
import HeaderToolbar from "../../components/HeaderToolbar";
import List from "./List";
import Delete from "../../images/Delete.svg";
import Edit from "../../images/Edit.svg";
import "../../styles/IIAMart.css";
import { IIAMartEnquiryService } from "../../services/IIAMartEnquiryService";
import PendingEnquiry from "./PendingEnquiries";
import { LoginMetadata } from "../../models/LoginMetadata";
import { details } from "../../models/IIAMart/details";
import { items } from "../../models/IIAMart/items";
import { itemlistresponse } from "../../models/IIAMart/itemlistresponse";
import { detailsresponse } from "../../models/IIAMart/detailsresponse";
import { StorageService } from "../../services/StorageService";
import {
  GetEnquiryStatus,
  GetEnquiryStatusExpiry,
  GetItemsStatus,
} from "../../constants/StorageConstants";
import CreateNewProduct from "./CreateNewProduct";
import { B2BSellerPage, MembershipPage } from "../../constants/MenuConstants";
import Loading from "../../components/Loading";
import { toastController } from "@ionic/core";
import Nonmemberdisplay from "../../images/Nonmemberdisplay.svg";
import { thumbsDownSharp } from "ionicons/icons";

interface EnquiryStates {
  subPage: number;
  enquiryList: details[];
  heading: string;
  product: any;
  status: string;
  index: number;
  itemList: items[];
  items: items;
  delete: number;
  listPage: string;
  index1: number;
  editOrNew: boolean;
  loading: boolean;
  showPop: boolean;
  showAlert2:boolean;
}
interface EnquiryProps {
  loginMetadata: LoginMetadata;
  changePage: (value: string) => void;
}

class EnquiryStatus extends React.Component<EnquiryProps, EnquiryStates> {
  constructor(props: EnquiryProps) {
    super(props);
    this.state = {
      subPage: 0,
      enquiryList: [],
      heading: "Pending",
      product: {},
      status: "",
      index: 0,
      itemList: [],
      items: new items(),
      delete: 0,
      listPage: "",
      index1: 0,
      editOrNew: false,
      loading: false,
      showPop: false,
      showAlert2:false,
    };
  }
  componentDidMount() {
    if (this.props.loginMetadata.membershipStatus > 4) {
      this.getdata(true);
      this.getSellerItemDetails(true);
    } else {
      this.setState({ showPop: true });
    }
  }

  checkPaymentStatus(){
    if(this.props.loginMetadata.membershipStatus<5){

    }
  }
  render() {
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {
            this.getdata(true);
            this.getSellerItemDetails(true);
          }}
          previousPage={() => this.returnToHomePage()}
          showBackButton={this.state.subPage == 0 ? false : true}
          showRefreshButton={true}
        />

        <IonReactRouter>
          <IonTabs className="buyerTabBar">
            <IonRouterOutlet>
              <Route path={"/" + B2BSellerPage.Page}>
                {this.state.subPage == 0 ? (
                  this.state.loading ? (
                    <Loading />
                  ) : (
                    <IonGrid className="limitContent">
                      <IonCard
                        class="statuscard"
                        onClick={() => this.getEnquiryList("Pending", "0")}
                      >
                        <IonCardContent>
                          <IonItem detail lines="none">
                            <IonLabel class="statuslabel ion-text-wrap">
                              Pending Enquiries
                            </IonLabel>
                            <IonBadge slot="end" class="badge">
                              {
                                this.state.enquiryList.filter(
                                  (product: details) => {
                                    return product.EnquiryStatus == "0";
                                  }
                                ).length
                              }
                            </IonBadge>
                          </IonItem>
                        </IonCardContent>
                      </IonCard>
                      <IonCard
                        class="statuscard"
                        onClick={() => this.getEnquiryList("Resolved", "1")}
                      >
                        <IonCardContent>
                          <IonItem detail lines="none">
                            <IonLabel class="statuslabel ion-text-wrap">
                              Resolved Enquiries
                            </IonLabel>
                            <IonBadge slot="end" class="badge">
                              {
                                this.state.enquiryList.filter(
                                  (product: details) => {
                                    return product.EnquiryStatus == "1";
                                  }
                                ).length
                              }
                            </IonBadge>
                          </IonItem>
                        </IonCardContent>
                      </IonCard>
                    </IonGrid>
                  )
                ) : this.state.subPage == 1 ? (
                  <List
                    enquiryList={this.state.enquiryList}
                    heading={this.state.heading}
                    setProduct={(product, index) =>
                      this.setProduct(product, index)
                    }
                    status={this.state.status}
                    index={this.state.index}
                  />
                ) : this.state.subPage == 2 ? (
                  <PendingEnquiry
                    product={this.state.product}
                    index={this.state.index}
                    changeStatus={(index) => this.changeStatus(index)}
                  />
                ) : null}
              </Route>

              <Route path="/manageListing">
                {this.state.subPage == 0 ? (
                  this.state.loading ? (
                    <Loading />
                  ) : (
                    <IonContent>
                      <IonGrid className="limitContent">
                        <IonButton
                          class="createlistbtn ion-text-wrap"
                          onClick={() => {
                            this.setState({ editOrNew: false });
                            this.createProduct();
                          }}
                        >
                          + Create new Listings
                        </IonButton>
                        {this.state.itemList
                          .reverse()
                          .map((seller: items, index1: number) => {
                            return seller.Name != "" ? (
                              <IonCard
                                key={seller.Id}
                                className="sellerItemCard"
                              >
                                <IonGrid class="ion-no-padding">
                                  <IonRow>
                                    <IonCol size="4" className="ion-no-padding">
                                      <IonImg
                                        className="itemimg"
                                        src={seller.PhotoPath}
                                      />
                                    </IonCol>
                                    <IonCol offset="1">
                                      <IonRow class="toggle">
                                        <div className="activate">
                                          <IonLabel className="activatebtn">
                                            Activate
                                          </IonLabel>
                                          <IonToggle
                                            color="success"
                                            slot="start"
                                            checked={seller.Activation == "1"}
                                            onClick={() => {
                                              this.state.itemList[
                                                index1
                                              ].Activation =
                                                seller.Activation == "0"
                                                  ? "1"
                                                  : "0";
                                              let response =
                                                new itemlistresponse();
                                              response.itemList =
                                                this.state.itemList;

                                              StorageService.Set(
                                                GetItemsStatus,
                                                response,
                                                GetEnquiryStatusExpiry
                                              ).then();
                                              IIAMartEnquiryService.DeleteOrActivateSellerItemDetails(
                                                this.props.loginMetadata,
                                                true,
                                                seller.Id,
                                                seller.Activation
                                              ).then();
                                            }}
                                          ></IonToggle>
                                        </div>
                                      </IonRow>
                                      <IonRow>
                                        <IonLabel class="itemListName">
                                          {seller.Name}
                                        </IonLabel>
                                      </IonRow>
                                      <IonRow class="space">
                                        <IonCol size="5">
                                          <IonSegment mode ="md" class="itembtn">
                                            <IonLabel class="itemListCategory">
                                              &nbsp;&nbsp;
                                              {seller.Category}
                                              &nbsp;&nbsp;
                                            </IonLabel>
                                          </IonSegment>
                                        </IonCol>
                                        <IonCol offset="1" size="5">
                                          <IonSegment mode ="md" class="itembtn">
                                            <IonLabel class="itemListCategory">
                                              &nbsp;&nbsp;
                                              {seller.SubCategory}
                                              &nbsp;&nbsp;
                                            </IonLabel>
                                          </IonSegment>
                                        </IonCol>
                                      </IonRow>
                                      <IonRow class="space1">
                                        <IonLabel class="itemListPrice">
                                          Price :&nbsp;&#8377;{seller.Price}
                                        </IonLabel>
                                      </IonRow>
                                      <IonRow class="listbtns">
                                        <IonCol size="6">
                                          <button className="listbtn">
                                            <IonImg
                                              src={Delete}
                                              onClick={() => {
                                                IIAMartEnquiryService.DeleteOrActivateSellerItemDetails(
                                                  this.props.loginMetadata,
                                                  false,
                                                  seller.Id,
                                                  "0"
                                                ).then(async () => {
                                                  this.getSellerItemDetails(
                                                    true
                                                  );
                                                  const toast =
                                                    await toastController.create(
                                                      {
                                                        color: "dark",
                                                        duration: 2000,
                                                        message:
                                                          "Deleted Successfully",
                                                      }
                                                    );

                                                  await toast.present();
                                                });
                                              }}
                                            ></IonImg>
                                          </button>
                                        </IonCol>
                                        <IonCol size="6">
                                          <button className="listbtn">
                                            <IonImg
                                              src={Edit}
                                              onClick={() => {
                                                this.setState({
                                                  editOrNew: true,
                                                });
                                                this.editProduct(seller);
                                              }}
                                            ></IonImg>
                                          </button>
                                        </IonCol>
                                      </IonRow>
                                    </IonCol>
                                  </IonRow>
                                </IonGrid>
                              </IonCard>
                            ) : null;
                          })}
                      </IonGrid>
                    </IonContent>
                  )
                ) : (
                  <CreateNewProduct
                    loginMetadata={this.props.loginMetadata}
                    items={this.state.items}
                    heading={this.state.listPage}
                    editItemDetails={(list) =>
                      this.editItemDetails(list, this.state.editOrNew)
                    }
                    editCheck = {this.state.editOrNew}
                    returnToHomePage={() => this.returnToHomePage()}
                  />
                )}
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="top">
              <IonTabButton tab="tab1" href={"/" + B2BSellerPage.Page}>
                <IonSegment mode ="md"
                  class="tabsegment"
                  onClick={() => {
                    this.returnToHomePage();
                  }}
                >
                  <IonLabel class="ion-text-wrap">Manage Enquiries</IonLabel>
                </IonSegment>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/manageListing">
                <IonSegment mode ="md"
                  class="tabsegment"
                  onClick={() => {
                    this.toListPage();
                  }}
                >
                  <IonLabel class="ion-text-wrap">Manage Listings</IonLabel>
                </IonSegment>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
        <IonPopover
          isOpen={this.state.showPop}
          backdropDismiss={false}
          onDidDismiss={() => this.setState({ showPop: false })}
        >
          <IonContent>
            <IonList>
              <IonItem lines="none" class="createpop1">
                <IonSegment mode ="md">
                  <IonImg src={Nonmemberdisplay} />
                </IonSegment>
              </IonItem>
              <IonItem lines="none" class="createpop2">
                <IonSegment mode ="md">
                  This feature is currently available only for members. For
                  generic query, please contact iia@iiaonline.in or call at
                  8601855540/45
                </IonSegment>
              </IonItem>
              <IonItem lines="none">
                <IonSegment mode ="md">
                  <IonButton
                    class="createpop3"
                    onClick={() => this.becomeMember()}
                  >
                    Become Member Now!
                  </IonButton>
                </IonSegment>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
        <IonAlert
            isOpen={this.state.showAlert2}
            onDidDismiss={() => this.setState({ showAlert2: false })}
            message='New enquery received on product list(pay membership to view details)'
          />
      </IonPage>
    );
  }
  becomeMember() {
    this.props.changePage(MembershipPage.Page);
  }
  returnToHomePage() {
    let prevsubPage = this.state.subPage - 1;
    if (prevsubPage > 0) {
      this.setState({ subPage: prevsubPage });
    } else {
      this.setState({ subPage: 0 });
    }
  }
  toListPage() {
    this.setState({ subPage: 0 });
  }
  getdata(forceRefresh: boolean) {
    this.setState({ loading: true });
    IIAMartEnquiryService.GetEnquiry(this.props.loginMetadata, forceRefresh)
      .then((response: detailsresponse) => {
        this.setState({ enquiryList: response.detail });
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }
  getEnquiryList(heading: string, status: string) {
    if(heading=='Pending' && this.props.loginMetadata.membershipStatus !=5){
      this.setState({showAlert2:true})
      return;
    }
    this.setState({
      subPage: 1,

      heading: heading,
      status: status,
    });
  }
  setProduct(product: details, index: number) {
    this.setState({
      subPage: 2,
      product: product,
      index: index,
    });
  }
  getSellerItemDetails(forceRefresh: boolean) {
    this.setState({ loading: true });
    IIAMartEnquiryService.GetSellerItemDetails(
      this.props.loginMetadata,
      forceRefresh
    ).then((response: any) => {
      this.setState({ itemList: response.itemList });
      this.setState({ loading: false });
    });
  }
  changeStatus(index: number) {
    this.state.enquiryList[index].EnquiryStatus = "1";
    let response = new detailsresponse();
    response.detail = this.state.enquiryList;
    StorageService.Set(GetEnquiryStatus, response, GetEnquiryStatusExpiry);
    IIAMartEnquiryService.UpdateEnquiryDetailsBySeller(
      this.props.loginMetadata,
      this.state.enquiryList[index].EnquiryId
    );
  }
  createProduct() {
    this.setState({
      subPage: 1,
      listPage: "Create New Listing",
      items: new items(),
    });
  }
  editProduct(seller: items) {
    this.setState({
      subPage: 1,
      listPage: "Edit Listing",
      items: seller,
    });
  }
  editItemDetails(seller: items, editOrNew: boolean) {
    IIAMartEnquiryService.EditOrCreateItem(
      this.props.loginMetadata,
      editOrNew ? seller.Id : "0",
      seller.Name,
      seller.ItemDescription,
      seller.Category,
      seller.SubCategory,
      seller.Price,
      seller.PhotoPath,
      editOrNew
    ).then(async () => {
      this.getSellerItemDetails(true);
      const toast = await toastController.create({
        color: "dark",
        duration: 2000,
        translucent: true,
        message: editOrNew
          ? "Edited Successfully"
          : "Created New Item Successfully",
      });

      await toast.present();
    });
  }
}

export default EnquiryStatus;
