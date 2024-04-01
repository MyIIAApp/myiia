import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonSegment, IonSegmentButton, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LoginMetadata } from "../../models/LoginMetadata";
import B2BAdminService from "../../services/B2BAdminService";
import "../../styles/B2BAdmin.css"
import B2BAdminDashboard from "./B2BAdminDashboard";
import B2BAdminEnquiries from "./B2BAdminEnquiries";
import B2BAdminListing from "./B2BAdminListing";
interface B2BAdminProps {
    loginMetadata: LoginMetadata;
}
interface B2BAdminStates {
    currentPage: string;
    showLoadingDashboard: boolean;
    showLoadingListings: boolean;
    showLoadingEnquiries: boolean;
}
class B2BAdmin extends React.Component<B2BAdminProps, B2BAdminStates>{
    constructor(props: B2BAdminProps) {
        super(props);
        this.state = {
            currentPage: "Dashboard",
            showLoadingDashboard: false,
            showLoadingListings: false,
            showLoadingEnquiries: false,
        };
    }
    private updateCache(){

        if(this.state.currentPage=="Dashboard"){
            this.setState({showLoadingDashboard:true});
            B2BAdminService.GetB2BAdminDashboardValues(this.props.loginMetadata,true)
            .then(()=>{this.setState({showLoadingDashboard:false})}).catch(()=>{this.setState({showLoadingDashboard:false})});
        }
        else if(this.state.currentPage=="Listings"){
            this.setState({showLoadingListings:true});
            B2BAdminService.GetB2BAdminListings(this.props.loginMetadata,true)
            .then(()=>{this.setState({showLoadingListings:false})}).catch(()=>{this.setState({showLoadingListings:false})});
        }
        else{
            this.setState({showLoadingEnquiries:true});
            B2BAdminService.GetB2BAdminEnquiries(this.props.loginMetadata,true)
            .then(()=>{this.setState({showLoadingEnquiries:false})}).catch(()=>{this.setState({showLoadingEnquiries:false})});
        }
    }
    render() {
        return (
            <IonPage>
                <HeaderToolbar
                    showBackButton={false}
                    showRefreshButton={true}
                    previousPage={() => { }}
                    refreshPage={() => {this.updateCache();}}
                >
                </HeaderToolbar>
                <IonContent class="contentClass">
                        <IonSegment mode ="md" slot="fixed" value={this.state.currentPage} class="tabButton">
                            <IonSegmentButton value="Dashboard" defaultChecked={this.state.currentPage=='Dashboard'} onClick={() => {this.setState({currentPage:"Dashboard"})}}>
                                <IonLabel class="adminTabButton">Dashboard</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="Listings" onClick={() => {this.setState({currentPage:"Listings"})}}>
                                <IonLabel class="adminTabButton">Listings</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="Enquiries" onClick={() => {this.setState({currentPage:"Enquiries"})}}>
                                <IonLabel class="adminTabButton">Enquiries</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                        {this.state.currentPage=="Dashboard"?this.state.showLoadingDashboard?<Loading/>:
                            <B2BAdminDashboard loginMetadata={this.props.loginMetadata}/>:
                            this.state.currentPage=="Listings"?this.state.showLoadingListings?<Loading/>:
                            <B2BAdminListing loginMetadata={this.props.loginMetadata}/>:
                            this.state.currentPage=="Enquiries"?this.state.showLoadingEnquiries?<Loading/>:
                            <B2BAdminEnquiries loginMetadata={this.props.loginMetadata}/>:
                            null
                        }
                </IonContent>
            </IonPage>
        )
    }
}
export default B2BAdmin;