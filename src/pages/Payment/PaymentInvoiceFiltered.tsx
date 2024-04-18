import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import { IonCard, IonCol, IonContent, IonGrid, IonSpinner, IonPage, IonRouterLink, IonRow } from "@ionic/react";
import { PaymentRecordAllInvoice } from "../../models/Payment/PaymentRecordAllInvoice";
import { saveAs } from 'file-saver';
interface PaymentInvoiceFilteredProps {
    loginMetadata: LoginMetadata;
    filteredList: PaymentRecordAllInvoice[];
    invoiceId:string;
}

interface PaymentInvoiceFilteredStates {

}

class PaymentInvoiceFiltered extends React.Component<PaymentInvoiceFilteredProps, PaymentInvoiceFilteredStates> {
    constructor(props: PaymentInvoiceFilteredProps) {
        super(props);
        this.state = {
        };
    }

    async getNewInvoice(invoiceId,index,payment){
        if(!this.props.invoiceId) return;
        const tempVariable = this.props.filteredList[index].InvoicePath
   ;
        const updatedFilteredList = [...this.props.filteredList];
        updatedFilteredList[index].InvoicePath = "";
        this.setState({ filteredList: updatedFilteredList, isLoading: true });
        const data = {
            invoiceId: invoiceId,
            payment:payment
        };
        try {
            const response = await fetch('https://iiaonline.in/newapi_iia/fetchwithIRNInvoice.php', {
                method: "POST",
                body: JSON.stringify(data)
            });
            const result = await response.blob();
            saveAs(result, `${payment.AdminName}.pdf`);
        } catch (error) {
            console.error("Error fetching data:", error);
           
        }
        updatedFilteredList[index].InvoicePath= tempVariable;
        this.setState({ filteredList: updatedFilteredList, isLoading: false });
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
                {this.props.filteredList.slice(0, 10).map((paymentList: PaymentRecordAllInvoice,index) => {
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
                                                        {
                                                            (this.props.invoiceId) ? 
                                                            <IonCol size="4.5" class="ion-no-padding ion-text-end" 
                                                            style={{color:'#cb202d',textDecoration:'underline'}}
                                                            onClick={()=>this.getNewInvoice(paymentList.InvoiceId,index,paymentList)}>
                                                                {
                                                                    (paymentList.InvoicePath) ? 'Download Invoice':
                                                                    <IonSpinner style={{width:'20px'}}></IonSpinner>
                                                                }    
                                                            </IonCol>:
                                                            <IonCol size="4.5" class="ion-no-padding ion-text-end">
                                                                <IonRouterLink
                                                                    href={paymentList.InvoicePath}
                                                                    className="payContent"
                                                                    >
                                                                    Download Invoice
                                                                </IonRouterLink>
                                                            </IonCol>
                                                        }
                                                        

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