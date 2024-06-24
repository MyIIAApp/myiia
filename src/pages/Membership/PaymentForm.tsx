import { Browser } from "@capacitor/browser";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { MembershipPage } from "../../constants/MenuConstants";
import { LoginMetadata } from "../../models/LoginMetadata";
import { paymentDetails } from "../../models/paymentDetails";
import { PaymentService } from "../../services/PaymentService";
import "../../styles/Membership.css";
import errorIcon from "../../images/errorIcon.svg";
import { CreatePaymentUrl  } from "../../constants/Config";
interface PaymentFormStates {
  dashboardObject: paymentDetails;
  showLoading: boolean;
  showError: boolean;
  htmlContent:string;
  showpaymentForm:boolean;
}

interface PaymentFormProps {
  loginMetadata: LoginMetadata;
  expiryYear: any;
  resetMembershipData: (forceRefresh: boolean) => void;
  changePage: () => void;
}

class PaymentForm extends React.Component<PaymentFormProps, PaymentFormStates> {
  constructor(props: PaymentFormProps) {
    super(props);
    this.state = {
      dashboardObject: new paymentDetails(),
      showLoading: true,
      showError: false,
      htmlContent:'',
      showpaymentForm:false,
    };
  }

  async getPaymentdetail(){
    const data = {
      userid:parseInt(this.props.loginMetadata.id)
    }
    const response  = await fetch('https://iiaonline.in/newapi_iia/paymentdetailUser.php',{
      method:'POST',
      body:JSON.stringify(data)
    });
    const result  = await response.json();
    this.setState({
      dashboardObject: result,
      showLoading: false,
    });
  }
  componentDidMount() {
    // this.getData();
    this.getPaymentdetail();
  }
  protected getData() {
    PaymentService.paymentDetailService(
      this.props.loginMetadata,
      true,
      parseInt(this.props.loginMetadata.id)
    ).then((response) => {
      this.setState({
        dashboardObject: response,
        showLoading: false,
      });
    });
  }

  render() {
    const now  = new Date();
    if (this.state.showLoading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {this.props.changePage()}}
            showRefreshButton={false}
            showBackButton={true}
          ></HeaderToolbar>
          <IonContent>
            <Loading />
          </IonContent>
        </IonPage>
      );
    }
    if(this.state.showError)
    {
      return(
        <IonPage>
        <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {this.props.changePage()}}
            showRefreshButton={false}
            showBackButton={true}
          ></HeaderToolbar>
      <IonContent>
        <IonGrid class="limitContent paymentForm">
          <IonImg class="iiaimg" src={errorIcon}/>
          <IonSegment mode ="md" class="gatewayError">
            <IonLabel class="gatewayError2">Payment Gateway is facing some issue. Please try again later</IonLabel>
          </IonSegment>
        </IonGrid>
      </IonContent>
      </IonPage>
      );
    }
    return (
      <IonPage>
        <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {this.props.changePage()}}
            showRefreshButton={false}
            showBackButton={true}
          ></HeaderToolbar>
        <IonContent>
          {
            (!this.state.showpaymentForm)?   <IonGrid class="limitContent paymentForm">
            <IonImg class="iiaimg" src="https://iiaprodstorage.blob.core.windows.net/utils/IIALogo.png"></IonImg>
            <IonSegment mode ="md" class="paymentYearDetails">
              {(this.props.expiryYear.slice(0,4) > "1900") ? "Payment for FY " + this.props.expiryYear.slice(0,4)+ "-" + (parseInt(this.props.expiryYear.slice(0,4)) + 1) : now.getMonth() < 3 ? "Payment for FY " + (now.getFullYear()-1)+ "-" + now.getFullYear():"Payment for FY " + (now.getFullYear())+ "-" + (now.getFullYear()+1)}
            </IonSegment>
            <IonRow>
              <IonCol size="8" class="ion-text-start">
                Admission Fee
              </IonCol>
              <IonCol size="4" class="ion-text-end">
                {this.state.dashboardObject.admissionFee}
              </IonCol>
            </IonRow>
            <IonRow></IonRow>
            <IonRow>
              <IonCol size="8" class="ion-text-start">
                Membership Fee
              </IonCol>
              <IonCol size="4" class="ion-text-end">
                {this.state.dashboardObject.membershipFee}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="8" class="ion-text-start">
                CGST
              </IonCol>
              <IonCol size="4" class="ion-text-end">
                {this.state.dashboardObject.cgst}
              </IonCol>
            </IonRow>
  
                {this.state.dashboardObject.sgst == "0" ? (
                  <IonRow>
                    <IonCol size="8" class="ion-text-start">
                      IGST
                    </IonCol>
                    <IonCol size="4" class="ion-text-end">
                      {this.state.dashboardObject.igst}
                    </IonCol>
                  </IonRow>
                ) : (
                  <IonRow>
                    <IonCol size="8" class="ion-text-start">
                      SGST
                    </IonCol>
                    <IonCol size="4" class="ion-text-end">
                      {this.state.dashboardObject.sgst}
                    </IonCol>
                  </IonRow>
                )}
                <IonRow>
                  <IonCol size="8" class="ion-text-start">
                    Full Amount
                  </IonCol>
                  <IonCol size="4" class="ion-text-end">
                    {this.state.dashboardObject.igst +
                      this.state.dashboardObject.sgst +
                      this.state.dashboardObject.membershipFee +
                      this.state.dashboardObject.admissionFee +
                      this.state.dashboardObject.cgst}
                  </IonCol>
                </IonRow>
                <IonSegment mode ="md">
                <IonButton className="payButton" onClick={() => this.pay()}>
                  Pay {(this.props.expiryYear.slice(0,4) > "1900") ? this.props.expiryYear.slice(0,4)+ "-" + (parseInt(this.props.expiryYear.slice(0,4)) + 1) : now.getMonth() < 3 ? (now.getFullYear()-1)+ "-" + now.getFullYear(): (now.getFullYear())+ "-" + (now.getFullYear()+1)}
                </IonButton>
                </IonSegment>
          </IonGrid>:<div style={{textAlign:'center'}}>
          <div dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
        </div>
          }
    
        </IonContent>
      </IonPage>
      
    );
  }

  pay(){
    this.setState({showpaymentForm:true})
    let data = {
      loginMetadata:this.props.loginMetadata,
      amount:this.state.dashboardObject.igst +
            this.state.dashboardObject.sgst +
            this.state.dashboardObject.membershipFee +
            this.state.dashboardObject.admissionFee +
          this.state.dashboardObject.cgst,
    igst:this.state.dashboardObject.igst,
    sgst:this.state.dashboardObject.sgst,  
    cgst:this.state.dashboardObject.cgst, 
    membershipFee:this.state.dashboardObject.membershipFee,
    admissionFee:this.state.dashboardObject.admissionFee
    }
    fetch('https://iiaonline.in/new_payment/payment.php',{
      method:'POST',
      body:JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
      this.setState({ htmlContent: data });
    })
    .catch(error => {
      console.error('Error fetching HTML:', error);
    });
  }

  pay2() {
      this.setState({ showLoading: true });
      Browser.open({ url: 'http://localhost/api/zzz/test7.php' + "&token=" + this.props.loginMetadata.tokenString, windowName: "_self" });
      Browser.addListener("browserFinished", () => {
      this.props.resetMembershipData(true);
      }
    ); 
  }
}

export default PaymentForm;
