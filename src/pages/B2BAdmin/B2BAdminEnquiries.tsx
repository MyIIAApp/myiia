import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonSegment } from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import SellerName from "../../images/SellerName.svg";
import phone from "../../images/phone.svg";
import B2BAdminChapterName from "../../images/B2BAdminChapterName.svg";
import B2BAdminPendingEnquiryCount from "../../images/B2BAdminPendingEnquiryCount.svg";
import B2BAdminService from "../../services/B2BAdminService";
import { AdminEnquiryResponse } from "../../models/B2B/AdminEnquiryResponse";
import { AdminEnquiry } from "../../models/B2B/AdminEnquiry";
import Loading from "../../components/Loading";
import { checkmarkCircleOutline } from "ionicons/icons";

interface B2BAdminEnquiriesProps {
    loginMetadata: LoginMetadata;
}
interface B2BAdminEnquiriesStates {
    enquiries: AdminEnquiryResponse;
    showLoading: boolean;
}
class B2BAdminEnquiries extends React.Component<B2BAdminEnquiriesProps, B2BAdminEnquiriesStates>{
    constructor(props: B2BAdminEnquiriesProps) {
        super(props);
        this.state = {
            enquiries: new AdminEnquiryResponse(),
            showLoading: false,
        }
    }
    componentDidMount() {
        this.getData();
    }
    private getData() {
        this.setState({ showLoading: true });
        B2BAdminService.GetB2BAdminEnquiries(this.props.loginMetadata, false)
            .then((response: AdminEnquiryResponse) => {
                this.setState({ enquiries: response, showLoading: false });
            })
            .catch((e) => {
                this.setState({ showLoading: false });
                throw e;
            });
    }
    render() {
        return (
            !this.state.showLoading ?
                <IonGrid class="limitContent enquiriesGrid">
                    {this.state.enquiries.adminEnquiryList.length != 0 ?
                        this.state.enquiries.adminEnquiryList.map((enquiryList: AdminEnquiry, index: number) => {
                            return (<IonCard class="adminEnquiriesCard" key={index}>
                                <IonCardContent class="adminListingCardContent">
                                    <IonRow>
                                        <IonCol offset="0.2" size="1.5">
                                            <IonImg src={SellerName}>

                                            </IonImg>
                                        </IonCol>
                                        <IonCol size="4.1">
                                            <IonRow class="adminListingLabel">
                                                Seller Name
                                            </IonRow>
                                            <IonRow class="adminListingValue">
                                                <IonLabel>{enquiryList.SellerName.slice(0, 11)}</IonLabel>
                                            </IonRow>
                                        </IonCol>
                                        <IonCol offset="0.2" size="1.5">
                                            <IonImg src={B2BAdminChapterName}>

                                            </IonImg>
                                        </IonCol>
                                        <IonCol size="4.1">
                                            <IonRow class="adminListingLabel">
                                                Chapter Name
                                            </IonRow>
                                            <IonRow class="adminListingValue">
                                                {enquiryList.SellerChapterName}
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol offset="0.2" size="1.5">
                                            <IonImg src={phone}>

                                            </IonImg>
                                        </IonCol>
                                        <IonCol size="4.1">
                                            <IonRow class="adminListingLabel">
                                                Phone Number
                                            </IonRow>
                                            <IonRow class="adminListingValue">
                                                {enquiryList.SellerPhoneNumber}
                                            </IonRow>
                                        </IonCol>
                                        <IonCol offset="0.2" size="1.5">
                                            <IonImg src={B2BAdminPendingEnquiryCount}>
                                                
                                            </IonImg>
                                        </IonCol>
                                        <IonCol size="4.1">
                                            <IonRow class="adminListingLabel">
                                                Pending Enquiry Count
                                            </IonRow>
                                            <IonRow class="adminListingValue">
                                                {enquiryList.PendingEnquiries}
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>)
                        }) :
                        <IonGrid class="noPendingEnquiries">
                            <IonSegment mode ="md">
                                <IonItem lines="none">
                                    <IonIcon class="noPendingEnquiriesLogo" ios={checkmarkCircleOutline} md={checkmarkCircleOutline} />
                                </IonItem>
                            </IonSegment>
                            <IonSegment mode ="md">
                                <IonLabel>No Pending Enquiry</IonLabel>
                            </IonSegment>
                        </IonGrid>
                    }
                </IonGrid> :
                <Loading />
        )
    }
}
export default B2BAdminEnquiries;