import {
  IonGrid,
  IonRouterLink,
  IonSegment,
} from "@ionic/react";
import React from "react";
import "../../styles/Payment.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import Loading from "../../components/Loading";
import { invoice } from "../../models/invoice";

interface PaymentStates {
  showAlert: boolean;
  alertMessage: string;
  showloading: boolean;
  invoiceObject: invoice;
}
interface PaymentProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
  userId: number;
  paymentMode: string;
  paymentMade: string;
  chequeNumber: string;
  startYear:string;
  paymentReason: string;
  expiryYear:string;
  paymentType: string;
  subTotal: string;
  paymentReason2: string;
}
class PaymentInvoice extends React.Component<
  PaymentProps,
  PaymentStates
> {
  constructor(props: PaymentProps) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: "",
      showloading: true,
      invoiceObject: new invoice(),
    };
  }
  componentDidMount() {
    PaymentService.GetInvoiceService(
      this.props.loginMetadata,
      this.props.userId,
      this.props.paymentMode,
      this.props.paymentMade,
      this.props.chequeNumber,
      this.props.startYear,
      this.props.expiryYear,
      this.props.paymentType,
      this.props.subTotal,
      this.props.paymentReason2,
      this.props.paymentReason
    )
      .then((response: invoice) => {
        this.setState({ invoiceObject: response, showloading: false })
      })
      .catch(() => {
        this.setState({ showloading: false, })
      });
  }

  render() {
    if (this.state.showloading) {
      return (
        <Loading />
      );
    }
    else if (!this.state.invoiceObject.paymentSuccess) {
      return (
        <IonSegment mode ="md">
          Payment Not Successful
        </IonSegment>
      );
    }
    else if (!this.state.invoiceObject.invoiceGenerated) {
      return (
        <IonSegment mode ="md">
          Invoice Not generated
        </IonSegment>
      );
    }
    else {
      return (
        <IonGrid>
          <IonSegment mode ="md" className="invoicePa">
            Payment Successful
          </IonSegment>
          <IonSegment mode ="md">
          <IonRouterLink href={this.state.invoiceObject.InvoicePath}>
            Download Invoice
          </IonRouterLink>
            </IonSegment>
        </IonGrid>
      );

    }
  }
}

export default PaymentInvoice;