import { IonCard, IonCol, IonContent, IonGrid, IonPage, IonRow, IonSegment } from "@ionic/react";
import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import B2BAdminService from "../../services/B2BAdminService";
import bullet from "../../images/bullet.svg";
import line from "../../images/Line.svg";
import { AdminDashboard } from "../../models/B2B/AdminDashboard";
import Loading from "../../components/Loading";

interface B2BAdminDashboardProps {
    loginMetadata: LoginMetadata;
}
interface B2BAdminDasboardStates {
    dashboardValues: AdminDashboard;
    showloading: boolean;
}
class B2BAdminDashboard extends React.Component<B2BAdminDashboardProps, B2BAdminDasboardStates>{
    constructor(props: B2BAdminDashboardProps) {
        super(props);
        this.state = {
            dashboardValues: new AdminDashboard(),
            showloading: false,
        }
    }
    componentDidMount() {
        this.getData();
    }
    private getData() {
        this.setState({ showloading: true });
        B2BAdminService.GetB2BAdminDashboardValues(this.props.loginMetadata, false)
            .then((response: AdminDashboard) => {
                this.setState({ dashboardValues: response, showloading: false });
            })
            .catch((e) => {
                this.setState({ showloading: false });
                throw e;
            });
    }
    render() {
        return (
            !this.state.showloading?
            <IonGrid className="limitContent dashboardGrid">
                <IonSegment mode ="md" className="memberCount">
                    {this.state.dashboardValues.TotalSellers}
                </IonSegment>
                <IonSegment mode ="md" className="memberCounttext">
                    Total Sellers
                </IonSegment>
                <IonCard className="memberCard">
                    <IonGrid>
                        <IonRow>
                            <IonSegment mode ="md" className="memberCounthead">
                                Total Listings : &nbsp;
                                <span className="chapterLevel">
                                    {this.state.dashboardValues.TotalListing}
                                </span>

                            </IonSegment>
                        </IonRow>
                        <IonRow>
                            <IonCol size="9" className="ion-text-start memberContent">
                                <img className="bullet" src={bullet} alt="" />
                                Active Listing
                            </IonCol>
                            <IonCol size="3" className="ion-text-center membervalue">
                                {this.state.dashboardValues.ActiveListing}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="9" className="ion-text-start memberContent">
                                <img className="bullet" src={bullet} alt="" />
                                Inactive Listing
                            </IonCol>
                            <IonCol size="3" className="ion-text-center membervalue">
                                {this.state.dashboardValues.InactiveListing}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                <IonSegment mode ="md" className="memberCountContent">
                    {this.state.dashboardValues.TotalEnquiries}
                </IonSegment>
                <IonSegment mode ="md" className="memberCounthead">
                    Total Enquiries Received
                </IonSegment>
                <IonCard className="memberCard2">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonSegment mode ="md" className="memberCountContent ion-text-center">
                                    {this.state.dashboardValues.ResolvedEnquiries}
                                </IonSegment>
                                <IonSegment mode ="md" className="ion-text-center memberContent">
                                    Enquiries Resolved
                                </IonSegment>
                            </IonCol>
                            <IonCol size="0.5">
                                <img className="line" src={line} alt="" />
                            </IonCol>
                            <IonCol size="5.5">
                                <IonSegment mode ="md" className="memberCountContent ion-text-center">
                                    {this.state.dashboardValues.PendingEnquiries}
                                </IonSegment>
                                <IonSegment mode ="md" className="ion-text-center memberContent">
                                    Enquiries Pending
                                </IonSegment>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonGrid>:
            <Loading/>
        )
    }
}
export default B2BAdminDashboard;