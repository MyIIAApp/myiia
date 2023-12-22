import { Browser } from "@capacitor/browser";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonSegment,
  IonRouterLink,
  IonButton,
  IonInput,
  IonGrid,
  IonCardTitle,
  IonCol,
  IonAlert,
  IonRow,
  IonFooter,
  IonTitle,
  IonDatetime,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonList,
} from "@ionic/react";
//by me
import {
  IonItem,
  IonLabel,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonItemDivider,
} from "@ionic/react";
import React, { useState } from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Payment.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel"; //new
import Loading from "../../components/Loading";
import { ConnectionStatus, Network } from "@capacitor/network";
import OneSignal from "onesignal-cordova-plugin";
import statesData from "../../JsonFiles/IndianStates.json";
import { News } from "../../models/News/News";
import { paymentDetails } from "../../models/paymentDetails";
import PaymentInvoice from "./PaymentInvoice";
import { invoice } from "../../models/invoice";
import NonMemberItemDetailsModel from "../../models/Payment/NonMemberItemDetailsModel";
import "../../styles/NonMemberItemDetails.css";
import ItemsList from "../B2BBuyer/ItemsList";
import { AdminNameService } from "../../services/AdminNameService";

// import { star } from 'ionicons/icons'; //by me

interface NonMemberPaymentsProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}
interface NonMemberPaymentsStates {
  Name: string;
  indianStates: any;
  states: string;
  gstin: string;
  paymentMode: string;
  checkNumber: string;
  chequeDate: string;
  paymentreason: string;
  dashboardObject: paymentDetails;
  PhoneNumber: string;
  showAlert: boolean;
  alertMessage: string;
  showInvoice: boolean;
  addItem: boolean;
  subTotal: string;
  subt: number;
  totalgst: number;
  Address: string;
  showloading: boolean;
  itemList: NonMemberItemDetailsModel[];
  showAlert2: boolean;
  adminSourceGST: string;
  update: number;
}

class NonMemberPayments extends React.Component<
  NonMemberPaymentsProps,
  NonMemberPaymentsStates
