import { Browser } from "@capacitor/browser";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonButton,
  IonAlert,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { Component } from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
interface RegenerateAndDeleteInvoiceProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  changePage: (value: string) => void;
}
interface RegenerateAndDeleteInvoiceStates {
  invoiceNumber: string;
  message: string;
  showAlert: boolean;
  isLoading: boolean;
  showState: boolean;
  operation: string;
  reason: string;
}
export default class RegenerateAndDeleteInvoice extends Component<
  RegenerateAndDeleteInvoiceProps,
  RegenerateAndDeleteInvoiceStates
> {
  constructor(props: RegenerateAndDeleteInvoiceProps) {
    super(props);
    this.state = {
      invoiceNumber: "",
      message: "",
      showAlert: false,
      isLoading: false,
      showState: false,
      operation: "",
      reason: "",
    };
  }
  choice = ["Membership", "Non-Membership"];
  render() {
    return (
      <IonPage>
        <HeaderToolbar
          showBackButton={false}
          showRefreshButton={false}
          previousPage={() => {}}
          refreshPage={() => {}}
        />
        <IonContent>
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <IonGrid class="limitContent" style={{ marginTop: "50px" }}>
              <IonItem class="basicInput membershipProfileInput">
                <IonLabel
                  position="floating"
                  class="selectDisabled"
                  // color={this.state.states == "" ? "high" : "medium"}
                >
                  Invoice Reason*
                </IonLabel>
                <IonSelect
                  value={this.state.reason}
                  name="Invoice Type"
                  class="selectDisabled"
                  onIonChange={(e) => this.setState({ reason: e.detail.value })}
                >
                  {this.choice.map((val: any) => {
                    return (
                      <IonSelectOption key={val} value={val}>
                        {val}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              <IonItem class="basicInput membershipProfileInput">
                <IonLabel position="floating" class="selectDisabled">
                  Invoice Number*
                </IonLabel>
                <IonInput
                  placeholder="Invoice Number"
                  name="Invoice Number"
                  value={this.state.invoiceNumber}
                  required={true}
                  onIonChange={(val) => {
                    this.setState({
                      invoiceNumber: val.detail.value ? val.detail.value : "",
                    });
                  }}
                ></IonInput>
              </IonItem>
              <IonSegment mode="md" style={{ marginLeft: -28 }}>
                <IonButton
                  class="basicButton"
                  disabled={this.state.invoiceNumber == ""}
                  onClick={() => {
                    this.setState({ showState: true, operation: "delete" });
                  }}
                >
                  Delete Invoice
                </IonButton>
                <IonButton
                  class="basicButton"
                  disabled={
                    this.state.invoiceNumber == "" 
                    // ||
                    // this.state.reason == "Non-Membership"
                  }
                  onClick={() => {
                    this.setState({ showState: true, operation: "update" });
                  }}
                >
                  Regenerate Invoice
                </IonButton>
              </IonSegment>
            </IonGrid>
          )}
          <IonAlert
            isOpen={this.state.showAlert}
            message={this.state.message}
            onDidDismiss={() => {
              this.setState({ showAlert: false });
            }}
          ></IonAlert>
          <IonAlert
            isOpen={this.state.showState}
            message={
              "Are you sure you want " + this.state.operation + " this invoice"
            }
            onDidDismiss={() => this.setState({ showState: false })}
            buttons={[
              { text: "Cancel", role: "cancel" },
              {
                text: "Yes",
                handler: () => {
                  console.log(this.state.reason);
                  this.state.reason == "Membership"
                    ? this.regenrateOrDelete(this.state.operation)
                    : this.regenrateOrDeleteNonMember(this.state.operation);
                },
              },
            ]}
          />
        </IonContent>
      </IonPage>
    );
  }
  regenrateOrDelete(operation: string) {
    this.setState({ isLoading: true });
    PaymentService.RegenerateOrDeleteInvoice(
      this.props.loginMetadata,
      operation,
      this.state.invoiceNumber
    )
      .then((resp) => {
        this.setState({
          message: resp.message,
          isLoading: false,
          showAlert: true,
        });
        if (operation == "update" && resp.URL != undefined) {
          Browser.open({ url: resp.URL });
        }
      })
      .catch((e) => {
        this.setState({
          isLoading: false,
          message: e.message,
          showAlert: true,
        });
      });
  }
  regenrateOrDeleteNonMember(operation: string) {
    this.setState({ isLoading: true });
    PaymentService.RegenerateOrDeleteInvoiceNonMember(
      this.props.loginMetadata,
      operation,
      this.state.invoiceNumber
    )
      .then((resp) => {
        this.setState({
          message: resp.message,
          isLoading: false,
          showAlert: true,
        });
        if (operation == "update" && resp.URL != undefined) {
          Browser.open({ url: resp.URL });
        }
      })
      .catch((e) => {
        this.setState({
          isLoading: false,
          message: e.message,
          showAlert: true,
        });
      });
  }
}
