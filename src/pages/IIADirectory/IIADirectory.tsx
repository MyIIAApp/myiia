import { IonButton, IonCard, IonCardTitle, IonContent, IonGrid, IonIcon, IonPage, IonRow, IonSearchbar, IonSlide } from "@ionic/react";
import React, { useState } from "react";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { IIADirectoryResponse } from "../../models/IIADirectory/IIADirectoryResponse";
import { LoginMetadata } from "../../models/LoginMetadata";
import { IIADirectoryService } from "../../services/IIADirectoryService"
import { iiaDirectory } from "../../models/IIADirectory/IIADirectory";
import IIADirectoryCard from "./IIADirectoryCard";
import "../../styles/IIADirectory.css"
import { searchOutline } from "ionicons/icons";

interface IiaDirectoryProps {
  loginMetadata: LoginMetadata;
}
interface IiaDirectoryStates {
  iiaDirectoryList: iiaDirectory[];
  showLoading: boolean;
  searchText: string;
}
class IiaDirectory extends React.Component<IiaDirectoryProps, IiaDirectoryStates>{
  constructor(props: IiaDirectoryProps) {
    super(props);
    this.state = {
      iiaDirectoryList: [],
      showLoading: false,
      searchText: "",
    };
  }

  getData(forceRefresh: boolean) {
    this.setState({ iiaDirectoryList: [], showLoading: true });
    IIADirectoryService.GetIIADirectoryLists(
      this.props.loginMetadata,
      forceRefresh,
      this.state.searchText
    )
      .then((response: IIADirectoryResponse) => {
        this.setState({ iiaDirectoryList: response.iiaDirectory, showLoading: false, searchText: "" });
      })
      .catch(() => { });
  }

  render() {
    if (this.state.showLoading) {
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
    if (this.state.iiaDirectoryList.length === 0) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => { this.setState({ iiaDirectoryList: [] }) }}
            previousPage={() => { }}
            showBackButton={false}
            showRefreshButton={false}
          />
          <IonRow className="directorycontent">
            <input type="text" className="search" placeholder="Search by Name" onChange={(e) => { this.setState({ searchText: e.target.value }) }} />
            <IonButton disabled={this.state.searchText === ""} onClick={() => this.getData(true)}><IonIcon ios={searchOutline} md={searchOutline}></IonIcon></IonButton>
          </IonRow>
          <IonContent className="nomembers">No Members To Show</IonContent>
        </IonPage>
      )
    }
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => { this.setState({ iiaDirectoryList: [] }) }}
          previousPage={() => { }}
          showBackButton={false}
          showRefreshButton={true}
        />
        <IonRow className="directorycontent">
          <input type="text" className="search" placeholder="Search by Name" onChange={(e) => { this.setState({ searchText: e.target.value }) }} />
          <IonButton disabled={this.state.searchText === ""} onClick={() => this.getData(true)}><IonIcon ios={searchOutline} md={searchOutline}></IonIcon></IonButton>
        </IonRow>
        <IonContent>
          {this.state.iiaDirectoryList.slice(0, 10).map((filteredItem: iiaDirectory) => {
            return (
              <IonGrid key={filteredItem.MembershipId}>
                <IIADirectoryCard directory={filteredItem} loginMetadata={this.props.loginMetadata}></IIADirectoryCard>
              </IonGrid>
            )
          })}
        </IonContent>
      </IonPage>
    )
  }

}

export default IiaDirectory;