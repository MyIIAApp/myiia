import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import { IonCard, IonCol, IonContent, IonGrid, IonList, IonPage, IonRouterLink, IonRow } from "@ionic/react";
import { PaymentRecordAllInvoice } from "../../models/Payment/PaymentRecordAllInvoice";

interface PaymentInvoiceFilteredProps {
    loginMetadata: LoginMetadata;
    filteredList: PaymentRecordAllInvoice[];
}

interface PaymentInvoiceFilteredStates {

}

class PaymentInvoiceFiltered extends React.Component<PaymentInvoiceFilteredProps, PaymentInvoiceFilteredStates> {
    constructor(props: PaymentInvoiceFilteredProps) {
        super(props);
        this.state = {
        };
    }
    render() {
        console.log(this.props.filteredList)
        if(this.props.filteredList.length === 0)
        {
            return(
                <IonContent class="nomag">
                    No Members To Show
                </IonContent>
            )
        }
        return (
            <IonContent>
                {this.props.filteredList.slice(0, 10).map((paymentList: PaymentRecordAllInvoice) => {
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
                                                    <IonRow className="no-padding payDivide payTime">
                                                        Payment by &nbsp;<strong>{paymentList.AdminName}</strong>&nbsp; of chapter &nbsp;<strong>{paymentList.ChapterName}</strong>
                                                    </IonRow>
                                                    <IonRow className="no-padding payDivide payTime">
                                                        Phone Number: &nbsp;<strong>{paymentList.PhoneNumber}</strong>&nbsp; Membership Id: &nbsp;<strong>{paymentList.MembershipId === "" ? "NA" : paymentList.MembershipId}</strong>
                                                    </IonRow>
                                                    <IonRow className="no-padding payDivide payTime">
                                                        GSTIN: &nbsp;<strong>{paymentList.GSTIN}</strong>&nbsp;
                                                    </IonRow>
                                                </IonGrid>
                                            </IonCard>
                                        );
                                    })}
            </IonContent>
        )
    }
}

export default PaymentInvoiceFiltered;