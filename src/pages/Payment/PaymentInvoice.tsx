import { IonGrid,IonRouterLink,IonSegment } from "@ionic/react";
import React from "react";
import "../../styles/Payment.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import Loading from "../../components/Loading";
import { invoice } from "../../models/invoice";
import { paymentDetails } from "../../models/paymentDetails";
import { MembershipProfileModel } from "../../models/Membership/MembershipProfileModel";
import { saveAs } from 'file-saver';
interface PaymentStates {
  showAlert: boolean;
  alertMessage: string;
  showloading: boolean;
  invoiceObject: invoice;
  newURLpdf:string;
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
  userdetails:MembershipProfileModel;
  dashboardobj:paymentDetails;
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
      newURLpdf:""
    };
  }

  regenrateOrDeleteFake(invoiceId) {
    let operation = "update";
    PaymentService.RegenerateOrDeleteInvoice(
      this.props.loginMetadata,
      operation,
      invoiceId
    )
      .then((resp) => {
        console.log(resp.URL);
        this.setState({newURLpdf:resp.URL});        
      })
      .catch((e) => {
        console.log("some error");
        console.log(e);
      });
  }

  componentDidMount() {
    PaymentService.BeforeInvoiceSave(this.props).then(res=>{
      let data = (JSON.parse(res.response));
      let invoiceId = res.invoiceId;
      let newblobdata = (res.pdfresponse) ? res.pdfresponse.blob() :""; 
      let buyerGST = this.props.userdetails.gstin;         
      let buyerName = this.props.userdetails.unitName; 
         if(data.status_cd==1){
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
            if(response.paymentSuccess){
              PaymentService.updateInvoiceId(this.props.userId,invoiceId).then(res=>{
                if(buyerGST && buyerGST.substring(1, 5)!="0000"){
                  saveAs(newblobdata,`${buyerName}.pdf`);
                }
                this.regenrateOrDeleteFake(invoiceId);
              })
            }
           this.setState({ invoiceObject: response, showloading: false })
         })
         .catch(() => {
           this.setState({ showloading: false, })
         });
       }
       else if(data.status_cd==0){
         this.setState({ showAlert: true, })
       }
    }).catch(() => {
      this.setState({ showAlert: true, })
    }); 
  }

  render() {
    if (this.state.showloading) {
      return (
        <Loading />
      );
    }
    else if(this.state.showAlert){
      return (
        <IonSegment mode ="md">
          E-invoice Server is not responding please try again after some time
        </IonSegment>
      );
    }
    else if (!this.state.invoiceObject.paymentSuccess) {
      return (
        <IonSegment mode ="md">
          {/* Payment Not Successful */}
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
          
          <IonRouterLink href={this.state.newURLpdf}>
            Download Invoice
          </IonRouterLink>

            </IonSegment>
        </IonGrid>
      );

    }
  }
}

export default PaymentInvoice;
