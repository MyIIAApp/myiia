import {
  IonContent,
  IonPage,
  IonSegment,
  IonRouterLink,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonFooter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonList,
} from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import "../../styles/Payment.css";
import { LoginMetadata } from "../../models/LoginMetadata";
import { PaymentService } from "../../services/PaymentService";
import Loading from "../../components/Loading";

interface PaymentHistoryStates {
    PaymentHistoryRecord: any;
    showloading: boolean;
}
interface PaymentHistoryProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}

class PaymentHistory extends React.Component<PaymentHistoryProps, PaymentHistoryStates> {
    static Page: string;
    constructor(props: PaymentHistoryProps) {
        super(props);
        this.state = {
            PaymentHistoryRecord: [],
            showloading: true
        };
    }
    componentDidMount() {
        PaymentService.paymentHistoryService(
            this.props.loginMetadata,
            true,
        )
            .then((response: any) => {
                this.setState({ PaymentHistoryRecord: response, showloading: false })
            })
            .catch(() => {
                this.setState({ showloading: false })
            })
    }
    render() {
        if (this.state.showloading) {
            return (
                <IonPage>
                    <HeaderToolbar
                        refreshPage={() => { }}
                        previousPage={() => { }}
                        showBackButton={false}
                        showRefreshButton={false}
                    />
                    <IonContent>
                        <Loading />
                    </IonContent>
                </IonPage>
            );
        }
        else {
            return (
                <IonPage>
                    <HeaderToolbar
                        refreshPage={() => { }}
                        previousPage={() => { }}
                        showBackButton={false}
                        showRefreshButton={false}
                    />
                    {this.state.PaymentHistoryRecord==""?
                    <IonContent>
                        <IonGrid class="limitContent noDue"> 
                            No Payment Made till Now
                        </IonGrid>
                    </IonContent>:
                    <IonContent>
                    <IonGrid className="limitContent">
                        <IonSegment mode ="md" className="payHead">
                            Payment History
                        </IonSegment>
                        <IonList>
                            {this.state.PaymentHistoryRecord.map((paymentList: any) => {
                                return (
                                    <IonCard className="payGrid" key={paymentList.DateTime}>
                                        <IonGrid className="payCard">
                                            <IonRow>
                                                <IonCol size="7" className="payDivide">
                                                    <IonRow className="payReason">
                                                        {paymentList.PaymentReason}
                                                    </IonRow>
                                                    <IonRow className="payMode">
                                                        {paymentList.PaymentMode}
                                                    </IonRow>
                                                </IonCol>
                                                <IonCol size="4.5" class="ion-text-end payAmount">
                                                    {paymentList.Total}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow className="no-padding">
                                                <IonCol size="7" className="payDivide payTime" class="ion-no-padding">
                                                    {paymentList.DateTime}
                                                </IonCol>
                                                <IonCol size="4.5" class="ion-no-padding ion-text-end">
                                                    <IonRouterLink
                                                        href={paymentList.InvoicePath}
                                                        className="payContent"
                                                    >
                                                        Download Invoice
                                                    </IonRouterLink>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCard>
                                );
                            })}
                        </IonList>

                    </IonGrid>
                </IonContent>}
                    

                </IonPage>

            );
        }
    }
}

export default PaymentHistory;