> {
  constructor(props: NonMemberPaymentsProps) {
    super(props);
    this.state = {
      showloading: false,
      indianStates: statesData.states,
      Name: "",
      states: "Uttar Pradesh",
      Address: "",
      showAlert: false,
      alertMessage: "Are you Sure? This action is not reversible",
      dashboardObject: new paymentDetails(),
      gstin: "",
      paymentMode: "Cash",
      showInvoice: false,
      addItem: false,
      checkNumber: "",
      chequeDate: "",
      paymentreason: "",
      PhoneNumber: "",
      subTotal: "",
      totalgst: 0,
      subt: 0,
      itemList: [],
      update: 0,
      showAlert2: false,
      adminSourceGST: "",
    };
  }

  protected getData(forceRefresh: boolean) {
    if (this.props.loginMetadata.isAdmin) {
      AdminNameService.GetAdminSourceGST(this.props.loginMetadata).then(
        (res: any) => {
          let name: string = "";
          name = res.name;
          this.setState({ adminSourceGST: name });
        }
      );
    }
    else {
      this.setState({ adminSourceGST: "" });
    }
  }

  SubmitNonmemberPayment() {
    // this.setState({ isLoading: true });
    PaymentService.GetNonMemberInvoiceService(
      this.props.loginMetadata,
      this.state.Name,
      this.state.states,
      this.state.Address,
      this.state.gstin,
      this.state.paymentMode,
      this.state.checkNumber,
      this.state.chequeDate,
      this.state.PhoneNumber,
      this.state.itemList,
      this.state.subt,
      ((this.state.gstin.length == 15 && this.state.gstin != null) && 
      ((this.state.gstin.substring(0, 2) == "09" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.gstin.substring(0, 2) == "05" && this.state.adminSourceGST.substring(0, 2) == "05") || (this.state.gstin.substring(0, 2) == "07" && this.state.adminSourceGST.substring(0, 2) == "07"))) ||
        ((this.state.gstin == "" || this.state.gstin.length < 15) && ((this.state.states == "Uttar Pradesh" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.states == "Delhi (NCT)" && this.state.adminSourceGST.substring(0, 2) == "07") || (this.state.states == "Uttarakhand" && this.state.adminSourceGST.substring(0, 2) == "05")))
        ? this.state.totalgst / 2
        : 0,
        ((this.state.gstin.length == 15 && this.state.gstin != null) && 
        ((this.state.gstin.substring(0, 2) == "09" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.gstin.substring(0, 2) == "05" && this.state.adminSourceGST.substring(0, 2) == "05") || (this.state.gstin.substring(0, 2) == "07" && this.state.adminSourceGST.substring(0, 2) == "07"))) ||
          ((this.state.gstin == "" || this.state.gstin.length < 15) && ((this.state.states == "Uttar Pradesh" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.states == "Delhi (NCT)" && this.state.adminSourceGST.substring(0, 2) == "07") || (this.state.states == "Uttarakhand" && this.state.adminSourceGST.substring(0, 2) == "05")))
        ? this.state.totalgst / 2
        : 0,
        ((this.state.gstin.length == 15 && this.state.gstin != null) && 
        ((this.state.gstin.substring(0, 2) == "09" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.gstin.substring(0, 2) == "05" && this.state.adminSourceGST.substring(0, 2) == "05") || (this.state.gstin.substring(0, 2) == "07" && this.state.adminSourceGST.substring(0, 2) == "07"))) ||
          ((this.state.gstin == "" || this.state.gstin.length < 15) && ((this.state.states == "Uttar Pradesh" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.states == "Delhi (NCT)" && this.state.adminSourceGST.substring(0, 2) == "07") || (this.state.states == "Uttarakhand" && this.state.adminSourceGST.substring(0, 2) == "05")))
        ? 0
        : this.state.totalgst
    )
      .then((resp: any) => {
        if (resp.message != "Invalid Input, Please Try Again") {
          this.setState({
            showloading: false,
            Name: "",
            PhoneNumber: "",
            Address: "",
            gstin: "",
            states: "Uttar Pradesh",
            paymentMode: "Cash",
            checkNumber: "",
            chequeDate: "",
            subt: 0,
            totalgst: 0,
            itemList: [],
          });
        }
        if (resp.message == "Invalid Input, Please Try Again") {
          this.setState({
            showloading: false,
            showAlert2: true,
            alertMessage: "Please Enter Correct Input!",
          });
        } else {
          Browser.open({ url: resp.message });
        }
      })
      .catch(() => {
        this.setState({
          showloading: false,
          showAlert2: true,
          alertMessage: "Please Enter Correct Input!",
        });
      });
  }
  gstRates = ["0%", "5%", "18%"];

  componentDidMount() {
    // console.log(this.props);
    this.getData(true);
  }
  render() {
    if (this.state.showloading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonContent>
            <Loading />
          </IonContent>
        </IonPage>
      );
    } else {
      var temp = new News();
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonAlert
            // cssClass="l"
            // backdropDismiss={}
            isOpen={this.state.showAlert2}
            onDidDismiss={() => this.setState({ showAlert2: false })}
            message={this.state.alertMessage}
          />

          <IonContent>
            <IonGrid className="limitContent">
              <IonSegment mode ="md">
                <IonTitle style={{ marginTop: 10 }}>
                  <strong> Enter Details</strong>
                </IonTitle>
              </IonSegment>

              <IonItem type="reset" class="createinput">
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  value={this.state.Name}
                  required={true}
                  onIonChange={(e: any) =>
                    this.setState({ Name: e.detail.value })
                  }
                ></IonInput>
              </IonItem>

              <IonItem class="createinput">
                <IonLabel
                  position="floating"
                  class="selectDisabled"
                  // color={this.state.PhoneNumber == "" ? "high" : "primary"}
                >
                  PhoneNumber
                </IonLabel>
                <IonInput
                  name="PhoneNumber"
                  value={this.state.PhoneNumber}
                  inputmode="tel"
                  maxlength={10}
                  // required={true}
                  onIonChange={(e: any) =>
                    this.setState({ PhoneNumber: e.detail.value })
                  }
                ></IonInput>
              </IonItem>

              <IonItem class="createinput">
                <IonLabel
                  position="floating"
                  class="selectDisabled"
                  // color={this.state.gstin == "" ? "black" : "primary"}
                >
                  GSTIN*
                </IonLabel>
                <IonInput
                  placeholder="GST"
                  name="gstin"
                  value={this.state.gstin}
                  maxlength={15}
                  required={true}
                  onIonChange={(e: any) =>
                    this.setState({ gstin: e.detail.value })
                  }
                ></IonInput>
              </IonItem>

              <IonItem class="createinput">
                <IonLabel
                  position="floating"
                  class="selectDisabled"
                  color={this.state.states == "" ? "high" : "medium"}
                >
                  State*
                </IonLabel>
                <IonSelect
                  value={this.state.states}
                  name="states"
                  class="selectDisabled"
                  onIonChange={(e) => this.setState({ states: e.detail.value })}
                >
                  {this.state.indianStates.map((state: any) => {
                    return (
                      <IonSelectOption key={state.state} value={state.state}>
                        {state.state}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>

              <IonItem type="reset" class="createinput">
                <IonLabel position="floating">Address</IonLabel>
                <IonInput
                  spellCheck={true}
                  required={true}
                  value={this.state.Address}
                  onIonChange={(e: any) =>
                    this.setState({ Address: e.detail.value })
                  }
                ></IonInput>
              </IonItem>

              <IonItem class="createinput">
                <IonLabel position="floating" color="primary">
                  Payment Mode
                </IonLabel>

                <IonSelect
                  name="Payment"
                  value={this.state.paymentMode}
                  onIonChange={(e) => (
                    this.setState({ paymentMode: e.detail.value }),
                    e.detail.value === "Cash" ? (
                      this.setState({ checkNumber: "" })
                    ) : (
                      <span className="y">""</span>
                    )
                  )}
                >
                  <IonSelectOption value="Cash">Cash</IonSelectOption>
                  <IonSelectOption value="Cheque">Cheque/DD</IonSelectOption>
                  <IonSelectOption value="NEFT">NEFT/UTR</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem
                hidden={this.state.paymentMode === "Cash" ? true : false}
                className="createinput"
              >
                <IonInput
                  hidden={this.state.paymentMode === "Cash" ? true : false}
                  disabled={this.state.paymentMode === "Cash" ? true : false}
                  type="text"
                  clearInput={true}
                  className="ion-padding selectClass"
                  value={this.state.checkNumber}
                  placeholder={
                    this.state.paymentMode === "Cheque"
                      ? "Cheque/DD Number*"
                      : "NEFT/UTR Number*"
                  }
                  required={true}
                  onIonChange={(e) => this.onChecknumberInput(e)}
                ></IonInput>
              </IonItem>

              <IonItem
                hidden={this.state.paymentMode === "Cash" ? true : false}
                className="createinput"
              >
                <IonDatetime
                  placeholder={
                    this.state.paymentMode === "Cheque"
                      ? "Enter Cheque Date"
                      : "Enter NEFT Date"
                  }
                  style={{ color: "black" }}
                  value={this.state.chequeDate}
                  onIonChange={(e: any) =>
                    this.setState({ chequeDate: e.target.value })
                  }
                ></IonDatetime>
              </IonItem>
            </IonGrid>

            <IonSegment mode ="md">
              <IonGrid className="limitContent">
                <IonRow>
                  <IonCol>
                    {" "}
                    <IonTitle
                      className="nonmemberdetails ParticularTitle"
                      style={{ marginTop: 16 }}
                    >
                      {" "}
                      <strong>Particulars</strong>
                    </IonTitle>
                  </IonCol>
                  <IonCol className="ion-text-end-start">
                    <IonButton
                      type="button"
                      onClick={this.handleAddNewItemList}
                      className="small"
                    >
                      Add item
                    </IonButton>
                  </IonCol>
                </IonRow>
                {this.state.itemList.map(
                  (item: NonMemberItemDetailsModel, idx: number) => (
                    <IonRow key={idx}>
                      <IonLabel class="ion-text-start-new">
                        Item {idx + 1}
                      </IonLabel>
                      <IonButton
                        class="new-button-delete"
                        onClick={this.handleRemoveItemList(idx)}
                      >
                        Remove
                      </IonButton>

                      <IonSegment mode ="md">
                        <IonItem type="reset" class="newcreateinput">
                          <IonLabel position="floating">Particulars</IonLabel>
                          <IonInput
                            value={item.ItemName}
                            required={true}
                            onIonChange={(e: any) => {
                              item.ItemName = e.detail.value;
                              this.setState({
                                update: this.state.update + 1,
                              });
                            }}
                          ></IonInput>
                        </IonItem>
                        <IonItem type="reset" class="newcreateinput">
                          <IonLabel position="floating">SAC</IonLabel>
                          <IonInput
                            value={item.SAC}
                            required={true}
                            onIonChange={(e: any) => {
                              item.SAC = e.detail.value;
                            }}
                          ></IonInput>
                        </IonItem>
                      </IonSegment>
                      <IonSegment mode ="md">
                        <IonItem type="reset" class="newcreateinput">
                          <IonLabel position="floating">Quantity</IonLabel>
                          <IonInput
                            value={item.Quantity}
                            required={true}
                            onIonChange={(e: any) => {
                              item.Quantity = e.detail.value;
                              this.setState({
                                subt: this.calculateTotal(),
                                totalgst: this.calculateTotalGst(),
                              });
                            }}
                          ></IonInput>
                        </IonItem>
                        <IonItem type="reset" class="newcreateinput">
                          <IonLabel position="floating">Unit Price</IonLabel>
                          <IonInput
                            value={item.UnitPrice}
                            required={true}
                            onIonChange={(e: any) => {
                              item.UnitPrice = e.detail.value;
                              this.setState({
                                subt: this.calculateTotal(),
                                totalgst: this.calculateTotalGst(),
                              });
                            }}
                          ></IonInput>
                        </IonItem>
                      </IonSegment>
                      <IonItem
                        class="createinput gstcreateinput"
                        style={{ width: "100%" }}
                      >
                        <IonLabel position="floating">GST Rate*</IonLabel>
                        <IonSelect
                          value={item.GSTRate}
                          name="gst"
                          class="selectDisabled"
                          onIonChange={(e: any) => {
                            item.GSTRate = e.detail.value;
                            this.setState({
                              totalgst: this.calculateTotalGst(),
                            });
                          }}
                        >
                          {this.gstRates.map((state: any) => {
                            return (
                              <IonSelectOption key={state} value={state}>
                                {state}
                              </IonSelectOption>
                            );
                          })}
                        </IonSelect>
                      </IonItem>
                    </IonRow>
                  )
                )}
              </IonGrid>
            </IonSegment>
            <IonGrid class="limitContent">
              <IonRow>
                <IonCol size="8" class="ion-text-start">
                  Sub Total
                </IonCol>
                <IonCol size="4" class="ion-text-end">
                  {this.state.subt}
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="8" class="ion-text-start">
                  CGST
                </IonCol>
                <IonCol size="4" class="ion-text-end">
                  {((this.state.gstin.length == 15 && this.state.gstin != null) && 
      ((this.state.gstin.substring(0, 2) == "09" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.gstin.substring(0, 2) == "05" && this.state.adminSourceGST.substring(0, 2) == "05") || (this.state.gstin.substring(0, 2) == "07" && this.state.adminSourceGST.substring(0, 2) == "07"))) ||
        ((this.state.gstin == "" || this.state.gstin.length < 15) && ((this.state.states == "Uttar Pradesh" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.states == "Delhi (NCT)" && this.state.adminSourceGST.substring(0, 2) == "07") || (this.state.states == "Uttarakhand" && this.state.adminSourceGST.substring(0, 2) == "05")))
                    ? (this.state.totalgst / 2).toFixed(2)
                    : 0}
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="8" class="ion-text-start">
                  SGST
                </IonCol>
                <IonCol size="4" class="ion-text-end">
                  {((this.state.gstin.length == 15 && this.state.gstin != null) && 
      ((this.state.gstin.substring(0, 2) == "09" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.gstin.substring(0, 2) == "05" && this.state.adminSourceGST.substring(0, 2) == "05") || (this.state.gstin.substring(0, 2) == "07" && this.state.adminSourceGST.substring(0, 2) == "07"))) ||
        ((this.state.gstin == "" || this.state.gstin.length < 15) && ((this.state.states == "Uttar Pradesh" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.states == "Delhi (NCT)" && this.state.adminSourceGST.substring(0, 2) == "07") || (this.state.states == "Uttarakhand" && this.state.adminSourceGST.substring(0, 2) == "05")))
                    ? (this.state.totalgst / 2).toFixed(2)
                    : 0}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="8" class="ion-text-start">
                  IGST
                </IonCol>
                <IonCol size="4" class="ion-text-end">
                  {((this.state.gstin.length == 15 && this.state.gstin != null) && 
      ((this.state.gstin.substring(0, 2) == "09" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.gstin.substring(0, 2) == "05" && this.state.adminSourceGST.substring(0, 2) == "05") || (this.state.gstin.substring(0, 2) == "07" && this.state.adminSourceGST.substring(0, 2) == "07"))) ||
        ((this.state.gstin == "" || this.state.gstin.length < 15) && ((this.state.states == "Uttar Pradesh" && this.state.adminSourceGST.substring(0, 2) == "09") || (this.state.states == "Delhi (NCT)" && this.state.adminSourceGST.substring(0, 2) == "07") || (this.state.states == "Uttarakhand" && this.state.adminSourceGST.substring(0, 2) == "05")))
                    ? 0
                    : this.state.totalgst.toFixed(2)}
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="8" class="ion-text-start">
                  Full Amount
                </IonCol>
                <IonCol size="4" class="ion-text-end">
                  {Math.round(this.state.subt + this.state.totalgst)}
                </IonCol>
              </IonRow>

              <IonSegment mode ="md">
                <IonButton
                  className="submitButton"
                  type="submit"
                  disabled={
                    ((this.state.paymentMode == "Cheque" ||
                      this.state.paymentMode == "NEFT") &&
                      (this.state.checkNumber == "" ||
                        this.state.chequeDate == "")) ||
                    this.state.Name == "" ||
                    this.state.Address == "" || this.checkDisabled()
                  }
                  onClick={() =>
                    this.setState({
                      showAlert: true,
                      alertMessage:
                        "Are you Sure? This action is not reversible",
                    })
                  }
                >
                  Submit
                </IonButton>
              </IonSegment>
              <IonAlert
                cssClass="limitContent backdrop"
                backdropDismiss={false}
                isOpen={this.state.showAlert}
                onDidDismiss={() => this.setState({ showAlert: false })}
                header={this.state.alertMessage}
                buttons={[
                  { text: "Cancel", role: "cancel" },
                  {
                    text: "Yes",
                    handler: (e) => {
                      this.setState({
                        showAlert: false,
                        showInvoice: true,
                        showloading: true,
                      });
                      this.SubmitNonmemberPayment();
                    },
                  },
                ]}
              />
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    }
  }
  checkDisabled(): boolean{
  let check = false;
    this.state.itemList.map((item)=>{
       if(item.GSTRate==="" || item.ItemName==="" || item.Quantity===""||item.SAC===""||item.UnitPrice===""){
         check =true;
       }
    });
      if( this.state.itemList.length==0){
         check=true;
      }
    return check;
   }
  
  calculateTotalGst = () => {
    let total = 0.0;
    let temptotal = 0.0;
    this.state.itemList.forEach((item) => {
      temptotal =
        parseInt(item.Quantity) *
        parseInt(item.UnitPrice) *
        parseInt(item.GSTRate.substring(0, item.GSTRate.length - 1)) *
        0.01;
      console.log(item.GSTRate.substring(0, item.GSTRate.length - 1));
      total += temptotal;
    });
    console.log(total);
    return total;
  };

  calculateTotal = () => {
    let total = 0.0;
    this.state.itemList.forEach((item) => {
      total += parseInt(item.Quantity) * parseInt(item.UnitPrice);
    });
    // console.log(total);
    return total;
  };
  handleAddNewItemList = () => {
    console.log(this.state.itemList);
    this.state.itemList.push(new NonMemberItemDetailsModel());
    this.setState({ update: this.state.update + 1 });
  };

  handleRemoveItemList = (idx) => () => {
    this.state.itemList.splice(idx, 1);
    this.setState({
      update: this.state.update - 1,
      subt: this.calculateTotal(),
      totalgst: this.calculateTotalGst(),
    });
    console.log(this.state.itemList);
  };
  onChecknumberInput(event: any) {
    // console.log(event.target.value);
    this.setState({ checkNumber: event.target.value });
  }
}

export default NonMemberPayments;
