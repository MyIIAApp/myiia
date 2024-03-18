import { IonAlert, IonContent, IonPage } from "@ionic/react";
import React from "react";
import GenericTable from "../../components/GenericTable";
import HeaderToolbar from "../../components/HeaderToolbar";
import Loading from "../../components/Loading";
import { LoginMetadata } from "../../models/LoginMetadata";
import { Magazine } from "../../models/Magazine/Magazine";
import { MagazineService } from "../../services/MagazineService";

interface AdminManageMagazineStates {
    showLoading: boolean;
    showToast: boolean;
    magazineList: any[];
}

interface AdminManageMagazineProps {
    loginMetadata: LoginMetadata

}

class AdminManageMagazine extends React.Component < AdminManageMagazineProps, AdminManageMagazineStates> {
    constructor(props: AdminManageMagazineProps) {
        super(props);
        this.state = {
            showLoading: false,
            showToast: false,
            magazineList: [],
        };
      }

      componentDidMount() {
          this.getMagazine(false, false);
      }

      getMagazine(forceRefresh: boolean, afterDelete: boolean) {
        this.setState({showLoading:true});
        MagazineService.GetAllMagazine(this.props.loginMetadata, forceRefresh).then(
            (resp) => {
                this.setState({ showLoading: false, magazineList: resp.magazine });
                if(afterDelete)
                {
                  this.setState({showToast:true});
                }
              }
            ).catch(()=>{
                this.setState({showLoading:false});
            });
      }

      deleteMagazine(index: number){
        this.setState({showLoading:true});
          MagazineService.CreateMagazine(this.props.loginMetadata, index.toString(), "", "", "", "", "delete").then((resp)=>{
               this.getMagazine(true, true);
               console.log(resp)
          }).catch(()=>{
            this.getMagazine(true, false);
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
          refreshPage={() => {this.getMagazine(true, false)}}
          previousPage={()=>{}}
          showBackButton={false}
          showRefreshButton={true}
        />
        <IonAlert isOpen={this.state.showToast} message="Magazine Deleted Successfully"  onDidDismiss={()=>{this.setState({showToast:false})}}/>
        <GenericTable
            columnList={["Id", "Title", "Magazine Month", "Magazine Year", "Delete"]}
            showDeleteColumn={true}
            sizesList={["1","5.5","2.5","2.5"]}
            showUpdateColumn={false}
            DeleteFunction={(index) => {this.deleteMagazine(this.state.magazineList[index].id)}}
            UpdateFunction={() => {}}
            tableContent={this.state.magazineList}
            keyList={["id", "title", "magazineMonth", "magazineYear"]}
            title= "Magazine"
          />
            </IonPage>
          );
      }
}

export default AdminManageMagazine;