import React from "react";
import { LoginMetadata } from "../../models/LoginMetadata";
import { iiaDirectory } from "../../models/IIADirectory/IIADirectory";
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonModal, IonPopover, IonRoute, IonRow, IonSegment, IonText } from "@ionic/react";
import "../../styles/IIADirectory.css"

interface IIADirectoryCardProps {
    loginMetadata: LoginMetadata;
    directory: iiaDirectory;
}

interface IIADirectoryCardStates {
    showModal: boolean;
}

class IIADirectoryCard extends React.Component<IIADirectoryCardProps, IIADirectoryCardStates>{
    constructor(props: IIADirectoryCardProps) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    render() {
        console.log(this.props.loginMetadata.membershipStatus)
        return (
            <IonList>
                <IonCard className = {this.props.loginMetadata.isAdmin ? "directorycardadmin" : "directorycard" }>
                    <IonItem lines="none">
                        <IonRow>
                            <IonCol>
                                <IonAvatar>{this.props.directory.ProfileImagePath === "" ?
                                    <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                    : <img src={this.props.directory.ProfileImagePath} />}</IonAvatar>
                            </IonCol>
                            <IonCol class="memname">
                                <IonLabel>{this.props.directory.FirstName} {this.props.directory.LastName}</IonLabel>
                                <IonCardSubtitle>{this.props.directory.Chapter}</IonCardSubtitle>
                            </IonCol>
                        </IonRow>
                    </IonItem>
                    <IonCardContent>
                        <IonRow className="dircarddetail">
                            <b>Unit Name&nbsp;:&nbsp;</b> {this.props.directory.UnitName === "" ? "Not Available" : this.props.directory.UnitName}
                        </IonRow>
                        <IonRow className="dircarddetail">
                            <b>Category&nbsp;:&nbsp;</b> {this.props.directory.Classification === "" ? "Not Available" : this.props.directory.Classification}
                        </IonRow>
                        <IonRow>
                            <IonButton onClick={(e) => this.viewDetails()} className="dirsearch">Click to view more details</IonButton>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
                {/* Popover starts */}
                <IonModal isOpen={this.state.showModal} onDidDismiss={() => this.setState({ showModal: false })}>
                    <IonContent>
                    <IonItem lines="none">
                            <IonRow>
                                <IonCol>
                                    <IonAvatar>{this.props.directory.ProfileImagePath === "" ?
                                        <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                                        : <img src={this.props.directory.ProfileImagePath} />}</IonAvatar>
                                </IonCol>
                                <IonCol className="memname">
                                    <IonLabel><b>{this.props.directory.FirstName} {this.props.directory.LastName}</b></IonLabel>
                                    <IonLabel>{this.props.directory.Chapter}</IonLabel>
                                </IonCol>
                            </IonRow>
                            </IonItem>
                            <IonItem>
                                <IonCol>
                            <IonRow>
                                <IonCol className="popcontent">
                                    <IonRow><b>Unit Name&nbsp;:&nbsp;</b> {this.props.directory.UnitName === "" ? " Not Available" : this.props.directory.UnitName}</IonRow>
                                    <IonRow className="popcontent"><b>Category&nbsp;:&nbsp;</b> {this.props.directory.Classification === "" ? " Not Available" : this.props.directory.Classification}</IonRow>
                                    <IonRow className="popcontent"><b>Product Category&nbsp;:&nbsp; </b> {this.props.directory.ProductCategory === "" ? " Not Available" : this.props.directory.ProductCategory}</IonRow>
                                    <IonRow className="popcontent"><b>Sub Category&nbsp;:&nbsp; </b> {this.props.directory.ProductSubCategory === "" ? " Not Available" : this.props.directory.ProductSubCategory}</IonRow>
                                    <IonRow className="popcontent"><b>Enterprise&nbsp;:&nbsp; </b> {this.props.directory.EnterpriseType === "" ? " Not Available" : this.props.directory.EnterpriseType}</IonRow>
                                    <IonRow className="popcontent"><b>Major Products&nbsp;:&nbsp; </b> {this.props.directory.MajorProducts === "" ? " Not Available" : this.props.directory.MajorProducts}</IonRow>
                                    <IonRow className="popcontent"><b>Industry&nbsp;:&nbsp; </b> {this.props.directory.IndustryStatus === "" ? " Not Available" : this.props.directory.IndustryStatus}</IonRow>
                                    <IonRow className="popcontent"><b>Website&nbsp;:&nbsp; </b> {this.props.directory.WebsiteUrl === "" ? " Not Available" : this.props.directory.WebsiteUrl}</IonRow>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <IonLabel className="poplabel"><b>Contact Details</b></IonLabel>
                                {this.props.loginMetadata.isAdmin ?
                                    // <IonSegment>
                                        <IonCol>
                                        <IonRow className="popcontent"><b>Email&nbsp;:&nbsp;</b>  {this.props.directory.Email === "" ? "  Not Available" : this.props.directory.Email}</IonRow>
                                        <IonRow className="popcontent"><b>Phone Number&nbsp;:&nbsp;</b> {this.props.directory.PhoneNumber === "" ? " Not Available" : this.props.directory.PhoneNumber}</IonRow>
                                        </IonCol>
                                    :
                                    this.props.loginMetadata.membershipStatus === 0 ?
                                    <IonRow className="popcontent">Become a member to access contact details</IonRow>
                                    :
                                    <IonCol>
                                        <IonRow className="popcontent"><b>Email&nbsp;:&nbsp; </b> {this.props.directory.Email === "" ? " Not Available" : this.props.directory.Email}</IonRow>
                                        <IonRow className="popcontent"><b>Phone Number&nbsp;:&nbsp; </b> {this.props.directory.PhoneNumber === "" ? " Not Available" : this.props.directory.PhoneNumber}</IonRow>
                                    </IonCol>
                                }
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonItem>
                    </IonContent>
                </IonModal>
            </IonList>
        );
    }

    private viewDetails() {
        this.setState({ showModal: true });
    }
}

export default IIADirectoryCard;