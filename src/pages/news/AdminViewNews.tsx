import { IonAlert, IonContent, IonPage, IonToast } from "@ionic/react";
import React, { Component } from "react";
import GenericTable from "../../components/GenericTable";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LoginMetadata } from "../../models/LoginMetadata";
import { NewsService } from "../../services/NewsService";
interface AdminViewNewsProps {
  loginMetadata: LoginMetadata;
  setLoginStateFunction: (loginMetadata: LoginMetadata | null) => void;
}
interface AdminViewNewsStates {
  newsList: any[];
  showLoading: boolean;
  showToast: boolean;
}
export default class AdminViewNews extends Component<
  AdminViewNewsProps,
  AdminViewNewsStates
> {
  constructor(props: AdminViewNewsProps) {
    super(props);
    this.state = {
      newsList: [],
      showLoading: true,
      showToast: false,
    };
  }
  componentDidMount() {
      this.getNews(false, false);
  }
  getNews(forceRefresh: boolean, afterDelete: boolean) {
    this.setState({showLoading:true});
    NewsService.GetNews(this.props.loginMetadata, "", forceRefresh).then(
      (resp) => {
        this.setState({ showLoading: false,newsList: resp.news });
        if(afterDelete)
        {
          this.setState({showToast:true});
        }
      }
    ).catch(()=>{
        this.setState({showLoading:false});
    });
  }
  deleteNews(index: number){
    this.setState({showLoading:true});
      NewsService.CreateNews(this.props.loginMetadata, index.toString(), "", "", "", "delete").then((resp)=>{
           this.getNews(true, true);
            
      }).catch(()=>{
        this.getNews(true, false);
      })
  }
  render() {
    if (this.state.showLoading) {
      return (
        <IonPage>
          <HeaderToolbar
            refreshPage={() => {}}
            previousPage={() => {}}
            showBackButton={false}
            showRefreshButton={true}
          />
          <IonContent>
            <Loading />
          </IonContent>
        </IonPage>
      );
    }
    return (
      <IonPage>
        <HeaderToolbar
          refreshPage={() => {this.getNews(true, false)}}
          previousPage={()=>{}}
          showBackButton={false}
          showRefreshButton={true}
        />
        <IonAlert isOpen={this.state.showToast} message="News Deleted Successfully"  onDidDismiss={()=>{this.setState({showToast:false})}}/>
          <GenericTable
            columnList={["Id", "Title", "Description", "Chapter Name"]}
            showDeleteColumn={true}
            sizesList={["1","3.5","6","1"]}
            showUpdateColumn={false}
            DeleteFunction={(index) => {this.deleteNews(this.state.newsList[index].id)}}
            UpdateFunction={() => {}}
            tableContent={this.state.newsList}
            keyList={["id", "title", "description", "chapterName"]}
            title= "News"
          />
          </IonPage>
    );
  }
}
